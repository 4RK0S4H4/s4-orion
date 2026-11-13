# 0038: Floating bars, tried and reverted

Date: 2026-11-13. Owner asked for everything to float (top bar, bottom nav, rail). Tried in three forms: always-glass inset bars and rail, then a row of separate glass nav buttons, then a top bar made of separate glass buttons (round leading button, title pill, actions pill) like iOS with the bottom nav as a floating pane.

Outcome: the owner asked to go back to how it was before. The top app bar, navigation bar and navigation rail are as in decision 0013 and earlier: full-width, docked to the screen edges, glass once content scrolls under them (top bar) or always (nav bar), with the single-line edge. No tokens changed.

If this comes up again: the working CSS lives in git history (commit d2794fa, top bar parts as glass; 85662d6, floating pane nav bar and rail).
