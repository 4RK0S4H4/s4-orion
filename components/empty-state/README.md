# Empty State

What a list, table or search shows when there is nothing to show yet.

```html
<div class="s4-empty">
  <span class="s4-empty-icon"><span class="s4-icon" data-icon="search"></span></span>
  <h2 class="s4-empty-title">No Results</h2>
  <p class="s4-empty-text">Try a different word, or clear the search.</p>
  <button class="s4-button" data-variant="tonal" type="button">Clear Search</button>
</div>
```

| Attribute | Values | Default |
|---|---|---|


**When to use what:** Use for first use, no results, and cleared lists. Pair a first-use empty state with the one action that fills it.

**Do**
- Say what is missing and the next step in one sentence.

**Don't**
- Don't blame the user or apologize.
- Don't show an empty state while loading; use a skeleton.

**Accessibility:** The icon is decorative; the title is the heading for the region.

**Tokens:** surface-container roles, `on-surface`, `on-surface-variant`, shape `full` and `large`, spacing `--s4-space-*`, spring tokens. No outlines (decision 0023).
