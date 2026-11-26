# Eblagh — project design system (memory for future audits)
- Brand: yellow `--y #FFC816`, ink black `#0E0E0F`; fonts: headings Expo Arabic, body Thmanyah Sans (Kurdish: Noto Kufi/Sans Arabic).
- Themes: tokens on `:root[data-theme="dark|light"]`; preference key `eb_theme_pref` = light | dark | auto (auto follows prefers-color-scheme).
- Text tokens must stay ≥4.5:1: dark ink3 #8E8E88, light ink3 #6A6862; light status colours ok #0A7A4C, bad #C22A30, warn #9A5B00, info #1D5FB8, ytext #7A5800.
- Mobile (≤640px): phone routes render full-screen (no frame/status bar); prototype menu = top "Menu" tab; text buttons need ≥40px hit area.
- Source of truth: index.html + tools/site.css + tools/site.js → `python3 tools/build_site.py` → site.html.
