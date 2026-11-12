# Stepper

Progress through a fixed sequence of steps, such as a checkout or setup. Dots joined by a filled track.

```html
<ol class="s4-stepper" aria-label="Setup Progress">
  <li data-state="done"><span class="s4-step-dot"><span class="s4-icon" data-icon="check"></span></span><span class="s4-step-label">Account</span></li>
  <li data-state="current" aria-current="step"><span class="s4-step-dot">2</span><span class="s4-step-label">Payment</span></li>
  <li><span class="s4-step-dot">3</span><span class="s4-step-label">Review</span></li>
</ol>
```

| Attribute | Values | Default |
|---|---|---|
| `data-state` | `done`, `current` (upcoming has none) | upcoming |
| `aria-current="step"` | on the current step | — |

**When to use what:** Use for two to six steps that happen in order. For loose sections use tabs or an accordion.

**Do**
- Name every step; on phones only the current label shows.

**Don't**
- Don't use for more than six steps.
- Don't let the color be the only difference: done steps show a check.

**Accessibility:** An ordered list; the current step has `aria-current="step"`. The labels carry the meaning.

**Tokens:** surface-container roles, `on-surface`, `on-surface-variant`, shape `full` and `large`, spacing `--s4-space-*`, spring tokens. No outlines (decision 0023).
