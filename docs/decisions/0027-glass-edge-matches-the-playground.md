# 0027: Glass edge matches the owner's playground numbers (accepted, 2026-11-12)

The owner's numbers from the first Glass Playground were: tint 75% (neutral), blur 8px, color boost 150%, sheen 0, **edge top 35,
sides 50% of top, bottom 25, width 1px**. Decision 0021 took the tint, blur and boost exactly but shipped the edge as
62 / 32 / 7% (light) and 13 / 6 / 2% (dark), which does not follow from those numbers. Applying the playground's own
formulas (light: top = 35 x 0.023 = 0.805, bottom = 25 x 0.0032 = 0.08; dark: top = 35 x 0.006 = 0.21, bottom = 25 x 0.002 = 0.05)
gives the real values:

| Edge | Light (was) | Light (now) | Dark (was) | Dark (now) |
|---|---|---|---|---|
| top | 0.62 | **0.805** | 0.13 | **0.21** |
| sides | 0.32 | **0.30** | 0.06 | **0.085** |
| bottom | 0.07 | **0.08** | 0.02 | **0.05** |

The playground drew the edge as a gradient ring whose sides fade from 50% of the top to about 40% of that, which inset shadows
cannot do (they hold one value per side, by design: they follow the corner radius, never scroll with content, need no markup).
The side line is the gradient's average (x 0.745 light, x 0.81 dark). Tint, blur, boost and contrast are untouched, so the glass
guarantee (check-glass) is unchanged. The Glass Playground page now uses the original units, so numbers sent from it round-trip, and
"Today" in the lab reproduces tokens.css exactly.
