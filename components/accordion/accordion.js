/* Accordion behaviour (decision 0042).
   A click on a summary opens or closes its section on the calm reveal spring: the body's height grows from 0 (or
   shrinks to 0) while its text fades in, rising 4px, just behind. Items that share a name="…" close the others.
   data-closing on the <details> while it closes keeps the chevron in step (it bends back at the start). Reduced motion:
   the height change is instant; the fade stays. Fires s4-toggle { open } on the item. */
S4.register('accordion', function (scope) {
  S4.util.all(scope, '.s4-accordion').forEach(function (acc) {
    if (!S4.util.once(acc, 'accordion')) return;
    /* the browser's own name="…" exclusivity would snap the other item shut with no motion: the script takes it over */
    acc.querySelectorAll('.s4-accordion-item[name]').forEach(function (d) { d.dataset.name = d.getAttribute('name'); d.removeAttribute('name'); });
    function body(d) { return d.querySelector(':scope > .s4-accordion-body'); }
    function stop(b) { b.getAnimations().forEach(function (a) { a.cancel(); }); b.style.height = ''; b.style.overflow = ''; }
    function open(d) {
      var b = body(d); if (!b) { d.open = true; return; }
      var from = d.hasAttribute('data-closing') ? b.getBoundingClientRect().height : 0;
      stop(b); d.removeAttribute('data-closing'); d.open = true;
      var to = b.scrollHeight; b.style.overflow = 'hidden';
      var a = S4.motion.animate(b, [{ height: from + 'px' }, { height: to + 'px' }], 'reveal', { fill: 'none' });
      a.onfinish = function () { b.style.overflow = ''; };
      if (!from) Array.prototype.forEach.call(b.children.length ? b.children : [b], function (c) {
        S4.motion.animate(c, [{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], 'settle', { fill: 'backwards', delay: 40 });
      });
      S4.util.emit(d, 's4-toggle', { open: true });
    }
    function close(d) {
      var b = body(d); if (!b) { d.open = false; return; }
      var from = b.getBoundingClientRect().height;
      stop(b); d.setAttribute('data-closing', ''); b.style.overflow = 'hidden';
      var a = S4.motion.animate(b, [{ height: from + 'px' }, { height: '0px' }], 'reveal', { fill: 'forwards' });
      a.onfinish = function () { if (!d.hasAttribute('data-closing')) return; d.open = false; d.removeAttribute('data-closing'); stop(b); };
      S4.util.emit(d, 's4-toggle', { open: false });
    }
    acc.addEventListener('click', function (e) {
      var sum = e.target.closest('summary'); if (!sum || !acc.contains(sum)) return;
      var d = sum.parentElement; if (!d.matches('.s4-accordion-item')) return;
      e.preventDefault();
      var opening = !d.open || d.hasAttribute('data-closing');
      if (opening) {
        var name = d.dataset.name;
        if (name) acc.querySelectorAll('.s4-accordion-item[open]').forEach(function (o) { if (o !== d && o.dataset.name === name && !o.hasAttribute('data-closing')) close(o); });
        open(d);
      } else close(d);
    });
  });
});
