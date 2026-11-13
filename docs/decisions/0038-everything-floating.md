# 0038: Bars and the rail float

Date: 2026-11-13. Owner: "I want everything floating. The button dock should be floating, the top should be floating elements." Today's glass look is unchanged.

- Top app bar, navigation bar and navigation rail are floating glass surfaces: inset 8dp from the screen edges (and the home indicator / notch), rounded, with the full glass rim and glow. They are always glass, not only once content scrolls under them.
- Small top bar and the nav bar are full pills; medium and large top bars and the rail use the extra-large radius.
- Content scrolls under them. `--s4-app-inset-bottom` now includes the bar's gaps so FABs and snackbars still clear the nav bar.
- The single-line edge for full-width bars (decision 0013) no longer applies to these; docked toolbars and side sheets keep it because they still touch the screen edge.
- No token changes. Contrast: bars use the same glass tint, so `check-glass` is unaffected.
