# Layout

S4 addition, from the M3 canonical layouts. Page widths for different kinds of screens, and the two-pane layouts most
apps need: **list-detail** (mail, contacts, bills, any CRUD app) and **supporting pane** (a document or form with
context beside it). Works inside an [app shell](../app/); window classes are container queries on `.s4-app`.

```html
<!-- page width: on the content, or on one view -->
<main class="s4-content" data-width="reading">…</main>
<section class="s4-view" data-view="settings" data-width="reading">…</section>

<!-- list-detail -->
<div class="s4-split" id="inbox">
  <section class="s4-split-pane" aria-label="Messages">
    <ul class="s4-list" role="listbox" aria-label="Messages">…rows with data-split-open…</ul>
  </section>
  <section class="s4-split-pane" data-sticky aria-label="Message">
    <button class="s4-button" data-variant="text" type="button" data-split-back><span class="s4-icon" data-icon="back"></span>Inbox</button>
    …detail…
  </section>
</div>

<!-- supporting pane -->
<div class="s4-split" data-layout="supporting">
  <section class="s4-split-pane">…main…</section>
  <aside class="s4-split-pane" data-sticky>…context…</aside>
</div>
```

| Part / attribute | Values | Default |
|---|---|---|
| `data-width` on `.s4-content` or `.s4-view` | `reading` (720: articles, forms, settings, sign-in), `wide` (1600: tables, boards, editors), `full` (no cap, content only) | 1200 |
| `.s4-split` | grid of two `.s4-split-pane`s, 24 apart | — |
| `data-layout` | `list-detail`, `supporting` | `list-detail` |
| `data-open` (split) | list-detail under 840: the detail replaces the list | absent (list shown) |
| `[data-split-open]` / `[data-split-back]` | inside the split: set / clear `data-open`; back buttons hide from 840 | — |
| `data-sticky` (pane) | from 840 the pane stays in view under the top app bar and scrolls inside itself | — |
| `--s4-split-list`, `--s4-split-support` | column widths | 360, 400 |

| Window | list-detail | supporting |
|---|---|---|
| < 840 | one pane at a time; opening adds a history entry so the phone's Back returns to the list | supporting pane stacks under the main pane |
| ≥ 840 | list 360 + detail | main + 400 supporting pane |

**Behaviour (`layout.js`):** clicks on `[data-split-open]` / `[data-split-back]` toggle `data-open`, run the shared
axis (spatial movement, effects fade) when one pane replaces the other, and fire `s4-toggle { open }` on the split.
`S4.split.open(split, true|false)` does it from code, e.g. on a listbox's `s4-change`.

**When to use what:** list-detail when people pick one item from many and act on it; supporting pane when one main
thing needs context (a form with a summary, an article with related links); plain views when screens are siblings.
Pick the page width by content: reading for text and forms, default for dashboards, wide for tables.

**Do**
- On wide screens, select the first item so the detail pane is never empty (or show an [empty state](../empty-state/)).
- Give each pane a name (`aria-label` or a heading).

**Don't**
- Don't nest splits.
- Don't add your own `position: fixed` panes; `data-sticky` already keeps a pane in view.

**Accessibility:** panes are landmarks or labelled sections; the hidden pane under 840 is `display: none`, so it leaves
the accessibility tree; Back (browser or button) returns focus to the list's page.

**Tokens:** `--s4-layout-content-reading`, `--s4-layout-content-wide`, `--s4-layout-list-width`,
`--s4-layout-inspector-width`, `--s4-layout-pane-gap`, `--s4-size-top-app-bar`, `--s4-motion-pattern-shared-axis-distance`.
