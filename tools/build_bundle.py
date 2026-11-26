# Builds index.html: the whole Eblagh website in ONE self-contained file.
# Each built page (home, order, inner pages, demo app) is embedded and shown in a full-screen frame;
# links between pages are routed inside the file (#/order?plan=plus, #/terms, ...), so the
# back button, deep links and every page's own design and scripts keep working unchanged.
# Fonts are stored once and shared by all pages.
# Usage: python3 tools/build_order.py && python3 tools/build_site.py && python3 tools/build_pages.py && python3 tools/build_bundle.py
import json, os, re, sys

D = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(D, '..')
PAGES = ['home', 'order', 'how-it-works', 'contact', 'login', 'forgot-password',
         'privacy', 'terms', 'communications', 'site']
TITLES = {}

FONT_RE = re.compile(r"@font-face\{[^}]*\}")
fonts, pages = [], {}

def font_id(css):
    if css not in fonts:
        fonts.append(css)
    return fonts.index(css)

SHIM = r"""<script>(function(){
var P=%s;window.__EBQ=%s;window.__EBF=%s+'.html';
window.__EBGO=function(u){try{parent.postMessage({eb:'go',u:String(u)},'*')}catch(e){}};
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||a.target==='_blank')return;
var h=a.getAttribute('href'),m=/^(?:\.\/)?([a-z-]+)\.html(\?[^#]*)?(#.*)?$/.exec(h);if(!m||P.indexOf(m[1])<0)return;e.preventDefault();window.__EBGO(h);},true);
addEventListener('load',function(){try{parent.postMessage({eb:'title',t:document.title},'*')}catch(e){};var h=%s;if(h){try{var el=document.getElementById(h.slice(1));if(el)el.scrollIntoView();else location.hash=h}catch(e){}}});
})();</script>"""

for name in PAGES:
    html = open(os.path.join(ROOT, name + '.html'), encoding='utf-8').read()
    ids = []
    def take(m):
        ids.append(font_id(m.group(0)))
        return ''
    html = FONT_RE.sub(take, html)
    # page code that reads the address now reads the values the router passes in
    html = html.replace('location.search', "(window.__EBQ||'')")
    html = html.replace("location.pathname.split('/').pop()", 'window.__EBF')
    html = html.replace("location.href = location.pathname + '?gift=1#order'", "window.__EBGO('order.html?gift=1#order')")
    if 'location.pathname' in html:
        sys.exit(f'{name}: unhandled location.pathname')
    if not html.lstrip().lower().startswith('<!doctype html>'):
        sys.exit(f'{name}: no doctype')
    t = re.search(r'<title>(.*?)</title>', html, re.S)
    TITLES[name] = t.group(1).strip() if t else 'إبلاغ'
    pages[name] = {'f': ids, 'h': html}

TEMPLATE = r"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>إبلاغ — خلّي أي أحد يوصلك بدون ما يعرف رقمك</title>
<meta name="description" content="موقع إبلاغ كامل بملف واحد: الرئيسية، الطلب، شلون يشتغل، التواصل، الدخول، السياسات، وديمو التطبيق.">
<meta name="theme-color" content="#FAF9F5">
<style>
:root{--bg:#FAF9F5}
html,body{margin:0;height:100%;background:var(--bg);overflow:hidden}
.view{position:fixed;inset:0;width:100%;height:100%;border:0;display:block;background:var(--bg)}
.view.next{visibility:hidden}
#boot{position:fixed;inset:0;display:grid;place-items:center;font:600 15px system-ui,sans-serif;color:#6A6862;transition:opacity .25s}
#boot.gone{opacity:0;pointer-events:none}
</style>
</head>
<body>
<div id="boot" role="status">جاري التحميل…</div>
<script>
window.__EB_FONTS = __FONTS__;
window.__EB_PAGES = __PAGES__;
window.__EB_TITLES = __TITLES__;
</script>
<script>
(function(){
  var FONTS = window.__EB_FONTS, PAGES = window.__EB_PAGES, TITLES = window.__EB_TITLES;
  var NAMES = Object.keys(PAGES), boot = document.getElementById('boot'), view = null;
  var SHIM = __SHIM__;
  // address format: #/order?plan=plus#order  →  page, query, in-page anchor
  function parse(h){
    h = (h || '').replace(/^#\/?/, '');
    var m = /^([a-z-]*)(\?[^#]*)?(#.*)?$/.exec(h) || [];
    var p = m[1] || 'home'; if (NAMES.indexOf(p) < 0) p = 'home';
    return {p: p, q: m[2] || '', a: m[3] || ''};
  }
  function toHash(u){
    var m = /^(?:\.\/)?([a-z-]+)\.html(\?[^#]*)?(#.*)?$/.exec(u);
    return m ? '#/' + m[1] + (m[2] || '') + (m[3] || '') : null;
  }
  // every page gets a fresh frame (so the back button walks pages, not frame history); it is shown once loaded
  function render(){
    var r = parse(location.hash), pg = PAGES[r.p];
    var css = '<style>' + pg.f.map(function(i){ return FONTS[i]; }).join('\n') + '</style>';
    var shim = SHIM.split('%P').join(JSON.stringify(NAMES)).split('%Q').join(JSON.stringify(r.q)).split('%F').join(JSON.stringify(r.p)).split('%H').join(JSON.stringify(r.a));
    var html = pg.h.replace(/<head[^>]*>/i, function(t){ return t + shim + css; });
    var url = URL.createObjectURL(new Blob([html], {type: 'text/html'}));
    var f = document.createElement('iframe'); f.className = 'view next'; f.title = TITLES[r.p] || 'إبلاغ';
    f.addEventListener('load', function(){
      if (f.dataset.done) return; f.dataset.done = '1';
      var old = view; view = f; f.classList.remove('next'); boot.classList.add('gone');
      if (old && old !== f) old.remove();
      setTimeout(function(){ URL.revokeObjectURL(url); }, 30000);
    });
    f.src = url; document.body.appendChild(f);
    document.title = TITLES[r.p] || document.title;
  }
  addEventListener('message', function(e){
    var d = e.data; if (!d || !d.eb) return;
    var fromView = false; document.querySelectorAll('iframe.view').forEach(function(x){ if (x.contentWindow === e.source) fromView = true; });
    if (!fromView) return;
    if (d.eb === 'go'){ var h = toHash(d.u); if (!h) return; if (h === location.hash) render(); else location.hash = h; }
    if (d.eb === 'title' && d.t && view && e.source === view.contentWindow) document.title = d.t;
  });
  addEventListener('hashchange', render);
  render();
})();
</script>
</body>
</html>
"""

def js(v):
    # JSON is valid JS; neutralise "</" so embedded pages cannot end this <script> early
    return json.dumps(v, ensure_ascii=False).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')

shim = SHIM % ('%P', '%Q', '%F', '%H')
out = (TEMPLATE.replace('__FONTS__', js(fonts))
               .replace('__PAGES__', js(pages))
               .replace('__TITLES__', js(TITLES))
               .replace('__SHIM__', js(shim)))
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(out)
print('built index.html', len(out.encode('utf-8')), 'bytes;', len(pages), 'pages;', len(fonts), 'shared fonts')
