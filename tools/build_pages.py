# Builds the Eblagh inner pages (ewsali parity) from tools/pages/*:
#   how-it-works.html, contact.html, login.html, forgot-password.html,
#   privacy.html, terms.html, communications.html
# Each output is a single self-contained file in the project root. Fonts (Thmanyah Sans) and the
# brand mark (LOGO_W / MARK_H / MARK_D / markSVG) are pulled from app.html, like build_order.py does.
#
# Page sources (tools/pages/<name>.html) are split into blocks with <!--@meta-->, <!--@css-->,
# <!--@main-->, <!--@js--> markers. `layout: legal` pages put only <section>s in @main; they are
# wrapped by tools/pages/_legal.html, auto-numbered ("1. ..."), and get _legal.css.
#
# Usage: python3 tools/build_pages.py            (all pages)
#        python3 tools/build_pages.py login terms (some pages)
import os, re, sys, html

D = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(D, 'pages')
ROOT = os.path.join(D, '..')
PAGES = ['how-it-works', 'contact', 'login', 'forgot-password', 'privacy', 'terms', 'communications']

def read(*p):
    return open(os.path.join(*p), encoding='utf-8').read()

src_lines = read(ROOT, 'app.html').split('\n')
fonts = '\n'.join(l for l in src_lines if l.startswith("@font-face{font-family:'Thmanyah Sans'"))
if not fonts:
    sys.exit('Thmanyah Sans @font-face lines not found in app.html')

def line(prefix):
    for l in src_lines:
        if l.startswith(prefix):
            return l
    sys.exit(f'line not found in app.html: {prefix}')

brand_js = '\n'.join([line('const LOGO_W = '), line('const MARK_D = '), line('const markSVG = ')])

layout = read(P, '_layout.html')
base_css = read(P, '_base.css')
base_js = read(P, '_base.js')
legal_tpl = read(P, '_legal.html')
legal_css = read(P, '_legal.css')

# footer CSS stays in sync with home.html: take its top-level .site-footer / .foot-* / .lang-btn rules
home_tpl = read(D, 'home.template.html')
footer_css = '\n'.join(l for l in home_tpl.split('\n') if re.match(r'\.(site-footer|foot-|lang-btn)', l))
if '.foot-card{' not in footer_css:
    sys.exit('footer CSS not found in home.template.html')
base_css = base_css.replace('/*@FOOTER_CSS@*/', footer_css)

def blocks(text):
    parts = re.split(r'<!--@(\w+)-->', text)
    out = {}
    for i in range(1, len(parts), 2):
        out[parts[i]] = parts[i + 1].strip('\n')
    return out

def meta(text):
    m = {}
    for l in text.splitlines():
        if ':' in l and l.strip():
            k, v = l.split(':', 1)
            m[k.strip()] = v.strip()
    return m

def number_sections(sections):
    n = 0
    def rep(mo):
        nonlocal n
        n += 1
        return f'<h2 id="s{n}">{n}. '
    out = re.sub(r'<h2>', rep, sections)
    return out, n

def build(name):
    b = blocks(read(P, name + '.html'))
    m = meta(b.get('meta', ''))
    main, css = b.get('main', ''), b.get('css', '')
    if m.get('layout') == 'legal':
        sections, n = number_sections(main)
        main = (legal_tpl.replace('{{H1}}', m['h1']).replace('{{LEAD}}', m['lead'])
                .replace('{{UPDATED}}', m['updated']).replace('{{UPDATED_ISO}}', m['updated_iso'])
                .replace('{{SECTIONS}}', sections))
        css = legal_css + '\n' + css
        print(f'  {name}: {n} sections')
    out = layout
    for k, v in [('{{TITLE}}', html.escape(m['title'], quote=True)), ('{{DESC}}', html.escape(m['desc'], quote=True)),
                 ('{{NAME}}', name), ('{{MAIN_CLASS}}', m.get('main_class', ''))]:
        out = out.replace(k, v)
    # inline assets last so their contents are never scanned for {{...}} placeholders
    out = out.replace('{{MAIN}}', main)
    out = (out.replace('/*@FONTS@*/', fonts).replace('/*@BASE_CSS@*/', base_css).replace('/*@PAGE_CSS@*/', css)
              .replace('/*@BRAND_JS@*/', brand_js).replace('/*@BASE_JS@*/', base_js).replace('/*@PAGE_JS@*/', b.get('js', '')))
    for k in ['/*@FONTS@*/', '/*@BASE_CSS@*/', '/*@PAGE_CSS@*/', '/*@BRAND_JS@*/', '/*@BASE_JS@*/', '/*@PAGE_JS@*/']:
        assert k not in out, (name, k)
    left = re.findall(r'\{\{[A-Z_]+\}\}', out)
    assert not left, (name, left)
    open(os.path.join(ROOT, name + '.html'), 'w', encoding='utf-8').write(out)
    print('built', name + '.html', len(out))

for name in (sys.argv[1:] or PAGES):
    if name not in PAGES:
        sys.exit(f'unknown page: {name} (choose from {", ".join(PAGES)})')
    build(name)
