/* S4 Orion transition patterns, simplified (decision 0022; glass motion updated by 0042: glass moves plainly, ink may be
   liquid). Each only moves and fades:
     S4.transition.pop(surface, { open })                     dialogs, the phone sheet card: rise 16px and fade in on the spatial spring
     S4.transition.drop(menu, { open })                       menus (0042): the glass fades in where it sits, then its items
                                                              follow one after another, each rising 4px; closes with a quick fade
     S4.transition.slide(el, { open, edge })                  sheets from the edge they live on
     S4.transition.rise(el, { open })                         snackbars (0042): rise 14px into place on the rise spring and fade in
     S4.transition.tip(el, { open })                          tooltips (0042): rise 4px fast and fade in; leave faster
     S4.transition.sharedAxis(outView, inView, direction)     switching sibling views (tabs, destinations, steps)
     S4.transition.fade(el, open)                             anything else
   Rules that keep it simple and robust in every browser:
     - only transform and opacity ever animate (never clip-path, size, color or backdrop-filter), so glass is glass from the
       first frame and WebKit has nothing to get wrong;
     - nothing is cloned or measured beyond the element itself;
     - each element runs one transition at a time: a new one cancels the old and starts from where the old one was showing,
       so tapping fast never jumps or leaves something stuck;
     - under reduced motion the spatial springs take 0ms and only fades remain.
   Each returns a Promise that resolves (true when it finished, false when a newer transition replaced it).
   containerTransform() and unfold() are kept as the old names for pop() and drop(). */
(function () {
  var S4 = window.S4, M = S4.motion;

  /* end what an element is running and report what it shows right now, so the next transition starts from there */
  function begin(el) {
    var running = (el._s4anims || []).filter(function (a) { return a.playState === 'running'; });
    var now = null;
    if (running.length) { var cs = getComputedStyle(el); now = { opacity: cs.opacity, transform: cs.transform }; }
    (el._s4anims || []).forEach(function (a) { a.cancel(); });
    el._s4anims = [];
    return now;
  }
  function track(el, anim) { el._s4anims.push(anim); return anim; }
  function settle(el, anims, keep) {
    return Promise.all(anims.map(function (a) { return a.finished; })).then(function () {
      if (!keep) anims.forEach(function (a) { a.cancel(); });   /* opened: the element's own styles take over */
      return true;
    }, function () { return false; });
  }
  /* move + fade on two springs: movement on a spatial spring, opacity on an effects spring (never overshoots) */
  function moveFade(el, open, offTransform, springs) {
    var now = begin(el);
    var shown = { opacity: '1', transform: 'none' }, hidden = { opacity: '0', transform: offTransform };
    var start = now || (open ? hidden : shown), end = open ? shown : hidden;
    var t = track(el, M.animate(el, [{ transform: start.transform }, { transform: end.transform }], springs[0]));
    var o = track(el, M.animate(el, [{ opacity: start.opacity }, { opacity: end.opacity }], springs[1]));
    return settle(el, [t, o], !open);
  }

  /* ---------- pop: dialogs and the phone sheet card ---------- */
  function pop(el, opts) {
    var open = !opts || opts.open !== false, d = M.reduced() ? 0 : 16;
    return moveFade(el, open, 'translateY(' + (open ? d : d / 2) + 'px)', open ? ['spatial', 'effects'] : ['fast-effects', 'fast-effects']);
  }

  /* ---------- drop: menus (0042: not out of the button; the glass fades in place, the items follow) ---------- */
  function drop(el, opts) {
    opts = opts || {};
    var open = opts.open !== false, now = begin(el);
    var items = Array.prototype.slice.call(el.querySelectorAll(':scope > .s4-menu-item, :scope > .s4-menu-label, :scope > .s4-menu-divider, :scope > hr'));
    items.forEach(function (it) { it.getAnimations().forEach(function (a) { a.cancel(); }); });
    var o = track(el, M.animate(el, [{ opacity: now ? now.opacity : (open ? 0 : 1) }, { opacity: open ? 1 : 0 }], open ? 'slow-effects' : 'fast-effects'));
    var anims = [o];
    if (open && !now) {
      var d = M.reduced() ? 0 : 4;
      items.forEach(function (it, i) {
        anims.push(track(el, M.animate(it, [{ opacity: 0, transform: 'translateY(' + d + 'px)' }, { opacity: 1, transform: 'none' }], 'settle', { fill: 'backwards', delay: 30 + i * 25 })));
      });
    }
    return settle(el, anims, !open);
  }

  /* ---------- rise: snackbars (0042) ---------- */
  function rise(el, opts) {
    var open = !opts || opts.open !== false, d = M.reduced() ? 0 : (open ? 14 : 10);
    return moveFade(el, open, 'translateY(' + d + 'px)', open ? ['rise', 'effects'] : ['fast-effects', 'fast-effects']);
  }

  /* ---------- tip: tooltips (0042) ---------- */
  function tip(el, opts) {
    var open = !opts || opts.open !== false, d = M.reduced() ? 0 : 4;
    return moveFade(el, open, 'translateY(' + (opts && opts.from === 'bottom' ? -d : d) + 'px)', open ? ['tip', 'fast-effects'] : ['fast-effects', 'fast-effects']);
  }

  /* ---------- slide from edge: sheets ---------- */
  function slide(el, opts) {
    opts = opts || {};
    var edge = opts.edge || 'bottom', rtl = getComputedStyle(el).direction === 'rtl', open = opts.open !== false;
    var off = edge === 'bottom' ? 'translateY(calc(100% + ' + (opts.gap || '0px') + '))'
      : edge === 'end' ? 'translateX(' + (rtl ? '-' : '') + '100%)' : 'translateX(' + (rtl ? '' : '-') + '100%)';
    var now = begin(el);
    var a = track(el, M.animate(el, [{ transform: now ? now.transform : (open ? off : 'none') }, { transform: open ? 'none' : off }], open ? (opts.spring || 'slow-spatial') : 'spatial-calm'));
    return settle(el, [a], !open);
  }

  /* ---------- fade ---------- */
  function fade(el, open) {
    open = open !== false;
    var now = begin(el);
    var a = track(el, M.animate(el, [{ opacity: now ? now.opacity : (open ? 0 : 1) }, { opacity: open ? 1 : 0 }], open ? 'effects' : 'fast-effects'));
    return settle(el, [a], !open);
  }

  /* ---------- shared axis: switching sibling views ----------
     The old view slides 30px away and fades out, then the new one slides in from the side you're heading and fades in.
     onSwap (optional) runs at the moment of the swap. dir 1 = forward, -1 = back. state: kept per container so an
     interrupted switch is cancelled cleanly. */
  function sharedAxis(from, to, dir, state, onSwap) {
    state = state || {};
    (state.anims || []).forEach(function (a) { a.cancel(); });
    state.anims = [];
    var dist = M.reduced() ? 0 : (parseFloat(S4.util.css('--s4-motion-pattern-shared-axis-distance')) || 0);
    var d = dist * (dir < 0 ? -1 : 1) * (to && getComputedStyle(to).direction === 'rtl' ? -1 : 1);
    return new Promise(function (resolve) {
      var enter = function () {
        if (from && from !== to) from.hidden = true;
        if (onSwap) onSwap();
        if (!to) return resolve();
        to.hidden = false;
        var move = M.animate(to, [{ transform: 'translateX(' + d + 'px)' }, { transform: 'none' }], 'spatial');
        var show = M.animate(to, [{ opacity: 0 }, { opacity: 1 }], 'effects');
        state.anims = [move, show];
        Promise.all([move.finished, show.finished]).then(function () { move.cancel(); show.cancel(); resolve(); }, resolve);
      };
      if (!from || from.hidden || from === to) return enter();
      var out = M.animate(from, [{ transform: 'none' }, { transform: 'translateX(' + (-d) + 'px)' }], 'fast-effects');
      var hide = M.animate(from, [{ opacity: 1 }, { opacity: 0 }], 'fast-effects');
      state.anims = [out, hide];
      hide.finished.then(function () { out.cancel(); hide.cancel(); enter(); }, resolve);
    });
  }

  /* after a surface is hidden: drop any held end state so the next open starts clean */
  function restore(surface, source) {
    begin(surface);
    surface.style.visibility = '';
    if (source) source.style.visibility = '';
  }

  S4.transition = {
    pop: pop, drop: drop, rise: rise, tip: tip, slide: slide, fade: fade, sharedAxis: sharedAxis, restore: restore,
    /* old names, same behavior as the new patterns */
    containerTransform: function (surface, source, opts) { return pop(surface, opts); },
    unfold: drop
  };
})();
