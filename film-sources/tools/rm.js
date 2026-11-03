const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
for(const [W,H,tag] of [[412,915,'phone'],[1440,900,'desk']]){
 const c=await b.newContext({viewport:{width:W,height:H},isMobile:W<600,hasTouch:W<600,reducedMotion:'reduce'});const p=await c.newPage();
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(1500);
 const span=await p.evaluate(()=>{const e=document.querySelector('.sf');return e.offsetHeight-innerHeight*1.6});
 const hasVideo=await p.evaluate(()=>!!document.querySelector('.sf-video'));
 for(const t of [3.2,30,103.6]){await p.evaluate(y=>scrollTo(0,y),span*t/106.95);await p.waitForTimeout(900);
  await p.screenshot({path:`qa/rm-${tag}-${t}.jpg`,type:'jpeg',quality:70});}
 console.log(tag,'video element present:',hasVideo);
 await c.close();}
console.log('errors',JSON.stringify(errs));await b.close()})();
