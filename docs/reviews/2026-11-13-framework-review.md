# S4 Orion framework review (2026-11-13)

Asked: review the design language end to end and overhaul it into a real framework for designing future apps of all
kinds. Reviewed: tokens, all components and their docs, the build and check scripts, the skill, the showcase at 390 and
1280 in both themes, the hub, the labs and the 40 decision records. Visual decisions the owner has made were kept.

## What is already framework-grade

- **One source of truth with proof.** Tokens in W3C format feed every output; CI fails on stale output; 42 contrast pairs
  in four modes; glass legibility proven over 97 color schemes; a page checker that measures rendered contrast.
- **Cascade layers** so app CSS always wins without `!important`; no globals except `S4`; markup works without app code.
- **Accessibility built in**: native elements under every control, ARIA state as the styling hook, reduced motion,
  reduced transparency, high contrast and forced colors handled in the components.
- **A consistent visual language** (monochrome, filled, pills, glass chrome) that the skill applies the same way.

## What was missing for "apps of all kinds" (fixed in this pass)

| # | Finding | Fix |
|---|---|---|
| 1 | No starting points: every app began from a blank page plus rules, so structure varied app to app. | Eight templates (dashboard, list-detail, settings, sign-in, article, chat, tool, landing) in `templates/` and the skill, with a gallery. |
| 2 | No layout system beyond the shell. Tokens `list-width`, `inspector-width` and the 1200/1600 breakpoints existed but nothing used them; the docs told apps to hand-write split grids. | `components/layout/`: page widths, list-detail and supporting-pane layouts with phone behaviour and Back, sticky panes; rail auto-expand from 1200. |
| 3 | No building blocks for common app content: KPIs, an item's fields, long text, conversations. | Stat, description list, prose, messages + composer. |
| 4 | Theme controls needed ~10 lines of script in every app. | `data-theme-mode`, `data-theme-contrast` (like the existing `data-theme-seed`). |
| 5 | Views weren't linkable: reload or a shared link always opened the first view. | `#view` opens that view; nav links keep the URL in step. |
| 6 | Icon vocabulary lacked basics (send, attach, help, login, cart, globe…), and adding one meant hand-editing three sets. | 15 names added; `scripts/add-icons.mjs` adds a name to all three sets. |
| 7 | Docs drifted: the philosophy and the list-detail pattern still described the container transform and menu emerge removed in 0022; the skill's page shape used the deleted demo's storage key. | Rewritten; philosophy gains "one way to do each thing" and "proven, not promised". |
| 8 | 40 decision records and a 300-line NEXT.md with no summary of what still applies. | `decisions/README.md` (status per record, by topic); NEXT.md rewritten short, the log archived. |
| 9 | No stated public API or versioning policy, so nothing said what apps could rely on. | `docs/framework.md`: layers, public API, semver, extending without forking, quality gates, browser support. |
| 10 | The hub was hand-styled outside Orion, listed 17 of 25 labs, and gave no path for building an app. | Rebuilt in Orion: Start Here, how a new app gets built, docs and skill, labs in an Archive. |

## Not changed, worth deciding (questions)

1. **Approve the framework layer** (0041): templates, layouts, the four content components. Any template you'd change?
2. **Rail on big screens:** expand automatically from 1200 in every app (today opt-in per app)?
3. **The rail FAB on desktop** reads as a grey disc in monochrome (glass FAB with a small icon). Keep, or make the rail
   FAB the extended FAB with its label when the rail is expanded (as the templates do)?
4. **Release 1.0.0 now** (tag, re-packaged skill), with the iPhone checks of 0037/0040 folded into the first patch?
5. **Size:** `orion.css` is 301 KB unminified and `icons.js` carries all three icon sets (239 KB). Proposal for 1.1:
   ship minified bundles and load only the active icon set.
6. **Prune for 2.0:** the old motion API aliases (`containerTransform`, `unfold`), the `outlined` variant aliases and
   the superseded labs.

## Not checked here

Safari and WebKit (not available in the sandbox): the new layouts use container queries, `:has()` and sticky panes,
all supported in current iOS Safari, but they need the owner's iPhone look like everything else.
