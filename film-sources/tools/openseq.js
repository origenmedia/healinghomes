const {chromium}=require('playwright');
const T=[1.0,1.7,2.3,2.9,3.3,4.2,4.7,5.2,5.8,6.4,7.6,9.0];const DUR=106.95;
(async()=>{const b=await chromium.launch();
for(const [W,H,tag] of [[412,915,'phone'],[1440,900,'desk']]){
 const c=await b.newContext({viewport:{width:W,height:H},isMobile:W<600,hasTouch:W<600});const p=await c.newPage();
 await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(2500);
 const span=await p.evaluate(()=>{const e=document.querySelector('.sf');return e.offsetHeight-innerHeight*1.6});
 for(const t of T){await p.evaluate(y=>scrollTo(0,y),span*t/DUR);await p.waitForTimeout(1300);
  await p.screenshot({path:`sheet/img/${tag}-open-${t.toFixed(1)}.jpg`,type:'jpeg',quality:72});}
 await c.close();}
await b.close()})();
