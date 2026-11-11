# Motion

**Tokens:** `--md-sys-motion-spring-<name>` (a CSS `linear()` easing) with `-duration`, `-stiffness`, `-damping`; calm
variants `--s4-motion-spring-<name>-calm`; patterns `--s4-motion-pattern-*` · live:
[tokens page](https://4rk0s4h4.github.io/s4-orion/tokens/#motion) · decided in the
[Motion Lab](https://4rk0s4h4.github.io/s4-orion/explore/motion.html) and
[Transitions Lab](https://4rk0s4h4.github.io/s4-orion/explore/transitions.html)

## Springs
S4 Orion uses **M3 Expressive springs**. Each is stored as physics (stiffness, damping ratio, duration) and the build
samples it into a `linear()` easing, so `transition: transform var(--md-sys-motion-spring-spatial-duration) var(--md-sys-motion-spring-spatial)`
moves exactly like the spring.

| Spring | Use | Overshoot |
|---|---|---|
| fast-spatial | Small moves: switch handle, chip check, button press morph | ~9% |
| spatial | Default movement: nav indicator, menus, dialogs popping in, shared axis | ~1.5% |
| slow-spatial | Large movement: full-screen transforms, sheets from the edge | ~1.5% |
| fast-effects / effects / slow-effects | Fades and color changes | none |
| *-calm | Moves that must land exactly: a sheet sliding back out | none |

**Spatial** springs move and resize things. **Effects** springs fade and recolor; they never overshoot, so colors never
pass their target. Use **calm** springs when overshoot would look broken (shrinking into a button). Under reduced motion,
spatial durations become 0 and fades remain.

## Transition patterns
Simplified in decision 0022: every transition only moves (transform) and fades (opacity). Nothing animates clip-path,
size, color or blur, nothing is cloned, glass is glass from the first frame, and each element runs one transition at a time
(a new one starts from wherever the old one was), so fast taps never leave something stuck. The M3 Expressive character
stays in the springs: movement opens on the spatial spring (a hint of overshoot), fades never overshoot.

| Situation | Pattern | API |
|---|---|---|
| Dialogs, and the bottom sheet on a phone (a centered card) | **Pop**: rises 16px and fades in; closes with a quick 8px drop and fade | `[data-dialog]`, `[data-sheet]`, `S4.transition.pop(el, { open })` |
| Menus | **Drop**: comes 8px out of the button's side and fades in | `[data-menu]`, `S4.transition.drop(menu, { open, from })` |
| Bottom sheets on wider screens, side sheets | **Slide from edge**: from the edge where they live | `S4.transition.slide(el, { open, edge })` |
| Snackbars | **Rise**: 10px and a fade | built in, `S4.transition.rise(el, { open })` |
| Switching between sibling views: tabs, nav destinations, steps | **Shared axis**: old view slides 30px out and fades, new one slides in from the side you're heading | built in, `S4.transition.sharedAxis(from, to, dir)` |
| List row to detail | Open the detail as a dialog or sheet (pop), or as a sibling view (shared axis) | |

The container transform, the menu emerge and the other menu styles (decisions 0001, 0004, 0018) were removed in 0022:
they cloned elements, sampled colors and animated clip-path over glass, which was fragile in Safari. The old names
`S4.transition.containerTransform()` and `S4.transition.unfold()` still work and run pop and drop.

Never scale a surface's content to make it appear (S4 Material's Origin did; it stretches text and reads as goofy).
