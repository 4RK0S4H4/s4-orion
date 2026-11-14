# Date Picker

A date field opens a glass calendar instead of the browser's own picker (decision 0043). The markup stays native, so
forms, `min`, `max` and pages without scripts keep working.

```html
<div class="s4-text-field"><label for="due">Due Date</label><input id="due" type="date" min="2026-01-01" max="2027-12-31"></div>

<!-- a range: one picker fills both inputs -->
<div class="s4-text-field"><label for="from">Statement Period</label><input id="from" type="date" data-range-end="to"></div>
<input id="to" type="date" hidden>
```

| Attribute (on the input) | What |
|---|---|
| `value`, `min`, `max` | As on any date input (`yyyy-mm-dd`). Days outside the limits can't be chosen, by pointer or keyboard. |
| `data-disabled-dates="2026-11-26,2026-12-25"` | Single days that can't be chosen. |
| `data-range-end="id"` | Selects a range: the first choice is the start, the second the end (swapped if earlier); the end goes into the input with that id. |

Choosing a date sets the input's value, fires `input` and `change` on it and `s4-change { value }` on the field.
The header's month button switches to a month and year chooser; Clear empties the field, Today jumps to today.
Under 600 wide the calendar is a centered floating panel.

**Keyboard:** arrows move by day and week, Home and End to the ends of the week, Page Up and Page Down by month
(with Shift by year), Enter or Space chooses, Escape closes and returns to the field.

**Accessibility:** the field is a button that names the label and the chosen date; the calendar is a dialog with a
roving focus in the grid; today and the selected day are announced.

**Tokens:** `--s4-shape-menu`, `--md-sys-color-primary`, `--md-sys-color-secondary-container`, glass tokens.
