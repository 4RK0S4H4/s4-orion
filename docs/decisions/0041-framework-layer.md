# 0041: Orion as a framework: layouts, templates, content components (proposed, 2026-11-13)

**Status:** proposed; built and published for the owner's review. Nothing visual that earlier decisions settled was changed.

## Context

The owner asked for an end-to-end review and overhaul "as if making a legit framework to design future apps of all
kinds". The review ([2026-11-13 framework review](../reviews/2026-11-13-framework-review.md)) found the look and the
guarantees solid, but Orion was a component kit plus rules: every new app started from a blank page, two-pane screens
were hand-built (layout tokens for them existed but nothing used them), and common kinds of apps (dashboards, chat,
reading, tools) had no building blocks for their main content.

## Decision

1. **Templates** are the starting point for every new app: eight archetypes in `templates/`, shipped in the skill.
2. **Layout** is part of the system: page widths (`reading` 720, default 1200, `wide` 1600) and the two M3 canonical
   two-pane layouts (`.s4-split` list-detail and supporting pane), plus a rail that can expand itself from 1200.
3. **Content components** for the app kinds that lacked them: stat, description list, prose, messages and composer.
4. **Less boilerplate**: theme controls by attribute, deep links to views, 15 more icons through one script.
5. **Governance**: a public API and semver policy (`docs/framework.md`), a decision index with statuses
   (`decisions/README.md`), a short `NEXT.md` with the old log archived in `docs/history/`.

## Choices made without the owner (change any of them)

- Stat values on display-small emphasized (36px); the dashboard chart draws past values in `surface-container-highest`
  and the current one in `primary`.
- Messages: mine in `primary`, theirs in `surface-container-high`, large corners with a small corner on the speaker's
  side; the composer is glass (it floats over the thread).
- Prose: body-large with 4px extra leading, headings emphasized, links underlined in primary.
- `data-expand="auto"` is opt-in; existing apps keep a collapsed rail.

## Open for the owner

See "Questions" in the review.
