# Messages

S4 addition. A conversation: chat, support threads, comments, an AI assistant. Bubbles are solid content; the composer
floats at the bottom over the thread, so it is glass.

```html
<ol class="s4-thread" aria-label="Conversation with Maya Chen">
  <li class="s4-thread-day">Today</li>
  <li class="s4-message"><p>Can you send the invoice?</p><span class="s4-message-meta">Maya · 9:41</span></li>
  <li class="s4-message" data-from="me"><p>Sent it a minute ago.</p><span class="s4-message-meta">9:42</span></li>
</ol>
<form class="s4-composer s4-glass">
  <button class="s4-icon-button" type="button" aria-label="Attach File"><span class="s4-icon" data-icon="attach"></span></button>
  <div class="s4-text-field"><textarea rows="1" aria-label="Message" placeholder="Message"></textarea></div>
  <button class="s4-icon-button" data-variant="filled" type="submit" aria-label="Send"><span class="s4-icon" data-icon="send"></span></button>
</form>
```

| Part / attribute | Values | Default |
|---|---|---|
| `.s4-thread` | the conversation, oldest first | — |
| `.s4-thread-day` | a day divider ("Today"), label-medium, centered | — |
| `.s4-message` | a bubble: body-large, large corners, a small corner on the speaker's side | theirs: surface-container-high, start side |
| `data-from="me"` | primary, on-primary, end side | — |
| `.s4-message-meta` | sender and time, label-small | — |
| `.s4-composer` | sticks to the bottom above the nav bar; add `s4-glass` | surface-container |

**Do**
- Put assistant answers with headings or lists in a `.s4-prose` inside the bubble, or full width without a bubble.
- Keep the composer's text field label-less with an `aria-label`; the send button is the one filled control.

**Don't**
- Don't color bubbles per person; mine and theirs is the only distinction.
- Don't make the thread its own scroll box; the window scrolls and the composer sticks.

**Accessibility:** an ordered list with an `aria-label`; announce new messages with an `aria-live="polite"` region if
they arrive while the person reads. Sender names are text, not only avatars.

**Tokens:** `--md-sys-color-primary`, `--md-sys-color-surface-container-high`, `--md-sys-shape-corner-large`,
`--md-sys-shape-corner-small`, `--md-sys-shape-corner-extra-large`, `--s4-app-inset-bottom`, `--s4-z-sticky`.
