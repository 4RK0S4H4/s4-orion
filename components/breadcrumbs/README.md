# Breadcrumbs

Where you are in a hierarchy. Links are pills; the current page is plain text.

```html
<nav class="s4-breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a class="s4-breadcrumb-link" href="/">Home</a></li>
    <li aria-current="page">Electric Co.</li>
  </ol>
</nav>
```

| Attribute | Values | Default |
|---|---|---|
| `aria-current="page"` | on the last `<li>` | — |

**When to use what:** Use on desktop and tablet for deep hierarchies. On phones prefer a back button in the top app bar.

**Do**
- Keep labels short; use the page title as the last item.

**Don't**
- Don't use as primary navigation.
- Don't include the current page as a link.

**Accessibility:** A `<nav>` with a label, an ordered list and `aria-current="page"` on the last item. The separators are decorative.

**Tokens:** surface-container roles, `on-surface`, `on-surface-variant`, shape `full` and `large`, spacing `--s4-space-*`, spring tokens. No outlines (decision 0023).
