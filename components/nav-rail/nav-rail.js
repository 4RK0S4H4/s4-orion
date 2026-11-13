/* Navigation rail behaviour.
   - Items: same as the nav bar. Activating one moves aria-current="page" to it and fires s4-change { item, index, value }
     on the rail (value = data-view, else href). preventDefault() on the click vetoes it.
   - [data-rail-toggle]: expands / collapses the rail (data-expanded), keeps aria-expanded in sync, swaps the button's
     aria-label between data-label-expand / data-label-collapse if given, and fires s4-toggle { expanded }.
     The labels crossfade in (effects spring) while the width grows (spatial spring, in CSS). */
S4.register('nav-rail', function (scope) {
  S4.util.all(scope, '.s4-nav-rail').forEach(function (rail) {
    if (!S4.util.once(rail, 'navrail')) return;
    var toggle = rail.querySelector('[data-rail-toggle]');
    S4.navPill(rail.querySelector('.s4-nav-rail-items'));

    function sync() {
      if (!toggle) return;
      var open = rail.hasAttribute('data-expanded');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      var label = open ? toggle.dataset.labelCollapse : toggle.dataset.labelExpand;
      if (label) toggle.setAttribute('aria-label', label);
    }

    /* data-expand="auto": expanded on large windows (1200 and up, M3 Expressive), collapsed below, until the person
       uses the toggle (their choice then sticks for the page's life) */
    var chosen = false;
    if (rail.dataset.expand === 'auto' && window.ResizeObserver) {
      var host = rail.closest('.s4-app') || document.documentElement;
      new ResizeObserver(function () {
        if (chosen) return;
        var wide = host.clientWidth >= (parseFloat(S4.util.css('--s4-breakpoint-large')) || 1200);
        if (wide !== rail.hasAttribute('data-expanded')) { rail.toggleAttribute('data-expanded', wide); sync(); }
      }).observe(host);
    }

    rail.addEventListener('click', function (e) {
      if (e.defaultPrevented) return;
      if (toggle && e.target.closest('[data-rail-toggle]') === toggle) {
        chosen = true;
        rail.toggleAttribute('data-expanded');
        sync();
        /* labels and FAB text change place: fade them in rather than letting them jump */
        rail.querySelectorAll('.s4-nav-label, .s4-nav-rail-header .s4-fab > :not(.s4-icon)').forEach(function (el) {
          S4.motion.animate(el, [{ opacity: 0 }, { opacity: 1 }], 'effects', { fill: 'none' });
        });
        S4.util.emit(rail, 's4-toggle', { expanded: rail.hasAttribute('data-expanded') });
        return;
      }
      var item = e.target.closest('.s4-nav-item');
      if (!item || !rail.contains(item) || item.matches(':disabled, [aria-disabled="true"]')) return;
      var current = item.getAttribute('aria-current');
      if (current && current !== 'false') return;
      var items = Array.prototype.slice.call(rail.querySelectorAll('.s4-nav-item'));
      items.forEach(function (x) { if (x !== item) x.removeAttribute('aria-current'); });
      item.setAttribute('aria-current', 'page');
      S4.util.emit(rail, 's4-change', { item: item, index: items.indexOf(item), value: item.dataset.view || item.getAttribute('href') });
    });
    sync();
  });
});
