# 0040: Docked glass lights only its free edge

Date: 2026-11-13. Refines 0039. Owner: a surface docked to the screen edge should not have the rim, glow or shade on the edge that touches the screen.

Each glass surface now has per-edge switches (`--_kt`, `--_kb`, `--_kl`, `--_kr`, and `--_lit` to use the top alpha on a side edge). Floating glass (menus, dialogs, FABs, toolbars, tooltips) lights top and bottom as before. Docked surfaces light only the edge facing the content: top bar its bottom edge, bottom nav, docked toolbar and bottom sheet their top edge, modal rail its right edge, side sheet its left edge. The glow and shade follow the same switches. No tokens changed.
