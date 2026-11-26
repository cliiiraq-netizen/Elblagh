import sys, os
D = os.path.dirname(os.path.abspath(__file__))
s = open('/home/user/Elblagh/index.html', encoding='utf-8').read()
rd = lambda f: open(os.path.join(D, f), encoding='utf-8').read()
def rep(a, b):
    global s
    n = s.count(a)
    if n != 1: sys.exit(f'{n}: {a[:80]}')
    s = s.replace(a, b)
rep('<title>إبلاغ — العرض التجريبي الكامل</title>', '<title>إبلاغ — تواصل بلا أرقام</title>\n<meta name="theme-color" content="#FFC816">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">')
rep('</style>\n</head>', rd('site.css') + '</style>\n</head>')
rep('<main class="wrap">', '<header class="sh" id="sh"></header>\n<div class="pm-bg" id="pmbg"></div><aside class="pm" id="pm" aria-label="menu"></aside><button class="pfab" id="pfab"></button>\n<main class="wrap">\n  <section class="view" id="v-landing"><div id="landing"></div></section>')
rep("const setMode = m => { S.mode = m;", "const setMode = m => { if (window.SITE){ ACT['mode']({dataset:{m}}); return; } S.mode = m;")
rep("    ${['delivered','seen'].includes(st) ? adStrip() : ''}", """    ${window.SITE && ['delivered','seen','replied'].includes(st) ? `<button class="adline" data-act="go-app" data-id="${rep.id}">${I.smartphone}<span>${T('تجربة: افتح تطبيق صاحب السيارة وردّ بنفسك','Demo: open the owner app and reply yourself','نمایش: ئەپی خاوەن بکەرەوە و خۆت وەڵام بدەرەوە')}</span>${FWD()}</button>` : ''}
    ${['delivered','seen'].includes(st) ? adStrip() : ''}""")
i = s.rfind('setLang(LANG);\n}\n</script>')
assert i > 0
s = s[:i] + 'setLang(LANG);\n' + rd('site.js') + '\n}\n</script>' + s[i+len('setLang(LANG);\n}\n</script>'):]
open('/home/user/Elblagh/site.html', 'w', encoding='utf-8').write(s)
print('built', len(s))
