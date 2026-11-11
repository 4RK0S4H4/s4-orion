# 0022: Simpler motion (accepted, 2026-11-11)

**Status:** accepted. The owner asked to simplify the animations and make them less bug prone ("for sure"), while keeping
Orion an M3 Expressive theme. Replaces the container transform (0001, 0004), the menu emerge (0018) and the extra menu
styles; supersedes the QA notes about clip-path over glass in Safari.

## Why

`components/motion/motion.js` had grown to about 400 lines: the container transform cloned the source button, sampled
colors through a canvas, animated `clip-path` over glass (WebKit does not clip a backdrop blur with clip-path), and ran a
solid-then-glass dance to hide that. Menus had seven styles. Every owner iPhone report (choppy morph, symbols moving,
blur pop, stuck z-index, label flashes) came from this code.

## The rules now

1. Transitions only animate **transform and opacity**. Never clip-path, size, color or backdrop-filter.
2. **Nothing is cloned** and nothing is measured beyond the element itself.
3. **Glass is glass from the first frame.**
4. **One transition per element at a time**: a new one cancels the old and starts from what was showing, so fast taps
   never jump or leave something stuck (tested: five taps 40ms apart, open-close-reopen within 400ms).
5. M3 Expressive stays in the **springs**: movement opens on the spatial spring, fades on effects springs, closes are quick.
   Reduced motion: spatial springs take 0ms, fades remain.

## Patterns

| Surface | Pattern |
|---|---|
| Dialogs, phone bottom sheet (centered card) | **Pop**: rise 16px + fade in; close: 8px drop + fade, quick |
| Menus | **Drop**: 8px out of the button's side + fade |
| Bottom sheets from 600 wide, side sheets | **Slide** from their edge (unchanged) |
| Snackbars | **Rise** 10px + fade (unchanged) |
| Sibling views, tabs | **Shared axis** (unchanged; the outgoing move is now on fast-effects) |

API: `S4.transition.pop`, `drop`, `slide`, `rise`, `fade`, `sharedAxis`, `restore`. The old names `containerTransform` and
`unfold` still work (they run pop and drop); `data-motion` on menus and `S4.menuMotion` are ignored. `orion.js` went from
125 KB to 95 KB.

## Unchanged

Component-level M3 Expressive motion done in CSS: the button press shape morph, the sliding nav pill, switch handle, chip
check, progress indicators, FAB label fold.
