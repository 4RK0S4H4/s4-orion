# 0038: Bars and the rail float

Date: 2026-11-13. Owner: "I want everything floating. The button dock should be floating, the top should be floating elements." Today's glass look is unchanged.

- Navigation bar: a floating glass pane, a full pill inset 8dp from the edges and the home indicator, with the sliding highlight inside (owner tried separate buttons and went back to the pane).
- Top app bar (owner, with an iOS screenshot): no bar behind it, separate floating glass buttons inset 8dp from the top and sides: a round leading button, a title pill and an actions pill. Medium and large bars keep their headline as plain text under the row; only the row floats.
- Navigation rail: a floating rounded glass panel.
- Content scrolls under and between all of them. `--s4-app-inset-bottom` includes the nav bar's gaps so FABs and snackbars clear it.
- The single-line edge for full-width bars (decision 0013) no longer applies to these; docked toolbars and side sheets keep it because they touch the screen edge.
- No token changes. Contrast: same glass tint, `check-glass` unaffected.
