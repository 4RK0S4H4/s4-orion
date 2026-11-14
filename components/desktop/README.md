# Desktop Windows

What an Orion app needs to live in a desktop window or ship as a desktop app (an installed web app, Electron, Tauri),
on the same shell and components (decision 0043).

```html
<div class="s4-app" data-window data-density="auto">
  <header class="s4-titlebar"><span class="s4-titlebar-title">Ledger</span></header>
  <nav class="s4-nav-rail" aria-label="Main">…</nav>
  <div class="s4-app-body">…</div>
</div>

<button class="s4-button" data-shortcut="mod+n">New Bill <kbd class="s4-kbd"></kbd></button>
<li data-context-menu="row-menu">…</li>
<div class="s4-menu" id="row-menu">…</div>
```

| Class / attribute | What |
|---|---|
| `data-window` on `.s4-app` | The app fills the window and never scrolls as a page; the body and each pane scroll on their own. Thin scrollbars, arrow cursor on controls, chrome text can't be selected. |
| `data-density="auto"` | Pointer-sized controls where the pointer is a mouse (see `base/density.css`); `compact` forces it. |
| `.s4-titlebar` | A title bar that drags the window. Buttons, links and fields inside stay clickable. Leaves room for the system's window buttons (window controls overlay). Hidden under 600. |
| `data-controls="start"` on the title bar | Room for macOS traffic lights in a frameless window. |
| `.s4-titlebar-title` | The centered title; `data-align="start"` on the bar puts it at the start. |
| `.s4-window-controls` > `.s4-window-control[data-window-action="minimize\|maximize\|close"]` | Window buttons for frameless shells; each click fires `s4-window { action }` on the document. Wire that to the shell. |
| `data-shortcut="mod+k"` | That key combination clicks the element. `mod` is ⌘ on Apple platforms, Ctrl elsewhere; also `shift`, `alt`. |
| `<kbd class="s4-kbd">` | Shows a shortcut. Empty inside a `data-shortcut` element (or with `data-for="id"`), it is filled in the platform's spelling. |
| `data-context-menu="menu-id"` | Right-click (long press on touch) opens that menu at the pointer. The menu fires `s4-context { target }` and has `.contextTarget`. |

**When:** `data-window` for anything used like an application (mail, an editor, a dashboard that stays open). A page
people read (article, landing page) keeps normal page scrolling.

**Do:** give every primary action a shortcut and show it in its tooltip or menu item; keep right-click menus short and
make every item reachable another way. **Don't:** draw `.s4-window-controls` when the system already draws its own;
don't put the only way to do something in a context menu.

**Accessibility:** shortcuts never fire while typing unless they use `mod`; context menus are normal menus (arrows,
Escape, typeahead) and return focus to the row.

**Tokens:** `--s4-size-titlebar`, `--s4-density-compact-*`.
