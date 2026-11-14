/* Skeleton behaviour (decision 0042): one sheen wave across a loading region. Each .s4-skeleton gets --_sk-x (its left
   edge within the nearest [aria-busy="true"] region, or its parent) and --_sk-w (the region's width), so the sheens of
   all placeholders line up into a single sweep. Re-measured when the region resizes. */
S4.register('skeleton', function (scope) {
  var regions = [];
  S4.util.all(scope, '.s4-skeleton').forEach(function (sk) {
    var r = sk.closest('[aria-busy="true"]') || sk.parentElement;
    if (r && regions.indexOf(r) < 0) regions.push(r);
  });
  regions.forEach(function (r) {
    if (!S4.util.once(r, 'skeleton')) return;
    function measure() {
      var R = r.getBoundingClientRect();
      r.querySelectorAll('.s4-skeleton').forEach(function (sk) {
        sk.style.setProperty('--_sk-w', Math.max(1, R.width) + 'px');
        sk.style.setProperty('--_sk-x', (sk.getBoundingClientRect().left - R.left) + 'px');
      });
    }
    measure();
    if (window.ResizeObserver) new ResizeObserver(measure).observe(r);
  });
});
