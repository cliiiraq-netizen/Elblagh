# Eblagh — project design system (memory for future audits)
- Brand: yellow `--y #FFC816`, ink black `#0E0E0F`; fonts: headings Expo Arabic, body Thmanyah Sans (Kurdish: Noto Kufi/Sans Arabic).
- Themes: tokens on `:root[data-theme="dark|light"]`; preference key `eb_theme_pref` = light | dark | auto (auto follows prefers-color-scheme).
- Text tokens must stay ≥4.5:1: dark ink3 #8E8E88, light ink3 #6A6862; light status colours ok #0A7A4C, bad #C22A30, warn #9A5B00, info #1D5FB8, ytext #7A5800.
- Mobile (≤640px): phone routes render full-screen (no frame/status bar); prototype menu = top "Menu" tab; text buttons need ≥40px hit area.
- Source of truth: index.html + tools/site.css + tools/site.js → `python3 tools/build_site.py` → site.html.

## Type, size and field system (UI/UX Pro Max pass, 2026-11-26)
- Type scale (px): 12 · 13 · 14 · 15 · 16 · 18 · 20 · 22 · 26 · 32 · display via clamp(). Never below 12px. Mobile body 16px; inputs always 16px (no iOS zoom). Body line-height 1.65.
- Arabic headings: letter-spacing 0 (tracking breaks letter joining). Headings text-wrap: balance; paragraphs: pretty.
- Numbers (prices, counters, codes, timers, KPI): font-variant-numeric: tabular-nums.
- Radii on a 4px grid (4/8/12/16/20/24); phone frames and pills excepted. Inputs and small buttons 12px; primary buttons 16px.
- Fields: visible label above (14px/600, linked with for/id — linkLabels() links any .field automatically), height 52 (compact 48), 1.5px border, focus = yellow border + 4px soft ring, invalid = aria-invalid + red border + message below the field (.ferr, aria-describedby). Custom select chevron (left in RTL). Correct input types/autocomplete (tel, name, number).
- Buttons: pbtn 52, ghost 48, btn-y/o 48, tb-btn ≥36; on touch screens all chips/segments/small buttons ≥44px.
- Focus: visible 2px yellow outline on every button/link/summary (never removed).
- Validation errors are shown inline (plus a summary banner where present), not as success-styled toasts.
