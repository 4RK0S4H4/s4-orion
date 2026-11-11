/* Orion Showcase: app glue. Components are wired by orion.js; this file only adds the demo's small behaviors. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Home: the chips filter the list by tag (search is wired by orion.js via data-filter) */
  $('#note-filters').addEventListener('s4-change', function (e) {
    var chip = e.detail.chip || $('#note-filters [aria-pressed="true"]');
    var f = chip && chip.dataset.filterValue || 'all';
    $$('#note-list > li[data-tag]').forEach(function (li) { li.hidden = f !== 'all' && li.dataset.tag !== f; });
  });

  /* Snackbars, menus, dialogs */
  $('#snack-btn').addEventListener('click', function () { S4.snackbar({ text: 'Note archived', action: 'Undo', onAction: function () { S4.snackbar('Restored'); } }); });
  $('#notify-btn').addEventListener('click', function () { S4.snackbar({ text: '3 new mentions', action: 'View' }); });
  $('#more-menu').addEventListener('s4-select', function (e) { S4.snackbar(e.detail.item.textContent.trim() + ' selected'); });
  $('#account-menu').addEventListener('s4-select', function (e) { $('#account-value').textContent = e.detail.item.dataset.value; });
  $('#new-note').addEventListener('s4-close', function (e) { if (e.detail.value === 'save') S4.snackbar('Note saved'); });
  $('#confirm-delete').addEventListener('s4-close', function (e) { if (e.detail.value === 'delete') S4.snackbar('All notes deleted'); });
  $('#filters').addEventListener('s4-close', function (e) { if (e.detail.value === 'apply') S4.snackbar('Filters applied'); });

  /* Settings: icon set (S4.icon.use switches every icon; the choice is remembered) */
  var CREDITS = { solar: 'Solar icons by 480 Design (CC BY 4.0)', 'phosphor-duotone': 'Phosphor Icons (MIT)', 'phosphor-bold-duotone': 'Phosphor Icons (MIT)' };
  function showIconSet() {
    var id = S4.icon.use();
    $$('#icon-set [value]').forEach(function (b) { b.setAttribute('aria-pressed', b.value === id); });
    $('#icon-credit').textContent = CREDITS[id] || '';
  }
  $('#icon-set').addEventListener('s4-change', function (e) { S4.icon.use(e.detail.value, { save: 'orion-showcase-icons' }); showIconSet(); });
  showIconSet();

  /* Settings: theme controls (patterns.md) */
  $('#mode').addEventListener('s4-change', function (e) { S4.theme({ mode: e.detail.value }); });
  $('#contrast').addEventListener('s4-change', function (e) { S4.theme({ contrast: +e.detail.value }); });
  var t = S4.theme();
  $$('#mode [value]').forEach(function (b) { b.setAttribute('aria-pressed', b.value === t.mode); });
  $$('#contrast [value]').forEach(function (b) { b.setAttribute('aria-pressed', +b.value === t.contrast); });
})();
