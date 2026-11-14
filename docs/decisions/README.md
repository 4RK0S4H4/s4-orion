# Decisions

Every design decision, with what still applies. Read this instead of the forty records; open a record only for its
reasoning. A decision isn't reopened without the owner; a new one gets the next number.

**Status:** **Active** (applies today) · **Refined** (applies, with later records adjusting details) · **Superseded**
(replaced; the newer record wins) · **Not adopted / Abandoned** (explored, dropped) · **History** (a review or a log).

## What applies today, by topic

| Topic | Read |
|---|---|
| Base system: M3 Expressive roles, type, shape, springs, monochrome default, Inter, Title Case | 0001, 0003 |
| Repo, build, generated files | 0002, 0041 |
| Glass: where it goes (chrome and overlays only, two layers max, solid fallbacks, AA floor) | 0004 |
| Glass: the look (tint 75%, blur 8px, saturate 150%, no shadow) | 0021, 0028, 0035, 0017 |
| Glass: the edge (thin rim top and bottom, glow or shade by lightness, width by screen density, docked bars light only the free edge) | 0034, 0036, 0037, 0029, 0040 |
| Items on glass keep their own color | 0015 |
| Motion: pop, drop, slide, rise, shared axis; only transform and opacity | 0022, amended by 0042 (liquid ink) |
| Shape and fill: nothing outlined, small things are pills, no sharp corners, inputs medium-rounded | 0023, 0024, 0025 |
| Button groups: the Joined Capsule | 0026 |
| FAB: glass tinted with its own color | 0025, 0032 |
| Icons: Solar, menu = dots | 0007 |
| Framework: layouts, page widths, templates, new content components | 0041 |

## All records

| # | Decision | Status |
|---|---|---|
| 0001 | Phase 1 audit of S4 Material and the base decisions | Active (motion parts superseded by 0022, glass by 0004/0021) |
| 0002 | Repo structure | Active (templates added in 0041) |
| 0003 | Tokens | Active |
| 0004 | The glass layer: where glass goes and its contrast guarantee | Active (the numbers superseded by 0021 and later) |
| 0005 | Phase 6 review of the demo | History |
| 0006 | Liquid glass, the Material way | Not adopted |
| 0007 | Icon Lab answers (menu = dots) | Active |
| 0008 | Owner critique 2026-11-07 | Refined (motion parts superseded by 0022) |
| 0009 | Style Lab: text fields, checkboxes, tabs | Refined by 0023, 0024 (checkboxes are filled circles; tabs keep the tray) |
| 0010 | Owner critique round 2: pill snackbar, round tabs, sliding nav highlight | Active |
| 0011 | Style Lab 2: notched groups, centered-card phone sheet | Groups superseded by 0026; phone sheet active |
| 0012 | Liquid glass on real pages (WebKit) | Superseded by 0019, then abandoned |
| 0013 | Thin frost line edge, glass without shadow | Edge superseded by 0021+; no shadow active (0017) |
| 0014 | Calmer color through glass | Superseded by 0021 (saturate 150%) |
| 0015 | Items on glass | Active |
| 0016 | Thinner frost line on bars | Superseded by 0027+ and 0040 |
| 0017 | No shadows anywhere | Active |
| 0018 | Menus emerge from under their button | Superseded by 0022 (menus drop) |
| 0019 | Liquid glass through a mirror | Abandoned |
| 0020 | Orion as its own flat language | Not adopted, except the glass (0021) |
| 0021 | Glass from the playground | Active (numbers refined by 0028, 0035) |
| 0022 | Simpler motion | Active |
| 0023 | Filled and pills; the Orion Showcase demo | Active |
| 0024 | Tray groups, squarer inputs, glass drop-downs | Active (tray groups replaced by 0026) |
| 0025 | No sharp corners, glass FAB, eight more components | Active |
| 0026 | Joined Capsule button groups | Active |
| 0027 | Glass edge matches the playground | Refined by 0028–0037 |
| 0028 | Owner's glass numbers, edge glow and sheen | Refined by 0034–0037 |
| 0029 | Edge width follows the screen density | Active |
| 0030 | Glow follows the edge light | Refined by 0036, 0037 |
| 0031 | Edge light color from the surface | Active |
| 0032 | Colored FABs at 90% tint | Active |
| 0033 | Top and bottom lit equally | Active |
| 0034 | Edge calibrated to the iOS tab bar | Active |
| 0035 | Owner's tailored glass set; light edge quiz | Active |
| 0036 | Glow inverts into an edge shade on light surfaces | Active |
| 0037 | Glow / shade flip at OKLCH lightness 0.6 | Active, awaiting the owner's iPhone check |
| 0038 | Floating bars | Tried and reverted |
| 0039 | Docked glass gets the full edge | Superseded by 0040 |
| 0040 | Docked glass lights only its free edge | Active, awaiting the owner's iPhone check |
| 0041 | Orion as a framework: layouts, templates, content components | Proposed (built, awaiting the owner's review) |
| 0042 | Liquid motion for ink, plain motion for glass | Active (row hover still open) |
