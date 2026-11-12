# Banner

A message that stays on the page until it is handled or dismissed. Not a toast; that is the snackbar.

```html
<div class="s4-banner" role="status" data-tone="error">
  <span class="s4-icon" data-icon="warning"></span>
  <p class="s4-banner-text">One payment failed.</p>
  <div class="s4-banner-actions"><button class="s4-button" data-variant="text" type="button">Update Card</button></div>
  <button class="s4-icon-button" type="button" data-dismiss aria-label="Dismiss"><span class="s4-icon" data-icon="close"></span></button>
</div>
```

| Attribute | Values | Default |
|---|---|---|
| `data-tone` | `primary`, `secondary`, `tertiary`, `error` | neutral |
| `data-dismiss` | on a button inside: fades the banner out and fires `s4-close` | — |

**When to use what:** Use a banner for something that affects the whole page or account and stays true until acted on. Use a snackbar for the result of an action.

**Do**
- Say what happened and what to do, with one text button for the fix.

**Don't**
- Don't stack more than one banner.
- Don't use `role="alert"` unless it is an error that needs attention now.

**Accessibility:** `role="status"` is announced politely; `role="alert"` interrupts. The dismiss button needs an `aria-label`.

**Tokens:** surface-container roles, `on-surface`, `on-surface-variant`, shape `full` and `large`, spacing `--s4-space-*`, spring tokens. No outlines (decision 0023).
