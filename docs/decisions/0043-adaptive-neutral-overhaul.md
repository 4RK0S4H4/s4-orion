# 0043: The overhaul: one language for phones, desktop windows and desktop apps (built, awaiting the owner's review, 2026-11-14)

**Status:** built on the owner's request ("review this design language … really overhaul it … mobile, desktop, and even
desktop apps", 2026-11-14), from the open issues and the direction of the earlier ones. The choices the issues wanted
shown as options are in the [Overhaul Review](../../explore/review-orion-2.html); the first card of each question is
what is built. Amends 0001 and 0003 (color), 0007 (menu icon), 0011 and 0022 (sheets), 0015 (items on glass), 0023
(error fields), 0025 (table rows).

## What the issues say the owner wants

Read together, the 35 critiques ask for the same five things:

1. **Normal before expressive.** Neutral surfaces, an accent that stays an accent, plain status colors, standard side
   navigation, a real date picker. Material's shapes and structure stay; its habit of coloring and decorating everything goes.
2. **Nothing pasted on.** A solid patch on glass, a fill that touches only some edges, a halo around a control, a check
   that pushes its neighbours: each is a part that doesn't belong to what it sits in.
3. **Calm, small, liquid motion.** Things answer where they are (a control grows a touch, a panel pops) instead of
   travelling across the screen.
4. **Contrast is not negotiable**, and it is proven by a script.
5. **It has to look right on a computer too**, not be a phone layout stretched.

## Decisions

### 1. Color: neutral surfaces, the accent only on accents (issues 22, 23, 16)
- A seed colors only the **primary** roles (the main button, FAB, switches, sliders, progress), **selection**
  (`secondary-container`: a soft tint of the accent) and the **focus ring**. Surfaces, text, outlines and status keep
  the neutral grays in `tokens.css` whatever the seed. `S4.theme({ surfaces: 'tinted' })` brings back stock M3.
- **Status colors are fixed**, not derived from the seed: `--s4-color-success|warning|info` (text on surfaces), each
  with `-container` and `on-…-container`; `data-tone="success|warning|info"` on status and banner. Checked at 4.5:1 on
  every surface in all four modes.
- Dark error is a clearer red (not tone-80 salmon) and its container is a quiet dark red. **Badges are one red in both
  modes** (`--s4-color-badge`, white text, 4.7:1).
- Avatars are neutral by default (`data-tone="primary"` for the accent).

### 2. Density: two sizes of the same system
- **Comfortable** (default): touch sizes, 48dp targets.
- **Compact**: pointer sizes for desktop windows (32px controls, 40px rows and fields, 14px body text).
  `data-density="compact"` on any container, or `data-density="auto"` to be compact only where the pointer is a mouse.
  Only tokens change (`--s4-density-compact-*` swapped in by `base/density.css`), so every component follows.
- Whether computers should be compact by default is question 2 of the review.

### 3. Navigation rail = side navigation (issues 1, 2, 3)
- Items are **rows**: icon, label beside it. Collapsed the rail is one icon wide (72) and labels become hover titles;
  expanded (240) the labels show. Nothing changes place between the two states except the rail's edge, which is what
  made the old animation glitch. The rail expands by itself from 1200 (`data-expand="off"` to stop it).
- The menu button is a **hamburger** (Solar Line Duotone, the owner's exception to Bold Duotone only).
- The rail's main action is a **solid primary button** in the same row shape, never glass (answers review question 3
  of 0041).
- Optional `.s4-nav-rail-title` group titles and a `.s4-nav-rail-footer`.
- Selected icons keep both tones; the faded tone is 0.42 / 0.38 so the two tones are clearly apart (issue 5).

### 4. Items on glass are tints (issue 4, 33; replaces 0015)
Inside any glass surface the neutral container roles become the text color at 7% (6% dark) and the selection role
becomes the accent at 14% (7% dark) with on-surface text. Fields, chips, neutral and tonal buttons, the nav pill and
checked menu items read as part of the glass. Primary actions stay solid. `check-glass` proves on-surface text on both
tints over black and white backdrops for all 97 schemes, with neutral and tinted surfaces.

### 5. Floating panels replace sheets (issues 34, 35; replaces the sheet parts of 0011 and 0022)
`.s4-bottom-sheet` and `.s4-side-sheet` keep their names and markup but are floating glass panels: inset 16 from every
edge, all four corners round, the full glass edge, popping in like a dialog (the side panel steps in 16px from its
side). No handle, no drag, nothing docked to a screen edge. `data-placement="center"` centers one.

### 6. Controls answer in place (issues 8, 10, 13, 17, 18, 20, 21, 32)
- No state-layer halo on checkbox, radio or switch: the control itself grows a touch on hover and dips on press.
- Checkbox marks are thin and small; they settle in with transform and opacity (the clip-path wipe is gone).
- A selected chip **never changes size**: selected is the accent fill, no check slides in.
- The slider's handle travels the whole track (no sliver at 0% or 100%); stop dots near the handle and at the two ends are hidden.
- Press-to-square stays, except inside a rounded container (field, search, pill toolbar, snackbar, composer), where
  the button stays round.
- Dialogs and panels **never focus a text field** when they open (`data-autofocus` opts in); the dialog takes focus.

### 7. Fields (issues 14, 15, 16, 33)
- An error keeps the normal fill: label and message turn error-colored, the message gets a small mark, the focus ring is the error color.
- Hover lifts the fill and keeps it during focus, so focusing changes one thing (the ring).
- **Date picker**: `input[type=date]` in a text field opens a glass calendar (month and year switch, Clear, Today,
  min/max, disabled dates, range with `data-range-end`, full keyboard, a centered panel on phones). The native input stays for forms.
- The select on the text field page opened the native list because the page didn't load the menu script; fixed.

### 8. Lists and tables (issues 6, 9, 10)
- Lists are inset 8 on every side, so a hover or selected fill never touches only some edges.
- Table rows are a grid: hover is a flat band edge to edge (rounded row ends bent the dividers and read as glass). Thin scrollbars.
- The composer is one glass pill; its field has no box of its own and its buttons are centered on the first line (issue 12).

### 9. Desktop windows and desktop apps
- `data-window` on `.s4-app`: the app fills the window and each pane scrolls on its own, thin scrollbars, arrow
  cursor on controls, chrome text not selectable.
- `.s4-titlebar`: drags the window, leaves room for the system's window buttons (window controls overlay, or
  `data-controls="start"` for macOS traffic lights); `.s4-window-controls` for frameless shells.
- `data-shortcut="mod+k"` on any button (⌘ on Apple, Ctrl elsewhere), `<kbd class="s4-kbd">` shows it;
  `data-context-menu="menu-id"` opens a glass menu on right-click or long press.
- New template: `templates/desktop-app.html`.

## Still open
- Row hover between list rows (issue 7): waits for the owner's look on a computer.
- Idea A (whatever you touch turns into glass): not started; section 4 is a first step in that direction.
- Everything visual needs the owner's iPhone and desktop look; WebKit is untested here.
