# 0029: The glass edge width follows the screen (accepted, 2026-11-12)

The 1px edge looks right on a retina or phone screen (it is 2 to 3 device pixels) but thin on a 1080p or 1440p monitor
(1 device pixel). The edge width is now multiplied by a scale chosen from the screen density and size:

| Screen | Multiplier | Edge width (base 1px) |
|---|---|---|
| Retina, phones (1.5 device pixels per CSS pixel or more) | 1 | 1px |
| Standard density (1080p, 1440p monitors) | `--s4-glass-edge-scale-standard` = 1.5 | 1.5px |
| Large standard density (display 2200px or wider at under 1.5 dppx) | `--s4-glass-edge-scale-large` = 2 | 2px |

Every glass shadow reads `calc(var(--s4-glass-edge-width) * var(--_edge-scale))`, so the base width token still sets the
look and the two scale tokens set how much it grows. Checked in Chromium at 390@3x, 1280@2x, 1280@1x and 2400@1x. The Glass
Playground exposes both multipliers and shows which one applies on the screen you are using.
