const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await c.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.type()+': '+m.text().slice(0,160))});
await p.route('**/api/contact',r=>r.fulfill({status:200,body:'{"ok":true}',contentType:'application/json'}));
const out={};
for(const u of ['/en/signin','/en/credits','/en','/en/contact?topic=list']){
  await p.goto('http://localhost:3011'+u,{waitUntil:'load'});await p.waitForTimeout(1500);
  out[u]=await p.evaluate(()=>document.body.innerText.replace(/\s+/g,' ').slice(0,260));
  await p.screenshot({path:`/tmp/claude-0/-home-user-healinghomes/603ebc98-7834-51bc-972c-046d2502793b/scratchpad/v4/qa/trim${u.replace(/[\/?=]+/g,'_')}.jpg`,type:'jpeg',quality:70});
}
await p.goto('http://localhost:3011/en',{waitUntil:'load'});await p.waitForTimeout(2500);
await p.evaluate(()=>scrollTo(0,document.querySelector('.sf').offsetHeight*0.3));await p.waitForTimeout(1500);
out.film=await p.evaluate(()=>({cls:document.querySelector('.sf').className,cap:(document.querySelector('.sf-cap.on')||{}).innerText}));
await p.goto('http://localhost:3011/en/contact?topic=list');await p.waitForTimeout(900);
await p.fill('#cf-name','Test');await p.fill('#cf-email','t@example.com');await p.click('.cf .btn');await p.waitForTimeout(900);
out.thanks=await p.evaluate(()=>(document.querySelector('#cf-head')||{}).innerText);
console.log(JSON.stringify({out,errs},null,1));await b.close()})();
