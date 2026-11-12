/* Banner: [data-dismiss] inside a .s4-banner fades it out, hides it and fires s4-close (bubbling). */
S4.register('banner', function (scope) {
  S4.util.all(scope, '.s4-banner [data-dismiss]').forEach(function (btn) {
    if (!S4.util.once(btn, 'bannerDismiss')) return;
    btn.addEventListener('click', function () {
      var b = btn.closest('.s4-banner');
      b.setAttribute('data-closing', '');
      var done = function () { b.hidden = true; b.removeAttribute('data-closing'); S4.util.emit(b, 's4-close', {}); };
      S4.motion.reduced() ? done() : setTimeout(done, 200);
    });
  });
});
