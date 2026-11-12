# 0025: No sharp corners, glass FAB, eight more components (accepted, 2026-11-12)

**Status:** accepted, from the owner's feedback on the showcase.

1. **No sharp corners, including state layers.** The hover, focus and press layers copy their element's corners, so plain
   list rows were square (radius 0) and segmented rows had 4px inner corners; table rows drew a square band. Now list
   rows are `large` (16), segmented inner corners `medium` (12), outer group corners `large-increased` (20), table row
   layers have rounded ends and the table sort button is a pill. Square corners remain only where a surface touches the
   screen edge (docked toolbar, full-screen dialog, nav bar).
2. **Floating action buttons are glass,** tinted with their own color (primary-container by default, or the `data-color`
   they set) instead of the surface color. Tint is 90% (`--s4-glass-tint-opacity-fab`, new token) because the opaque FAB
   color pair itself is only 4.5:1 in the worst of the 97 schemes, so no translucency can keep 4.5:1; at 90% icon and label
   keep at least 3:1 (3.43 dark, 3.57 light worst case) over pure black or white, and far more over normal backdrops.
   `check-glass.mjs` now proves that for every seed and every FAB color. The glass values of 0021 are unchanged.
3. **Eight components added,** the ones a design language needs and Orion lacked: avatar (moved out of the list; sizes,
   status, group), accordion (native `<details>`), banner, skeleton, breadcrumbs, pagination, stepper, empty state.
   All filled, rounded, no outlines. 41 components now.
4. **Button groups:** a quiz of five rounded looks is open (`explore/review-button-group.html`); today's rounded tray stays
   until the owner picks.
5. **Glass Playground** is now a real page (`explore/glass-playground.html`) driving the real glass layer.
