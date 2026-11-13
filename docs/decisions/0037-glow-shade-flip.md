# 0037: The edge glow flips to an edge shade at a lightness threshold

Date: 2026-11-13. Revises 0036 (continuous inversion).

Owner feedback: light and dark mode must be consistent; the switch between glow and shade should be conditional, not continuous, so mid grays still get something; and the light-mode shade was uniform all around while the dark-mode glow sat at the top and bottom.

Decision:
- A surface below OKLCH lightness `--s4-glass-glow-flip` (0.6) gets the white glow (`--s4-glass-glow-alpha` .24); at or above it, an ink edge shade (`--s4-glass-glow-shade-alpha` .28). A hard step, so no surface gets neither.
- Glow and shade share one geometry in both modes: top, bottom and sides are weighted by each side's edge alpha relative to the top's (sides 0 by default), so the shade is top/bottom-focused exactly like the glow. Strengths do not depend on the color mode.
- Removed `glow-amount` and `glow-shade-side-alpha`. Glow size stays 12px.
- Tiers: plain rim, color-mix tier (white glow only), relative-color tier (flip).
