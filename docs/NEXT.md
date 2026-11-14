# Where S4 Orion stands (resume here)

Read [`framework.md`](framework.md) for how the system fits together and [`decisions/README.md`](decisions/README.md)
for what applies today. The full log up to 2026-11-13 is in [`history/NEXT-2026-10-to-11-13.md`](history/NEXT-2026-10-to-11-13.md).

## Now (2026-11-13): framework layer built, waiting on the owner

The end-to-end [framework review](reviews/2026-11-13-framework-review.md) is done and its fixes are built
([0041](decisions/0041-framework-layer.md)): eight templates, canonical layouts and page widths, stat, description list,
prose, messages, theme controls by attribute, deep links, 15 icons, framework guide, decision index, rebuilt hub.

**Pause here** for the owner's answers to the six questions in the review (approve 0041; rail auto-expand everywhere;
the rail FAB; release 1.0.0; minified bundles and per-set icons; pruning for 2.0).

Also still waiting on the owner's iPhone checks: 0037 (glow/shade flip, Glass Playground) and 0040 (docked glass lit
edge only, showcase).

## Owner critiques (2026-11-14): 35 issues (one scrapped) and one idea

"Very close to a final product." The owner sent six critiques with screenshots, listed in
[`issues/README.md`](issues/README.md) (images in `issues/img/`): rail collapse animation bug, duotone icons white when
selected, rail labels beside icons + hamburger (Line Duotone allowed there), solid controls on glass, duotone tones too
close, selected list rows touching the side edges; then liquid row hover, switch hover without the halo, no glass on tables,
table row hover, accordion too fast with a bending chevron; composer button height, press-to-square only where it fits, selects
must open the glass menu, a real date picker, softer error fields; chips that don't grow (draft first), smaller checkbox marks, liquid radio
without an inner dot, slider reaching both ends, no stop dot under the handle. Then color: normal, contrast-safe
colors with accents only as accents (big one, new decision + lab), badges, banner on glass, skeleton wave, progress
(full at 100%, creative indeterminate, download demo); snackbars on glass, tooltips, rich tooltip corners, menu motion,
no autofocus in dialogs, field focus on glass, floating glass panels instead of sheets. **Motion lab published** (`explore/motion-liquid.html`, 8 questions: Today vs Subtle vs More Liquid,
plus the download demo); **pause for the owner's answers**, then record the motion decision (0042) and build. It
(confirms "liquid but subtle" before any motion issue is built). Idea A: whatever you touch turns into glass. Motion direction: super subtle but liquidy (amends 0022,
needs a motion lab first). Goal: looks good on desktop and mobile. Work them in that order after
(or alongside) the review answers; record new decisions as 0042 onward.

## Plan after the answers

1. Apply the answers (each a small commit; 0041 becomes accepted or is amended).
2. Release 1.0.0: CHANGELOG date, tag `v1.0.0`, re-package the skill, tell the owner to re-download it.
3. 1.1: minified `orion.min.css`/`orion.min.js`, icons split per set (load only the active one), size budget in CI.
4. Showcase: add a list-detail view and a stats pane so the demo uses the new layout and components.
5. Evals: run `skill/s4-orion/evals/` with the new skill (does Claude pick the right template?), add one eval per template.

## Backlog

- Filled toggle buttons (unselected = surface-container) look faint on surface-container-low in dark mode.
- Possible tokens: connected-group gap 2px, 18dp checkbox/chip check size, switch track 52, slider handle 44, stat-row min 160.
- Container queries use literal 600/840/1200px (var() isn't allowed in @container conditions).
- Untested in Safari/WebKit here: everything visual needs the owner's iPhone look.
- The labs in `explore/` load their own copies of m3color/Inter; could use `components/assets/`.
- Off-switch ring on glass; tables lab (the owner wanted tables explored in context).

## Session log

- 2026-11-14 (lab): Liquid Motion Lab published. Next: owner's answers, then decision 0042 and the motion issues.
- 2026-11-14: owner's 35 critiques, one idea and the liquid-motion direction recorded as issues with images (docs/issues). Next: work the issues.
- 2026-11-13 (framework): review + overhaul (0041), templates, layouts, content components, docs, hub. Next: owner's answers.
