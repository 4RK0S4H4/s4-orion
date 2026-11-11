/* Phone review previews: the real demo app (demo/index.html) in 390px frames, restyled by a CSS string per option.
   The page has a top bar with a theme switcher and a view switcher; they drive every preview at once.
     S4Phones.preview({ css, view })  -> Element for S4Review.card({ preview })
     S4Phones.bar(el, { views: [{ id: 'overview', label: 'Overview' }, ...] })   fills the top bar controls
   Same-origin only (GitHub Pages or a local server), because the page injects the option's CSS into the frame. */
(function () {
  var frames = [], theme = 'light', view = 'overview', DEMO = '../demo/index.html';
  function apply(f) {
    var w, d;
    try { w = f.el.contentWindow; d = w.document; } catch (e) { return; }
    if (!d || !d.documentElement || !d.querySelector('.s4-nav-item')) return;
    d.documentElement.dataset.theme = theme;
    d.dispatchEvent(new w.CustomEvent('s4-theme'));
    if (!f.style) { f.style = d.createElement('style'); f.style.textContent = f.css || ''; d.head.appendChild(f.style); }
    var nav = d.querySelector('.s4-nav-item[data-view="' + (f.view || view) + '"]');
    if (nav && nav.getAttribute('aria-current') !== 'page') nav.click();
  }
  function preview(o) {
    var wrap = document.createElement('div'); wrap.className = 'ph-wrap';
    var el = document.createElement('iframe');
    el.className = 'ph-frame'; el.title = 'Phone preview'; el.src = DEMO; el.loading = 'lazy';
    var f = { el: el, css: o.css || '', view: o.view };
    frames.push(f);
    el.addEventListener('load', function () { setTimeout(function () { apply(f); }, 250); setTimeout(function () { apply(f); }, 900); });
    wrap.appendChild(el); return wrap;
  }
  function applyAll() { frames.forEach(apply); }
  function seg(label, id, items, onpick) {
    var c = document.createElement('div'); c.className = 'ctl';
    c.innerHTML = label + ' <div class="seg" id="' + id + '" role="group" aria-label="' + label + '"></div>';
    var box = c.querySelector('.seg');
    items.forEach(function (it, i) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = it.label; b.value = it.id; b.setAttribute('aria-pressed', i === 0);
      b.onclick = function () { box.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); onpick(it.id); };
      box.appendChild(b);
    });
    return c;
  }
  function bar(el, o) {
    el.appendChild(seg('Theme', 'theme', [{ id: 'light', label: 'Light' }, { id: 'dark', label: 'Dark' }], function (v) { theme = v; applyAll(); }));
    if (o && o.views) el.appendChild(seg('View', 'view', o.views, function (v) { view = v; applyAll(); }));
  }
  window.S4Phones = { preview: preview, bar: bar };
})();
