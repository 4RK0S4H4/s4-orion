# 0026: Joined Capsule button groups, accurate glass lab (accepted, 2026-11-12)

1. **Button groups are the Joined Capsule** (owner's pick, E in the button group quiz): segments 2dp apart, fully round outer
   ends, small rounded joins (8; 12 for the large sizes), the selected segment a full pill filled with the inverse color,
   unselected segments `surface-container-highest`. No tray, nothing slides, so it never reads as tabs. Replaces the
   rounded tray of 0024 (that decision's other parts stand).
2. **Glass Playground accuracy.** The first version applied one set of edge numbers to both modes, but the real tokens
   are much fainter on dark (top 13%, sides 6%, bottom 2% against 62%, 32%, 7% on light), so "Today" looked wrong in dark.
   The sliders now set the light values; the dark preview scales each edge by the real dark-to-light token ratio, read from
   the tokens at load. Pressing "Today (0021)" reproduces tokens.css exactly in both previews (checked against the computed
   styles).
