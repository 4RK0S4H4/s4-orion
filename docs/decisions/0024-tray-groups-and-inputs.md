# 0024: Tray groups, squarer inputs, glass drop-downs (accepted, 2026-11-11)

**Status:** accepted, from the owner's feedback on the showcase. Refines 0023: most things a little rounded, buttons you
click rounded most, things you type into a little squarer.

1. **Corner rule.** Things you click are round (pills, or rounded segments). Things you type into (text fields, textareas,
   selects, search) are medium-rounded (12 for fields, 16 for search), never squared and never pills, so they read as
   input, not as buttons.
2. **Drop-downs use the glass menu.** A select keeps its native element (value, label, screen readers) but is invisible;
   a button in the field shows the choice and opens the standard glass menu with radio items (text-field.js).
3. **Group legends** sit at the top inside the box, not on its edge.
4. **Button groups are a tray.** One rounded-rectangle tray (`surface-container-high`) holds separate rounded segments;
   the selected segment is filled inverse. It reads as one group and differs from tabs (a pill tray with a sliding pill
   for switching views). Replaces the Notched look of 0011.
5. **Icon set:** the owner kept Solar Bold Duotone (Phosphor sets stay available through `S4.icon.use`).
