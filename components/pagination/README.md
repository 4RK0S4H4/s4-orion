# Pagination

Move between pages of a long list or table. Circles, filled; the current page is filled inverse.

```html
<nav class="s4-pagination" aria-label="Pagination">
  <a class="s4-page" href="?page=1" aria-label="Previous Page"><span class="s4-icon" data-icon="chevron-left"></span></a>
  <a class="s4-page" href="?page=2" aria-current="page">2</a>
  <a class="s4-page" href="?page=3">3</a>
</nav>
```

| Attribute | Values | Default |
|---|---|---|
| `aria-current` | on the current page | — |
| `aria-disabled="true"` | previous or next at the ends | — |

**When to use what:** Use for long, ordered data that people jump around in. For feeds use load more or infinite scroll.

**Do**
- Show the first, last and the pages around the current one.

**Don't**
- Don't show every page number of a long set.

**Accessibility:** A `<nav>` with a label; icon items need `aria-label`; the current page has `aria-current="page"`.

**Tokens:** surface-container roles, `on-surface`, `on-surface-variant`, shape `full` and `large`, spacing `--s4-space-*`, spring tokens. No outlines (decision 0023).
