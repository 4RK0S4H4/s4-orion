# Open issues

The owner's critiques, waiting to be worked on. Each has a reference image in `img/`; open the image before starting the
issue. When an issue is done, move it to "Done" with the commit and decision number.

Goal across all of them (owner, 2026-11-14): **look good on both desktop and mobile** (check at 390 and 1280, light and
dark, and ask for an iPhone look).

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

## Done

(none yet)
