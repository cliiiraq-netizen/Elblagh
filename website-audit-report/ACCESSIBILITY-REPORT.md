# Accessibility report

Method: measured contrast of every text element (both themes, 4 mobile widths), touch-target sizes, form labels, browser_audit built-in checks. **axe-core not installed — automated WCAG rule scan not performed.**

| ID | Issue | Before | After |
|---|---|---|---|
| A11Y-001 | Secondary text (`--ink3`) | 3.51:1 dark / 3.08:1 light | ≥4.5:1 (#8E8E88 / #6A6862) |
| A11Y-001 | Light status colours (green/red/amber/blue/yellow text) | 2.6–4.4:1 | darkened to ≥4.5:1; switches keep the bright green |
| A11Y-002 | Text-only tap targets | 20–22px | ≥40px hit area via padding |
| A11Y-003 | Governorate selects | no accessible name | aria-label |
| A11Y-004 | Business eyebrow (light) | 2.9:1 | yellow on black |
| A11Y-005 | Decorative step numbers | 1.2:1 | accepted, aria-hidden |

Screen readers, keyboard-only journey and real assistive technology were not tested.
