# 0021: Glass from the playground (accepted, 2026-11-11)

**Status:** accepted. The owner keeps S4 Orion as built (M3 Expressive base, decisions 0001-0019) and takes only the glass
from the design drafts of 0020. Everything else in 0020 (solid tiles, a blue accent, new corner sizes, simpler fade motion,
quirk, the Projects demo) is **not adopted**.

## What changed

Values picked by the owner in the Glass Playground on the design canvas:
`tint 75% (neutral) · blur 8px · color boost 150% · sheen 0 · edge top light: top 35, sides 50% of top, bottom 25, width 1px`.

| Token | Before | Now |
|---|---|---|
| `--s4-glass-tint-opacity-float` | 0.6 | 0.75 (medium contrast 0.86) |
| `--s4-glass-blur-float` | 16px | 8px |
| `--s4-glass-saturation-float` | 1.2 | 1.5 |
| `--s4-glass-backdrop-contrast/brightness-float` | 0.74 / 1.1 (dark 1 / 0.8) | 1 / 1: no dimming needed |
| edge | `--s4-glass-highlight-*`: 0.5px white 28% all round | `--s4-glass-edge-*`: 1px, top light |

The tint still follows the surface role (`surface-container`), so a seeded app's glass keeps a hint of its seed.

## The edge

Drawn with three inset shadows so it follows the corner radius, never scrolls with the content of a scrolling menu or
dialog, works in Safari and needs no extra element: a faint line all round (`side`), a brighter line along the top (`top`)
and a faint return along the bottom (`bottom`). Light: white 30% all round, plus white 80.5% on top, dark 8% at the bottom.
Dark: white 8.5% all round, plus 21% on top, 5% at the bottom. (Corrected in [0027](0027-glass-edge-matches-the-playground.md): the first version shipped 62/32/7 and 13/6/2.) This approximates the playground's vertical gradient (the
sides in the playground fade from 50% to about 20% of the top; here they hold one faint value). Full-width bars and docked
surfaces draw one line on their content-facing edge (`--s4-glass-edge-line`). All zero where glass is solid.

## Contrast

`check-glass` with the new values: worst case 5.83:1 light, 5.54:1 dark over 97 schemes, with no backdrop dimming at all
(was 4.5:1 floor with dimming). The guarantee holds; lowering the tint below about 0.65 would need the dimming back.

Supersedes the edge parts of 0013 and 0016, and 0014's saturation. 0017 (no shadows) stands.
