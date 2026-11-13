# Description List

S4 addition. Labelled values on a detail screen: an order's date, total and status; a contact's email and phone.

```html
<dl class="s4-dl">
  <div class="s4-dl-row"><dt>Vendor</dt><dd>Iron Mountain</dd></div>
  <div class="s4-dl-row"><dt>Amount</dt><dd>$1,240.00</dd></div>
  <div class="s4-dl-row"><dt>Status</dt><dd><span class="s4-status" data-tone="error">Overdue</span></dd></div>
</dl>
<dl class="s4-dl" data-layout="stacked">…</dl>
```

| Part / attribute | Values | Default |
|---|---|---|
| `.s4-dl-row` | one label and its value, at least 48 tall, a divider between rows | — |
| `dt` | body-medium, on-surface-variant, Title Case | — |
| `dd` | body-large, end-aligned, tabular figures; may hold a status, link or icon button | — |
| `data-layout="stacked"` | label above value (long values, narrow panes) | side by side, wraps when tight |

**Do**
- Put it in a [pane](../pane/) or the detail pane of a [list-detail layout](../layout/).
- Keep labels short ("Due Date", not "The date this bill is due").

**Don't**
- Don't use it for things people compare across many items; that's a [table](../table/).
- Don't make rows clickable; use a [list](../list/) for things that open.

**Accessibility:** a real `<dl>`; the `div` wrappers are allowed by HTML. Forced colors draw the dividers.

**Tokens:** `--md-sys-color-outline-variant`, `--md-sys-typescale-body-medium-*`, `--md-sys-typescale-body-large-*`,
`--s4-size-touch-target`, `--s4-size-divider`.
