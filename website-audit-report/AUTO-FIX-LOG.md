# Auto-fix log

Checkpoint before changes: git `331980a`. Files changed: `index.html` (source, also used by the phone-frame demo), `tools/site.css`, `tools/site.js`; `site.html` rebuilt with `python3 tools/build_site.py`.

| # | Finding | Change | File |
|---|---|---|---|
| 1 | A11Y-001 | Contrast tokens: dark `--ink2/--ink3`; light `--ink2/--ink3/--ytext/--ok/--warn/--bad/--info`; light switches stay #14A86B | index.html |
| 2 | RS-002 | `.stk-grid` minmax(min(100%,330px),1fr) | index.html |
| 3 | A11Y-002 | Padding on `.selr button`, `.addr button`, `.sec-t button`, `.lp-card a.try`, footer links, `.linkb` | index.html, site.css |
| 4 | A11Y-003 | aria-label on governorate selects | index.html |
| 5 | Feature | Theme preference Light/Dark/Auto (`eb_theme_pref`), live device-change listener, `theme-color` meta, Appearance switch in app Account, `theme-pref` action | index.html |
| 6 | RS-007 | Header theme button visible on all widths; only language buttons hide ≤560px | site.css |
| 7 | Feature | Prototype menu: Appearance (3-way) section | site.js |
| 8 | RS-005 | Prototype handle → 20px "Menu" tab in the top safe area; full-screen content padded 24px | site.css, site.js |
| 9 | RS-004 | `.lp-plan .lp-btn{flex:none}` | site.css |
| 10 | RS-003 | Hero CTAs stack full-width, no wrap ≤440px | site.css |
| 11 | RS-001 | `.flow` single column minmax(0,1fr); pcol width 100% max 372px ≤860px | site.css |
| 12 | RS-006 | Two-column compact cards (situations, steps, prototype links) ≤640px; tighter sections | site.css |
| 13 | A11Y-004 | `.lp-biz .lp-eye` yellow on black | site.css |
| 14 | RS-008 | Booking counter bar on its own row ≤640px | site.css |
| 15 | A11Y-005 | `aria-hidden` on decorative step numbers | site.js |
