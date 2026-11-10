/* Liquid glass over real pages, iPhone included (explore only; not part of the system yet).

   Why the earlier tries failed on Safari: real refraction needs `backdrop-filter: url(#svg-filter)` (Chromium only) or a
   snapshot of the page drawn into WebGL (WebKit taints that canvas). What WebKit DOES support is `filter: url(#svg-filter)`
   on an ordinary element. So each glass surface gets a mirror: a live, inert copy of the content behind it, kept lined up
   as the page scrolls, and the SVG filter (blur, refraction displacement map, saturation, the contrast squeeze) is applied
   to that copy instead of to the backdrop. The refraction math is the Liquid Glass Lab's (a convex squircle bezel, Snell's
   law); on iPhone Safari the map can't come from an image, so it is built from filter primitives (lensPrims).

   The text guarantee is kept: the copy gets the same saturation / contrast / brightness squeeze as the glass tokens and the
   same tint is laid over it, so `check-glass` still holds (it does not depend on blur or on where pixels come from).

   LiquidMirror.attach(glass, { source, edges, bend, frost })
     glass   a glass surface (nav bar, top app bar, toolbar)
     source  the element whose content scrolls under it (e.g. main.s4-content)
     edges   which edges bend: 'all' (floating), 'top' (bottom nav bar), 'bottom' (top app bar)
     bend    0 none … 1 the lab's "Liquid" … 1.8 "Extra"
     edge    'soft' (default: the bend eases in over 4px, no seam) or 'lens' (bends right to the rim)
     rimTint the outer 12px band's tint as a share of the glass tint (default 1: same everywhere; 0.4 = a clear rim)
     frost   frost on the lab's scale (default 12, the lab's "Frosted")
   Returns { refresh(), detach(), set(opts) }. LiquidMirror.status() reports what ran. */
window.LiquidMirror = (function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', svgRoot = null, uid = 0, all = [];
  var css = function (el, n) { return getComputedStyle(el).getPropertyValue(n).trim(); };

  /* ---------- refraction math (shift() as in explore/lib/liquid-glass.js) ---------- */
  function sdRR(px, py, bx, by, r) {
    var qx = Math.abs(px) - bx + r, qy = Math.abs(py) - by + r;
    return Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r;
  }
  function slopeAt(t) { var a = 1 - t, b = 1 - a * a * a * a; return a * a * a * Math.pow(Math.max(b, 1e-4), -0.75); }
  function shift(depth, bezel, thick, ior) {
    if (depth >= bezel || bezel <= 0) return 0;
    var t = Math.max(depth / bezel, 0), th = Math.atan(slopeAt(t) * thick / bezel);
    return thick * Math.tan(th - Math.asin(Math.sin(th) / ior));
  }
  /* The same lens built only from filter primitives, because iPhone Safari ignores a displacement map that comes from an image
     (feImage; Lab 5 check 2026-11-10). The glass shape is flooded as a rectangle (pushed far out past the sides that don't bend),
     blurred into a soft edge, and the slope of that edge (the blurred shape shifted 1px each way, subtracted) becomes the
     displacement: strongest at the rim, fading inward, always pointing in, following the rounded corners of the blur.
     Every step works on opaque images, so nothing is lost to premultiplied alpha. Returns { prims, scale }. */
  function lensPrims(w, h, m, bend, edges, edge) {
    var bezel = 20 * Math.min(1.4, 0.6 + bend * 0.4), thick = 24 * bend, bez = Math.min(bezel, Math.min(w, h) / 2);
    var maxD = Math.max(shift(0, bez, thick, 1.5), 0.5), sig = Math.max(bez / 2.5, 1.5), W = Math.round(w + 2 * m), H = Math.round(h + 2 * m);
    var far = 4000, x = m, y = m, rw = w, rh = h;
    if (edges === 'top') { x = -far; rw = W + 2 * far; rh = H + far; }
    else if (edges === 'bottom') { x = -far; y = -far; rw = W + 2 * far; rh = m + h + far; }
    if (edge !== 'lens') { var g = sig * 0.6; x -= g; y -= g; rw += 2 * g; rh += 2 * g; }   /* soft: the steepest part sits just outside the rim */
    var K = (sig * Math.sqrt(2 * Math.PI) / 4).toFixed(3), all = ' x="0" y="0" width="' + W + '" height="' + H + '"';
    /* the slope of a blurred edge falls off like a Gaussian, far wider than the lens: a lookup table turns it into the lab's
       Snell profile (a slope g at depth d = sigma * sqrt(-2 ln g) becomes shift(d) / shift(0)), keeping its sign */
    var N = 64, tv = [];
    for (var i = 0; i <= N; i++) {
      var v = i / N, gg = Math.min(Math.abs(2 * v - 1), 1), dd = gg > 0 ? sig * Math.sqrt(-2 * Math.log(gg)) : 1e9;
      tv.push((0.5 + (v < 0.5 ? -0.5 : 0.5) * shift(dd, bez, thick, 1.5) / maxD).toFixed(4));
    }
    var table = tv.join(' ');
    var opaque = '0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1', inv = '<feFuncR type="linear" slope="-1" intercept="1"/><feFuncG type="linear" slope="-1" intercept="1"/><feFuncB type="linear" slope="-1" intercept="1"/>';
    var slope = function (dx, dy, out) {
      return '<feOffset in="ls" dx="' + (-dx) + '" dy="' + (-dy) + '"' + all + ' result="' + out + 'a"/>' +
        '<feOffset in="ls" dx="' + dx + '" dy="' + dy + '"' + all + ' result="' + out + 'b"/>' +
        '<feComponentTransfer in="' + out + 'b"' + all + ' result="' + out + 'i">' + inv + '</feComponentTransfer>' +
        '<feComposite in="' + out + 'a" in2="' + out + 'i" operator="arithmetic" k1="0" k2="' + K + '" k3="' + K + '" k4="' + (0.5 - K) + '"' + all + ' result="' + out + '"/>';
    };
    var prims = '<feFlood flood-color="#fff" flood-opacity="1" x="' + x + '" y="' + y + '" width="' + rw + '" height="' + rh + '" result="lf"/>' +
      '<feGaussianBlur in="lf" stdDeviation="' + sig.toFixed(2) + '"' + all + ' result="lb"/>' +
      '<feColorMatrix in="lb" type="matrix" values="' + opaque + '"' + all + ' result="ls"/>' +
      slope(1, 0, 'gx') + slope(0, 1, 'gy') +
      '<feColorMatrix in="gx" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1"' + all + ' result="rx"/>' +
      '<feColorMatrix in="gy" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1"' + all + ' result="ry"/>' +
      '<feComposite in="rx" in2="ry" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"' + all + ' result="map0"/>' +
      '<feComponentTransfer in="map0"' + all + ' result="map"><feFuncR type="table" tableValues="' + table + '"/><feFuncG type="table" tableValues="' + table + '"/></feComponentTransfer>';
    return { prims: prims, scale: (maxD * 2).toFixed(2) };
  }
  /* any CSS color -> rgba(), through a 1px canvas (Safari may not take color-mix with nested calc() in a custom property) */
  var cctx;
  function rgba(str, a) {
    if (!cctx) { var c = document.createElement('canvas'); c.width = c.height = 1; cctx = c.getContext('2d', { willReadFrequently: true }); }
    cctx.clearRect(0, 0, 1, 1); cctx.fillStyle = '#000'; cctx.fillStyle = str; cctx.fillRect(0, 0, 1, 1);
    var d = cctx.getImageData(0, 0, 1, 1).data;
    return 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (Math.round(a * 1000) / 1000) + ')';
  }
  function host() {
    if (svgRoot && svgRoot.isConnected) return svgRoot;
    svgRoot = document.createElementNS(NS, 'svg'); svgRoot.setAttribute('aria-hidden', 'true');
    svgRoot.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    document.body.appendChild(svgRoot); return svgRoot;
  }
  function num(v, d) { var n = parseFloat(v); return isNaN(n) ? d : n; }

  /* ---------- the copy ---------- */
  var DROP = 'script, dialog, [popover], .s4-tooltip, .s4-menu, .s4-snackbar, .s4-fab[data-fixed], .lm-clip';
  /* floating chrome inside the content (a toolbar dock) keeps its place in the copy but isn't drawn: it is glass itself */
  var HIDE = '[data-lm-skip], .s4-toolbar-dock, .s4-toolbar';
  function copyOf(source) {
    var c = source.cloneNode(true);
    c.querySelectorAll(DROP).forEach(function (n) { n.remove(); });
    c.querySelectorAll(HIDE).forEach(function (n) { n.style.visibility = 'hidden'; });
    c.querySelectorAll('[id]').forEach(function (n) { n.removeAttribute('id'); });
    c.removeAttribute('id');
    c.querySelectorAll('[autofocus]').forEach(function (n) { n.removeAttribute('autofocus'); });
    /* form state and canvases are not part of a DOM copy */
    var a = source.querySelectorAll('input, textarea, select, canvas'), b = c.querySelectorAll('input, textarea, select, canvas');
    for (var i = 0; i < a.length && i < b.length; i++) {
      if (a[i].tagName === 'CANVAS') { try { b[i].width = a[i].width; b[i].height = a[i].height; b[i].getContext('2d').drawImage(a[i], 0, 0); } catch (e) {} }
      else if (a[i].type === 'checkbox' || a[i].type === 'radio') b[i].checked = a[i].checked;
      else b[i].value = a[i].value;
    }
    return c;
  }
  /* the copy must match the same CSS selectors and container queries as the original, so it sits inside empty shells that
     carry each ancestor's class and data attributes at the ancestor's real width */
  function shells(source, inner) {
    var top = inner, n = source.parentElement;
    while (n && n !== document.body && n !== document.documentElement) {
      var s = document.createElement('div');
      s.className = n.className;
      Array.prototype.forEach.call(n.attributes, function (at) { if (/^data-/.test(at.name)) s.setAttribute(at.name, at.value); });
      s.style.cssText = 'position:static;display:block;margin:0;padding:0;border:0;min-height:0;height:0;overflow:visible;background:none;box-shadow:none;transform:none;filter:none;backdrop-filter:none;width:' + n.getBoundingClientRect().width + 'px';
      s.appendChild(top); top = s; n = n.parentElement;
    }
    return top;
  }

  function Mirror(glass, opts) {
    this.glass = glass; this.opts = Object.assign({ edges: 'all', bend: 1 }, opts); this.source = opts.source;
    this.id = 'lm' + (++uid);
    var clip = this.clip = document.createElement('div'); clip.className = 'lm-clip'; clip.setAttribute('aria-hidden', 'true'); clip.inert = true;
    var pane = this.pane = document.createElement('div'); pane.className = 'lm-pane';
    var tint = this.tint = document.createElement('div'); tint.className = 'lm-tint';
    var core = this.core = document.createElement('div'); core.className = 'lm-core';
    clip.append(pane, tint, core);
    this.raf = 0; this.dirty = 0; this.sig = ''; this.frames = 0; this.slow = 0;
    var self = this;
    this.onScroll = function () { self.schedule(); };
    this.mo = new MutationObserver(function (list) {
      /* changes inside any mirror (this one's or another surface's copy) are not changes to the page */
      for (var i = 0; i < list.length; i++) { var t = list[i].target; t = t.nodeType === 1 ? t : t.parentElement; if (t && !t.closest('.lm-clip')) { self.dirty = 2; break; } }
      if (!self.dirty) return;
      self.schedule();
    });
    this.themeMo = new MutationObserver(function () { self.sig = ''; self.dirty = 2; self.schedule(); });
    /* the surface itself turning glass or solid (a top app bar gets data-scrolled once content is under it) */
    this.selfMo = new MutationObserver(function () { self.sig = ''; self.schedule(); });
    this.ro = window.ResizeObserver ? new ResizeObserver(function () { self.sig = ''; self.dirty = 2; self.schedule(); }) : null;
    this.start();
  }
  Mirror.prototype.start = function () {
    var g = this.glass;
    this.saved = { bg: g.style.backgroundColor, bf: g.style.backdropFilter, wbf: g.style.webkitBackdropFilter, iso: g.style.isolation, pos: g.style.position };
    if (getComputedStyle(g).position === 'static') g.style.position = 'relative';
    g.style.isolation = 'isolate';
    g.insertBefore(this.clip, g.firstChild);
    addEventListener('scroll', this.onScroll, { passive: true, capture: true });
    addEventListener('resize', this.onScroll);
    this.mo.observe(this.source, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'hidden', 'aria-current', 'aria-pressed', 'aria-checked', 'aria-selected', 'data-theme', 'src', 'style', 'value'] });
    this.themeMo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-contrast', 'data-glass', 'style', 'class'] });
    this.selfMo.observe(g, { attributes: true, attributeFilter: ['data-scrolled', 'data-glass', 'data-color', 'data-type'] });
    if (this.ro) { this.ro.observe(g); this.ro.observe(this.source); }
    this.dirty = 2; this.render();
  };
  Mirror.prototype.schedule = function () {
    var self = this; if (this.raf) return;
    this.raf = requestAnimationFrame(function () { self.raf = 0; self.render(); });
  };
  /* is glass on for this surface right now? (high contrast, reduced transparency and data-glass="off" make it solid) */
  Mirror.prototype.glassy = function () {
    var g = this.glass, prev = this.clip.style.display;
    g.classList.remove('lm-on');   /* read the system's own glass rule */
    var cs = getComputedStyle(g), bf = cs.backdropFilter || cs.webkitBackdropFilter || 'none';
    var out = { on: bf !== 'none', bg: cs.backgroundColor, shadow: cs.boxShadow, radius: cs.borderTopLeftRadius };
    if (this.live) g.classList.add('lm-on');
    this.clip.style.display = prev;
    return out;
  };
  Mirror.prototype.render = function () {
    var t0 = performance.now(), g = this.glass, gr = g.getBoundingClientRect();
    if (!gr.width || !gr.height || !this.source.isConnected) return;
    /* margin around the glass: room for the frost, and for the lens's own blurred edge (3 sigma) to fade before the pane ends */
    var o = this.opts, m = Math.ceil(Math.max(this.sd() * 2.5, o.bend > 0 ? 36 : 0)) + 4;
    var sig = [Math.round(gr.width), Math.round(gr.height), o.bend, o.edges, o.edge, o.frost, o.rimTint, document.documentElement.dataset.theme, document.documentElement.dataset.contrast, document.documentElement.dataset.glass].join('|');
    if (sig !== this.sig) {
      this.sig = sig;
      var st = this.glassy();
      this.live = st.on;
      g.classList.toggle('lm-on', st.on);   /* the surface's own blur and tint are off only while the mirror paints them */
      this.clip.style.display = st.on ? '' : 'none';
      if (st.on) {
        this.clip.style.borderRadius = st.radius;
        this.rim(num(st.radius, 0));
        this.buildFilter(gr.width, gr.height, m, num(st.radius, 0));
      }
    }
    if (!this.live) return;
    if (this.dirty) {
      this.dirty = 0;
      var copy = copyOf(this.source);
      /* the copy sits outside its siblings, so rules like "app bar + content" no longer match it: carry its own box over */
      var scs = getComputedStyle(this.source);
      copy.style.cssText += ';position:absolute;left:0;top:0;margin:0;box-sizing:border-box;padding:' + scs.padding + ';width:' + this.source.getBoundingClientRect().width + 'px';
      this.copy = copy;
      this.pane.replaceChildren(shells(this.source, copy));
    }
    var sr = this.source.getBoundingClientRect();
    this.pane.style.left = this.pane.style.top = -m + 'px';
    this.pane.style.width = (gr.width + 2 * m) + 'px'; this.pane.style.height = (gr.height + 2 * m) + 'px';
    /* a 2D translate, never translate3d or will-change: WebKit draws a composited layer outside its parent's SVG filter (iPhone check 2026-11-10) */
    this.copy.style.transform = 'translate(' + (sr.left - gr.left + m) + 'px,' + (sr.top - gr.top + m) + 'px)';
    /* smoothness while scrolling: consecutive frames more than ~1.5 frames apart count as dropped */
    var now = performance.now(), gap = now - (this.lastAt || 0); this.lastAt = now;
    if (gap < 150) { this.frames++; if (gap > 26) this.slow++; }
  };
  Mirror.prototype.buildFilter = function (w, h, m, r) {
    var g = this.glass, o = this.opts, dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    var sat = num(css(g, '--s4-glass-saturation-float'), 1.2), c = num(css(g, '--s4-glass-backdrop-contrast-float'), dark ? 1 : 0.74), b = num(css(g, '--s4-glass-backdrop-brightness-float'), dark ? 0.8 : 1.1);
    var map = o.bend > 0 ? lensPrims(w, h, m, o.bend, o.edges, o.edge) : null;
    var f = document.getElementById(this.id); if (f) f.remove();
    f = document.createElementNS(NS, 'filter'); f.id = this.id;
    ['x', 'y'].forEach(function (k) { f.setAttribute(k, 0); });
    f.setAttribute('width', Math.round(w + 2 * m)); f.setAttribute('height', Math.round(h + 2 * m));
    f.setAttribute('filterUnits', 'userSpaceOnUse'); f.setAttribute('primitiveUnits', 'userSpaceOnUse'); f.setAttribute('color-interpolation-filters', 'sRGB');
    var lin = 'type="linear" slope="' + (c * b) + '" intercept="' + ((0.5 - 0.5 * c) * b) + '"';
    f.innerHTML = '<feGaussianBlur in="SourceGraphic" stdDeviation="' + this.sd() + '" edgeMode="duplicate" result="b"/>' +
      (map ? map.prims +
             '<feDisplacementMap in="b" in2="map" scale="' + map.scale + '" xChannelSelector="R" yChannelSelector="G" result="d"/>' : '') +
      '<feColorMatrix in="' + (map ? 'd' : 'b') + '" type="saturate" values="' + sat + '" result="s"/>' +
      '<feComponentTransfer in="s"><feFuncR ' + lin + '/><feFuncG ' + lin + '/><feFuncB ' + lin + '/></feComponentTransfer>';
    host().appendChild(f);
    this.pane.style.filter = 'url(#' + this.id + ')';
  };
  /* frost uses the lab's scale (its "Frosted" 12 = a Gaussian of 7px), lighter than today's CSS blur(16px) so the bend reads */
  Mirror.prototype.sd = function () { var f = this.opts.frost != null ? this.opts.frost : 12; return f / 2 + 1; };
  /* clear rim: the outer band (where the glass bends, and where no text sits: it is the surface's padding) gets a lighter
     tint, the rest the full tint, so text keeps the AA guarantee and the bend shows in color. rimTint 1 = same everywhere. */
  Mirror.prototype.rim = function (r) {
    var o = this.opts, k = o.rimTint == null ? 1 : o.rimTint, band = 12, soft = 6, e = o.edges;
    /* plain rgba() colors worked out here (the full glass tint in the middle, a share of it on the rim) */
    var g = this.glass, base = css(g, '--s4-glass-tint-float') || css(document.documentElement, '--md-sys-color-surface-container'), full = num(css(g, '--_glass-tint'), 0.6);
    var rimA = full * Math.min(k, 1), coreA = rimA >= 1 ? 0 : 1 - (1 - full) / (1 - rimA);
    this.tint.style.background = rgba(base, rimA);
    var cc = rgba(base, coreA); this.core.style.background = cc; this.core.style.boxShadow = '0 0 ' + soft + 'px ' + soft / 2 + 'px ' + cc;
    this.core.style.display = k >= 1 ? 'none' : '';
    var ins = function (side) { return (e === 'all' || e === side ? band + soft : -soft * 3) + 'px'; };
    this.core.style.inset = [ins('top'), ins('right'), ins('bottom'), ins('left')].join(' ');
    this.core.style.borderRadius = e === 'all' ? Math.max(0, r - band) + 'px' : '0';
  };
  Mirror.prototype.set = function (o) { Object.assign(this.opts, o); this.sig = ''; this.schedule(); };
  Mirror.prototype.refresh = function () { this.sig = ''; this.dirty = 2; this.schedule(); };
  Mirror.prototype.detach = function () {
    removeEventListener('scroll', this.onScroll, { capture: true }); removeEventListener('resize', this.onScroll);
    this.mo.disconnect(); this.themeMo.disconnect(); this.selfMo.disconnect(); if (this.ro) this.ro.disconnect();
    this.clip.remove(); this.glass.classList.remove('lm-on');
    var g = this.glass, s = this.saved; g.style.isolation = s.iso; g.style.position = s.pos;
    var f = document.getElementById(this.id); if (f) f.remove();
    all = all.filter(function (x) { return x !== this; }, this);
  };

  /* base styles: while a mirror is on, the surface's own blur and tint are off (the mirror paints both) */
  var style = document.createElement('style');
  style.textContent =
    '.lm-on{-webkit-backdrop-filter:none!important;backdrop-filter:none!important;background-color:transparent!important}' +
    '.lm-clip{position:absolute!important;inset:0!important;grid-area:auto!important;margin:0!important;width:auto!important;height:auto!important;z-index:-1;overflow:hidden;pointer-events:none;border-radius:inherit;contain:paint}' +
    '.lm-pane{position:absolute;overflow:hidden;contain:strict}' +
    /* nothing inside the copy may get its own compositing layer, or WebKit paints it unfiltered */
    '.lm-pane *{will-change:auto!important;backface-visibility:visible!important}' +
    '.lm-clip{box-shadow:inherit!important}' +
    /* the tint and the frost line are the glass tokens themselves, so theme and contrast changes apply live */
    /* tint and core colors are set from JS (rim()): the full glass tint in the middle, a share of it on the rim */
    '.lm-tint{position:absolute;inset:0;border-radius:inherit;box-shadow:inherit}' +
    '.lm-core{position:absolute}';
  document.head.appendChild(style);

  return {
    /* for the lab's browser check: the lens primitives for a w x h box with a margin m all round */
    _lens: lensPrims,
    attach: function (glass, opts) { var m = new Mirror(glass, opts || {}); all.push(m); return m; },
    status: function () {
      var probe = document.createElement('div'); probe.style.filter = 'url(#x)';
      return { mirrors: all.length, live: all.filter(function (m) { return m.live; }).length, filterUrl: !!probe.style.filter,
        slowFrames: all.reduce(function (s, m) { return s + m.slow; }, 0), frames: all.reduce(function (s, m) { return s + m.frames; }, 0) };
    }
  };
})();
