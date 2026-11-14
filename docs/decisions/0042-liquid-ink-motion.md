# 0042: Liquid motion for ink, quicker motion everywhere (in progress, 2026-11-14)

**Status:** partly decided by the owner in the [Liquid Motion Lab](../../explore/motion-liquid.html) (2026-11-14); row
hover, radio, menu and the exact speed are open in [Liquid Motion Lab 2](../../explore/motion-liquid-2.html). Amends
0022 (simpler motion). Nothing is built yet.

## The owner's answers

| Question | Answer |
|---|---|
| Accordion and chevron (issue 11) | **B**: the chevron bends over like a page turned backward (rotateX 180° with perspective); the section opens on a calm spring with its text fading in just behind. |
| Snackbar (28) | **B**: glass, rises into place on a soft spring. (The slight widening of B was liquid on glass; see the rule below, so it rises only.) |
| Tooltip (29) | **B**: rises 4px and fades in fast, leaves faster. |
| Skeleton and progress (25–27) | **B**: one sheen wave across the skeleton; the bar's front edge leads and the back edge catches up; the ring's arc breathes as it turns; full at 100%. |
| Row hover (7) | Other: "a minor animation regarding the edges of the hover box", not a highlight that travels and stretches. → Lab 2. |
| Radio (19) | Other: the selected fill is **behind the surface** and you see it pass under the other radios, through them like windows. → Lab 2. |
| Menu (31) | Other: it shouldn't come directly from the button. → Lab 2. |
| Overall | Close. |

## Rules so far

1. **Liquid is for ink only.** Ink = solid fills that mark state: selection and hover fills, the nav and tab pill,
   radio and checkbox fills, the switch handle, slider and progress fills, selected chips. Ink may stretch, lead and
   trail, overshoot slightly and round its corners while moving.
2. **Glass doesn't go liquid.** Glass surfaces (menus, dialogs, snackbars, tooltips, panels, bars) move plainly: a short
   rise or settle and a fade, no stretching or shape changes.
3. **A little faster** than the first lab across the board: quick enough never to be in the way, never instant
   (the exact factor is picked in Lab 2).
4. 0022's sturdiness rules stay for glass and content (transform and opacity, one transition per element, nothing
   cloned). Ink shapes may animate their own size and corners, since they hold no text.
