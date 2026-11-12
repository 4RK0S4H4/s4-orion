# 0028: Owner's latest glass numbers, edge glow and sheen (accepted, 2026-11-12)

From the Glass Playground, the owner's numbers: glass tint 75%, floating button tint 75%, blur 8px, color boost 150%, backdrop
contrast and brightness 100%, sheen 0, **edge top 50, sides 25% of top, bottom 50, width 1px**.

1. **Edge** (playground formulas, decision 0027): light top 1.0, sides 0.19, bottom 0.16; dark top 0.30, sides 0.06, bottom 0.10.
2. **Floating button tint 75%** (was 90%). The icon keeps 5.25:1 (light) and 7.93:1 (dark) in the default monochrome FAB over a
   pure black or white backdrop. The opaque color pair of some seeded FAB colors is only 4.5:1, so with a seed a few combinations
   fall to about 2.3:1 in that extreme case (worst: `#4b22c3` fidelity tertiary-container light 2.43; `#2273c3` fidelity
   secondary-container dark 2.28). `check-glass.mjs` now fails only if the default monochrome FAB drops below 3:1 and prints
   the worst seeded case. Raise `--s4-glass-tint-opacity-fab` if a seeded app needs more.
3. **Edge glow and top sheen (new, off by default).** The surface itself can be brighter toward its edges: `--s4-glass-glow-all`
   (white, alpha 0 today) with `--s4-glass-glow-size`, and `--s4-glass-glow-top` with `--s4-glass-glow-top-size` for a sheen near
   the top edge only. Both are inset box-shadows (they follow the corner radius, never scroll with content). Turn them on in
   the Glass Playground (Edge Glow, Top Sheen); the live contrast pills include the glow, since brightening the glass lowers
   light text on dark mode.

Superseded in part by [0030](0030-glow-follows-the-edge-light.md): the all-round glow and top sheen became one glow that follows the edge light.

Lab simplification (2026-11-12): one slider each for Edge Glow and Top Sheen (reach fixed at 14px and 18px in the lab; the
`-size` tokens stay for apps that want to change them), one Edge Width on Monitors slider (the large-screen multiplier is a
third more), and a plain-words description under every control.
