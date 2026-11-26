# Builds order.html and home.html from tools/order.template.html and tools/home.template.html,
# pulling brand assets (fonts, sticker design, QR, logo, icons) from app.html.
# Usage: python3 tools/build_order.py  (builds both pages)
import os, re, sys
D = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, '..', 'app.html'), encoding='utf-8').read()

def between(a, b, s=src, inclusive_a=True):
    i = s.find(a); j = s.find(b, i + len(a))
    if i < 0 or j < 0: sys.exit(f'marker not found: {a[:40]} / {b[:40]}')
    return s[i:j] if inclusive_a else s[i + len(a):j]

lines = src.split('\n')
fonts = '\n'.join(l for l in lines if l.startswith("@font-face{font-family:'Thmanyah Sans'") or l.startswith("@font-face{font-family:'Expo Arabic'"))
logo_css = between('.logo{display:inline-block', '\n\n')
sticker_css = between('/* sticker components (1em = 1mm) */', '/* ============ Admin')
js_qr = next(l for l in lines if l.startswith('const QR = '))
js_icons = between('const I = (() => {', '\n})();') + '\n})();'
js_cls = next(l for l in lines if l.startswith('const cls = '))
js_logo = between('const LOGO_W = ', 'const BRAND')
js_qrsvg = between('function qrSVG(', '\nconst fmtCode')
js_fmt = next(l for l in lines if l.startswith('const fmtCode = '))
js_sticker = between('function stickerHTML(', '\nfunction renderStickers')

for name in ['order', 'home', 'home2', 'home3']:
    tpl = open(os.path.join(D, name + '.template.html'), encoding='utf-8').read()
    out = (tpl.replace('/*@FONTS@*/', fonts)
              .replace('/*@STICKER_CSS@*/', logo_css + '\n' + sticker_css)
              .replace('/*@BRAND_JS@*/', '\n'.join([js_qr, js_icons, js_cls, js_logo, js_qrsvg, js_fmt, js_sticker])))
    for k in ['/*@FONTS@*/', '/*@STICKER_CSS@*/', '/*@BRAND_JS@*/']:
        assert k not in out
    open(os.path.join(D, '..', name + '.html'), 'w', encoding='utf-8').write(out)
    print('built', name + '.html', len(out))
