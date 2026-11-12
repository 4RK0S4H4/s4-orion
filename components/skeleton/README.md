# Skeleton

A quiet placeholder while content loads. Same shape and size as what will replace it. The pulse is opacity only.

```html
<div aria-busy="true">
  <div class="s4-skeleton" data-shape="text" style="width: 70%"></div>
  <div class="s4-skeleton" style="height: 7rem"></div>
</div>
```

| Attribute | Values | Default |
|---|---|---|
| `data-shape` | `text`, `pill`, `circle` | block with medium corners |

**When to use what:** Use a skeleton when the layout is known and the content takes more than about a second. Use progress when you can show how far along it is.

**Do**
- Set `aria-busy="true"` on the region and remove it when the content arrives.

**Don't**
- Don't show skeletons for less than a second; it flickers.
- Don't animate anything but opacity.

**Accessibility:** The pulse stops under `prefers-reduced-motion`. Skeletons carry no text; the busy region tells screen readers loading is happening.

**Tokens:** surface-container roles, `on-surface`, `on-surface-variant`, shape `full` and `large`, spacing `--s4-space-*`, spring tokens. No outlines (decision 0023).
