const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)');

/* lucide-style icons */
const L = (d, sw = 2) => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC = {
  menu: L('<path d="M4 6h16M4 12h16M4 18h16"/>'),
  x: L('<path d="M18 6 6 18M6 6l12 12"/>'),
  qr: L('<rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/><rect x="3" y="16" width="5" height="5" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1"/>'),
  arrowL: L('<path d="m12 19-7-7 7-7M19 12H5"/>'),
  arrowR: L('<path d="M5 12h14M12 5l7 7-7 7"/>'),
  chevL: L('<path d="m15 18-6-6 6-6"/>'),
  bulb: L('<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>'),
  tag: L('<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>'),
  bag: L('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>'),
  login: L('<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>'),
  lang: L('<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>'),
  bell: L('<path d="M10.27 21a2 2 0 0 0 3.46 0M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>'),
  eye: L('<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>'),
  eyeOff: L('<path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13 13 0 0 1-1.67 2.68M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61M2 2l20 20M14.12 14.12a3 3 0 1 1-4.24-4.24"/>'),
  check: L('<path d="M20 6 9 17l-5-5"/>'),
  alert: L('<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>'),
  info: L('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
  mail: L('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
  call: L('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92"/>'),
  instagram: L('<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37M17.5 6.5h.01"/>'),
  facebook: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-1.56 19.88v-7H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v7A10 10 0 0 0 12 2"/></svg>',
  users: L('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
  car: L('<path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8M7 14h.01M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2M19 18v2"/>'),
  repeat: L('<path d="M21 12a9 9 0 1 1-2.64-6.36L21 8M21 3v5h-5"/>'),
  lock: L('<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
  msg: L('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
  wa: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8m8.4-18.2A11.8 11.8 0 0 0 1.7 17.9L0 24l6.3-1.6A11.8 11.8 0 0 0 24 12c0-3.2-1.2-6.1-3.6-8.4"/></svg>'
};
const paintIcons = (root = document) => {
  $$('[data-ic]', root).forEach(e => { const i = IC[e.dataset.ic]; if (i && !e.querySelector(':scope > svg.ic')) e.insertAdjacentHTML('afterbegin', i); });
  $$('[data-mk]', root).forEach(e => { if (!e.firstChild) e.innerHTML = markSVG; });
};
paintIcons();

/* current page in nav */
const here = (location.pathname.split('/').pop() || 'home.html').toLowerCase();
$$('header a, footer a, .drawer a').forEach(a => { if ((a.getAttribute('href') || '').toLowerCase() === here) a.setAttribute('aria-current', 'page'); });

/* drawer */
const drawer = $('#drawer'), menuBtn = $('#menuBtn');
function setDrawer(open){
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  drawer.inert = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) setTimeout(() => $('#drawerX').focus(), 60); else menuBtn.focus({preventScroll:true});
}
menuBtn.onclick = () => setDrawer(true);
$('#drawerX').onclick = $('#drawerBg').onclick = () => setDrawer(false);
document.addEventListener('keydown', e => {
  if (!drawer.classList.contains('open')) return;
  if (e.key === 'Escape') setDrawer(false);
  if (e.key === 'Tab'){ const f = $$('a,button', drawer.querySelector('aside')); const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); } }
});
addEventListener('resize', () => { if (innerWidth >= 1024 && drawer.classList.contains('open')) setDrawer(false); });

/* toast */
function toast(m, ms = 3200){ $('.toast')?.remove(); const d = document.createElement('div'); d.className = 'toast'; d.setAttribute('role','status'); d.textContent = m; document.body.appendChild(d); setTimeout(() => d.remove(), ms); }
$('#langBtn').onclick = () => toast('النسخة الإنجليزية متوفرة داخل تطبيق الديمو — هذي الصفحة نموذج عربي');

/* password show / hide (login + forgot) */
$$('.pw-eye').forEach(b => b.addEventListener('click', () => {
  const inp = b.parentElement.querySelector('input'); const show = inp.type === 'password';
  inp.type = show ? 'text' : 'password';
  b.setAttribute('aria-pressed', String(show));
  b.setAttribute('aria-label', show ? 'اخفِ كلمة السر' : 'اظهر كلمة السر');
  b.innerHTML = show ? IC.eyeOff : IC.eye;
}));

/* Iraqi mobile: digits only, drop leading 0, format 7XX XXX XXXX */
const fmtPhone = v => { const raw = v.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/\D/g, '').replace(/^(00)?964/, '').replace(/^0+/, '').slice(0, 10);
  return raw.replace(/^(\d{3})(\d{0,3})(\d{0,4}).*/, (m, a, b, c) => [a, b, c].filter(Boolean).join(' ')); };
const phoneDigits = v => v.replace(/\D/g, '');
const phoneErr = v => { const d = phoneDigits(v); return !d ? 'اكتب رقم هاتفك.' : !/^7\d{9}$/.test(d) ? 'اكتب رقم عراقي صحيح: 10 أرقام يبدأ بـ 7، مثل 770 123 4567.' : ''; };
$$('input[data-phone]').forEach(inp => inp.addEventListener('input', () => { const pos = inp.value.length === inp.selectionStart; inp.value = fmtPhone(inp.value); if (pos) inp.setSelectionRange(inp.value.length, inp.value.length); }));

/* inline field errors */
function setErr(inp, msg){
  const box = inp.closest('.field'); const wrap = inp.closest('.phone-field');
  const id = inp.id + '-err'; box.querySelector('.ferr')?.remove();
  inp.setAttribute('aria-invalid', String(!!msg)); wrap?.classList.toggle('is-bad', !!msg);
  const desc = (inp.getAttribute('aria-describedby') || '').split(' ').filter(x => x && x !== id);
  if (msg){ box.insertAdjacentHTML('beforeend', `<p class="ferr" id="${id}">${IC.alert}<span>${msg}</span></p>`); desc.push(id); }
  if (desc.length) inp.setAttribute('aria-describedby', desc.join(' ')); else inp.removeAttribute('aria-describedby');
  if (!msg) inp.removeAttribute('aria-invalid');
}
