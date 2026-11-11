# S4 Orion design review (2026-11-11)

Goal from the owner: a theme **based on M3 Expressive, but very much my own**, with simpler, less bug-prone animation.
Reviewed: the gallery, the reference pages, the demo at 390 (light and dark) and 1280, the token sources and
`motion.js`. Done in this pass: the new glass (decision 0021) and simpler motion (decision 0022). Everything under
"Proposals" is not built; each needs your yes or no.

## What is already yours

- **The glass.** Firm 75% frost, 8px blur, a light that catches the top edge. No other M3 theme has it, and it now passes
  the contrast check over pure black and white for all 97 test color schemes with no extra filtering.
- **Monochrome by default.** M3 themes are almost always colored; a black-and-white Orion with one optional seed reads as
  a choice.
- **Solar Bold Duotone icons** behind semantic names. Softer and heavier than Material Symbols; recognizably not Google.
- **Rigor.** Contrast pairs checked in four modes, solid fallbacks for high contrast, reduced transparency and old
  browsers, Title Case labels, one rulebook (the skill) that builds pages that pass the checker.

## Where it still reads as stock M3

Seen in the demo and gallery screenshots:

1. **Every container is the same gray card.** KPI tiles, chart panel, list panel and gallery links are all
   `surface-container` with one radius. Nothing is more important than anything else.
2. **Numbers are quiet.** KPIs use `headline-small` emphasized (24px). On a finance screen the numbers are the content,
   but they sit at the size of a heading and the cards are mostly air (about 170px tall for one number on a phone).
3. **In monochrome, emphasis turns into black slabs.** The filled button, the inverse status chip and every chart bar are
   solid black in light mode, so the chart is the heaviest thing on the screen and says nothing about which month matters.
4. **Titles repeat.** "Overview" in the bar and "October" right under it: two headings, no hierarchy between them.
5. **The hub undersells it.** The gallery is a list of text cards; you cannot see a single component until you open it.
   The hub also lists 20 labs, most decided or abandoned.

## Proposals (pick any; each is small and stays inside M3 Expressive)

| # | Change | Why | Effort |
|---|---|---|---|
| 1 | **Three container tones with a job each**: the hero/summary on `surface-container-high`, ordinary panes on `surface-container-low`, lists flat on the page with dividers | Hierarchy without new colors or shadows; uses M3's own tone roles | Small (demo + pattern docs) |
| 2 | **Big, heavy numbers**: KPIs on M3 Expressive's emphasized `display-small` (36px, 600), tabular, label above in `label-large`; two KPIs per row on phones | Makes the content the loudest thing; cuts the KPI area by about half on a phone | Small |
| 3 | **Tonal data**: charts drawn in `outline-variant` with the current period in `primary` (black in mono), rounded bar tops (M3E full corner) | Charts stop being black slabs and point at "now" | Small (demo chart) |
| 4 | **Inverse chips only for one thing per view**: status chips tonal by default (`secondary-container`), inverse kept for the single most important status | Fewer black blocks in mono light | Small |
| 5 | **One title per screen**: the bar title is the screen; period and filters move into a toolbar row under it | Clear hierarchy; frees vertical space | Small |
| 6 | **Use M3 Expressive's shape set in two fixed places**: the FAB and avatars (for example the 9-sided cookie and the 4-leaf clover from M3's own shape library), everything else stays as is | M3E's quirk, used where it can't clutter; makes Orion recognizable at a glance | Medium (shapes as clip-paths, fallbacks to round) |
| 7 | **Glass on two more things**: the snackbar (glass with the edge, action in primary) and plain tooltips | The signature where people look most often; needs a contrast check for the action color | Small + check |
| 8 | **Living gallery**: each card shows the component itself (rendered, in your current theme), labs moved to an "Archive" section | The hub sells the system on a phone in one scroll | Medium |
| 9 | **Prune**: legacy tokens (`--s4-motion-pattern-unfold-*`), the seven menu-style docs, superseded labs from the hub | Less to maintain, less to confuse the skill | Small |

My recommendation: 1, 2, 3, 5 and 9 first (they fix what reads as stock M3 without new ideas), then 6 and 7 as the
visible signature, then 8.

## Motion (done, decision 0022)

The container transform, menu emerge and six other menu styles are gone. Dialogs **pop** (rise 16px and fade), menus
**drop** 8px from their button, sheets slide, snackbars rise, views use shared axis. Only transform and opacity animate,
glass is glass from the first frame, and every element runs one transition at a time so fast taps cannot leave anything
stuck. The M3 Expressive feel stays in the springs and in the CSS-only details (press morph, sliding nav pill, switch,
chip check). `orion.js` is 30 KB smaller. Tested in Chromium at 390 and 1280: menus, five fast taps, sheets, a dialog
closed and reopened mid-animation, snackbars. **Not checked on an iPhone yet.**
