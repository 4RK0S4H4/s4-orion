# Accordion

Sections that open and close. Built on native `<details>`, so it needs no JavaScript.

```html
<div class="s4-accordion">
  <details class="s4-accordion-item" name="faq" open>
    <summary>What is autopay?<span class="s4-icon" data-icon="chevron-down"></span></summary>
    <div class="s4-accordion-body">Pays the bill on its due date.</div>
  </details>
</div>
```

| Attribute | Values | Default |
|---|---|---|
| `name` on every `<details>` | a shared string: only one stays open | independent |
| `open` | starts expanded | closed |

**When to use what:** Use for FAQs, settings groups and long forms split into parts. For switching between views use tabs.

**Do**
- Keep titles short and in Title Case; body text in sentences.
- Put the most important item first and open.

**Don't**
- Don't nest accordions.
- Don't hide content people need to compare side by side.

**Accessibility:** `<summary>` is a native disclosure button: Space and Enter toggle it and screen readers announce expanded or collapsed. The chevron is decorative.

**Tokens:** surface-container roles, `on-surface`, `on-surface-variant`, shape `full` and `large`, spacing `--s4-space-*`, spring tokens. No outlines (decision 0023).
