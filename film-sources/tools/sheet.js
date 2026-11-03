const {chromium}=require('playwright');
const CH=[[0,1.5],[1.5,4.9],[4.9,8.6],[8.6,17.2],[17.2,38.63],[38.63,44.13],[44.13,52.32],[52.32,59.07],[59.07,73.6],[73.6,79.1],[79.1,89.6],[89.6,94.5],[94.5,104.45],[104.45,106.95]];const DUR=106.95;
(async()=>{const b=await chromium.launch();const out={errs:[],ask:{}};
for(const [W,H,tag] of [[412,915,'phone'],[1440,900,'desk']]){
 const c=await b.newContext({viewport:{width:W,height:H},isMobile:W<600,hasTouch:W<600});const p=await c.newPage();
 p.on('pageerror',e=>out.errs.push(e.message));p.on('console',m=>{if(m.type()==='error')out.errs.push(m.text())});
 await p.route('**/api/contact',r=>r.fulfill({status:200,body:'{"ok":true}',contentType:'application/json'}));
 await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(2500);
 const span=await p.evaluate(()=>{const e=document.querySelector('.sf');return e.offsetHeight-innerHeight*1.6});
 for(let i=0;i<CH.length;i++){const mid=(CH[i][0]+CH[i][1])/2;const f=mid/DUR;
  await p.evaluate(y=>scrollTo(0,y),span*f);await p.waitForTimeout(1300);
  out.ask[tag+i]=await p.evaluate(()=>getComputedStyle(document.querySelector('.sf-ask')).opacity);
  await p.screenshot({path:`sheet/img/${tag}-ch${String(i+1).padStart(2,'0')}.jpg`,type:'jpeg',quality:72});}
 await p.evaluate(()=>{const a=document.querySelector('.sf-after');scrollTo(0,a.offsetTop-60)});await p.waitForTimeout(900);
 out.ask[tag+'after']=await p.evaluate(()=>getComputedStyle(document.querySelector('.sf-ask')).opacity);
 await p.screenshot({path:`sheet/img/${tag}-after.jpg`,type:'jpeg',quality:72});
 for(const t of ['list','call','invest']){await p.goto('http://localhost:3010/en/contact?topic='+t);await p.waitForTimeout(900);
  await p.screenshot({path:`sheet/img/${tag}-form-${t}.jpg`,type:'jpeg',quality:72,fullPage:true});}
 await p.goto('http://localhost:3010/en/contact?topic=list');await p.waitForTimeout(700);
 await p.fill('#cf-name','Test');await p.fill('#cf-email','t@example.com');await p.click('.cf .btn');await p.waitForTimeout(800);
 await p.screenshot({path:`sheet/img/${tag}-thanks.jpg`,type:'jpeg',quality:72});
 await c.close();}
console.log(JSON.stringify(out));await b.close()})();
