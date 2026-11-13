# 0036: The edge glow inverts into an edge shade on light surfaces (accepted, 2026-11-13)

From the owner: dark surfaces keep the current edge glow; light surfaces get an inverted version, more like the edge shade of
option D in the light-edge quiz. Built as one rule, not a mode switch:

- The glow color is the surface's own color with its OKLCH lightness inverted and stretched (`l' = clamp(.03, .5 + (.5 - l) x 1.7, .99)`),
  so a dark surface gets a near-white glow and a light surface a near-black shade; a mid-tone surface gets almost nothing (its
  inverse is itself), which is right because it already has contrast on both sides.
- Its alpha blends from the glow strength (`edge alpha x --s4-glass-glow-amount`) on dark surfaces to the shade strength on light
  ones (`--s4-glass-glow-shade-alpha` 0.28 top and bottom, `--s4-glass-glow-shade-side-alpha` 0.28 sides) with a smooth ramp in
  lightness (dark below about 0.45, light above about 0.65).
- It is evaluated per surface, so a dark floating button on a light page gets the white glow while the pale glass around it
  gets the shade. The white rim along the top and bottom stays on every surface.
- Uses relative color syntax inside an `@supports`; browsers without it keep the previous white glow (tier 2), and without
  `color-mix` math the plain white rim (tier 1).
- Contrast: the shade is ink at 28% at the very edge. On light glass over a pure black backdrop (the worst case) dark text over
  that edge reads 4.7:1, and the glow and shade fade out within the 12px reach, inside component padding, so text is never
  drawn on the full-strength edge. `check-glass` is unchanged.
- The Glass Playground has one new slider, Edge Shade (light surfaces); 0 turns the shade off.
