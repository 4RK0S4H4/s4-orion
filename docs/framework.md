# S4 Orion as a framework

How Orion is put together, what an app may rely on, and how to grow it without forking it. Read this before building a
new kind of app or changing the system.

## Layers

Everything flows one way. A change at one layer is picked up by every layer after it on the next `npm run build`.

| Layer | Where | What it owns |
|---|---|---|
| 1. Tokens | `tokens/src/*.tokens.json` | Every value: color roles (from one seed), type, shape, spacing, sizes, layout widths, breakpoints, z-index, springs, glass. |
| 2. Base | `components/base/` | Reset, focus ring, state layers, utilities (`.s4-stack`, `.s4-row`, `.s4-grid`, `.s4-num`, type classes), density. |
| 3. Components | `components/<name>/` | 48 components, each with CSS, optional JS, a README and a reference page. |
| 4. Layout | `components/app/`, `components/layout/`, `components/desktop/` | The app shell (window classes, nav bar / rail, sticky bars), page widths, canonical two-pane layouts, desktop windows (title bar, pane scrolling, shortcuts, context menus). |
| 5. Glass and motion | `components/glass/`, `components/motion/` | The glass layer on chrome and overlays; the motion runtime (pop, drop, slide, rise, shared axis). |
| 6. Templates | `templates/` | Nine complete starter apps, one per kind of app. |
| 7. Skill | `skill/s4-orion/` | Decision rules for Claude, generated references, the bundled assets and templates, the page checker. |

CSS cascade layers mirror this: `s4.tokens, s4.base, s4.components, s4.glass, s4.motion, s4.utilities`. An app's own
unlayered CSS always wins, so apps never need `!important` or edits to `orion.css`.

## Three places, one system (decision 0043)

| Place | What changes | How |
|---|---|---|
| Phone and tablet | Nav bar at the bottom, one pane at a time, touch sizes, floating panels full width | Nothing: the default |
| Desktop browser window | Side navigation (rows, expands from 1200), two panes, hover and focus states | Nothing; `data-density="auto"` for pointer sizes |
| Desktop app (installed web app, Electron, Tauri) | The window never scrolls as a page, title bar, shortcuts, right-click menus, compact sizes | `data-window data-density="auto"` on `.s4-app`, `.s4-titlebar`; start from `desktop-app.html` |

Size follows the **pointer** (density), layout follows the **width** (window classes). They are separate on purpose: a
touch laptop keeps touch sizes in a wide layout, a narrow desktop window keeps pointer sizes in a phone layout.

## Choosing a starting point

| The app is mostly… | Start from | Then add |
|---|---|---|
| Numbers and trends | `dashboard.html` | a list-detail view for the records behind the numbers |
| Records people pick and act on | `list-detail.html` | a dashboard view if people ask "how are we doing" |
| One calculation or transformation | `tool.html` | nothing; keep it one screen |
| Reading | `article.html` | a list of articles (list-detail) for a help center |
| Talking | `chat.html` | a list-detail of conversations on wide screens |
| A front door | `landing.html`, `sign-in.html` | — |
| Settings for any of the above | `settings.html` | — |
| A desktop app | `desktop-app.html` | the views of whichever template fits its content |

Screen by screen: plain views for siblings (bar/rail destinations), `.s4-split` for pick-one-then-act, the supporting
layout for one main thing with context. Page width by content: `reading` for text, forms and settings; default for
dashboards; `wide` for tables and editors.

## Public API (what apps may rely on)

These are stable within a major version. Anything not listed (internal `--_` properties, undocumented classes, the
inside of `orion.js`) can change at any time.

- **Classes** prefixed `s4-` that are documented in a component README.
- **Attributes** documented in READMEs: `data-variant`, `data-size`, `data-color`, `data-tone`, `data-width`,
  `data-layout`, `data-open`, `data-sticky`, `data-expand`, `data-menu`, `data-dialog`, `data-sheet`, `data-close`,
  `data-split-open`, `data-split-back`, `data-theme-mode`, `data-theme-contrast`, `data-theme-seed`, `data-glass`,
  `data-density`, `data-window`, `data-shortcut`, `data-context-menu`, `data-autofocus`, `data-placement`, `data-range-end`, …
- **ARIA state** as the styling hook: `aria-pressed`, `aria-selected`, `aria-current`, `aria-expanded`, `aria-checked`.
- **Tokens**: every `--md-sys-*` and `--s4-*` custom property in `tokens/tokens.css` (not `--_*`).
- **Public knobs**: `--s4-content-max`, `--s4-gap`, `--s4-min`, `--s4-split-list`, `--s4-split-support`, `--s4-stat-min`,
  `--s4-pane-padding`, `--s4-app-inset-bottom` (read only).
- **JavaScript**: `S4.theme(…)`, `S4.theme.restore(key, defaults)`, `S4.snackbar(…)`, `S4.app.go(app, view)`,
  `S4.split.open(split, on)`, `S4.transition.*`, `S4.motion.animate/spring/reduced`, `S4.icon.add/use/names`,
  `S4.init(scope)`, `S4.register(name, fn)`, `S4.util.css/emit`, `S4.desktop.platform/format`.
- **Events** (bubbling `CustomEvent`s): `s4-change`, `s4-select`, `s4-toggle`, `s4-open`, `s4-close`, `s4-theme`, `s4-context`, `s4-window`.
- **Icon names** in `components/icons/names.json`.

## Versioning

Semantic versioning on the public API above, recorded in `CHANGELOG.md`:

- **Patch:** fixes that don't change markup or tokens.
- **Minor:** new components, attributes, tokens, icons, templates; visual refinements decided by the owner.
- **Major:** renaming or removing anything public. Removed names keep working as aliases for one minor version first
  and are listed under "Deprecated".

The skill ships the matching `orion.css`/`orion.js`, so a page built by the skill always matches the rules it was built
with. Re-package the skill (`skill/dist/s4-orion.skill`) on every release.

## Extending without forking

1. **App-level:** the app's own CSS, unlayered, using tokens only. Layout grids, a chart, a custom panel (`.s4-glass`
   opt-in for something that floats). Never restyle components by class from the app.
2. **Override by token:** set a token on `:root` or on a container (`--s4-content-max: none`). Color only through
   `S4.theme({ seed, variant, contrast })`.
3. **Propose to the system:** when two apps need the same thing, it becomes a component: a folder in `components/`
   following `components/CONVENTIONS.md`, a README, a reference page, an entry in `components/index.css` and in the
   README groups in `scripts/build.mjs`, and a numbered decision record. New icons: `scripts/add-icons.mjs` adds a name
   to all three icon sets at once.

## Quality gates

| Gate | Command | Guards |
|---|---|---|
| Tokens | `npm run check:tokens` | Token validity; 78 text/background pairs (roles, status colors, the badge) at WCAG AA in light, dark and both high-contrast modes. |
| Icons | `npm run check:icons` | Every semantic name resolves in every set. |
| Glass | `npm run check:glass` | Text on glass stays AA over pure black and white backdrops across 97 color schemes; text on the tints of items on glass; FAB icons 3:1. |
| Bundle | `npm run check:bundle` | Every generated file (bundle, skill assets, references, templates, cache stamps) is fresh. |
| Pages | `node skill/s4-orion/scripts/check.mjs page.html` | Console errors, unknown icons, overflow, rendered contrast (also on glass), app-CSS rule lint; 390 dark + 1280 light. |

CI runs the first four on every push. Run the page checker on every template, the showcase and any new page.

## Browser support

Current Safari (iOS and macOS), Chrome, Edge and Firefox. The system leans on container queries, `:has()`, cascade
layers, `color-mix()`, `<dialog>` and `backdrop-filter`; without blur support glass turns solid. Safari on iPhone is the
owner's main device: anything visual is checked there before it's called done.
