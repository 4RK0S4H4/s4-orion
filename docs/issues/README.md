# Open issues

The owner's critiques, waiting to be worked on. Each has a reference image in `img/`; open the image before starting the
issue. When an issue is done, move it to "Done" with the commit and decision number.

Goal across all of them (owner, 2026-11-14): **look good on both desktop and mobile** (check at 390 and 1280, light and
dark, and ask for an iPhone look).

**Motion direction (owner, 2026-11-14):** the general animation theme should be **super subtle but liquidy**, with small
interesting moments (a shape that flows, an icon that bends into the next one) instead of plain fades and spins. Quick
enough to never be in the way, but never looking instant. This amends 0022 (simpler motion): keep its sturdiness rules
(transform and opacity, one transition per element, nothing cloned) unless the owner agrees otherwise; record as a new
decision and show options in a motion lab with the scrubber before building.

## Open (2026-11-14)

### 1. Rail collapse animation glitches
Collapsing the expanded navigation rail with its animation shows a visual bug (labels and pill during the width change).
Reproduce on `components/nav-rail/nav-rail.html` (press the menu button to expand, then collapse) with the scrubber.
![Rail collapsed and expanded](img/2026-11-14-rail-collapsed-expanded.png)

### 2. Duotone icons turn completely white when selected
Some duotone icons lose their two tones on a selected item (here Bills in the rail: the icon is a flat white shape).
Check every selected or pressed state that sets the icon color (nav bar, rail, chips, list, segments, menu).
![Selected rail icon all white](img/2026-11-14-rail-selected-icon-white.png)

### 3. Rail items on desktop: label beside the icon, hamburger menu button
On desktop the rail items should be normal rows with the label next to the icon (not stacked under it), like a standard
side navigation. The rail's menu button becomes a **hamburger** icon (today it's dots). Owner's exception to "Bold
Duotone only": in places like this a **Line Duotone** icon is fine. Also see the grey-disc FAB in the collapsed rail
(question 3 of the framework review). Needs a decision record (amends 0007 and the rail docs).
![Rail collapsed and expanded](img/2026-11-14-rail-collapsed-expanded.png)

### 4. Solid controls on glass look out of place
Where a transparent (glass) surface holds a solid, selectable thing (a toolbar's Save Draft button, the nav bar's
selected pill, icons and clear buttons in fields on glass), the solid fill looks pasted on. Make items on glass look
like they belong (revisit 0015 "items on glass keep their own color" with the owner; keep the contrast guarantee and
extend `check-glass` to whatever fill is chosen).
![Toolbar button on glass](img/2026-11-14-toolbar-button-on-glass.png)
![Field icons on glass](img/2026-11-14-field-icons-on-glass.png)

### 5. Duotone icon tones are too close together
In general the two tones of the duotone icons are too similar, which hurts contrast and readability. Raise the
difference between the base and the accent tone (check against the surfaces they sit on, light and dark).
![Selected rail icon all white](img/2026-11-14-rail-selected-icon-white.png)

### 6. Selected list rows touch the side edges but not the top
In lists (and similar places) the selected or hovered fill runs to the left and right edges of the container while
there is a gap at the top, which looks odd. Inset the selection evenly (padding or margin on all sides) so the fill
never touches only some edges.
![List selection edges](img/2026-11-14-list-selection-edges.png)

### 7. Liquid hover between list rows
Moving the pointer from one row to the next should feel liquid: the hover/selection shape flows to the next row and its
rounded corners morph as it goes (like the sliding nav pill, but softer). Subtle. Applies to lists and similar rows.
![List rows](img/2026-11-14-list-hover-liquid.png)

### 8. Switch hover looks bad; no hover halo
The switch's hover state looks wrong, and the owner doesn't like the round hover "shadow" (state-layer halo) around the
handle. Find a cleaner hover (for example a slight handle or track change) for switches, and check the other controls
that draw the same halo (checkbox, radio, slider handle).
![Switch hover](img/2026-11-14-switch-hover.png)

### 9. No glass on tables
The table (sticky header, scroll area) looks like it's trying to be glass; it looks bad. Tables are content and stay
solid: remove any glass or translucency from the table and its sticky header.
![Table](img/2026-11-14-table-no-glass.png)

### 10. Table row hover looks bad
Hovering a row draws a fill with odd rounded edges and a big halo around the row checkbox. Make the row hover clean
(and consistent with issue 6's even inset and issue 7's liquid hover).
![Table row hover](img/2026-11-14-table-row-hover.png)

### 11. Accordion: too fast, chevron should bend, not spin
Opening and closing feels too fast; it should be quick but never look instant. The chevron should **bend** into the
other direction, like bending a book backward (a flip around its horizontal axis), not rotate. The owner wants this
kind of interesting but subtle animation elsewhere too (see the motion direction above).
![Accordion](img/2026-11-14-accordion-motion.png)

### 12. Composer send button height looks bugged
In the chat composer the send button doesn't match the height of the message field next to it (it looks squashed and
misaligned). Align button and field heights in the composer (and anywhere an icon button sits beside a field).
![Composer](img/2026-11-14-composer-button-height.png)

### 13. Press-to-square only where it fits
The owner likes buttons morphing toward a square when pressed, **but not** when the button sits at the end of a rounded
container (like the send button in the composer), where a square looks bad against the container's curve or seems to
overlap it. There the button should keep a shape that follows the container (stay round or match the container's
corner). Confirm this reading with the owner before building.
![Pressed send button](img/2026-11-14-button-press-square-in-container.png)

### 14. Selects must open the glass menu
The Category select on the text field reference page opens the browser's native drop-down list. Selects are supposed to
open the glass menu (0024); find why this one doesn't (reference page script order, or a select case text-field.js
misses) and check every select in the gallery, templates and showcase.
![Native drop-down](img/2026-11-14-select-native-dropdown.png)

### 15. A real date picker
Date fields open the browser's native calendar. Build an Orion date picker with the details already done: month header
with a month/year switch, previous/next, weekday row, today marked, selected day filled, days outside the month muted,
Clear and Today actions, keyboard support (arrows, Page Up/Down, Home/End, Enter, Escape), on glass like the menu,
a phone layout (sheet or centered card), min/max and disabled dates, and a range option. Native `<input type="date">`
stays underneath for forms and as the fallback.
![Native date picker](img/2026-11-14-native-date-picker.png)

### 16. Error fields: the red is too intense
The error state fills the whole field with a strong red (error-container) that's too intense and clashes with other
colors. Go a different way: for example keep the normal field fill and mark the error with the label, helper text, a
small icon and a quieter accent, and soften the error tones generally. Show options in a lab.
![Error fields](img/2026-11-14-error-fields-red.png)

### 17. Selected chips must not change size
Filter chips grow when selected (the check slides in), which pushes the other chips around. Chips keep one size in every
state. **Draft first:** show the owner several ideas for how a selected chip looks without growing (fill change, icon
swap in a fixed slot, inverse fill, a glass state, etc.) in a review lab before building.
![Chips](img/2026-11-14-chips-expanding-check.png)

### 18. Checkbox marks are too big
The check and indeterminate marks inside checkboxes are far too big and stand out; the owner also isn't used to seeing
icon-like glyphs in checkboxes. Make the mark smaller and quieter (a thin check that fits the box, a short dash for
indeterminate). Show in the same lab as 17/19 if it's a visible change.
![Checkboxes and radios](img/2026-11-14-checkbox-radio.png)

### 19. Radio: liquid selection, no inner dot
Idea to explore: the selected radio's fill moves **liquidly** from one radio to the next when the choice changes (comes
in normally the first time; afterwards travels quickly behind the scenes from the old radio to the new one). Also, the
owner doesn't usually see a dot inside a selected radio: try a selected look without the inner circle. Explore in the
motion lab (see the motion direction).
![Checkboxes and radios](img/2026-11-14-checkbox-radio.png)

### 20. Slider must reach both ends
The owner likes the slider's general look, but at 0% and 100% it doesn't reach the end: a sliver of the inactive track
stays at the very end (or the active track looks less than full). At the ends the active (or inactive) track should run
all the way, with no leftover sliver.
![Slider at zero](img/2026-11-14-slider-at-zero.png)
![Slider at max](img/2026-11-14-slider-at-max.png)

### 21. No stop dot peeking out under the handle
With stops (`data-stops`), a sliver of a stop dot shows beside the handle. Hide any dot the handle covers or sits next
to. Together with issue 20 this makes the ends look doubly bad: fix both and check 0%, 100% and every stop.
![Stop dot under the handle](img/2026-11-14-slider-stop-dot-under-handle.png)

## Ideas (to explore later, not yet issues)

### A. Whatever you touch turns into glass
Owner's "crazy side idea" (2026-11-14), to spend real time on: anything you touch or that is active becomes glass. A
selected chip turns into glass (keeping its selected color, just on a different surface), a focused text field turns
into glass, with an animation between the two. Maybe glass has several states (resting, touched, selected) and this is
a middle phase between solid and full glass. Questions to explore: does it keep text contrast (extend check-glass to
tinted states)? Does it read on a solid content surface with nothing interesting behind it? Is it consistent with
"content is solid" (0004)? Try it in a lab on chips, fields, list rows and buttons before deciding anything.
![Chips](img/2026-11-14-chips-expanding-check.png)

## Done

(none yet)
