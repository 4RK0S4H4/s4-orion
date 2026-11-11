/* Phone review previews: the real demo app (demo/index.html) in 390px frames, restyled by a CSS string per option.
     S4Phones.strip([{ view: 'overview', theme: 'light' }, ...], css)  -> Element for S4Review.card({ preview })
   Same-origin only (GitHub Pages or a local server), because the page injects the option's CSS into each frame. */
(function () {
  function apply(f) {
    var w, d;
    try { w = f.el.contentWindow; d = w.document; } catch (e) { return; }
    if (!d || !d.documentElement || !d.querySelector('.s4-nav-item')) return;
    d.documentElement.dataset.theme = f.theme;
    d.dispatchEvent(new w.CustomEvent('s4-theme'));
    if (!f.style) { f.style = d.createElement('style'); f.style.textContent = f.css || ''; d.head.appendChild(f.style); }
    var nav = d.querySelector('.s4-nav-item[data-view="' + f.view + '"]');
    if (nav && nav.getAttribute('aria-current') !== 'page') nav.click();
  }
  function strip(screens, css) {
    var wrap = document.createElement('div'); wrap.className = 'ph-strip';
    screens.forEach(function (s) {
      var el = document.createElement('iframe');
      el.className = 'ph-frame'; el.title = s.view + ' (' + s.theme + ')'; el.src = '../demo/index.html'; el.loading = 'lazy';
      var f = { el: el, css: css || '', view: s.view, theme: s.theme };
      el.addEventListener('load', function () { setTimeout(function () { apply(f); }, 250); setTimeout(function () { apply(f); }, 900); });
      wrap.appendChild(el);
    });
    return wrap;
  }
  window.S4Phones = { strip: strip };
})();
