# Floating Panels

A short task without leaving the screen (decision 0043; these replace bottom and side sheets and keep their class
names). A panel is a glass surface that floats inside the window: inset from every edge, all four corners round, and it
pops in like a dialog. Nothing slides up the screen and nothing docks to an edge.

```html
<button class="s4-button" data-sheet="add-expense">Add Expense</button>
<dialog class="s4-bottom-sheet" id="add-expense" aria-labelledby="ae-h">
  <h2 class="s4-sheet-title" id="ae-h">Add Expense</h2>
  <div class="s4-sheet-content">…fields…</div>
  <div class="s4-sheet-actions"><button class="s4-button" data-variant="text" data-close="cancel">Cancel</button><button class="s4-button" data-close="save">Save</button></div>
</dialog>
<dialog class="s4-side-sheet" id="filters">
  <div class="s4-sheet-header"><h2 class="s4-sheet-title">Filters</h2><button class="s4-icon-button" data-close aria-label="Close"><span class="s4-icon" data-icon="close"></span></button></div>
  …
</dialog>
```

| Class / attribute | What |
|---|---|
| `.s4-bottom-sheet` | Floats at the bottom center (on a phone: the full width minus the inset, above the home indicator). |
| `.s4-side-sheet` | From 600 wide: floats at the end side, as tall as the window minus the inset. On a phone: same as the bottom panel. |
| `data-placement="center"` | Centers the panel like a dialog. |
| `data-persistent` | A click outside doesn't close it. |

Opening, closing, `[data-close]`, focus and events work exactly like the [dialog](../dialog/) (`S4.sheet.open/close`
are the same functions). Opening never focuses a text field; add `data-autofocus` to a control to ask for it.
`.s4-sheet-handle` in older markup draws nothing, and panels are not dragged.

**Do:** use a bottom panel for a quick add or a set of choices; a side panel for filters or details beside content on
wide screens. Always give it a Cancel or Close. **Don't:** put a panel on a dialog, or a second panel on a panel.

**Accessibility:** a native modal `<dialog>`: focus is trapped, Escape closes, focus returns to the opener. Give it
`aria-labelledby`.

**Tokens:** `--s4-shape-sheet`, `--s4-space-4` (inset), `--s4-scrim-opacity`, glass tokens.
