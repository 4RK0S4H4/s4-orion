/* Date picker: upgrades every .s4-text-field > input[type="date"]. The native input stays in the DOM (form value, min, max,
   required, the no-JS fallback) but is hidden like text-field.js hides a select; a .s4-text-field-select button shows the
   formatted date and opens a glass calendar (popover="manual", placed with S4.position, opened with S4.transition.drop).
   - data-range-end="id" on the input: one picker fills this input (start) and the input with that id (end).
   - data-disabled-dates="2026-11-26,2026-12-25": days that can't be picked. min / max come from the native attributes.
   - data-placeholder="Select Date", data-week-start="0-6" (0 = Sunday; default: the locale's first day).
   Choosing sets input.value (yyyy-mm-dd), dispatches input and change on the native input(s) and fires
   s4-change { value, start, end } on the field. Keyboard follows the WAI-ARIA date picker dialog pattern.
   S4.datePicker.open(input) / .close(input) / .refresh(input). */
(function () {
  var S4 = window.S4;
  var PHONE = window.matchMedia ? matchMedia('(max-width: 599.98px)') : { matches: false };
  var uid = 0, open = [];

  /* ---------- dates are yyyy-mm-dd strings (they compare as text); Date objects only for arithmetic, at local noon ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function make(y, m, d) { var t = new Date(2000, 0, 1, 12); t.setFullYear(y, m, d); return t; }
  function toIso(t) { return ('000' + t.getFullYear()).slice(-4) + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate()); }
  function parse(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); if (!m || +m[1] < 1) return null;
    var t = make(+m[1], +m[2] - 1, +m[3]);
    return t.getMonth() === +m[2] - 1 && t.getDate() === +m[3] ? t : null;   /* rejects 2026-02-30 */
  }
  function valid(s) { return parse(s) ? s : ''; }
  function inYears(t) { return t.getFullYear() >= 1 && t.getFullYear() <= 9999; }
  function addDays(s, n) { var t = parse(s); t.setDate(t.getDate() + n); return inYears(t) ? toIso(t) : s; }
  function monthLength(y, m) { return make(y, m + 1, 0).getDate(); }
  /* same day in another month, or that month's last day (Jan 31 + 1 month = Feb 28 or 29) */
  function addMonths(s, n) {
    var t = parse(s), first = make(t.getFullYear(), t.getMonth() + n, 1);
    if (!inYears(first)) return s;
    return toIso(make(first.getFullYear(), first.getMonth(), Math.min(t.getDate(), monthLength(first.getFullYear(), first.getMonth()))));
  }
  function today() { return toIso(new Date()); }

  /* ---------- locale: names, first day of the week ---------- */
  var L = null;
  function locale() {
    if (L) return L;
    var fmt = function (o) { try { return new Intl.DateTimeFormat(undefined, o); } catch (e) { return new Intl.DateTimeFormat('en', o); } };
    L = {
      full: fmt({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      value: fmt({ year: 'numeric', month: 'short', day: 'numeric' }),
      short: fmt({ month: 'short', day: 'numeric' }),
      title: fmt({ month: 'long', year: 'numeric' }),
      year: fmt({ year: 'numeric' }),
      month: fmt({ month: 'short' }),
      monthLong: fmt({ month: 'long', year: 'numeric' }),
      weekday: fmt({ weekday: 'short' }),
      weekdayLong: fmt({ weekday: 'long' }),
      weekStart: 0
    };
    try {
      var loc = new Intl.Locale(L.value.resolvedOptions().locale);
      var info = loc.getWeekInfo ? loc.getWeekInfo() : loc.weekInfo;
      if (info && info.firstDay) L.weekStart = info.firstDay % 7;   /* 1 = Monday ... 7 = Sunday */
    } catch (e) {}
    return L;
  }

  function isOpen(p) { return !!p.popup && (p.popup.matches(':popover-open') || p.popup.hasAttribute('data-open')); }

  function setup(input) {
    var field = input.parentElement, label = field.querySelector(':scope > label'), F = locale();
    var endInput = input.dataset.rangeEnd ? document.getElementById(input.dataset.rangeEnd) : null;
    var range = !!endInput;
    var p = { input: input, field: field, popup: null, closing: false };
    input._s4datePicker = p;

    /* ---------- the field button ---------- */
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 's4-text-field-select s4-date-picker-field';
    btn.id = (input.id || 's4-date-' + (++uid)) + '-button';
    btn.setAttribute('aria-haspopup', 'dialog'); btn.setAttribute('aria-expanded', 'false');
    var text = document.createElement('span'); text.className = 's4-date-picker-value'; btn.appendChild(text);
    if (label) label.htmlFor = btn.id;
    input.setAttribute('data-s4-native', ''); input.tabIndex = -1; input.setAttribute('aria-hidden', 'true');
    /* anything that focuses the native input (text-field.js on a click in the box, an app's validation) lands on the button */
    input.focus = function (o) { btn.focus(o); };
    input.before(btn);
    if (!field.querySelector(':scope > input ~ .s4-icon, :scope > input ~ .s4-icon-button')) {
      var cal = document.createElement('span'); cal.className = 's4-icon s4-date-picker-icon';
      var inputs = field.querySelectorAll(':scope > input');   /* after the last input, so the field places it as a trailing icon */
      inputs[inputs.length - 1].after(cal); S4.icon.set(cal, 'calendar');
    }
    if (range) {
      endInput.setAttribute('data-s4-native', ''); endInput.tabIndex = -1; endInput.setAttribute('aria-hidden', 'true');
      S4.util.once(endInput, 'datePicker');
      /* an end input with a field of its own (the no-JS fallback) is folded into this one */
      if (endInput.parentElement !== field && endInput.parentElement.classList.contains('s4-text-field')) endInput.parentElement.hidden = true;
    }
    p.button = btn;

    var min = '', max = '', blockedDates = {};
    function limits() {
      min = valid(input.getAttribute('min')); max = valid(input.getAttribute('max'));
      if (min && max && min > max) { min = ''; max = ''; }
      blockedDates = {};
      (input.dataset.disabledDates || '').split(/[\s,]+/).forEach(function (d) { if (valid(d)) blockedDates[d] = 1; });
    }
    function outside(d) { return (min && d < min) || (max && d > max); }
    function blocked(d) { return outside(d) || blockedDates[d] === 1; }
    function clamp(d) { return min && d < min ? min : max && d > max ? max : d; }

    /* ---------- the value shown in the field ---------- */
    function show(d, f) { return (f || F.value).format(parse(d)); }
    function sync() {
      var a = valid(input.value), b = range ? valid(endInput.value) : '', out = '';
      if (range && a && b) out = (a.slice(0, 4) === b.slice(0, 4) ? show(a, F.short) : show(a)) + ' – ' + show(b);
      else if (range && (a || b)) out = a ? show(a) + ' –' : '– ' + show(b);
      else if (a) out = show(a);
      var hint = input.dataset.placeholder || (range ? 'Select Dates' : 'Select Date');
      text.textContent = out || hint;
      if (out) btn.removeAttribute('data-empty'); else btn.setAttribute('data-empty', '');
      btn.setAttribute('aria-label', (label ? label.textContent.trim() + ': ' : '') + (out || hint));
      btn.disabled = input.disabled;
      var sup = field.querySelector(':scope > .s4-text-field-supporting');
      if (sup) { if (!sup.id) sup.id = btn.id + '-supporting'; btn.setAttribute('aria-describedby', sup.id); }
    }
    function write(el, v) {
      if (el.value === v) return false;
      el.value = v;
      el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    }
    function commit(a, b) {
      var changed = write(input, a);
      if (range) changed = write(endInput, b) || changed;
      sync();
      if (changed) S4.util.emit(field, 's4-change', range ? { value: a, start: a, end: b } : { value: a });
    }

    /* ---------- state while open ---------- */
    var view = { y: 0, m: 0 }, focus = '', mode = 'days', start = '', end = '', preview = '';
    var popup, title, titleText, prev, next, grid, months, body, todayBtn, cells = [], monthBtns = [], anim = null;

    function el(tag, cls, attrs) {
      var n = document.createElement(tag); if (cls) n.className = cls;
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      if (tag === 'button') n.type = 'button';
      return n;
    }
    function iconButton(icon) {
      var b = el('button', 's4-icon-button'), i = el('span', 's4-icon');
      b.appendChild(i); S4.icon.set(i, icon); return b;
    }

    function build() {
      popup = p.popup = el('div', 's4-date-picker s4-glass', { popover: 'manual', role: 'dialog', 'aria-modal': 'true', 'aria-label': range ? 'Choose dates' : 'Choose date', 'data-view': 'days' });
      popup.id = btn.id.replace(/-button$/, '') + '-picker';
      btn.setAttribute('aria-controls', popup.id);

      var header = el('div', 's4-date-picker-header');
      title = el('button', 's4-date-picker-title', { 'aria-expanded': 'false' });
      titleText = el('span', '', { 'aria-live': 'polite' }); titleText.id = popup.id + '-title';
      var chev = el('span', 's4-icon'); title.appendChild(titleText); title.appendChild(chev); S4.icon.set(chev, 'chevron-down');
      prev = iconButton('chevron-left'); next = iconButton('chevron-right');
      header.appendChild(title); header.appendChild(prev); header.appendChild(next);

      body = el('div', 's4-date-picker-body');
      var days = el('div', 's4-date-picker-days');
      grid = el('div', 's4-date-picker-grid', { role: 'grid', 'aria-labelledby': titleText.id });
      var head = el('div', 's4-date-picker-row', { role: 'row' }), ws = +input.dataset.weekStart;
      p.weekStart = ws >= 0 && ws <= 6 && input.dataset.weekStart !== '' ? ws : F.weekStart;
      for (var w = 0; w < 7; w++) {
        var day = make(2023, 0, 1 + p.weekStart + w);   /* 2023-01-01 is a Sunday */
        var h = el('span', 's4-date-picker-weekday', { role: 'columnheader', 'aria-label': F.weekdayLong.format(day) });
        h.textContent = F.weekday.format(day).slice(0, 2);
        head.appendChild(h);
      }
      grid.appendChild(head);
      for (var r = 0; r < 6; r++) {
        var row = el('div', 's4-date-picker-row', { role: 'row' });
        for (var c = 0; c < 7; c++) {
          var cell = el('button', 's4-date-picker-day', { role: 'gridcell', tabindex: '-1' });
          cell.appendChild(el('span')); row.appendChild(cell); cells.push(cell);
        }
        grid.appendChild(row);
      }
      days.appendChild(grid);
      months = el('div', 's4-date-picker-months', { role: 'group' });
      for (var m = 0; m < 12; m++) {
        var mb = el('button', 's4-date-picker-month', { tabindex: '-1' });
        mb.textContent = F.month.format(make(2023, m, 1)); mb.dataset.month = m;
        months.appendChild(mb); monthBtns.push(mb);
      }
      body.appendChild(days); body.appendChild(months);

      var footer = el('div', 's4-date-picker-footer');
      var clear = el('button', 's4-button', { 'data-variant': 'text' }); clear.textContent = 'Clear';
      todayBtn = el('button', 's4-button', { 'data-variant': 'text' }); todayBtn.textContent = 'Today';
      footer.appendChild(clear); footer.appendChild(todayBtn);

      popup.appendChild(header); popup.appendChild(body); popup.appendChild(footer);
      document.body.appendChild(popup);

      /* ----- pointer ----- */
      title.addEventListener('click', function () { setMode(mode === 'days' ? 'months' : 'days', true); });
      prev.addEventListener('click', function () { step(-1); });
      next.addEventListener('click', function () { step(1); });
      grid.addEventListener('click', function (e) {
        var cell = e.target.closest('.s4-date-picker-day'); if (!cell || cell.getAttribute('aria-disabled') === 'true') return;
        pick(cell.dataset.date);
      });
      months.addEventListener('click', function (e) {
        var b = e.target.closest('.s4-date-picker-month'); if (!b || b.getAttribute('aria-disabled') === 'true') return;
        chooseMonth(+b.dataset.month);
      });
      clear.addEventListener('click', function () { commit('', ''); close(); });
      todayBtn.addEventListener('click', function () { if (todayBtn.getAttribute('aria-disabled') !== 'true') pick(today()); });
      /* while a range waits for its second day, the band follows the pointer or the focused day */
      var hint = function (e) {
        var cell = e.target.closest && e.target.closest('.s4-date-picker-day');
        if (!range || !start || end || !cell || preview === cell.dataset.date) return;
        preview = cell.getAttribute('aria-disabled') === 'true' ? '' : cell.dataset.date; mark();
      };
      grid.addEventListener('pointerover', hint); grid.addEventListener('focusin', hint);
      grid.addEventListener('pointerleave', function () { if (preview) { preview = ''; mark(); } });

      /* ----- keyboard ----- */
      grid.addEventListener('keydown', function (e) {
        var rtl = getComputedStyle(grid).direction === 'rtl' ? -1 : 1, to = null;
        var col = (parse(focus).getDay() - p.weekStart + 7) % 7;
        if (e.key === 'ArrowLeft') to = addDays(focus, -rtl);
        else if (e.key === 'ArrowRight') to = addDays(focus, rtl);
        else if (e.key === 'ArrowUp') to = addDays(focus, -7);
        else if (e.key === 'ArrowDown') to = addDays(focus, 7);
        else if (e.key === 'Home') to = addDays(focus, -col);
        else if (e.key === 'End') to = addDays(focus, 6 - col);
        else if (e.key === 'PageUp') to = addMonths(focus, e.shiftKey ? -12 : -1);
        else if (e.key === 'PageDown') to = addMonths(focus, e.shiftKey ? 12 : 1);
        else if (e.key === 'Enter' && e.repeat) { e.preventDefault(); return; }   /* a held Enter that opened the picker must not pick */
        if (to === null) return;
        e.preventDefault();
        moveTo(clamp(to), true);
      });
      months.addEventListener('keydown', function (e) {
        var i = monthBtns.indexOf(document.activeElement), rtl = getComputedStyle(months).direction === 'rtl' ? -1 : 1, to = null;
        if (i < 0) return;
        if (e.key === 'ArrowLeft') to = i - rtl; else if (e.key === 'ArrowRight') to = i + rtl;
        else if (e.key === 'ArrowUp') to = i - 3; else if (e.key === 'ArrowDown') to = i + 3;
        else if (e.key === 'Home') to = 0; else if (e.key === 'End') to = 11;
        else if (e.key === 'PageUp') { e.preventDefault(); step(-1); monthBtns[i].focus(); return; }
        else if (e.key === 'PageDown') { e.preventDefault(); step(1); monthBtns[i].focus(); return; }
        if (to === null) return;
        e.preventDefault();
        if (to >= 0 && to < 12) { monthBtns.forEach(function (b, k) { b.tabIndex = k === to ? 0 : -1; }); monthBtns[to].focus(); }
      });
      popup.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
        if (e.key !== 'Tab') return;
        /* Tab cycles inside the popup */
        var list = Array.prototype.filter.call(popup.querySelectorAll('button'), function (b) {
          return b.tabIndex >= 0 && !b.disabled && getComputedStyle(b).visibility !== 'hidden';
        });
        if (!list.length) return;
        var i = list.indexOf(document.activeElement);
        e.preventDefault();
        list[(i + (e.shiftKey ? -1 : 1) + list.length) % list.length].focus();
      });
    }

    /* ---------- drawing ---------- */
    function setDisabled(b, off) { if (off) b.setAttribute('aria-disabled', 'true'); else b.removeAttribute('aria-disabled'); }
    function render() {
      var first = make(view.y, view.m, 1), t = today();
      popup.setAttribute('data-view', mode);
      title.setAttribute('aria-expanded', String(mode === 'months'));
      titleText.textContent = (mode === 'months' ? F.year : F.title).format(first);
      title.setAttribute('aria-label', mode === 'months' ? 'Choose Day, ' + F.year.format(first) : 'Choose Month and Year, ' + F.title.format(first));
      prev.setAttribute('aria-label', mode === 'months' ? 'Previous Year' : 'Previous Month');
      next.setAttribute('aria-label', mode === 'months' ? 'Next Year' : 'Next Month');
      if (mode === 'months') {
        setDisabled(prev, view.y <= 1 || (min && toIso(make(view.y - 1, 11, 31)) < min));
        setDisabled(next, view.y >= 9999 || (max && toIso(make(view.y + 1, 0, 1)) > max));
      } else {
        setDisabled(prev, (view.y <= 1 && view.m === 0) || (min && toIso(make(view.y, view.m, 0)) < min));
        setDisabled(next, (view.y >= 9999 && view.m === 11) || (max && toIso(make(view.y, view.m + 1, 1)) > max));
      }
      setDisabled(todayBtn, blocked(t));

      var d = make(view.y, view.m, 1 - ((first.getDay() - p.weekStart + 7) % 7));
      cells.forEach(function (cell) {
        var s = toIso(d), usable = inYears(d);
        cell.dataset.date = s;
        cell.firstChild.textContent = d.getDate();
        cell.setAttribute('aria-label', F.full.format(d));
        if (d.getMonth() !== view.m) cell.setAttribute('data-outside', ''); else cell.removeAttribute('data-outside');
        if (s === t) cell.setAttribute('aria-current', 'date'); else cell.removeAttribute('aria-current');
        setDisabled(cell, !usable || blocked(s));
        cell.tabIndex = s === focus ? 0 : -1;
        d.setDate(d.getDate() + 1);
      });
      monthBtns.forEach(function (b, m) {
        b.setAttribute('aria-pressed', String(m === view.m));
        b.setAttribute('aria-label', F.monthLong.format(make(view.y, m, 1)));
        setDisabled(b, (min && toIso(make(view.y, m + 1, 0)) < min) || (max && toIso(make(view.y, m, 1)) > max));
        b.tabIndex = m === view.m ? 0 : -1;
      });
      mark();
    }
    /* selection and range band: attributes only, so it can follow the pointer cheaply */
    function mark() {
      var lo = start, hi = range ? (end || preview || start) : start;
      if (lo && hi && hi < lo) { var x = lo; lo = hi; hi = x; }
      cells.forEach(function (cell) {
        var s = cell.dataset.date, sel = !!lo && s >= lo && s <= hi;
        cell.setAttribute('aria-selected', String(sel));
        if (sel && lo !== hi) cell.setAttribute('data-range', s === lo ? 'start' : s === hi ? 'end' : 'in'); else cell.removeAttribute('data-range');
      });
    }
    function cellFor(d) { for (var i = 0; i < cells.length; i++) if (cells[i].dataset.date === d && !cells[i].hasAttribute('data-outside')) return cells[i]; return null; }
    /* the new month fades in with a small slide from the side it came from (opacity and transform only) */
    function slide(target, dir) {
      if (anim) { anim.cancel(); anim = null; }
      var dx = S4.motion.reduced() || !dir ? 0 : 8 * dir * (getComputedStyle(popup).direction === 'rtl' ? -1 : 1);
      var a = anim = S4.motion.animate(target, [{ opacity: 0, transform: 'translateX(' + dx + 'px)' }, { opacity: 1, transform: 'none' }], 'effects');
      a.finished.then(function () { a.cancel(); if (anim === a) anim = null; }, function () {});
    }
    function setView(y, m, dir) {
      var t = make(y, m, 1); if (!inYears(t)) return;
      var changed = t.getFullYear() !== view.y || t.getMonth() !== view.m;
      view.y = t.getFullYear(); view.m = t.getMonth();
      render();
      if (changed && dir !== undefined) slide(mode === 'months' ? months : grid, dir);
    }
    /* move the roving focus to a day, turning the page if it is in another month */
    function moveTo(d, focusIt) {
      var t = parse(d), dir = d > focus ? 1 : -1;
      focus = d;
      if (t.getFullYear() !== view.y || t.getMonth() !== view.m) setView(t.getFullYear(), t.getMonth(), dir); else render();
      var cell = cellFor(d); if (cell && focusIt) cell.focus({ preventScroll: true });
    }
    /* previous / next: a month in the day view, a year in the month chooser; the roving day follows the page */
    function step(n) {
      if ((n < 0 ? prev : next).getAttribute('aria-disabled') === 'true') return;
      focus = clamp(addMonths(focus, mode === 'months' ? n * 12 : n));
      var t = make(view.y, view.m + (mode === 'months' ? n * 12 : n), 1);
      var f = parse(focus);
      if (f.getFullYear() !== t.getFullYear() || f.getMonth() !== t.getMonth()) focus = clamp(toIso(t));
      setView(t.getFullYear(), t.getMonth(), n);
    }
    function setMode(m, focusIt) {
      mode = m; render(); slide(body, 0);
      if (!focusIt) return;
      if (m === 'months') monthBtns[view.m].focus({ preventScroll: true });
      else { var cell = cellFor(focus); (cell || title).focus({ preventScroll: true }); }
    }
    function chooseMonth(m) {
      var day = Math.min(parse(focus).getDate(), monthLength(view.y, m));
      focus = clamp(toIso(make(view.y, m, day)));
      var f = parse(focus); view.y = f.getFullYear(); view.m = f.getMonth();
      setMode('days', true);
    }

    /* ---------- choosing ---------- */
    function pick(d) {
      if (blocked(d)) return;
      if (!range) { commit(d, ''); close(); return; }
      if (!start || end) {            /* first day of a new range: nothing is written until the second */
        start = d; end = ''; preview = '';
        moveTo(d, true);
        return;
      }
      var a = start, b = d; if (b < a) { a = d; b = start; }
      commit(a, b); close();
    }

    /* ---------- open / close ---------- */
    var anchor = { getBoundingClientRect: function () {
      var f = field.getBoundingClientRect(), b = btn.getBoundingClientRect();   /* the box: as wide as the field, as tall as its control row */
      return { left: f.left, right: f.right, width: f.width, top: b.top, bottom: b.bottom, height: b.height };
    } };
    function place() {
      if (PHONE.matches) { popup.style.left = ''; popup.style.top = ''; return 'top'; }
      return S4.position(popup, anchor, { gap: 4 });
    }
    p.place = place;
    function show_() {
      if (input.disabled || (isOpen(p) && !p.closing)) return;
      if (!popup) build();
      open.slice().forEach(function (o) { if (o !== p) o.close(false); });
      p.closing = false;
      limits();
      start = valid(input.value); end = range ? valid(endInput.value) : ''; preview = '';
      if (range && !start) end = '';
      focus = clamp(start || today());
      var f = parse(focus); view.y = f.getFullYear(); view.m = f.getMonth(); mode = 'days';
      render();
      try { popup.showPopover(); } catch (e) { popup.setAttribute('data-open', ''); }
      p.from = place();
      if (open.indexOf(p) < 0) open.push(p);
      btn.setAttribute('aria-expanded', 'true');
      S4.transition.drop(popup, { from: p.from });
      var cell = cellFor(focus); (cell || title).focus({ preventScroll: true });
      S4.util.emit(popup, 's4-open', {});
    }
    function close(restoreFocus) {
      btn.setAttribute('aria-expanded', 'false');
      if (!isOpen(p) || p.closing) return;
      p.closing = true;
      var i = open.indexOf(p); if (i >= 0) open.splice(i, 1);
      S4.transition.drop(popup, { open: false, from: p.from }).then(function () {
        if (!p.closing) return;   /* reopened meanwhile */
        p.closing = false;
        try { popup.hidePopover(); } catch (e) {} popup.removeAttribute('data-open');
        popup.getAnimations().forEach(function (a) { a.cancel(); });
      });
      if (restoreFocus !== false) btn.focus({ preventScroll: true });
      S4.util.emit(popup, 's4-close', {});
    }
    p.open = show_; p.close = close; p.sync = sync;

    btn.addEventListener('click', function () { isOpen(p) && !p.closing ? close() : show_(); });
    btn.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); show_(); } });
    /* the rest of the box (its padding, the icon) opens it too */
    field.addEventListener('click', function (e) {
      if (e.target.closest('button, a, label, .s4-text-field-supporting, .s4-text-field-counter')) return;
      btn.click();
    });

    /* the native input is still the source of truth: follow changes made by the app, a form reset, or new limits */
    input.addEventListener('change', sync);
    if (range) endInput.addEventListener('change', sync);
    if (input.form) input.form.addEventListener('reset', function () { setTimeout(sync); });
    new MutationObserver(sync).observe(input, { attributes: true, attributeFilter: ['disabled', 'value', 'data-placeholder'] });
    limits(); sync();
  }

  S4.datePicker = {
    open: function (input) { if (input && input._s4datePicker) input._s4datePicker.open(); },
    close: function (input) { if (input && input._s4datePicker) input._s4datePicker.close(); },
    /* after setting input.value from code (which fires no event) */
    refresh: function (input) { if (input && input._s4datePicker) input._s4datePicker.sync(); }
  };

  S4.register('date-picker', function (scope) {
    var list = S4.util.all(scope, '.s4-text-field > input[type="date"]');
    /* range ends first, so an end input with a field of its own is never upgraded as a picker */
    list.forEach(function (input) {
      var end = input.dataset.rangeEnd && document.getElementById(input.dataset.rangeEnd);
      if (end && end !== input && !end._s4datePicker) end.dataset.s4datePickerEnd = '1';
    });
    list.forEach(function (input) {
      if (input.dataset.s4datePickerEnd || !S4.util.once(input, 'datePicker')) return;
      setup(input);
    });
  });

  /* a press outside closes it (no scrim); a press on its own field toggles through the field's click */
  document.addEventListener('pointerdown', function (e) {
    open.slice().forEach(function (p) {
      if (p.closing || p.popup.contains(e.target) || p.field.contains(e.target)) return;
      p.close(false);
    });
  }, true);
  var replace = function () { open.forEach(function (p) { if (!p.closing) p.from = p.place(); }); };
  window.addEventListener('resize', replace);
  window.addEventListener('scroll', replace, { capture: true, passive: true });
})();
