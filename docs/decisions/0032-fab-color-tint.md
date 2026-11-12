# 0032: Colored floating buttons stay at 90% tint (accepted, 2026-11-12)

The owner's FAB tint is 75% (0028). After the edge color change, the page checker flagged the FAB reference page: with a
non-default color (`data-color`), labels fell to 3.56:1 (dark) and 2.93:1 (light) over a pure black or white backdrop. So the
default FAB (primary-container) keeps 75%, and any FAB with a `data-color` uses `--s4-glass-tint-opacity-fab-color` (90%).
`check-glass.mjs` proves every monochrome FAB color at 3:1 or better (default 5.25 light / 7.93 dark; other colors 3.85 / 5.37).
With a seed, a few combinations still fall to about 2.5:1 in that extreme case (the opaque color pair itself is only 4.5:1 in
the worst schemes); a seeded app that wants more can raise either token.
