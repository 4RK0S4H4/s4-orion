# 0020: Orion becomes its own language (proposed, 2026-11-10)

**Status:** proposed. Waiting on the owner's picks in the [Direction Lab](../../explore/direction.html). Nothing in the
system has changed yet.

## What the owner asked for

Move away from Material 3 Expressive and make Orion unique:

- no sharp corners anywhere;
- a generally **flat** look; **depth only through blur** (floating chrome and overlays, as today);
- no shadows, or very minimal ones (already true since 0017);
- **simpler motion** than the container transform;
- compatible with "pretty much everything", good on phone and desktop, like a real framework.

## What stays

Monochrome default with one optional seed; Inter; Solar icons behind semantic names; Title Case labels; the glass
AA guarantee and its solid fallbacks (high contrast, reduced transparency, no backdrop-filter); glass only on floating
chrome and overlays; content always solid.

## What this supersedes once decided

- Shape: the M3 Expressive corner scale (0003, `states-shape` Shape A).
- States and component looks taken from stock M3 (0001, 0003, 0009, 0011 where they follow M3).
- Motion: container transform / unfold / shared axis / M3 Expressive springs (0004, transitions lab, 0018). The
  replacement is one short fade-based family with a single easing curve and two durations; reduced motion = fades only.
- Possibly the token names (`--md-sys-*` to `--s4-*`, old names as aliases for one release): a major version.

## Questions in the lab

Flat surfaces (tone steps / hairlines / islands), corners (soft / round / squircle with round fallback), controls
(ink / tonal / ink and ghost), depth (frost / deep frost / blurred page), phone nav (floating pill / full bar / icon
dock), type voice, motion (fade and rise / fade and settle / fade only / slide), framework shape (drop-in / plus web
components / plus framework packages), token names.

## Compatibility target (proposed)

Safari and iOS 15.4+, Chrome and Edge 100+, Firefox 103+. No build step for apps; plain HTML or any framework.
Progressive enhancement for every effect: `backdrop-filter` (solid fallback), `corner-shape` (round fallback),
container queries (media query fallback), `:has()` never required, `color-mix()` only where 15.4+ has it (else
precomputed tokens). Motion uses CSS transitions and the Web Animations API only.

## Plan after the picks (pause for approval after step 1 and step 4)

1. Record the picks here; update `philosophy.md` and the foundations docs.
2. Tokens: new shape scale, surface tones, motion (one easing, two durations), elevation removed; token renames if picked.
3. Components: restyle all 33 to the new language; replace `components/motion` (container transform, emerge) with the
   fade family; drop M3-only variants that no longer fit. Gallery and reference pages follow.
4. Demo rebuilt from the skill; page checker clean at 390 and 1280; owner checks on the iPhone.
5. Skill rewrite (SKILL.md, references), CHANGELOG as **2.0.0** (1.0.0 was never released, so possibly fold into 1.0.0).
