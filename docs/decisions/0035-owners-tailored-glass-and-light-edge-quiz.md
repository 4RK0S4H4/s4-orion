# 0035: The owner's tailored glass set; light mode edge quiz (2026-11-13)

**Applied** (from the Glass Playground, the owner's set): glass tint 75%, floating button tint 75%, blur 8px, color boost 150%,
no backdrop dimming, **edge light color 100% toward white, edge top 20, sides 0, bottom 20, width 1px, edge glow 100** (glow
amount 2.0, reach 12px). In tokens: `--s4-glass-edge-top-alpha` and `-bottom-alpha` 0.46 light / 0.12 dark (20 in the playground's
units: x0.023 light, x0.006 dark), `-side-alpha` 0, `--s4-glass-edge-lift` 1.0, `--s4-glass-glow-amount` 2.0. The owner likes this
on dark.

**Open:** on light mode the edge contrast is poor, because a white rim and a white glow have nothing to stand out against on a
pale page. Four options are in [review-light-edge.html](../../explore/review-light-edge.html): A today, B a hairline dark outline
(what iOS draws in light mode), C a shaded rim (the surface's own color darkened), D an inward edge shade (the surface darkens
toward its edge, thin white rim top and bottom). Dark mode is unchanged in all four. Implement the pick in `glass.css` for light
mode only (tokens for the ink alpha or shade amount), then re-check the page checker and `check-glass`.
