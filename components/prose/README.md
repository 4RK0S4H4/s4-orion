# Prose

S4 addition. Long-form text: articles, help pages, release notes, terms, AI answers. The one place plain HTML elements
(`h2`, `p`, `ul`, `blockquote`, `pre`) get styled, and only inside `.s4-prose`.

```html
<main class="s4-content" data-width="reading">
  <article class="s4-prose">
    <h1>Getting Paid Faster</h1>
    <p class="s4-prose-lead">Three habits that cut the time between invoice and payment.</p>
    <h2>Send Invoices the Same Day</h2>
    <p>Clients pay in the order invoices arrive. <a href="#">See the data</a>.</p>
    <ul><li>…</li></ul>
    <blockquote>…</blockquote>
    <pre><code>…</code></pre>
  </article>
</main>
```

| Element | Look |
|---|---|
| text | body-large, line height +4, about 70 characters a line |
| `h1` / `h2` / `h3` / `h4` | headline-large / headline-small / title-large / title-medium, emphasized weight, Title Case |
| `.s4-prose-lead` | the intro paragraph, title-large size, on-surface-variant |
| `a` | primary, underlined |
| `blockquote`, `pre` | surface-container-low / -high, large corners |
| `code`, `kbd` | monospace on surface-container-high |
| `hr`, `figure`, `figcaption`, `img` | divider; captions body-small; images with large corners |

**Do**
- Use real heading levels in order; the look follows the level.
- Use a `data-width="reading"` page so the measure stays comfortable on desktop.

**Don't**
- Don't put app UI (lists of records, forms) inside prose; those are components.

**Accessibility:** links are underlined (not color alone); text meets AA in every mode.

**Tokens:** `--md-sys-typescale-*`, `--md-sys-color-primary`, `--md-sys-color-surface-container-low/-high`,
`--md-sys-shape-corner-large`, `--s4-size-divider`.
