# Avatar

A person or thing as a circle: initials, a photo or an icon. Moved out of the list so it works anywhere.

```html
<span class="s4-avatar">MC</span>
<span class="s4-avatar" data-size="l" data-status="online" aria-label="Maya Chen, online">MC</span>
<div class="s4-avatar-group"><span class="s4-avatar">MC</span><span class="s4-avatar" data-more>+4</span></div>
```

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `xs` 24, `s` 32, `m` 40, `l` 56, `xl` 80 | `m` |
| `data-tone` | `secondary`, `tertiary`, `neutral` | primary container |
| `data-status` | `online`, `busy`, `away` | none |
| `data-more` | the "+3" overflow avatar of a group | — |

**When to use what:** Initials when there is no photo; an icon for a thing or a generic user. Use the group for collaborators.

**Do**
- Give a photo an `alt` with the name; give a status avatar an `aria-label` that says the status.

**Don't**
- Don't rely on the status dot alone: say the status in text somewhere near.
- Don't put more than five avatars in a group; add the +N avatar.

**Accessibility:** Initials are text; photos need `alt`. The status dot is decorative, so put the status in `aria-label`.

**Tokens:** surface-container roles, `on-surface`, `on-surface-variant`, shape `full` and `large`, spacing `--s4-space-*`, spring tokens. No outlines (decision 0023).
