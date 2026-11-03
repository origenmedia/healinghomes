const {chromium}=require('playwright');
const OUT='/tmp/claude-0/-home-user-healinghomes/603ebc98-7834-51bc-972c-046d2502793b/scratchpad/v4/qa/';
const CH=[[0,4],[4,11.4],[11.4,32.9],[32.9,38.4],[38.4,45.3],[45.3,51],[51,60.6],[60.6,66.4],[66.4,73.2],[73.2,78.6],[78.6,81.9],[81.9,85.4],[85.4,88.4],[88.4,96.6],[96.6,100.29]];const DUR=100.29;
const PAGES=['/en/el-refugio','/en/how-it-works','/en/my-story','/en/contact?topic=list','/en/contact?topic=call','/en/contact?topic=invest','/en/contact','/en/privacy'];
(async()=>{const b=await chromium.launch();const out={errs:[],ask:{},cap:{},overflow:{},links:{},video:{}};
for(const [W,H,tag] of [[390,844,'phone'],[1440,900,'desk']]){
 const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:W<600?2:1,isMobile:W<600,hasTouch:W<600});const p=await c.newPage();
 p.on('pageerror',e=>out.errs.push(tag+' '+e.message));p.on('console',m=>{if(m.type()==='error')out.errs.push(tag+' '+m.text())});
 await p.route('**/api/contact',r=>r.fulfill({status:200,body:'{"ok":true}',contentType:'application/json'}));
 await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(3000);
 out.video[tag]=await p.evaluate(()=>{const v=document.querySelector('.sf-video');return v?{src:v.currentSrc,dur:v.duration,ready:v.readyState,cls:document.querySelector('.sf').className}:null});
 const span=await p.evaluate(()=>{const e=document.querySelector('.sf');return e.offsetHeight-innerHeight*1.6});
 for(let i=0;i<CH.length;i++){const mid=(CH[i][0]+CH[i][1])/2;const f=mid/DUR;
  await p.evaluate(y=>scrollTo(0,y),span*f);await p.waitForTimeout(1500);
  out.ask[tag+i]=await p.evaluate(()=>getComputedStyle(document.querySelector('.sf-ask')).opacity);
  out.cap[tag+i]=await p.evaluate(()=>{const c=document.querySelector('.sf-cap.on');return c?c.innerText.replace(/\n+/g,' | '):''});
  await p.screenshot({path:`${OUT}${tag}-ch${String(i+1).padStart(2,'0')}.jpg`,type:'jpeg',quality:74});}
 await p.evaluate(()=>{const a=document.querySelector('.sf-after');scrollTo(0,a.offsetTop-60)});await p.waitForTimeout(900);
 await p.screenshot({path:`${OUT}${tag}-after.jpg`,type:'jpeg',quality:74});
 out.overflow[tag+' /en']=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 out.links[tag+' /en']=await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>/founding family|Talk with Nathaniel/i.test(a.innerText)).map(a=>a.innerText.trim()+' -> '+a.getAttribute('href')));
 if(tag==='phone'){
  for(const u of PAGES){await p.goto('http://localhost:3010'+u,{waitUntil:'load'});await p.waitForTimeout(1200);
   const name=u.replace(/[\/?=]+/g,'_');
   await p.evaluate(async()=>{for(const i of document.images){i.loading='eager'}; await new Promise(r=>setTimeout(r,800));});
   await p.screenshot({path:`${OUT}page${name}.jpg`,type:'jpeg',quality:70,fullPage:true});
   out.overflow[u]=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   out.links[u]=await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>/founding family|Talk with Nathaniel/i.test(a.innerText)).map(a=>a.innerText.trim()+' -> '+a.getAttribute('href')));}
  await p.goto('http://localhost:3010/en/contact?topic=list');await p.waitForTimeout(900);
  await p.fill('#cf-name','Test');await p.fill('#cf-email','t@example.com');
  const chips=await p.evaluate(()=>[...document.querySelectorAll('.cf-chips legend')].map(l=>l.innerText+': '+[...l.parentElement.querySelectorAll('span')].map(s=>s.innerText).join(', ')));out.chips=chips;
  await p.screenshot({path:`${OUT}form-list.jpg`,type:'jpeg',quality:72,fullPage:true});
  await p.click('.cf .btn');await p.waitForTimeout(900);
  await p.screenshot({path:`${OUT}form-thanks.jpg`,type:'jpeg',quality:72});}
 await c.close();}
console.log(JSON.stringify(out,null,1));await b.close()})();
