# Regression tests (after fixes)

| Suite | Scope | Result |
|---|---|---|
| site-qa | 9 routes × all sub-screens × 3 languages × phone/tablet/desktop: JS errors, undefined/NaN text, overflow, full-width app on phone | **NO ISSUES** |
| site-test | Mobile report → app reply → back; cross-tab push and reply on desktop | **7/7 PASS** |
| feat (index.html) | 21 feature scenarios (activation, notes, errors, booking, business, referral, payment failure, admin orders, batches) | **21/21 PASS** |
| qa (index.html) | All modes × screens × 3 languages × desktop/phone | **NO ISSUES** |
| theme-test | Auto follows device, header toggle, persistence, menu 3-way, app Appearance — device dark and light | **18/18 PASS** |
| mobile sweep after | overflow 2→0, clipped 0, tap-target screens 14→2, contrast screens 25→10 (remaining = decorative/gradient/alpha false positives, verified visually) | improved, no new issues |
| browser_audit after | landing, 9 viewports | 0 JS errors; residual P3 header targets 38–42px; P1 flag = decorative numbers (accepted) |
| visual_diff regression | 9 landing screenshots | 9 changed — expected (contrast tokens, CTA layout, header button); reviewed |

JavaScript errors in all suites: **0**.
