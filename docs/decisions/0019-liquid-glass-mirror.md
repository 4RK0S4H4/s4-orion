# 0019: Liquid glass over real pages, through a mirror (2026-11-07)

Status: **abandoned by the owner (2026-11-10).** Liquid glass is dropped for good; 0004 glass (with 0013-0016) stays. Lab 5 is kept as a record. Do not reopen unless WebKit ships `backdrop-filter: url()` refraction.
Reopens 0006/0012 at the owner's request ("I really liked how it looked in the liquid glass lab; can you make it usable?").

## Why the earlier tries failed on iPhone
- `backdrop-filter: url(#svg)` (real refraction of whatever is behind) is Chromium only; WebKit ignores it.
- A snapshot of the page drawn into WebGL (Lab 4): WebKit taints the canvas (0012).

## The new way
WebKit does support `filter: url(#svg)` on an ordinary element. So each glass surface holds a **mirror**: an inert, invisible-to-AT
copy of the content that scrolls under it, kept lined up with the page (transform on scroll, re-copied on DOM changes), and the
SVG filter is applied to the copy: blur, the lab's lens displacement map (convex squircle bezel, Snell's law), saturation and
the glass contrast squeeze. The glass tint and frost line are laid on top from the glass tokens. Engine: `explore/lib/liquid-mirror.js`.

## Guarantee
Text stays AA: the copy gets the same saturation/contrast/brightness squeeze as `glass.css`, and the middle of every surface gets the
same tint, so `check-glass` still holds (the page checker passes on the lab phone with the mirrors on). Options C and D make only the
outer 12px band (the surface's padding, where the glass bends and no text sits) clearer, as 0006 already allowed.

## Options in the lab
A today's blur; B soft liquid (bend eases in, no seam, same tint); C liquid lens (bends to the rim, lighter frost, clearer rim);
D extra lens. (A `demo/index.html?liquid` hook existed during the trial; removed when abandoned.)

## Limits to weigh
- Cost: the content behind is duplicated once per liquid surface (fine for 2-3 bars; not for every menu and dialog).
- The copy is a copy: hover states, running animations and video don't show in it; form values and canvases are copied.
- Scope proposal if adopted: top app bar, nav bar, toolbars (`S4.glass.liquid`, opt-in or default); menus, dialogs and sheets keep
  today's blur (their backdrop is the whole page plus a scrim). Blur stays the fallback (reduced transparency, high contrast,
  no SVG filter support).
- Not verified on Safari here (no WebKit in the sandbox). The lab's status line reports what ran and dropped scroll frames.

## iPhone check (2026-11-10)
Round 1: no glass at all on iOS 18.7. The check page showed SVG blur and a generated (`feTurbulence`) displacement work in WebKit, but a
displacement map from an image (`feImage`, data URL) is ignored. The lens is now built from filter primitives only (`lensPrims`: the
glass shape flooded and blurred, its slope via 1px offsets, a lookup table to the lab's Snell profile), and the tint is a plain rgba()
set from JS. Round 2 pending; if it still fails, liquid glass is abandoned.

## Outcome (2026-11-10)
Round 3 confirmed the compositing cause (a layered child escapes the SVG filter in WebKit), but on the owner's iPhone the bars still
didn't look like working liquid glass. A search found no reliable public method: every published liquid-glass library refracts with
`backdrop-filter: url()`, which runs only in Chromium, and falls back to plain blur on Safari/iOS. The owner abandoned it.
