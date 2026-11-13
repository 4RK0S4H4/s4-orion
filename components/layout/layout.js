/* Layout behaviour (canonical layouts).
   - [data-split-open] inside an .s4-split: activating it sets data-open on the split (under 840 the detail replaces the
     list). [data-split-back] clears it. Both fire s4-toggle { open } on the split.
   - Under 840 opening also adds a browser history entry, so the phone's Back gesture returns to the list.
   - S4.split.open(split, true|false) does the same from code (e.g. after a listbox s4-change). */
(function () {
  function narrow(split) {
    var app = split.closest('.s4-app');
    return (app ? app.clientWidth : window.innerWidth) < 840;
  }
  function set(split, on, fromHistory) {
    if (!split || split.hasAttribute('data-open') === !!on) return;
    split.toggleAttribute('data-open', !!on);
    if (narrow(split)) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      var pane = split.querySelector(on ? '.s4-split-pane + .s4-split-pane' : '.s4-split-pane');
      if (pane) {
        /* shared axis, like a view switch: in from the side you're heading, movement spatial, fade effects */
        var d = (parseFloat(S4.util.css('--s4-motion-pattern-shared-axis-distance')) || 30) * (on ? 1 : -1);
        pane.getAnimations().forEach(function (a) { a.cancel(); });
        S4.motion.animate(pane, [{ transform: 'translateX(' + d + 'px)' }, { transform: 'none' }], 'spatial', { fill: 'none' });
        S4.motion.animate(pane, [{ opacity: 0 }, { opacity: 1 }], 'effects', { fill: 'none' });
      }
      if (!fromHistory) {
        if (on) history.pushState({ s4split: true }, '');
        else if (history.state && history.state.s4split) { history.back(); }
      }
    }
    S4.util.emit(split, 's4-toggle', { open: !!on });
  }
  S4.split = { open: function (split, on) { set(split, on !== false); } };

  window.addEventListener('popstate', function () {
    document.querySelectorAll('.s4-split[data-open]').forEach(function (s) { if (narrow(s)) set(s, false, true); });
  });

  S4.register('layout', function (scope) {
    S4.util.all(scope, '.s4-split').forEach(function (split) {
      if (!S4.util.once(split, 'split')) return;
      split.addEventListener('click', function (e) {
        var t = e.target.closest('[data-split-open], [data-split-back]');
        if (!t || t.closest('.s4-split') !== split) return;
        set(split, t.hasAttribute('data-split-open'));
      });
    });
  });
})();
