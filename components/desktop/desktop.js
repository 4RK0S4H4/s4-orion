/* Desktop behaviour (decision 0043).
   - <html data-platform="mac|windows|linux|ios|android"> is set once (unless the page set it), so CSS and apps can adapt.
   - data-shortcut="mod+k" on any button or link: that key combination clicks it, anywhere in the window. "mod" is ⌘ on
     Apple platforms and Ctrl elsewhere; also shift, alt, and one key (a letter, digit, enter, escape, /, comma, …).
     Shortcuts don't fire while typing in a field unless they use mod. An empty <kbd class="s4-kbd"> inside the element
     (or one with data-for="element-id" anywhere) is filled with the shortcut written the platform's way (⌘K, Ctrl+K).
   - data-context-menu="menu-id" on any element: right-click (or a long press on touch) opens that .s4-menu at the
     pointer instead of the browser's menu. The menu gets .contextTarget (the element) and fires s4-context { target }
     before it opens; choosing an item fires the menu's usual s4-select.
   - [data-window-action="minimize|maximize|close"] fires s4-window { action } on the document: wire it to the shell
     (Electron ipc, Tauri window API). Orion never talks to a shell itself.
   S4.desktop.platform, S4.desktop.format('mod+k'). */
(function () {
  var S4 = window.S4, root = document.documentElement;
  var ua = navigator.userAgent || '', plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  var platform = /iPhone|iPad|iPod/.test(ua) || (/Mac/.test(plat) && navigator.maxTouchPoints > 1) ? 'ios'
    : /Android/.test(ua) ? 'android' : /Mac/i.test(plat) ? 'mac' : /Win/i.test(plat) ? 'windows' : 'linux';
  if (!root.dataset.platform) root.dataset.platform = platform; else platform = root.dataset.platform;
  var apple = platform === 'mac' || platform === 'ios';

  function parse(s) {
    var p = String(s).toLowerCase().split('+').map(function (x) { return x.trim(); });
    return { mod: p.indexOf('mod') >= 0, shift: p.indexOf('shift') >= 0, alt: p.indexOf('alt') >= 0, key: p[p.length - 1] };
  }
  var NAMES = { enter: '↵', escape: 'Esc', backspace: '⌫', delete: 'Del', arrowup: '↑', arrowdown: '↓', arrowleft: '←', arrowright: '→', comma: ',', space: 'Space' };
  function format(s) {
    var c = parse(s), key = NAMES[c.key] || (c.key.length === 1 ? c.key.toUpperCase() : c.key.charAt(0).toUpperCase() + c.key.slice(1));
    if (apple) return (c.alt ? '⌥' : '') + (c.shift ? '⇧' : '') + (c.mod ? '⌘' : '') + key;
    return (c.mod ? 'Ctrl+' : '') + (c.alt ? 'Alt+' : '') + (c.shift ? 'Shift+' : '') + key;
  }
  S4.desktop = { platform: platform, format: format };

  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.repeat) return;
    var typing = e.target && e.target.matches && e.target.matches('input, textarea, select, [contenteditable=""], [contenteditable="true"]');
    var mod = apple ? e.metaKey : e.ctrlKey, key = (e.key || '').toLowerCase();
    if (key === ',') key = 'comma'; if (key === ' ') key = 'space';
    var els = document.querySelectorAll('[data-shortcut]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], c = parse(el.dataset.shortcut);
      if (c.key !== key || c.mod !== mod || c.shift !== e.shiftKey || c.alt !== e.altKey) continue;
      if (typing && !c.mod && key !== 'escape') continue;
      if (el.matches(':disabled, [aria-disabled="true"]') || !el.getClientRects().length && !el.closest('.s4-menu')) continue;
      e.preventDefault(); el.click(); return;
    }
  });

  function openContext(host, x, y) {
    var menu = document.getElementById(host.dataset.contextMenu);
    if (!menu || !S4.menu) return false;
    var point = { getBoundingClientRect: function () { return { left: x, right: x, top: y, bottom: y, width: 0, height: 0 }; },
      setAttribute: function () {}, focus: function () { if (host.focus) host.focus({ preventScroll: true }); }, contains: function () { return false; } };
    menu.contextTarget = host;
    S4.util.emit(menu, 's4-context', { target: host, x: x, y: y });
    S4.menu.close(menu, false);
    requestAnimationFrame(function () { S4.menu.open(menu, point); });
    return true;
  }
  document.addEventListener('contextmenu', function (e) {
    var host = e.target.closest && e.target.closest('[data-context-menu]');
    if (host && openContext(host, e.clientX, e.clientY)) e.preventDefault();
  });
  /* touch: a long press opens the same menu */
  var press = null;
  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'touch') return;
    var host = e.target.closest && e.target.closest('[data-context-menu]'); if (!host) return;
    var x = e.clientX, y = e.clientY;
    press = { x: x, y: y, t: setTimeout(function () { press = null; openContext(host, x, y); }, 500) };
  }, { passive: true });
  ['pointerup', 'pointercancel', 'pointermove', 'scroll'].forEach(function (t) {
    document.addEventListener(t, function (e) {
      if (!press) return;
      if (t === 'pointermove' && Math.abs(e.clientX - press.x) + Math.abs(e.clientY - press.y) < 10) return;
      clearTimeout(press.t); press = null;
    }, { passive: true, capture: true });
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-window-action]');
    if (b) S4.util.emit(document, 's4-window', { action: b.dataset.windowAction });
  });

  S4.register('desktop', function (scope) {
    S4.util.all(scope, '.s4-kbd').forEach(function (k) {
      if (k.textContent.trim()) return;
      var host = k.dataset.for ? document.getElementById(k.dataset.for) : k.closest('[data-shortcut]');
      if (host && host.dataset.shortcut) k.textContent = format(host.dataset.shortcut);
    });
  });
})();
