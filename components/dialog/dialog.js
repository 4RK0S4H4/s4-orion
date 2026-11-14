/* Dialogs and sheets share the opening machinery here.
   - [data-dialog="id"] opens <dialog class="s4-dialog" id> modally with a container transform from the opener
     (decision 0001: the opener becomes the dialog). [data-close="value"] or Escape closes it, collapsing back into the opener.
   - S4.dialog.open(id | el, { from: element }) / S4.dialog.close(id | el, value). The dialog fires s4-open and s4-close
     { value } (value is "" for Escape or a click on the scrim).
   - Focus: the dialog itself, never a text field (decision 0043); [autofocus] / [data-autofocus] on a control opts in.
     Focus returns to the opener. Bottom and side sheets are floating panels and open the same way. */
(function () {
  var S4 = window.S4;
  var FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function el(x) { return typeof x === 'string' ? document.getElementById(x) : x; }
  /* Decision 0043: opening never focuses a text field (on a phone that pops the keyboard up over the dialog that just
     appeared). [autofocus] or [data-autofocus] is the app asking for it explicitly; otherwise the dialog itself takes
     focus, so Tab goes to its first control and Escape and screen readers work as usual. */
  function initialFocus(d) {
    var a = d.querySelector('[autofocus], [data-autofocus]');
    if (a) return a;
    if (!d.hasAttribute('tabindex')) d.setAttribute('tabindex', '-1');
    return d;
  }
  function narrow() { return window.matchMedia && window.matchMedia('(max-width: 599.98px)').matches; }
  function open(id, opts) {
    var d = el(id); if (!d || d.open) return;
    opts = opts || {};
    var from = opts.from || null;
    d._s4from = from; d.style.visibility = '';
    d.showModal();
    initialFocus(d).focus({ preventScroll: true });
    S4.transition.restore(d);
    d.animate([{ opacity: 0 }, { opacity: 1 }], { duration: S4.motion.spring('effects').duration, easing: S4.motion.spring('effects').easing, pseudoElement: '::backdrop' });
    var p = motion(d, true);
    S4.util.emit(d, 's4-open', { from: from });
    return p;
  }
  /* decision 0043: sheets are floating panels; like dialogs they pop in (rise or step in from their side, and fade) */
  function motion(d, open) {
    if (d.classList.contains('s4-side-sheet') && !narrow()) return S4.transition.pop(d, { open: open, axis: 'x' });
    return S4.transition.pop(d, { open: open });
  }
  function close(id, value) {
    var d = el(id); if (!d || !d.open || d._s4closing) return Promise.resolve();
    d._s4closing = true;
    var from = d._s4from;
    d.animate([{ opacity: 1 }, { opacity: 0 }], { duration: S4.motion.spring('fast-effects').duration, easing: S4.motion.spring('fast-effects').easing, pseudoElement: '::backdrop', fill: 'forwards' });
    var p = motion(d, false);
    return p.then(function () {
      d.close(value || '');
      S4.transition.restore(d);
      d.getAnimations({ subtree: true }).forEach(function (a) { a.cancel(); });
      d.style.transform = '';
      d._s4closing = false;
      if (from && from.isConnected) from.focus({ preventScroll: true });
      S4.util.emit(d, 's4-close', { value: value || '' });
    });
  }
  S4.dialog = { open: open, close: close };
  S4.sheet = { open: open, close: close };

  S4.register('dialog', function (scope) {
    S4.util.all(scope, '[data-dialog], [data-sheet]').forEach(function (opener) {
      if (!S4.util.once(opener, 'opener')) return;
      opener.setAttribute('aria-haspopup', 'dialog');
      opener.addEventListener('click', function (e) { e.preventDefault(); open(opener.dataset.dialog || opener.dataset.sheet, { from: opener }); });
    });
    S4.util.all(scope, 'dialog.s4-dialog, dialog.s4-bottom-sheet, dialog.s4-side-sheet').forEach(function (d) {
      if (!S4.util.once(d, 'dialog')) return;
      d.addEventListener('cancel', function (e) { e.preventDefault(); close(d, ''); });   /* Escape: animate out */
      d.addEventListener('click', function (e) {
        var c = e.target.closest('[data-close]');
        if (c && d.contains(c)) { e.preventDefault(); close(d, c.getAttribute('data-close')); return; }
        if (e.target === d) {   /* a click on the scrim (outside the box) dismisses, unless the dialog asks not to */
          var r = d.getBoundingClientRect();
          var outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
          if (outside && !d.hasAttribute('data-persistent')) close(d, '');
        }
      });
    });
  });
})();
