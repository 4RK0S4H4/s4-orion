# 0030: The edge glow follows the edge light (accepted, 2026-11-12)

The owner wanted the glow to correspond with the edge light: stronger bottom edge light, stronger bottom glow. Replaces the
all-round glow and top sheen tokens of 0028 (`--s4-glass-glow-all`, `-top`, `-top-size`) with two tokens:

- `--s4-glass-glow-amount` (0 = off, today): how much of each edge's light is carried inward.
- `--s4-glass-glow-size` (14px): how far inward it reaches.

Each side's glow is that side's own edge color (`--s4-glass-edge-top`, `-side`, `-bottom`) with its alpha scaled by the amount
(`color-mix`), drawn as an inset shadow with a negative spread so it hugs that edge and follows the corner radius. So the glow
inherits the edge's distribution automatically, is zero wherever the edge is zero (solid glass), and is fainter on dark where
the edge is. In light mode the bottom edge is a soft dark line, so its glow is a soft shade (depth); in dark mode it is light.
The Glass Playground has one Edge Glow slider (0 to 100 maps to amount 0 to 0.6) and two presets that show the effect
(Bottom Heavy Glow, Top Heavy Glow); its contrast pills include the glow.
