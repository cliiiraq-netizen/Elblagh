# Responsive report

Viewports swept: 320, 375, 390, 430 (dark + light), plus browser_audit 9 viewports (landing) and site-qa at iPhone 13, 820×1180 tablet, 1440 desktop.

| Check | Baseline | After |
|---|---|---|
| Page-level horizontal overflow | 0 | 0 |
| Elements beyond the viewport (screens) | 2 (live, stickers @320) | 0 |
| Clipped text | 0 | 0 |
| Small tap targets (screens with <32px text buttons) | 14 | 2 (admin export 32px, compose "change" — enlarged via padding, still reported by bounding box) |
| Mobile landing height @360 | 10,776px | reduced (2-column compact cards) |

Fixes: see AUTO-FIX-LOG.md (RS-001 … RS-008). Evidence: `evidence/mobile-sweep-*.json`, `screenshots/mobile-before/`, `screenshots/mobile-after/`.
