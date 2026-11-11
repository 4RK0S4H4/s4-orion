# 0023: Filled and pills (accepted, 2026-11-11)

**Status:** accepted. The owner looked at the direction options and chose to keep what exists, minus what feels too quirky.

## Decisions

1. **Nothing is outlined.** Filter chips, outlined buttons, outlined cards and icon buttons, checkboxes, radios, text fields
   and the switch's off state are all filled now (resting = `surface-container-highest`, selected = inverse or tonal fill).
   The old `data-variant="outlined"` still works and draws a filled element. The only line allowed is the focus ring.
   An error text field is filled `error-container`.
2. **Small things are pills.** Chips, status, text fields (textareas get large corners), FAB, snackbar, tooltip and menu
   items are fully round; connected button groups are all pills (no squared joins); toggle buttons no longer morph squarer
   when selected; the pressed shape is a mild `large` corner.
3. **Checkboxes and radios are filled circles** (supersedes the Soft Square checkbox of 0009).
4. **The demo is a generic mobile app**, not a finance dashboard: Orion Showcase (Home, Controls, Forms, Settings) shows
   every element. No charts, no KPIs. It replaces Pocket Ledger.
5. **Quizzes show only the element** being decided, not the whole app. When the owner wants something changed, build a
   focused quiz of that element's options.

Glass (0021) and motion (0022) are unchanged. The nine design-review proposals are dropped; this replaces the direction quiz.
