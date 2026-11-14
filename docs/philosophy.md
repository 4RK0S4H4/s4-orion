# Philosophy

S4 Orion is a personal design language for the apps and pages its owner builds. It should make a new app look
finished on day one and make the hundredth app look like it belongs with the first.

## 1. Material 3 Expressive first

S4 Orion is Material 3 Expressive. It uses the same color roles, type scale, shape scale, state layers, springs and
components, under the same names. When a question isn't answered here, the answer is "do what stock M3 Expressive does".
That keeps the system predictable, lets Google's guidance and tooling apply directly, and avoids a pile of personal
exceptions that drift over time.

The personal layer is short and deliberate:

- **Inter** as the typeface, with its full OpenType features.
- **Solar icons**: Bold Duotone where the icon carries the screen, Linear at small sizes.
- **Title Case** for labels; sentences stay sentence case.
- **Monochrome by default.** Color comes from one seed when an app wants it, and then only on accents: surfaces stay neutral (decision 0043).
- **Glass on floating chrome** and nowhere else.
- **Simple, sturdy motion**: dialogs and floating panels pop, menus fade in place, shared axis between views; controls answer where they are (decisions 0022, 0042, 0043).
- **Normal before expressive** (decision 0043): where Material decorates (tinted surfaces, halos, sheets that slide up the screen), Orion does the plain thing.
- **One language, three places**: phones, desktop windows and desktop apps share the components; density and the window layer adapt them.

## 2. One source of color

Every color is a role: primary, surface containers, outlines, and so on. Surfaces, text and outlines are neutral grays; a seed generates the accent roles (primary, selection, focus) with Material Color Utilities; status colors are fixed.
Nobody picks hex values for components. To raise contrast you raise the contrast level, which regenerates every role;
you don't darken one color by hand. The default seed is monochrome, so an app without a brand looks calm and neutral, and
an app with one gets a complete, accessible scheme from a single value.

## 3. Solid content, glass chrome

Content sits on solid tonal surfaces: cards, panes, lists, fields and tables are all M3 surface containers. Glass is reserved
for layers that float above content and move or overlay it: app bars once content scrolls under them, nav bars, toolbars,
menus, floating panels, dialogs and tooltips. A filled thing that sits on glass is a tint, never a solid patch. Glass is never used under dense text, and it always has a fallback: more contrast,
reduced transparency, or a browser without backdrop blur all turn it solid.

## 4. Motion that never gets in the way

Motion says where something came from and keeps out of the way. Dialogs pop (rise 16px and fade), menus drop 8px out of
their button, sheets slide from the edge they live on, snackbars rise, and sibling views move along a shared axis. Only
transform and opacity animate, one transition per element at a time, so fast taps can never leave anything half-open.
Movement uses M3 Expressive springs; fades use effects springs that never overshoot. Reduced motion makes movement
instant. (Decision 0022 replaced the earlier container transform and menu emerge.)

## 5. Readable for everyone

All text meets WCAG AA against what is actually painted behind it, including on glass. Every control has a visible focus
ring, touch targets are at least 48dp, and the system respects reduced motion, reduced transparency, more contrast and
forced colors. These are built into the components rather than left to each app.

## 6. Data reads cleanly

Numbers that are compared or scanned (amounts, counts, dates, IDs) use tabular figures. Tables become lists on phones.
Status is shown with a label and a tone, never color alone.

## 7. One way to do each thing

A framework earns trust by being boring to use. Each need has one answer: one shell, three page widths, two canonical
two-pane layouts, one component per job, one set of decision rules. Apps start from a template, change content, and
override only through tokens and documented attributes, never by editing `orion.css`. If an app needs something the
system doesn't have, that's a proposal for the system (a new component or token, recorded as a decision), not a local fork.

## 8. Proven, not promised

Every guarantee is checked by a script: contrast pairs in four modes, glass legibility over 97 color schemes, stale
generated files, and the page checker on every template and the showcase. A rule that can't be checked is written down
in the skill with a reason, so it's applied the same way every time.
