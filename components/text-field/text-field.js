/* Text field behaviour.
   - adds placeholder=" " (an empty placeholder) to text controls
   - selects get a chevron; clicking anywhere in the field focuses the control (and opens a select's picker)
   - textareas grow with their content
   - data-counter shows "length / maxlength" under the field
   - links the supporting text with aria-describedby; data-error="Message" sets aria-invalid on the control and shows
     the message in place of the helper text (removing data-error restores it). */
S4.register('text-field', function (scope) {
  var uid = 0;
  S4.util.all(scope, '.s4-text-field').forEach(function (f) {
    if (!S4.util.once(f, 'textField')) return;
    var c = f.querySelector(':scope > input, :scope > select, :scope > textarea');
    if (!c) return;
    var label = f.querySelector(':scope > label');
    var isSelect = c.tagName === 'SELECT', isArea = c.tagName === 'TEXTAREA';
    if (!isSelect && !c.hasAttribute('placeholder')) c.setAttribute('placeholder', ' ');

    /* select chevron */
    if (isSelect && !f.querySelector(':scope > select ~ .s4-icon, :scope > select ~ .s4-icon-button')) {
      var ch = document.createElement('span'); ch.className = 's4-icon s4-text-field-chevron'; ch.dataset.icon = 'chevron-down';
      c.after(ch); S4.icon.set(ch, 'chevron-down');
    }

    /* a select opens the glass menu instead of the browser's list */
    var trigger = null;
    if (isSelect && S4.menu) {
      var menu = document.createElement('div'); menu.className = 's4-menu'; menu.setAttribute('role', 'listbox'); menu.dataset.fieldMenu = '';
      menu.id = 's4-select-' + Math.random().toString(36).slice(2, 8);
      trigger = document.createElement('button'); trigger.type = 'button'; trigger.className = 's4-text-field-select';
      trigger.setAttribute('aria-haspopup', 'listbox'); trigger.setAttribute('aria-expanded', 'false');
      trigger.id = (c.id || menu.id) + '-button';
      if (label) { label.htmlFor = trigger.id; }
      c.setAttribute('data-s4-native', ''); c.tabIndex = -1; c.setAttribute('aria-hidden', 'true');
      c.before(trigger);
      var build = function () {
        menu.innerHTML = '';
        Array.prototype.forEach.call(c.options, function (o) {
          var b = document.createElement('button'); b.type = 'button'; b.className = 's4-menu-item'; b.setAttribute('role', 'menuitemradio');
          b.setAttribute('aria-checked', o.selected); b.dataset.value = o.value; b.textContent = o.textContent;
          if (o.disabled) b.disabled = true;
          menu.appendChild(b);
        });
        var sel = c.options[c.selectedIndex]; trigger.textContent = sel ? sel.textContent : '';
        trigger.setAttribute('aria-label', (label ? label.textContent + ': ' : '') + trigger.textContent);
      };
      build();
      document.body.appendChild(menu);
      S4.init && S4.init(menu);
      trigger.addEventListener('click', function () {
        if (c.disabled) return;
        menu.style.minWidth = f.querySelector(':scope > .s4-text-field-select').closest('.s4-text-field').getBoundingClientRect().width + 'px';
        menu.hasAttribute('data-open') || menu.matches(':popover-open') ? S4.menu.close(menu) : S4.menu.open(menu, trigger);
      });
      menu.addEventListener('s4-select', function (e) {
        c.value = e.detail.item.dataset.value; build();
        c.dispatchEvent(new Event('input', { bubbles: true })); c.dispatchEvent(new Event('change', { bubbles: true }));
        trigger.focus();
      });
      menu.addEventListener('s4-close', function () { trigger.setAttribute('aria-expanded', 'false'); });
      c.addEventListener('change', build);
    }

    /* the whole container is the hit area */
    f.addEventListener('click', function (e) {
      if (c.disabled || e.target === c || e.target === trigger || e.target.closest('button, a, .s4-text-field-supporting, .s4-text-field-counter')) return;
      if (trigger) { trigger.click(); return; }
      c.focus();
      if (isSelect && c.showPicker) { try { c.showPicker(); } catch (err) {} }
    });

    /* textarea auto height */
    if (isArea) {
      var grow = function () { c.style.height = 'auto'; c.style.height = c.scrollHeight + 'px'; };
      c.addEventListener('input', grow);
      requestAnimationFrame(grow);
    }

    /* supporting text + aria-describedby */
    var sup = f.querySelector(':scope > .s4-text-field-supporting');
    var describe = function (el) {
      if (!el.id) el.id = 's4-tf-' + (++uid) + '-' + Math.random().toString(36).slice(2, 6);
      var ids = (c.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
      if (ids.indexOf(el.id) < 0) { ids.push(el.id); c.setAttribute('aria-describedby', ids.join(' ')); }
    };
    if (sup) describe(sup);

    /* counter */
    if (f.hasAttribute('data-counter')) {
      var ct = document.createElement('span'); ct.className = 's4-text-field-counter'; ct.setAttribute('aria-hidden', 'true');
      f.appendChild(ct);
      var count = function () { var max = c.getAttribute('maxlength'); ct.textContent = c.value.length + (max ? ' / ' + max : ''); };
      c.addEventListener('input', count); count();
    }

    /* error message */
    var helper = sup ? sup.textContent : '';
    var syncError = function () {
      var msg = f.getAttribute('data-error');
      if (msg === null) {
        if (f.dataset.s4ErrorSet) { c.removeAttribute('aria-invalid'); delete f.dataset.s4ErrorSet; }
        if (sup && sup.textContent !== helper) sup.textContent = helper;
        return;
      }
      if (c.getAttribute('aria-invalid') !== 'true') { c.setAttribute('aria-invalid', 'true'); f.dataset.s4ErrorSet = '1'; }
      if (msg) {
        if (!sup) { sup = document.createElement('div'); sup.className = 's4-text-field-supporting'; f.appendChild(sup); describe(sup); }
        sup.textContent = msg;
      }
    };
    requestAnimationFrame(function () { requestAnimationFrame(function () { f.setAttribute('data-ready', ''); }); });
    new MutationObserver(syncError).observe(f, { attributes: true, attributeFilter: ['data-error'] });
    syncError();
  });
});
