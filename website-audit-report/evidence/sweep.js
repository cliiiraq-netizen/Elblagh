// Mobile sweep for all hash routes: screenshots + overflow/clipping/touch/contrast probes
const {chromium}=require('playwright');
const fs=require('fs');
const OUT=process.argv[2]||'sweep'; const LABEL=process.argv[3]||'baseline';
fs.mkdirSync(OUT,{recursive:true});
const ROUTES=['','r/EB4471','app','start','book','business','admin','stickers','live'];
const APP_SCREENS=['home','inbox','report','cars','car','addScan','settings'];
const START_SCREENS=['splash','login','otp','profile','plans','buy','delivery','payment','done'];
const R_SCREENS=['landing','compose','status','unact','neterr'];
(async()=>{
const b=await chromium.launch(); const res=[];
for (const theme of ['dark','light']) for (const w of [320,375,390,430]){
  const c=await b.newContext({viewport:{width:w,height:w<375?640:812},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  await c.addInitScript(t=>{try{localStorage.setItem('eb_theme_pref',t);localStorage.setItem('eb_lang','ar');localStorage.removeItem('eb_site_state_v1')}catch(e){}},theme);
  const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:8765/site.html#/'); await p.waitForTimeout(600);
  const probe=async(name)=>{
    const r=await p.evaluate(()=>{
      const vw=innerWidth, o={over:[],clip:[],small:[],lowc:[]};
      const vis=e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.offsetParent!==null||s.position==='fixed'};
      const scope=document.querySelector('.view.on')||document.body;
      const lum=c=>{const m=c.match(/[\d.]+/g);if(!m)return null;const [r,g,b]=m.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
      const bgOf=e=>{while(e){const c=getComputedStyle(e).backgroundColor;if(c&&!c.includes('rgba(0, 0, 0, 0)')&&c!=='transparent'&&!(c.startsWith('rgba')&&+c.match(/[\d.]+/g)[3]<.5))return c;e=e.parentElement;}return getComputedStyle(document.body).backgroundColor};
      for (const e of scope.querySelectorAll('*')){
        if(!vis(e))continue; const r=e.getBoundingClientRect(); if(!r.width||!r.height)continue;
        // horizontal overflow beyond viewport (ignore intentionally scrolling rows)
        let sc=e.parentElement,inScroller=false;while(sc){const s=getComputedStyle(sc);if(/auto|scroll|hidden/.test(s.overflowX)&&sc!==document.body&&sc!==document.documentElement&&sc.scrollWidth>sc.clientWidth+2){inScroller=true;break;}sc=sc.parentElement;}
        if(!inScroller&&(r.right>vw+1||r.left<-1)&&!e.closest('.pm,.stk,.lp-vis,.cam-scene,svg'))o.over.push((e.className||e.tagName)+' '+Math.round(r.left)+'..'+Math.round(r.right));
        // clipped text
        if(e.children.length===0&&e.textContent.trim().length>1){const s=getComputedStyle(e);if((e.scrollWidth>e.clientWidth+2&&/hidden|clip/.test(s.overflow+s.overflowX)&&s.textOverflow!=='ellipsis')||(e.scrollHeight>e.clientHeight+3&&/hidden/.test(s.overflowY)&&s.webkitLineClamp==='none'))o.clip.push((e.className||e.tagName)+': '+e.textContent.trim().slice(0,30));
          const fs=parseFloat(s.fontSize); const fg=lum(s.color), bg=lum(bgOf(e)); if(fg!=null&&bg!=null&&!e.closest('.stk,svg,.codes')){const cr=(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);if(cr<(fs>=18.5?3:4.5)&&s.opacity!=='0')o.lowc.push(`${e.textContent.trim().slice(0,22)} ${cr.toFixed(2)} ${s.color} on ${bgOf(e)}`);}
          if(fs<11)o.small.push('font '+fs+'px: '+e.textContent.trim().slice(0,20));}
        if(e.matches('button,a,[data-act]')&&!e.closest('.stk,.lmenu')&&(r.width<32||r.height<32)&&r.width>0)o.small.push('tap '+Math.round(r.width)+'x'+Math.round(r.height)+' '+(e.textContent.trim().slice(0,18)||e.getAttribute('aria-label')||e.className));
      }
      o.docOver=document.documentElement.scrollWidth-vw;
      for(const k of ['over','clip','small','lowc'])o[k]=[...new Set(o[k])].slice(0,12);
      return o;});
    res.push({theme,w,name,...r});
    await p.screenshot({path:`${OUT}/${LABEL}-${theme}-${w}-${name.replace(/[\/#]/g,'_')}.png`});
  };
  for (const r of ROUTES){
    await p.evaluate(h=>location.hash='#/'+h,r); await p.waitForTimeout(350);
    if(r==='r/EB4471'){ for(const s of R_SCREENS){ await p.evaluate(s=>{const e=document.querySelector(`[data-act="r-jump"][data-s="${s}"]`);e&&e.click()},s); await p.waitForTimeout(250); await probe('r-'+s);} }
    else if(r==='app'){ for(const s of APP_SCREENS){ await p.evaluate(s=>{const e=document.querySelector(`[data-act="a-jump"][data-s="${s}"]`);e&&e.click()},s); await p.waitForTimeout(250); await probe('app-'+s);} }
    else if(r==='start'){ for(const s of START_SCREENS){ await p.evaluate(s=>{const e=document.querySelector(`[data-act="a-jump"][data-s="${s}"]`);e&&e.click()},s); await p.waitForTimeout(250); await probe('start-'+s);} }
    else await probe(r||'home');
  }
  // menu
  await p.evaluate(()=>location.hash='#/app'); await p.waitForTimeout(300); await p.click('#pfab').catch(()=>{}); await p.waitForTimeout(400); await probe('menu');
  res.push({theme,w,name:'errors',errs});
  await c.close();
}
fs.writeFileSync(`${OUT}/${LABEL}-results.json`,JSON.stringify(res,null,1));
// summary
const agg={};
for(const x of res){ if(x.name==='errors'){ if(x.errs.length) console.log('ERRORS',x.theme,x.w,x.errs); continue;}
  for(const k of ['over','clip','lowc']) for(const v of x[k]||[]){ const key=k+'|'+x.name+'|'+v.replace(/\d+\.\.\d+/,''); agg[key]=agg[key]||new Set(); agg[key].add(x.theme[0]+x.w);}
  if(x.docOver>1) console.log('DOC OVERFLOW',x.theme,x.w,x.name,x.docOver);}
for(const [k,v] of Object.entries(agg)) console.log(k,'@',[...v].join(','));
await b.close();})();
