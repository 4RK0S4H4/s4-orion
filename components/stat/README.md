# Stat

S4 addition. One number people check: revenue, steps, open tickets, balance. A label, a big emphasized number and an
optional change or note. The loudest thing on a dashboard should be the numbers, not the boxes around them.

```html
<section class="s4-pane" aria-label="Key Numbers">
  <div class="s4-stat-row">
    <div class="s4-stat">
      <span class="s4-stat-label">Revenue</span>
      <span class="s4-stat-value">$48.2K</span>
      <span class="s4-stat-meta"><span class="s4-status" data-tone="primary">+8%</span>vs. September</span>
    </div>
    <div class="s4-stat"><span class="s4-stat-label">Open Invoices</span><span class="s4-stat-value">14</span><span class="s4-stat-meta">3 overdue</span></div>
  </div>
</section>
```

| Part / attribute | Values | Default |
|---|---|---|
| `.s4-stat-label` | label-large, on-surface-variant, Title Case | — |
| `.s4-stat-value` | display-small, emphasized weight, tabular figures | — |
| `.s4-stat-meta` | body-small, on-surface-variant; holds a `.s4-status` for the change | — |
| `data-size="small"` | value on headline-small, for dense dashboards | — |
| `.s4-stat-row` | as many stats per row as fit, at least two on a phone; `--s4-stat-min` sets the column floor | 160 |

**Do**
- Put several stats in one pane with an `.s4-stat-row`, not one pane per number.
- Round to what people need ("$48.2K", "11 mo"); show the exact value in the detail.
- Show the change as a status with a word or a sign ("+12%"), never color alone.

**Don't**
- Don't use a stat for something people don't track over time; use a [description list](../description-list/).
- Don't put more than four or five stats in a row.

**Accessibility:** plain text in reading order (label, value, change). A pane holding stats gets an `aria-label`.

**Tokens:** `--md-sys-typescale-display-small-*`, `--md-sys-typescale-emphasized-display-small-weight`,
`--md-sys-typescale-label-large-*`, `--md-sys-typescale-body-small-*`, `--md-sys-color-on-surface(-variant)`.
