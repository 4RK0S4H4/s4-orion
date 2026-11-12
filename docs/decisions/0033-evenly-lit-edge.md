# 0033: Top and bottom edges are lit equally (accepted, 2026-11-12)

The bottom return line was a dark shade of the surface in light mode. On pale glass that made the surface read as a raised
button (light top, dark bottom). The owner wants top and bottom equally lit.

- The bottom edge now uses the same light, surface-based color as the top (`--_edge-hi`), and the bottom glow does too.
- `--s4-glass-edge-bottom-alpha` defaults to the top's strength (1 light, 0.30 dark); the tokens `--s4-glass-edge-bottom-lift` and
  `--s4-glass-edge-bottom-target` (added in 0031) are removed.
- In the Glass Playground the bottom slider uses the same scale as the top (its default 50 equals the top's 50), and the glow
  never darkens anything now. Set bottom lower than top for an unevenly lit look if you want it.
