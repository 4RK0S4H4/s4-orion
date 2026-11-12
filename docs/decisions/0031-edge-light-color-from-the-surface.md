# 0031: The edge light takes its color from the surface; stronger glow (accepted, 2026-11-12)

1. **Edge color depends on the surface.** The edge was pure white (light mode) at 100% along the top, which looked wrong on
   darker glass such as a dark floating button. Now every glass surface computes `--_edge-hi` = its own color (the glass tint,
   or the floating button's own color, or a vibrant toolbar's container) moved toward white by `--s4-glass-edge-lift`
   (0.5), and `--_edge-lo` = its color moved toward black in light mode (white in dark) for the bottom return line. A pale
   glass gets a near-white line; a dark button gets a softer, lighter version of itself. Colors are made with `color-mix` (oklab),
   so no new browser features are needed.
2. **Tokens.** The three color tokens `--s4-glass-edge-top/-side/-bottom` became strengths: `--s4-glass-edge-top-alpha` (1 / 0.30),
   `-side-alpha` (0.19 / 0.06), `-bottom-alpha` (0.16 / 0.10), light / dark, plus `--s4-glass-edge-lift` (0.5),
   `--s4-glass-edge-bottom-lift` (0.55) and `--s4-glass-edge-bottom-target` (black light, white dark). `--s4-glass-edge-line` for
   full-width bars is unchanged.
3. **Stronger glow.** The glow multiplies each edge's alpha by `--s4-glass-glow-amount`, which can now exceed 1 (capped at fully
   opaque); the lab slider runs 0 to 2 (it ran 0 to 0.6) and the reach grew from 14px to 16px.
