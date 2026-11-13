# Glass

**Tokens:** `--s4-glass-*` · **CSS:** `components/glass/glass.css` · decided in the
[Glass Lab](https://4rk0s4h4.github.io/s4-orion/explore/glass.html) ([decision 0004](../decisions/0004-glass.md))

S4 Orion is Material 3 Expressive with one personal layer: very clear, Liquid Glass-inspired glass on the things that float
above content. Content itself is always solid.

## The rules

1. **Only on floating chrome and overlays.** The top app bar *once content scrolls under it*, the nav bar, a modal nav rail,
   toolbars, menus, dialogs, bottom and side sheets, rich tooltips. Never cards, panes, lists, fields, tables, body text or
   anything people read for long. If it scrolls with the page, it isn't glass.
2. **Two layers at most.** A menu over an app bar is fine; a menu inside a sheet over an app bar is not. CSS makes a third
   nested glass surface solid; for overlays that stack visually but not in the DOM, design so it doesn't happen.
3. **Text on glass is `on-surface`.** Glass surfaces redefine `on-surface-variant` as `on-surface`. Don't put colored or
   faded text on glass; icons and labels use the normal content colors.
4. **The contrast floor is guaranteed, don't undo it.** The 75% tint keeps text ≥ 4.5:1 over any backdrop and any seed.
   Don't lower `--s4-glass-tint-opacity-float`; `npm run check`
   fails if the guarantee breaks.
5. **Text over photos is not glass.** A label on an image or illustration gets a scrim or a solid chip behind it.
6. **Glass is a surface, not a state.** Selected, active and filled controls on glass stay solid (the nav indicator, a filled
   button, a selected chip).

## How it's built

```css
background-color: color-mix(in srgb, var(--s4-glass-tint-float) 75%, transparent);   /* surface-container */
backdrop-filter: blur(8px) saturate(1.5);                                            /* no backdrop dimming needed at 75% */
box-shadow: inset 0 1px 0 var(--_edge-hi),                                   /* the edge light: bright along the top, */
            inset 0 -1px 0 var(--_edge-hi),                                /* a faint return at the bottom, */
            inset 0 0 0 1px var(--_edge-hi);                                  /* a faint line all round; no shadow */
```

Components don't write this: `glass.css` applies it to the listed components in its own cascade layer. To make something
else glass (a custom floating panel), add `class="s4-glass"`. To keep one element solid, add `data-glass="off"`.

## Accessibility and fallbacks

| Situation | Glass becomes |
|---|---|
| `prefers-contrast: more` or contrast level high | Solid (`surface-container`), no blur, no edge light |
| `prefers-reduced-transparency: reduce` or `data-glass="off"` on `<html>` | Solid |
| Browser without `backdrop-filter` | Solid |
| Contrast level medium | 80% tint |
| Forced colors | Solid with a real border |
| `prefers-reduced-motion` | Unchanged (glass doesn't move); transitions into it follow the motion rules |

## Edge and depth
Glass has **no shadow**: the transparency itself says what is in front. The only edge is the edge light (decision 0021, replacing the frost line of 0013/0016): 1px, light catching the top edge and fading down the sides, with a faint return at the bottom (`--s4-glass-edge-top`, `-side`, `-bottom`; light: white 62% over white 32%, a dark 7% bottom; dark: white 13% over white 6%). It is drawn with inset shadows, so it follows the corners and stays put when a menu or dialog scrolls. Floating surfaces (toolbar, menu, dialog, phone bottom sheet) get it all the way round; full-width and docked ones (top app bar, nav bar, docked toolbar, rail, side sheet, wide bottom sheet) get one line (`--s4-glass-edge-line`) only on the edge that faces the content. Over plain white content in light mode the glass can look flat; that is accepted.

## Items on glass
The edge color depends on the surface (decision 0031): `--_edge-hi` is the surface color (glass tint, or a floating button's own color) moved toward white by `--s4-glass-edge-lift` (0.5), the top and the bottom edge are lit the same (decision 0033: an unevenly lit edge made pale surfaces look like raised buttons); the alphas `--s4-glass-edge-top-alpha`, `-side-alpha`, `-bottom-alpha` set the strengths. A dark floating button therefore gets a soft lighter version of itself, never a hard white line.

The edge width scales with the screen (decision 0029): the token `--s4-glass-edge-width` (1px) is the retina and phone width; standard-density monitors multiply it by `--s4-glass-edge-scale-standard` (1.5) and large ones by `--s4-glass-edge-scale-large` (2).

The glow flips on light surfaces (decisions 0036, 0037): a surface below OKLCH lightness `--s4-glass-glow-flip` (0.6) gets a white glow (`--s4-glass-glow-alpha`), a surface at or above it an ink edge shade (`--s4-glass-glow-shade-alpha`), a hard step so mid grays always get one. Both follow the edge light's top/bottom/side distribution and are the same in light and dark mode.

Floating action buttons are glass too (decisions 0025, 0028): tinted with their own color at `--s4-glass-tint-opacity-fab` (75%); the default monochrome FAB keeps 3:1 or better over any backdrop (`scripts/check-glass.mjs` prints the seeded worst case). Optional brighter-near-the-edges surface (decision 0030): `--s4-glass-glow-alpha` (0 = off) and `--s4-glass-glow-size`; each side glows with its own edge light, so a stronger bottom edge gives a stronger bottom glow.

Controls inside a glass surface (a dialog's fields, a menu's chips) stay your UI: they keep their own color at full fill (`--s4-glass-item-fill: 1`; lower it to let the blurred backdrop tint them) and drop their outlines, so the glass supplies the depth and the items stay clean (decision 0015).
- No outline at rest on text fields and the switch. Focus, error and disabled keep theirs, because they carry meaning; hover draws none on glass.
- An item that is only an outline with no fill (outlined button, unselected chip) keeps one, drawn as the frost line (`--s4-glass-item-outline`, white at 28%). Error-colored outlines stay.
- Solid wherever the glass is solid: all of this switches off with high contrast, reduced transparency, no `backdrop-filter` and `data-glass="off"`.

## Do / don't
- **Do** let content scroll under the top app bar and nav bar; that's what the glass is for.
- **Do** keep chrome light: a title, a few icon buttons, navigation.
- **Don't** put glass on cards to make a page feel "glassy". It hurts legibility and performance.
- **Don't** stack a sheet on a dialog on an app bar.
- **Don't** add blooms or gradients behind the page to give glass "something to show". The backdrop is flat (decision 0004).
