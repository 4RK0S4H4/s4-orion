# 0042: Liquid motion for ink, plain motion for glass (accepted, 2026-11-14)

**Status:** accepted by the owner in the [Liquid Motion Lab](../../explore/motion-liquid.html) and
[Lab 2](../../explore/motion-liquid-2.html) (2026-11-14); built the same day. Amends 0022 (simpler motion). **Open:**
the row hover (issue 7), which the owner wants to review on a computer.

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

Lab 2:

| Question | Answer |
|---|---|
| Row hover (7) | Other: the owner will review it on a computer (reminder in NEXT.md). Not built. |
| Radio (19) | "A normal animation, subtle liquid style": no windows. Built: the selected disc fills with primary ink from the middle on the `ink` spring, no inner dot. |
| Menu (31) | **C, Items Follow**: the glass fades in where it sits, then the items fade in one after another, each rising 4px. |
| Speed | **C, 30% faster** than the first lab. The resulting springs land close to today's tokens. |
| Ink for liquid, glass plain | **Yes.** |

## Built (2026-11-14)

- Spring tokens `ink` (1060, 0.8, 250ms), `rise` (1060, 0.9, 180ms), `settle` (1490, 1, 220ms), `tip` (2240, 0.9,
  120ms), `reveal` (775, 1, 300ms), `bend` (860, 0.9, 200ms), usable by name in `S4.motion.animate`.
- Accordion: accordion.js opens and closes on `reveal`, text fades in on `settle`, the chevron bends (rotateX with
  perspective) on `bend`; the browser's name="…" exclusivity is taken over so the other item closes with motion.
- Snackbar and plain tooltip are glass; snackbar rises 14px on `rise`, tooltip 4px on `tip`, tooltips appear after 350ms.
- Menu: `S4.transition.drop` fades the glass in place and lets the items follow.
- Skeleton: one sheen wave across the loading region (skeleton.js). Progress: drop-like linear indicator, breathing
  ring, completely full at 100%; download demo on the progress page.
- Radio: ink fill, no dot.
- Rich tooltip: extra-large corners and room around its actions (issue 30).

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
