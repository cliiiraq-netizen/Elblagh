/* ================= Website prototype: router, chrome, landing, sync ================= */
window.SITE = true;
const ROUTES = {
  '':         {m:'landing',  ic:'home',       t:()=>T('الصفحة الرئيسية','Home','سەرەکی'), d:()=>T('تعرّف على إبلاغ','About Eblagh','ناساندنی ئیبلاغ')},
  'r':        {m:'reporter', ic:'globe',      ph:true, t:()=>T('صفحة المُبلِّغ','Reporter page','پەڕەی ڕاپۆرتدەر'), d:()=>T('كأنك مسحت الملصق — بدون تطبيق','As if you scanned the sticker — no app','وەک ئەوەی ستیکەرەکەت سکان کردبێت — بێ ئەپ')},
  'app':      {m:'app',      ic:'smartphone', ph:true, t:()=>T('تطبيق صاحب السيارة','Owner app','ئەپی خاوەن ئۆتۆمبێل'), d:()=>T('استلم البلاغات ورد عليها','Receive and reply to reports','ڕاپۆرت وەربگرە و وەڵام بدەرەوە')},
  'start':    {m:'onboard',  ic:'userPlus',   ph:true, t:()=>T('زبون جديد','New customer','کڕیاری نوێ'), d:()=>T('التسجيل وشراء الملصق والدفع','Sign up, buy a sticker, pay','تۆمارکردن، کڕینی ستیکەر، پارەدان')},
  'book':     {m:'booking',  ic:'star',       ph:true, t:()=>T('الحجز المسبق','Pre-booking','حیجزی پێشوەختە'), d:()=>T('احجز ملصقك قبل الإطلاق','Book before launch','پێش دەستپێکردن حیجز بکە')},
  'business': {m:'biz',      ic:'users',      t:()=>T('الشركات والمجمعات','Business','بازرگانی'), d:()=>T('باقات الجملة ولوحة الشركة','Bulk packages & dashboard','پاکێجی بەکۆمەڵ و داشبۆرد')},
  'admin':    {m:'admin',    ic:'monitor',    t:()=>T('لوحة الإدارة','Admin panel','پانێڵی بەڕێوەبردن'), d:()=>T('الدفعات والطلبات والإشعارات','Batches, orders, notifications','کۆمەڵە، داواکاری، ئاگادارکردنەوە')},
  'stickers': {m:'stickers', ic:'sticker',    t:()=>T('الملصقات للطباعة','Print stickers','ستیکەر بۆ چاپ'), d:()=>T('تصاميم جاهزة للمطبعة','Print-ready designs','دیزاینی ئامادەی چاپ')},
  'live':     {m:'flow',     ic:'route',      t:()=>T('العرض المتزامن','Side-by-side demo','نمایشی هاوکات'), d:()=>T('المُبلِّغ وصاحب السيارة جنب بعض','Reporter and owner side by side','ڕاپۆرتدەر و خاوەن لە تەنیشت یەک')},
};
const ROUTE_OF = {landing:'', reporter:'r/' + 'EB4471', app:'app', onboard:'start', booking:'book', biz:'business', admin:'admin', stickers:'stickers', flow:'live'};
const NAV = ['', 'r', 'app', 'book', 'business', 'admin'];
let curRoute = '';
const go = k => { location.hash = '#/' + (k === 'r' ? ROUTE_OF.reporter : k); };
const hrefOf = k => '#/' + (k === 'r' ? ROUTE_OF.reporter : k);

/* ---- header, menu, fab ---- */
function siteChrome(){
  const langs = Object.entries(LANGS).map(([k,v])=>`<button class="${LANG===k?'on':''}" data-act="lang" data-l="${k}" title="${v.name}">${flag(v.flag)}<span>${v.short}</span></button>`).join('');
  const dark = document.documentElement.dataset.theme === 'dark';
  $('#sh').innerHTML = `<div class="sh-in"><a class="brand" href="#/"><span class="brand-mk">${markSVG}</span><span><b class="h">${BRAND()}</b><small>${T('تواصل بلا أرقام','Contact without numbers','پەیوەندی بێ ژمارە')}</small></span></a>
    <nav class="sh-nav">${NAV.map(k=>`<a href="${hrefOf(k)}" class="${curRoute===k?'on':''}">${ROUTES[k].t()}</a>`).join('')}</nav>
    <div class="sh-tools"><div class="sh-langs">${langs}</div><button class="sh-ib sh-theme" data-act="site-theme" aria-label="${T('الوضع الداكن والفاتح','Dark / light','تاریک / ڕووناک')}">${dark ? I.sun : I.moon}</button>
      <a class="sh-cta" href="#/book">${I.bag}${T('احجز ملصقك','Book a sticker','ستیکەر حیجز بکە')}</a>
      <button class="sh-ib sh-menu" data-act="site-menu" aria-label="${T('القائمة','Menu','لیست')}">${I.grid}</button></div></div>`;
  const ph = ROUTES[curRoute].ph, chipsK = {r:'r', app:'a', start:'a', book:'b'}[curRoute];
  $('#pm').innerHTML = `<div class="pm-h"><span class="brand-mk" style="width:38px;height:38px;border-radius:12px">${markSVG}</span><b>${T('صفحات البروتوتايب','Prototype pages','پەڕەکانی پرۆتۆتایپ')}<small>${T('كل شي هنا قابل للتجربة','Everything here is clickable','هەموو شتێک لێرە تاقیدەکرێتەوە')}</small></b><button class="sh-ib" data-act="site-menu" aria-label="${T('إغلاق','Close','داخستن')}">${I.x}</button></div>
    <div class="pm-l">${Object.keys(ROUTES).map(k=>`<a href="${hrefOf(k)}" class="${curRoute===k?'on':''}"><span class="pmi">${I[ROUTES[k].ic]}</span><span><b>${ROUTES[k].t()}</b><small>${ROUTES[k].d()}</small></span></a>`).join('')}</div>
    ${ph && chipsK ? `<div class="pm-t">${T('انتقل لشاشة بهذي الصفحة','Jump to a screen on this page','بچۆ بۆ شاشەیەک لەم پەڕەیەدا')}</div><div class="chips" data-chips="${chipsK}"></div>` : ''}
    ${curRoute === 'app' ? `<div class="pm-t">${T('محاكاة بلاغ وارد','Simulate an incoming report','ڕاپۆرتێکی هاتوو نمایش بکە')}</div><div class="pm-row"><button data-act="sim" data-k="block">${I.cone}${rt('block')}</button><button data-act="sim" data-k="inside">${I.heart}${T('عاجل','Urgent','بەپەلە')}</button></div>` : ''}
    <div class="pm-t">${T('اللغة','Language','زمان')}</div><div class="pm-row">${Object.entries(LANGS).map(([k,v])=>`<button class="${LANG===k?'on':''}" data-act="lang" data-l="${k}">${flag(v.flag)} ${v.name}</button>`).join('')}</div>
    <div class="pm-t">${T('العرض','Display','پیشاندان')}</div><div class="pm-row"><button data-act="site-theme">${dark ? I.sun : I.moon} ${dark ? T('فاتح','Light','ڕووناک') : T('داكن','Dark','تاریک')}</button><button data-act="site-reset">${I.refresh} ${T('ابدأ من جديد','Start over','لە سەرەتاوە')}</button></div>
    <p class="pm-note">${I.info.replace('class="ic"','class="ic" style="width:15px;height:15px;display:inline;vertical-align:-3px"')} ${T('نصيحة: افتح صفحة المُبلِّغ بتبويب، وتطبيق صاحب السيارة بتبويب ثاني — البلاغ يوصل بينهم مباشرة. هذا نموذج تجريبي: البيانات تنحفظ بمتصفحك بس.','Tip: open the reporter page in one tab and the owner app in another — reports flow between them live. This is a prototype: data is stored only in your browser.','ئامۆژگاری: پەڕەی ڕاپۆرتدەر لە تابێک و ئەپی خاوەن لە تابێکی تر بکەرەوە — ڕاپۆرت ڕاستەوخۆ دەگات. ئەمە پرۆتۆتایپە: داتا تەنها لە وێبگەڕەکەتدا هەڵدەگیرێت.')}</p>`;
  $('#pfab').innerHTML = markSVG;
  $('#pfab').setAttribute('aria-label', T('قائمة البروتوتايب','Prototype menu','لیستی پرۆتۆتایپ'));
}

/* ---- landing page ---- */
function renderLanding(){
  const a = (k, cls, ic, label) => `<a class="lp-btn ${cls}" href="${hrefOf(k)}">${ic ? I[ic] : ''}${label}</a>`;
  const head = (eye, h, p, c='') => `<div class="lp-head ${c}"><span class="lp-eye">${eye}</span><h2 class="h">${h}</h2>${p ? `<p>${p}</p>` : ''}</div>`;
  const card = (ic, h, p, extra='') => `<div class="lp-card"><span class="ci">${I[ic]}</span><h3 class="h">${h}</h3><p>${p}</p>${extra}</div>`;
  const tryL = (k, label) => `<a class="try" href="${hrefOf(k)}">${label} ${FWD()}</a>`;
  const cnt = S.bookings;
  $('#landing').innerHTML = `
  <section class="lp-hero"><div class="lp-in">
    <div><span class="lp-eye">${I.bolt.replace('class="ic"','class="ic" style="width:14px;height:14px"')} ${T('ابتكار عراقي · قريباً','An Iraqi innovation · coming soon','داهێنانێکی عێراقی · بەم زووانە')}</span>
      <h1 class="h">${T('تواصل <em>بلا أرقام.</em>','Contact <em>without numbers.</em>','پەیوەندی <em>بێ ژمارە.</em>')}</h1>
      <p class="lead">${T('ملصق QR على زجاج سيارتك. أي شخص يحتاجك يمسحه بكاميرا تلفونه ويبلّغك فوراً — بدون اتصال، وبدون ما ينكشف رقمك أو اسمه.','A QR sticker on your car window. Anyone who needs you scans it with their phone camera and alerts you instantly — no calls, and no numbers revealed.','ستیکەرێکی QR لەسەر شووشەی ئۆتۆمبێلەکەت. هەر کەسێک پێویستی پێت بێت بە کامێرای مۆبایلەکەی سکانی دەکات و یەکسەر ئاگادارت دەکاتەوە — بێ پەیوەندی و بێ ئاشکراکردنی ژمارە.')}</p>
      <div class="lp-cta">${a('book','', 'bag', T('احجز ملصقك','Book your sticker','ستیکەرەکەت حیجز بکە'))}${a('r','o','scan', T('جرّب كأنك مسحت الملصق','Try it as if you scanned it','وەک سکانکردن تاقی بکەرەوە'))}</div>
      <div class="lp-count"><span><b class="num">${cnt}</b> ${T('حجزوا من أول 100','of the first 100 booked','لە یەکەم 100 حیجزیان کرد')}</span><span class="bar"><i style="width:${Math.min(100,cnt)}%"></i></span></div>
      <div class="lp-trust"><span>${I.lock}${T('بخصوصية تامة','Full privacy','تایبەتمەندیی تەواو')}</span><span>${I.phoneOff}${T('بدون رقم هاتف','No phone number','بێ ژمارەی تەلەفۆن')}</span><span>${I.globe}${T('المُبلِّغ بدون تطبيق','No app for the reporter','ڕاپۆرتدەر بێ ئەپ')}</span></div></div>
    <div class="lp-vis">${stickerHTML('sv','yellow','EB4471',3.2)}
      <div class="lp-push"><span class="pic">${markSVG}</span><div><b>${T('سيارتك سادّة الطريق','Your car is blocking the way','ئۆتۆمبێلەکەت ڕێگای گرتووە')}</b><small>${T('مُبلِّغ مجهول · الآن','Anonymous reporter · now','ڕاپۆرتدەری نەناسراو · ئێستا')}</small><div class="qr"><span>${T('جاي هسّه','On my way','ئێستا دێم')}</span><span>${T('خلال 5 دقايق','In 5 min','لە 5 خولەکدا')}</span></div></div></div>
      <div class="lp-tag">${I.lock}${T('رقمك ما ينكشف أبداً','Your number never shows','ژمارەکەت هەرگیز دەرناکەوێت')}</div></div>
  </div></section>

  <section class="lp-sec alt" id="lp-idea"><div class="lp-in">
    ${head(T('الفكرة بدقيقة','The idea in a minute','بیرۆکەکە لە خولەکێکدا'), T('مشكلة يومية، وحل بمسحة وحدة','An everyday problem, solved with one scan','کێشەیەکی ڕۆژانە، بە یەک سکان چارەسەر دەکرێت'))}
    <div class="lp-g3">
      ${card('alert', T('المشكلة','The problem','کێشەکە'), T('سيارة تسد طريقك، أضواء مشتغلة أو شباك مفتوح — وما تعرف شلون توصل لصاحبها.','A car blocks you in, lights left on or a window open — and you have no way to reach the owner.','ئۆتۆمبێلێک ڕێگات دەگرێت، گڵۆپ داگیرساوە یان پەنجەرە کراوەیە — و نازانیت چۆن بگەیتە خاوەنەکەی.'))}
      ${card('qr', T('الحل','The solution','چارەسەر'), T('ملصق QR فريد على زجاج السيارة يفتح صفحة بلاغ مباشرة من كاميرا التلفون.','A unique QR sticker on the window opens a report page straight from the phone camera.','ستیکەرێکی QRی تایبەت لەسەر شووشە ڕاستەوخۆ لە کامێرای مۆبایلەوە پەڕەی ڕاپۆرت دەکاتەوە.'))}
      ${card('shield', T('القيمة','The value','بەها'), T('صاحب السيارة يوصله تنبيه بدون ما يظهر رقمه أو اسمه، والمُبلِّغ ما يحتاج تطبيق ولا حساب.','The owner gets alerted without revealing their number or name, and the reporter needs no app or account.','خاوەنەکە ئاگادار دەکرێتەوە بێ ئاشکراکردنی ژمارە یان ناو، و ڕاپۆرتدەر پێویستی بە ئەپ یان هەژمار نییە.'))}
    </div></div></section>

  <section class="lp-sec" id="lp-cases"><div class="lp-in">
    ${head(T('المواقف','Situations','دۆخەکان'), T('المواقف اللي نعالجها','The situations we handle','ئەو دۆخانەی چارەسەریان دەکەین'))}
    <div class="lp-g4">
      ${card('cone', T('الوقوف','Parking','وەستان'), T('السيارة تعيق الخروج أو واقفة بمكان غير مناسب.','The car blocks an exit or is parked in the wrong place.','ئۆتۆمبێلەکە ڕێگای دەرچوون دەگرێت یان لە شوێنی هەڵە وەستاوە.'))}
      ${card('bulb', T('الأضواء','Lights','گڵۆپ'), T('اللايت أو الضوء الداخلي متروك مشتغل.','Headlights or the interior light left on.','گڵۆپی پێشەوە یان ناوەوە بە داگیرساوی جێماوە.'))}
      ${card('window', T('الأمان','Security','ئاسایش'), T('زجاج مفتوح أو باب غير مسدود.','A window open or a door left unlocked.','پەنجەرەیەکی کراوە یان دەرگایەکی دانەخراو.'))}
      ${card('crash', T('الأضرار','Damage','زیان'), T('إطار فارغ أو ضرر ظاهر بالسيارة.','A flat tyre or visible damage to the car.','تایەی بێ با یان زیانێکی دیار لە ئۆتۆمبێلەکە.'))}
    </div>
    <div class="lp-banner k">${I.alert}${T('إبلاغ ما يحل محل الشرطة أو الطوارئ. إذا أكو خطر على حياة، اتصل بالطوارئ فوراً.','Eblagh doesn’t replace the police or emergency services. If a life is in danger, call emergency services right away.','ئیبلاغ جێگەی پۆلیس یان فریاکەوتن ناگرێتەوە. ئەگەر ژیانێک لە مەترسیدایە، یەکسەر پەیوەندی بە فریاکەوتنەوە بکە.')}</div>
  </div></section>

  <section class="lp-sec alt" id="lp-how"><div class="lp-in">
    ${head(T('رحلة الاستخدام','How it works','چۆن کار دەکات'), T('أربع خطوات وبس','Just four steps','تەنها چوار هەنگاو'))}
    <div class="lp-g4">
      ${card('userPlus', T('التسجيل','Sign up','تۆمارکردن'), T('صاحب السيارة ينشئ حساب برقم هاتفه ويضيف سيارته.','The owner signs up with their phone number and adds their car.','خاوەنەکە بە ژمارەی تەلەفۆن هەژمار دروست دەکات و ئۆتۆمبێلەکەی زیاد دەکات.'), `<span class="n">01</span>${tryL('start', T('جرّب التسجيل','Try sign-up','تۆمارکردن تاقی بکەرەوە'))}`)}
      ${card('key', T('التفعيل','Activate','چالاککردن'), T('يربط الملصق بحسابه بمسحة أو بالرمز السري ويلصقه على الزجاج.','Links the sticker with a scan or the secret code and sticks it on the window.','بە سکان یان کۆدی نهێنی ستیکەرەکە دەبەستێتەوە و لەسەر شووشە دەیلکێنێت.'), `<span class="n">02</span>${tryL('app', T('جرّب التفعيل','Try activation','چالاککردن تاقی بکەرەوە'))}`)}
      ${card('scan', T('الإبلاغ','Report','ڕاپۆرتدان'), T('المار يمسح الرمز ويختار المشكلة ويرسلها بدون تسجيل.','A passer-by scans the code, picks the problem and sends it — no sign-up.','ڕێبوارێک کۆدەکە سکان دەکات، کێشەکە هەڵدەبژێرێت و دەینێرێت — بێ تۆمارکردن.'), `<span class="n">03</span>${tryL('r', T('جرّب كمُبلِّغ','Try as a reporter','وەک ڕاپۆرتدەر تاقی بکەرەوە'))}`)}
      ${card('bell', T('الاستجابة','Respond','وەڵامدانەوە'), T('المالك يوصله إشعار ويرد بنقرة، والرد يظهر بصفحة المُبلِّغ.','The owner gets a notification and replies in one tap; the reply shows on the reporter’s page.','خاوەنەکە ئاگادار دەکرێتەوە و بە یەک کرتە وەڵام دەداتەوە؛ وەڵامەکە لە پەڕەی ڕاپۆرتدەر دەردەکەوێت.'), `<span class="n">04</span>${tryL('app', T('جرّب الرد','Try replying','وەڵامدانەوە تاقی بکەرەوە'))}`)}
    </div></div></section>

  <section class="lp-sec" id="lp-try"><div class="lp-in">
    ${head(T('البروتوتايب','The prototype','پرۆتۆتایپ'), T('جرّبه بنفسك — على الجوال أو الكمبيوتر','Try it yourself — on phone or desktop','خۆت تاقی بکەرەوە — لە مۆبایل یان کۆمپیوتەر'), T('كل الصفحات تشتغل. على الجوال تنفتح بملء الشاشة مثل التطبيق الحقيقي.','Every page works. On a phone they open full-screen like the real app.','هەموو پەڕەکان کار دەکەن. لە مۆبایلدا وەک ئەپی ڕاستەقینە بە پڕی شاشە دەکرێنەوە.'))}
    <div class="lp-try">${['r','app','start','book','business','admin','stickers','live'].map(k=>`<a href="${hrefOf(k)}"><span class="ti">${I[ROUTES[k].ic]}</span><b>${ROUTES[k].t()}</b><small>${ROUTES[k].d()}</small><em>${T('افتح','Open','بیکەرەوە')} ${FWD()}</em></a>`).join('')}</div>
    <div class="lp-tip">${I.info}${T('افتح صفحة المُبلِّغ بتبويب، وتطبيق صاحب السيارة بتبويب ثاني — البلاغ يوصل بينهم مباشرة.','Open the reporter page in one tab and the owner app in another — the report flows between them live.','پەڕەی ڕاپۆرتدەر لە تابێک و ئەپی خاوەن لە تابێکی تر بکەرەوە — ڕاپۆرت ڕاستەوخۆ لە نێوانیاندا دەگات.')}</div>
  </div></section>

  <section class="lp-sec alt" id="lp-privacy"><div class="lp-in">
    ${head(T('الخصوصية','Privacy','تایبەتمەندی'), T('الخصوصية ومكافحة الإساءة','Privacy and abuse protection','تایبەتمەندی و پاراستن لە خراپ بەکارهێنان'))}
    <div class="lp-g4">
      ${card('eye', T('حماية الهوية','Identity protection','پاراستنی ناسنامە'), T('ما يظهر اسمك ولا رقمك ولا موقعك أو معلومات حسابك بالصفحة العامة.','Your name, number, location and account details never appear on the public page.','ناو، ژمارە، شوێن و زانیاریی هەژمارەکەت هەرگیز لە پەڕەی گشتیدا دەرناکەون.'))}
      ${card('ban', T('منع الإزعاج','No spam','ڕێگری لە بێزارکردن'), T('حد للبلاغات، دمج المكرر، وتحقق إضافي عند الاشتباه.','Report limits, merged duplicates and extra checks when something looks off.','سنووری ڕاپۆرت، یەکخستنی دووبارەکان و پشکنینی زیادە لە کاتی گومان.'))}
      ${card('lock', T('حماية البيانات','Data protection','پاراستنی داتا'), T('اتصال مشفّر، رموز عشوائية غير قابلة للتخمين، ومدة احتفاظ محددة.','Encrypted connections, unguessable random codes and limited retention.','پەیوەندیی شفرەکراو، کۆدی هەڕەمەکیی نەزانراو و ماوەی هەڵگرتنی دیاریکراو.'))}
      ${card('sliders', T('التحكم','Control','کۆنترۆڵ'), T('وقّف الملصق مؤقتاً، استبدله إذا ضاع، واحظر أي مُبلِّغ مزعج.','Pause the sticker, replace it if lost, and block any annoying reporter.','ستیکەرەکە ڕابگرە، ئەگەر ون بوو بیگۆڕە، و هەر ڕاپۆرتدەرێکی بێزارکەر بلۆک بکە.'))}
    </div></div></section>

  <section class="lp-sec" id="lp-pricing"><div class="lp-in">
    ${head(T('الأسعار','Pricing','نرخەکان'), T('ادفع مرة وحدة — بدون اشتراك','Pay once — no subscription','یەک جار پارە بدە — بێ بەشداریکردن'), T('أسعار تجريبية وغير نهائية. ما في اشتراك شهري للأفراد بالبداية.','Test prices, not final. No monthly subscription for individuals at launch.','نرخی تاقیکاری و کۆتایی نین. لە سەرەتادا بەشداریکردنی مانگانە بۆ تاکەکەس نییە.'), 'c')}
    <div class="lp-price">${[
      [T('رمز رقمي','Digital code','کۆدی دیجیتاڵ'), 0, T('رمز QR تطبعه بنفسك','A QR you print yourself','QRێک کە خۆت چاپی دەکەیت'), [T('بلاغات غير محدودة','Unlimited reports','ڕاپۆرتی بێسنوور'),T('ردود جاهزة بنقرة','One-tap replies','وەڵامی ئامادە'),T('ملف PDF للطباعة','A printable PDF','فایلی PDF بۆ چاپ')]],
      [T('ملصق أساسي','Basic sticker','ستیکەری بنەڕەتی'), 5000, T('فينيل مقاوم للعوامل الجوية','Weather-resistant vinyl','ڤینیلی بەرگەگری کەشوهەوا'), [T('مقاوم للشمس والماي','Sun- and water-proof','بەرگەی خۆر و ئاو'),T('تفعيل بمسحة أو رمز سري','Activate by scan or secret code','چالاککردن بە سکان یان کۆدی نهێنی'),T('توصيل لكل المحافظات','Delivery to every governorate','گەیاندن بۆ هەموو پارێزگاکان')]],
      [T('ملصق Premium','Premium sticker','ستیکەری Premium'), 10000, T('تصميم وخامة مميزة','Premium design and material','دیزاین و کەرەستەی تایبەت'), [T('لامنيشن UV يدوم أطول','Longer-lasting UV laminate','لامینەیشنی UV کە زیاتر دەمێنێتەوە'),T('كل مزايا الأساسي','Everything in Basic','هەموو تایبەتمەندییەکانی بنەڕەتی'),T('ألوان: أصفر، أسود أو أبيض','Colors: yellow, black or white','ڕەنگ: زەرد، ڕەش یان سپی')], true],
      [T('باقة عائلية','Family pack','پاکێجی خێزان'), 20000, T('3 ملصقات Premium','3 Premium stickers','3 ستیکەری Premium'), [T('لسيارات البيت كلها','For every car at home','بۆ هەموو ئۆتۆمبێلەکانی ماڵ'),T('مشاركة السيارة ويا العائلة','Share cars with family','هاوبەشکردن لەگەڵ خێزان'),T('عدم إزعاج وأوقات هدوء','Do Not Disturb & quiet hours','بێزارنەکردن و کاتی بێدەنگی')]],
    ].map(([h,p,d,f,pop])=>`<div class="lp-plan ${pop?'pop':''}">${pop?`<span class="pop">${T('الأكثر طلباً','Most popular','بەناوبانگترین')}</span>`:''}<h3 class="h">${h}</h3><div class="pv">${p ? `${p.toLocaleString('en')} <small>${T('د.ع','IQD','د.ع')}</small>` : T('مجاني','Free','بێبەرامبەر')}</div><p>${d}</p><ul>${f.map(x=>`<li>${I.check}${x}</li>`).join('')}</ul><a class="lp-btn ${pop?'':'o'}" href="#/book">${T('احجز','Book','حیجز بکە')}</a></div>`).join('')}</div>
  </div></section>

  <section class="lp-sec alt" id="lp-biz"><div class="lp-in"><div class="lp-biz">
    <div><span class="lp-eye">${T('للأعمال','For business','بۆ بازرگانی')}</span><h2 class="h">${T('للشركات والأساطيل والمجمعات السكنية','For companies, fleets and residential compounds','بۆ کۆمپانیا، فلیت و کۆمەڵگە نیشتەجێبوونەکان')}</h2><p>${T('لوحة تحكم واحدة لكل المركبات، والبلاغ يروح للسائق أو الساكن مباشرة، وأسعار بالجملة.','One dashboard for every vehicle, reports routed straight to the driver or resident, and volume pricing.','داشبۆردێک بۆ هەموو ئۆتۆمبێلەکان، ڕاپۆرت ڕاستەوخۆ بۆ شۆفێر یان دانیشتوو، و نرخی بەکۆمەڵ.')}</p>
      <div class="lp-cta"><a class="lp-btn" href="#/business">${I.users}${T('شوف باقات الأعمال','See business packages','پاکێجەکانی بازرگانی ببینە')}</a></div></div>
    <ul><li>${I.car}${T('أساطيل وشركات تأجير — من 4,000 د.ع للمركبة','Fleets & rentals — from 4,000 IQD per vehicle','فلیت و بەکرێدان — لە 4,000 دینار بۆ هەر ئۆتۆمبێلێک')}</li><li>${I.home}${T('مجمعات سكنية — العاجل يوصل للحراسة','Compounds — urgent reports reach the guards','کۆمەڵگە — بەپەلە دەگاتە پاسەوان')}</li><li>${I.users}${T('جامعات ودوائر — تفعيل جماعي','Campuses & offices — bulk activation','زانکۆ و فەرمانگە — چالاککردنی بەکۆمەڵ')}</li></ul>
  </div></div></section>

  <section class="lp-sec" id="lp-book"><div class="lp-in"><div class="lp-book">
    <h2 class="h">${T('كن من أول 100','Be one of the first 100','لە یەکەم 100 کەس بە')}</h2>
    <p>${T('احجز ملصقك هسه بسعر الإطلاق. ما تدفع شي — الدفع عند الاستلام.','Book your sticker now at the launch price. Pay nothing now — pay on delivery.','ئێستا بە نرخی دەستپێکردن ستیکەرەکەت حیجز بکە. هیچ مەدە — لە کاتی وەرگرتن پارە بدە.')}</p>
    <div class="bk"><b class="num">${cnt}</b> ${T('من 100 حجزوا','of 100 booked','لە 100 حیجزیان کرد')}<span><i style="width:${Math.min(100,cnt)}%"></i></span></div>
    <a class="lp-btn k" href="#/book">${I.bag}${T('احجز مكاني','Reserve my spot','شوێنەکەم حیجز بکە')}</a>
  </div></div></section>

  <section class="lp-sec alt" id="lp-faq"><div class="lp-in">
    ${head(T('أسئلة شائعة','FAQ','پرسیارە باوەکان'), T('عندك سؤال؟','Questions?','پرسیارت هەیە؟'), '', 'c')}
    <div class="lp-faq">${[
      [T('هل المُبلِّغ يحتاج تطبيق؟','Does the reporter need an app?','ڕاپۆرتدەر پێویستی بە ئەپە؟'), T('لا. يمسح الملصق بكاميرا تلفونه العادية وتنفتح صفحة بالمتصفح.','No. They scan the sticker with their regular camera and a page opens in the browser.','نەخێر. بە کامێرای ئاسایی ستیکەرەکە سکان دەکات و پەڕەیەک لە وێبگەڕدا دەکرێتەوە.')],
      [T('هل يشوف رقمي؟','Will they see my number?','ژمارەکەم دەبینێت؟'), T('أبداً. لا هو يشوف رقمك ولا إنت تشوف رقمه، والرد يظهر بنفس الصفحة.','Never. Neither side sees the other’s number, and replies show on the same page.','هەرگیز. هیچ لایەک ژمارەی ئەوی تر نابینێت، و وەڵام لە هەمان پەڕەدا دەردەکەوێت.')],
      [T('إذا ضاع الملصق أو انسرق؟','What if the sticker is lost or stolen?','ئەگەر ستیکەرەکە ون بوو یان دزرا؟'), T('توقفه من التطبيق بنقرة ونطلع لك بديل مربوط بنفس حسابك، بدون ما تخسر سجلك.','Cancel it in the app with one tap and we send a replacement linked to your account, keeping your history.','بە یەک کرتە لە ئەپەکەدا هەڵیبوەشێنەوە و جێگرەوەیەکت بۆ دەنێرین کە بە هەژمارەکەتەوە بەستراوە.')],
      [T('شنو يمنع الإزعاج؟','What stops spam?','چی ڕێگری لە بێزارکردن دەکات؟'), T('حد لعدد البلاغات، تذكير واحد بس لكل بلاغ، وتقدر تحظر أي مُبلِّغ أو توقف الملصق مؤقتاً.','Report limits, a single reminder per report, and you can block any reporter or pause the sticker.','سنووری ڕاپۆرت، تەنها یەک بیرخستنەوە بۆ هەر ڕاپۆرتێک، و دەتوانیت هەر ڕاپۆرتدەرێک بلۆک بکەیت یان ستیکەرەکە ڕابگریت.')],
      [T('شلون أدفع؟','How do I pay?','چۆن پارە بدەم؟'), T('الدفع عند الاستلام، أو زين كاش، أو كي كارد، أو بطاقة فيزا/ماستر.','Cash on delivery, ZainCash, Qi Card or Visa/Mastercard.','پارەدان لە کاتی وەرگرتن، زەین کاش، کی کارد یان ڤیزا/ماستەرکارد.')],
    ].map(([q,ans],i)=>`<details ${i===0?'open':''}><summary>${q}${I.chev}</summary><p>${ans}</p></details>`).join('')}</div>
  </div></section>

  <footer class="lp-foot"><div class="lp-in">
    <div>${logo()}<p>${T('تواصل بلا أرقام. منصة ذكية للتواصل مع صاحب السيارة عبر رمز QR، بدون كشف بياناته الشخصية.','Contact without numbers. A smart way to reach a car owner through a QR code, without revealing personal details.','پەیوەندی بێ ژمارە. ڕێگایەکی زیرەک بۆ گەیشتن بە خاوەنی ئۆتۆمبێل لە ڕێگەی کۆدی QR، بێ ئاشکراکردنی زانیاریی کەسی.')}</p></div>
    <div><h4>${T('جرّب','Try it','تاقی بکەرەوە')}</h4>${['r','app','start','book'].map(k=>`<a href="${hrefOf(k)}">${ROUTES[k].t()}</a>`).join('')}</div>
    <div><h4>${T('المزيد','More','زیاتر')}</h4>${['business','admin','stickers','live'].map(k=>`<a href="${hrefOf(k)}">${ROUTES[k].t()}</a>`).join('')}</div>
    <div class="cp">© 2026 ${BRAND()} · ${T('ابتكار عراقي · هذا نموذج تجريبي للعرض','An Iraqi innovation · this is a demo prototype','داهێنانێکی عێراقی · ئەمە پرۆتۆتایپێکی نمایشییە')}</div>
  </div></footer>`;
}

/* ---- router ---- */
const _modeAct = ACT['mode'];
function route(){
  const h = location.hash.replace(/^#\/?/, ''), [k0, arg] = h.split('/');
  const k = ROUTES.hasOwnProperty(k0) ? k0 : '';
  const prev = curRoute; curRoute = k;
  const R = ROUTES[k];
  document.body.classList.remove(...[...document.body.classList].filter(c => c.startsWith('rt-') || c === 'ph' || c === 'pm-open'));
  document.body.classList.add('rt-' + (k || 'home')); if (R.ph) document.body.classList.add('ph');
  if (R.m === 'reporter'){ if (arg && carById(arg.toUpperCase())) S.r.car = arg.toUpperCase(); if (S.r.screen === 'camera') S.r.screen = 'landing'; }
  if (S.mode !== R.m) _modeAct({dataset:{m:R.m}}); else render();
  document.title = (k ? ROUTES[k].t() + ' — ' : '') + BRAND() + ' · ' + T('تواصل بلا أرقام','Contact without numbers','پەیوەندی بێ ژمارە');
  if (prev !== k) window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

/* ---- render hook ---- */
const _render = render;
let skipSave = false, saveT = null;
render = function(){
  _render();
  if (S.mode === 'landing') renderLanding();
  if ($('#sh')) siteChrome();
  if (ROUTES[curRoute].ph) renderChips();
  if (!skipSave){ clearTimeout(saveT); saveT = setTimeout(saveState, 200); }
  skipSave = false;
};

/* ---- actions ---- */
Object.assign(ACT, {
  'mode': el => go(el.dataset.m === 'reporter' ? 'r' : (ROUTE_OF[el.dataset.m] || '')),
  'site-menu': () => document.body.classList.toggle('pm-open'),
  'site-theme': () => { $('#themeBtn').click(); render(); },
  'site-reset': () => { try { localStorage.removeItem(SKEY); } catch(e){} timers.forEach(clearTimeout); timers = []; const m = S.mode; S = freshState(); S.mode = m; if (m === 'reporter') S.r.screen = 'landing'; document.body.classList.remove('pm-open'); render(); pageToast(T('رجعت التجربة من البداية','Demo restarted','نمایشەکە لە سەرەتاوە دەستی پێکردەوە')); },
  'go-app': el => { const id = el.dataset.id; S.a.authed = true; S.a.newUser = false; S.a.onboarded = true; if (id && repById(id)){ S.a.report = id; S.a.screen = 'report'; S.a.push = null; markSeen(repById(id)); S._chatBottom = true; } go('app'); },
});
$('#pfab').addEventListener('click', () => document.body.classList.add('pm-open'));
$('#pmbg').addEventListener('click', () => document.body.classList.remove('pm-open'));
document.addEventListener('click', e => { const a = e.target.closest('#pm a'); if (a) document.body.classList.remove('pm-open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.body.classList.remove('pm-open'); });

/* ---- the reporter page auto-replies only when nobody is using the owner app ---- */
const appOpenRecently = () => { try { return Date.now() - (+localStorage.getItem('eb_app_hb') || 0) < 6000; } catch(e){ return false; } };
setInterval(() => { if (['app','start'].includes(curRoute) && document.visibilityState === 'visible'){ try { localStorage.setItem('eb_app_hb', String(Date.now())); } catch(e){} } }, 2000);
autoOwner = function(rep){
  later(() => { if (S.mode === 'reporter' && !appOpenRecently() && rep.status === 'delivered'){ markSeen(rep); render(); } }, 5000);
  later(() => { if (S.mode === 'reporter' && !appOpenRecently() && ['delivered','seen'].includes(rep.status) && rep.allowReply){ ownerReply(rep, QUICK[1]); render(); } }, 12000);
}

/* ---- persistence + live sync between tabs ---- */
const SKEY = 'eb_site_state_v1';
function saveState(){ try { const o = Object.assign({}, S); delete o.mode; o.toast = {r:null, a:null, b:null}; localStorage.setItem(SKEY, JSON.stringify(o)); } catch(e){} }
function mergeState(o){
  const byId = (cur, inc) => { inc.forEach(x => { const c = cur.find(y => y.id === x.id); if (c) Object.assign(c, x); else cur.push(x); }); cur.sort((a,b) => (b.t || 0) - (a.t || 0)); };
  for (const k in o){
    if (k === 'reports' && Array.isArray(o[k])) { byId(S.reports, o[k]); continue; }
    if (k === 'cars' && Array.isArray(o[k])) { o[k].forEach(x => { const c = S.cars.find(y => y.id === x.id); if (c) Object.assign(c, x); else S.cars.push(x); }); continue; }
    if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k]) && S[k] && typeof S[k] === 'object' && !Array.isArray(S[k])) Object.assign(S[k], o[k]);
    else S[k] = o[k];
  }
}
try { const o = JSON.parse(localStorage.getItem(SKEY) || 'null'); if (o) mergeState(o); } catch(e){}
window.addEventListener('storage', e => {
  if (e.key !== SKEY || !e.newValue) return;
  try { const m = S.mode, ar = S.a.screen, rr = S.r.screen; mergeState(JSON.parse(e.newValue)); S.mode = m;
    S.a.screen = ar; S.r.screen = rr;
    const nr = S.reports.find(r => r.status === 'delivered' && Date.now() - r.t < 15000); if (nr && curRoute === 'app' && S.a.screen !== 'report') S.a.push = nr.id;
    skipSave = true; render(); } catch(err){}
});

route();
