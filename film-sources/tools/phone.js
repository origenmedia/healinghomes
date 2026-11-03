const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const c=await b.newContext({viewport:{width:412,height:915},deviceScaleFactor:2.625,isMobile:true,hasTouch:true});
const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const cdp=await c.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
const bytes={};p.on('response',async r=>{if(r.url().includes('/img/')){try{bytes[r.url().split('/').pop()]=(await r.body()).length}catch(e){}}});
await p.goto('http://localhost:8765/');await p.waitForTimeout(1500);
console.log('before scroll loaded:',JSON.stringify(bytes));
const top=await p.evaluate(()=>document.getElementById('film').offsetTop);const span=await p.evaluate(()=>document.getElementById('film').offsetHeight-innerHeight);
const times=[];
for(let i=0;i<=20;i++){await p.evaluate(y=>scrollTo(0,y),top+span*i/20);await p.waitForTimeout(120);times.push(await p.evaluate(()=>window.__lastFrameMs||0));
 if(i===10||i===20)await p.screenshot({path:`/tmp/claude-0/-home-user-healinghomes/603ebc98-7834-51bc-972c-046d2502793b/scratchpad/ph_${i}.png`});}
console.log('frame ms (4x cpu):',times.map(t=>t.toFixed(1)).join(' '));
console.log('scene bytes:',JSON.stringify(bytes),'errs',errs,'overflow',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await b.close()})();
