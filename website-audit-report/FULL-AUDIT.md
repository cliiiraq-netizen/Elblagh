# Full audit (technical) — Eblagh website prototype (`site.html`)

Date: 2026-11-26 · Auditor: Al-Mujarrib (Claude) · Checkpoint before changes: git commit `331980a`

## 1. Scope and method
- **Request:** "there are errors in the mobile design" + add a dark mode and a light (day) mode.
- **Target:** `site.html` (single-file static prototype, hash routes `#/`, `#/r/EB4471`, `#/app`, `#/start`, `#/book`, `#/business`, `#/admin`, `#/stickers`, `#/live`), generated from `index.html` + `tools/site.css` + `tools/site.js` by `tools/build_site.py`.
- **Run:** served locally (`python3 -m http.server`, 127.0.0.1) and tested in Chromium (Playwright).
- **Modules run:** responsive (full), accessibility (contrast, touch targets, labels; axe-core not installed), functional QA (journey + regression scripts), theme feature tests.
- **Not run separately (not assessed):** UX, UI critic, business owner, conversion, design consistency, performance, workflow optimizer. Their template reports are marked NOT PERFORMED.
- **Why a custom sweep:** `browser_audit.mjs` discovers pages by links, so it audited only the landing page (hash routes are one document). A dedicated sweep (`evidence/sweep.js`) covered every route and 21 sub-screens at 320/375/390/430 px in dark and light (= 8 combinations × ~25 screens), measuring overflow, clipped text, touch targets and contrast, with screenshots.

## 2. Discovery
Static prototype, no build tools beyond Python, no backend. Trilingual (ar/en/ckb). A light theme already existed in the tokens but the toggle was hidden on mobile and there was no "follow the device" option.

## 3. Baseline evidence
- `screenshots/baseline/` (browser_audit, 9 viewports, landing)
- `screenshots/mobile-before/` (contact sheets c1/c2 + 320px home/live/stickers)
- `evidence/mobile-sweep-baseline.json`, `evidence/browser-baseline.json`, `evidence/static-findings.json`

## 4. Findings by priority
| ID | Sev | Module | Title | Source | Status |
|---|---|---|---|---|---|
| RS-001 | P1 | responsive | `#/live` phone frame overflows at 320px | browser | fixed |
| RS-003 | P1 | responsive | Hero CTA labels break into 2–3 lines (320–375px) | browser | fixed |
| RS-004 | P1 | responsive | Pricing "Book" buttons collapse to ~23px height | browser | fixed |
| RS-007 | P1 | responsive | Dark/light toggle hidden in mobile header | static | fixed |
| A11Y-001 | P1 | accessibility | Secondary text 3.08–3.83:1 in both themes | measured | fixed |
| RS-002 | P2 | responsive | Sticker cards overflow at 320px | browser | fixed |
| RS-005 | P2 | responsive | Floating prototype handle covers app content | browser | fixed |
| RS-006 | P2 | responsive | Landing page 10,776px long at 360px | browser | fixed |
| A11Y-002 | P2 | accessibility | Text-only tap targets ~20–22px | browser | fixed |
| A11Y-003 | P2 | accessibility | Governorate selects without accessible name | static | fixed |
| A11Y-004 | P2 | accessibility | "For business" eyebrow 2.9:1 in light mode | measured | fixed |
| RS-008 | P3 | responsive | Booking counter wraps "100" | browser | fixed |
| A11Y-005 | P4 | accessibility | Decorative step numbers low contrast | measured | accepted (aria-hidden) |

Tool findings judged **not defects** (with reason):
- B-003 "language button does nothing": it is the already-selected language (expected).
- S-001 "no `<h1>`": the h1 is rendered by JavaScript; it exists in the browser.
- S-005 innerHTML from variables: user text goes through `esc()`; prototype architecture, unchanged.
- S-004/S-006..S-009 (many font sizes, radii, shadows, spacing): design-system debt, not a mobile defect; not changed (would alter the brand look).
- Remaining sweep contrast hits on yellow gradients / translucent notification cards: the probe ignores gradients and alpha; visually verified readable.

## 5. Feature added: Light / Dark / Auto
- Auto (default) follows the device setting and updates live if the device switches.
- Header button (now visible on mobile) toggles light/dark; the prototype menu and the app's **Account → Appearance** have a 3-way Light / Dark / Auto switch.
- The choice is saved; the browser `theme-color` follows the theme.
- Verified by `evidence/theme-test.js`: 18/18 PASS (device dark and device light).

## 6. Score (after, covered categories only)
`score-after.json`: **96.2** on 40.5% of the weights (responsive, accessibility, functional). **Not assessed:** UX, UI, business, conversion, design, workflow. This is not a full-site score.

## 7. Residual items
- Touch targets 38–42px in the site header (above WCAG 2.2 AA 24px minimum; below the 44px advisory).
- axe-core automated rule scan not performed (package not installed).
- Real devices (iOS Safari, Android Chrome) not tested; Chromium emulation only.
