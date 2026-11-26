const {chromium, devices}=require('playwright');
(async()=>{const b=await chromium.launch(); const ok=(c,m)=>console.log((c?'PASS ':'FAIL ')+m); const errs=[];
for (const scheme of ['dark','light']){
 const c=await b.newContext({...devices['iPhone 13'], colorScheme:scheme}); const p=await c.newPage(); p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8765/site.html#/'); await p.waitForTimeout(600);
 const th=()=>p.evaluate(()=>document.documentElement.dataset.theme);
 ok(await th()===scheme, `auto follows device (${scheme})`);
 ok(await p.isVisible('.sh-theme'), 'theme button visible in mobile header');
 await p.tap('.sh-theme'); await p.waitForTimeout(200);
 ok(await th()===(scheme==='dark'?'light':'dark'), 'header button toggles');
 await p.reload(); await p.waitForTimeout(500); ok(await th()===(scheme==='dark'?'light':'dark'),'choice persists after reload');
 await p.goto('http://127.0.0.1:8765/site.html#/app'); await p.waitForTimeout(400);
 ok(await p.isVisible('#pfab'),'menu tab visible on app route');
 await p.tap('#pfab'); await p.waitForTimeout(300);
 await p.tap('#pm [data-act="theme-pref"][data-t="auto"]'); await p.waitForTimeout(200);
 ok(await th()===scheme,'menu: auto restores device theme');
 await p.tap('#pm [data-act="theme-pref"][data-t="light"]'); await p.waitForTimeout(200); ok(await th()==='light','menu: light');
 await p.tap('#pm [data-act="site-menu"]'); await p.waitForTimeout(300);
 await p.evaluate(()=>document.querySelector('[data-act="a-jump"][data-s="settings"]').click()); await p.waitForTimeout(300);
 const seg=await p.$('.view.on .theme-seg [data-t="dark"]'); ok(!!seg,'app settings has appearance switch');
 if(seg){ await seg.scrollIntoViewIfNeeded(); await seg.tap(); await p.waitForTimeout(200); ok(await th()==='dark','app settings: dark'); }
 await p.screenshot({path:`t-settings-${scheme}.png`});
 await c.close();}
console.log('errors',errs); await b.close();})();
