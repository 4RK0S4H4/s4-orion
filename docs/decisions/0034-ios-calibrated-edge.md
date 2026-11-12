# 0034: Glass edge calibrated to the iOS tab bar (accepted, 2026-11-12)

The owner's end goal: glass that looks like the iOS tab bar (a dark pill and a round search button over black), where the top
catches light, the light fades around the start of the curves, and the surface is not one flat tone. Measured from their
screenshot (luminance, base surface 31 of 255):

- **Rim:** a thin light line (about 85, +54 over the surface) along the **top and the bottom, equally**, 1 to 1.5 CSS px. Around a
  circle it falls off roughly as cos cubed from the top or bottom toward the sides (80 at the top, 61 at 30 degrees, 46 at 50
  degrees, 38 at 70 degrees, none at the sides). On the straight part it is uniform; it dims only on the end curves.
- **Glow:** the surface is about +13 lighter right inside the rim and relaxes to its normal tone over roughly 8 to 10 CSS px, again
  at the top and bottom and not at the sides.

Applied:

| Token | Light | Dark |
|---|---|---|
| `--s4-glass-edge-top-alpha` / `-bottom-alpha` | 1.0 | 0.55 |
| `--s4-glass-edge-side-alpha` | 0 | 0 |
| `--s4-glass-glow-amount` (follows the edge alphas) | 0.5 | 0.5 |
| `--s4-glass-glow-size` | 12px | 12px |

The rim is an inset shadow offset up or down by the edge width with a blur of the same size, so the crescent fades toward the
sides like the reference. Rendered at 3x in Chromium on black: rim 89 then 45 within 5px, glow +15 decaying over about 17px.

Also in this change:
- **Plain fallback.** The surface-colored rim and the glow use `color-mix` with `calc()` and `min()` percentages. They now sit
  in an `@supports` block; a browser that lacks them gets a plain white rim in the same strength (no glow) instead of an invalid
  `box-shadow` (which would silently fall back to the component's own drop shadow). This is a precaution for the owner's iPhone;
  WebKit could not be run in the build environment.
- **Light-mode lab.** The playground's app backdrop had a black hero card (primary is black in monochrome) that showed through
  the dialog as a dark slab. It is blue now.
- The lab's Today preset is this look; "Previous" is the earlier set (edge 50 / 25 / 50, no glow).
