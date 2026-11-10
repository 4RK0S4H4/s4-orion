# 0020: Orion becomes its own language (accepted, 2026-11-10)

**Status:** direction accepted on 2026-11-10, details still being refined (round 6, 2026-11-11: glass values set in the Glass Playground; the seven other directions inspired by Carbon, Fluent 2, Geist, Radix, Nothing OS, Teenage Engineering and Apple HIG were all rejected, tiles stay). Accepted through Claude Design drafts (private claude.ai canvas
"S4 Orion: Own Language Drafts", artifact `LTom2j96tNTT2ZiTsQJjQH`; the "Chosen direction" rows at the top hold the
component sheet in light and dark and the Projects app). The interactive Direction Lab (`explore/direction.html`) was
published first but the owner preferred static drafts; its questions are superseded by the answers below.

## What the owner asked for

Move away from Material 3 Expressive and make Orion unique: no sharp corners, a flat look, depth through blur,
no shadows, simpler motion than the container transform, compatible with "pretty much everything", good on phone and
desktop like a real framework.

## How it was decided (five draft rounds)

1. Three directions (A Stone: tone steps and ink; B Pebble: round, dark islands, light numbers; C Paper: hairlines,
   one seed). Owner: **a mix of A and B, with glass for everything elevated**.
2. A+B drafts, a component sheet and a general Projects app (the Pocket Ledger demo is dropped). Owner liked the glass
   edge highlight; wanted it **symmetrical across the top** (like the iOS 26/27 dock), glass explored beyond floating
   parts, and **squarer shapes with small rounding**, not everything a pill or circle.
3. Three glass levels (floating parts only / plus controls / plus groups). Owner: **level 1, floating parts only**,
   with a **more subtle edge**; the base UI felt bland.
4. Three personalities (project colors / one accent / warm). Owner: **one accent**.
5. Four underlying styles (tiles / outline / tinted / open). Owner: **tiles**.

## The rules

- **Glass** only on floating chrome and overlays: top bar, navigation (floating bar on phones, rail on desktop),
  menus, sheets, dialogs, snackbars, selection toolbars. Content stays solid. Values picked by the owner in the Glass
  Playground (round 6, 2026-11-11): **neutral tint at 75%** of the surface color (dark `rgba(40,40,46,.75)`, light
  `rgba(246,246,244,.75)`), **blur 8px**, **color boost (saturate) 150%**, **no sheen**. Full-width bars use the page
  color at 80%.
- **Glass edge (top light):** a 1px vertical gradient border drawn with a mask, so it is symmetrical. Playground
  values: top 35, sides 50% of the top, bottom 25. Dark: white `.21` at the top, `.105` at 24%, `.047` at 60%, `.05`
  at the bottom. Light: white `.805` at the top, `.403` at 24%, `.181` at 60%, then dark `rgba(23,23,26,.08)` at the
  bottom. Full-width bars get only a 1px line on their content-facing edge. Replaces the 0.5px frost line of
  0013/0016. With 75% tint the contrast guarantee is easier than before; re-run `check-glass` with the new tint.
- **No shadows** anywhere (0017 stands).
- **Color:** neutral grays plus **one accent** (default blue: `#3D5AFE` light with white text, `#8EA2FF` dark with
  `#0B1240` text; a soft accent wash at 10% / 16% for tonal states). The accent marks the main action, the current
  selection (tabs, segmented, chips, active nav item as a soft wash), checked states, progress and the add button.
  Tooltips stay ink. Status colors (success, warning, danger) as soft tags. An app may pick its own accent (one seed).
- **Surfaces (tiles):** solid tiles one step off the page. Light: page `#F1F1EE`, tiles `#FFFFFF`, controls
  `#E6E6E2`. Dark: page `#0B0B0D`, tiles `#18181C`, controls `#242429`. Filled controls, no outlines at rest (an
  unchecked checkbox, radio or off switch keeps a 1.5px ring).
- **Shape:** rounded rectangles, small rounding. Tags 7-8, chips 10, buttons/fields/icon buttons 14 (icon buttons are
  rounded squares), the add button 18, menus 20-26 (items 13-14), groups and cards 22, navigation 28 (items 20),
  sheets and dialogs 30-32. Avatars, switch tracks, badges and progress tracks stay round.
- **Type:** Inter. Bold, tight headings (700, about -0.025em); big numbers in a light weight (250); small spaced
  capitals for overlines.
- **Icons:** Solar stays (semantic names); the drafts used simple line glyphs as stand-ins.
- **Motion:** replaces the container transform, unfold and M3 Expressive springs. One short family: fade and rise
  (about 8px, ~200ms, one ease-out curve), menus fade and drop 4px from their button, sheets slide up, views
  cross-fade with a small rise. Reduced motion means fades only. (Picked by default; the owner did not object. Confirm
  in the motion step.)
- **Compatibility:** Safari and iOS 15.4+, Chrome and Edge 100+, Firefox 103+. No build step for apps. Every effect has
  a fallback: no `backdrop-filter` means solid surfaces, no mask support means a plain 1px top line, reduced
  transparency and high contrast mean solid.

## What this supersedes

Shape (0003 M3 Expressive scale), stock M3 states and component looks (0001, 0003, 0009, 0011 where they follow M3),
motion (0004, the transitions lab, 0018), the glass edge (0013, 0016), and the Pocket Ledger demo (0005).

## Still open

- Framework shape (drop-in CSS and JS only, or also web components or framework packages) and token names
  (`--md-sys-*` to `--s4-*`). Default if the owner does not say: drop-in CSS and JS, own `--s4-*` names with the old
  names as aliases for one release.
- Desktop navigation: the drafts use a floating glass rail; confirm when the gallery is rebuilt.

## Plan (pause for the owner after step 2 and step 4)

1. Docs: philosophy and foundations rewritten to these rules; this record.
2. Tokens: shape scale, surface tones, accent roles, glass sheen and edge, motion (one easing, two durations),
   elevation removed; token renames if confirmed. `check-glass` re-run for the new tints. Owner looks at the gallery.
3. Components: restyle all of them; replace `components/motion` (container transform, emerge) with the fade family;
   drop M3-only variants that no longer fit.
4. Demo: the Projects app (Today, Tasks, Settings, New Task, dialog, desktop table) replaces Pocket Ledger, built from
   the skill; page checker clean at 390 and 1280; owner checks on the iPhone.
5. Skill rewrite and release (1.0.0 was never released, so this can be the first release).
