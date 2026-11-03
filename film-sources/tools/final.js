// Final pass screenshots: film at key moments on 5 screen sizes, inner pages, forms.
const {chromium}=require('playwright');
const OUT=process.argv[2];const DUR=106.95;
const sizes=[[360,780,'p360',true],[412,915,'p412',true],[1024,768,'d1024',false],[1280,720,'d1280',false],[1440,900,'d1440',false]];
const T=[{t:12.5,n:'lake'},{t:16.5,n:'mist'},{t:18.5,n:'nath'},{t:48.0,n:'app'},{t:50.8,n:'app2'},{t:76.5,n:'garden'},{t:105.6,n:'end'}];
(async()=>{const b=await chromium.launch();const errs=[];const notes=[];
for(const [W,H,tag,mob] of sizes){
 const c=await b.newContext({viewport:{width:W,height:H},isMobile:mob,hasTouch:mob});const p=await c.newPage();
 p.on('pageerror',e=>errs.push(tag+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(tag+' '+m.text())});
 await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(2500);
 const g=await p.evaluate(()=>{const e=document.querySelector('.sf');return {top:e.offsetTop,span:e.offsetHeight-innerHeight*1.6}});
 for(const s of T){await p.evaluate(y=>scrollTo(0,y),g.top+g.span*s.t/DUR);await p.waitForTimeout(1400);
  await p.screenshot({path:`${OUT}/${tag}-${s.n}.jpg`,type:'jpeg',quality:70});}
 // header geometry: one line each?
 const hdr=await p.evaluate(()=>{const m=document.querySelector('.sf-mark'),c=document.querySelector('.sf-call');return {mark:m.getBoundingClientRect().height,call:c.getBoundingClientRect().height,callW:c.getBoundingClientRect().width}});
 notes.push(tag+' header '+JSON.stringify(hdr));
 // after section
 await p.evaluate(()=>{const a=document.querySelector('.sf-after');scrollTo(0,a.offsetTop)});await p.waitForTimeout(900);
 await p.screenshot({path:`${OUT}/${tag}-after.jpg`,type:'jpeg',quality:70,fullPage:false});
 if(W===412||W===1440||W===360){
  for(const pg of ['el-refugio','how-it-works','my-story']){await p.goto('http://localhost:3010/en/'+pg,{waitUntil:'load'});await p.waitForTimeout(900);
   const ov=await p.evaluate(()=>{const d=document.documentElement;return d.scrollWidth-d.clientWidth});notes.push(tag+' '+pg+' overflowX='+ov);
   if(pg==='el-refugio'){for(const sel of ['table.compare','svg.waterdiagram']){const el=await p.$(sel);if(el){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(400);const bb=await el.boundingBox();notes.push(tag+' '+sel+' width='+Math.round(bb.width)+' x='+Math.round(bb.x));await el.screenshot({path:`${OUT}/${tag}-${sel.replace(/\W/g,'')}.jpg`,type:'jpeg',quality:72});}}}
   const ask=await p.$('#ask');if(ask){await ask.scrollIntoViewIfNeeded();await p.waitForTimeout(400);await ask.screenshot({path:`${OUT}/${tag}-${pg}-ask.jpg`,type:'jpeg',quality:72});}
  }
  await p.route('**/api/contact',r=>r.fulfill({status:200,body:'{"ok":true}',contentType:'application/json'}));
  for(const t of ['','?topic=list','?topic=invest']){await p.goto('http://localhost:3010/en/contact'+t,{waitUntil:'load'});await p.waitForTimeout(900);
   await p.screenshot({path:`${OUT}/${tag}-contact${t.replace(/\W/g,'')}.jpg`,type:'jpeg',quality:70,fullPage:true});}
  await p.goto('http://localhost:3010/en/contact?topic=list');await p.waitForTimeout(700);
  await p.fill('#cf-name','Test');await p.fill('#cf-email','t@example.com');await p.click('.cf .btn');await p.waitForTimeout(900);
  await p.screenshot({path:`${OUT}/${tag}-thanks.jpg`,type:'jpeg',quality:70});
 }
 await c.close();}
// landscape phone end card
{const c=await b.newContext({viewport:{width:915,height:412},isMobile:true,hasTouch:true});const p=await c.newPage();
 await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(2500);
 const g=await p.evaluate(()=>{const e=document.querySelector('.sf');return {top:e.offsetTop,span:e.offsetHeight-innerHeight*1.6}});
 await p.evaluate(y=>scrollTo(0,y),g.top+g.span*105.6/DUR);await p.waitForTimeout(1400);await p.screenshot({path:`${OUT}/land-end.jpg`,type:'jpeg',quality:70});await c.close();}
// keyboard: tab stops on the film page
{const c=await b.newContext({viewport:{width:1440,height:900}});const p=await c.newPage();await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(1500);
 const stops=[];for(let i=0;i<12;i++){await p.keyboard.press('Tab');stops.push(await p.evaluate(()=>{const a=document.activeElement;const cs=getComputedStyle(a);let el=a,vis=true;while(el){const s=getComputedStyle(el);if(s.visibility==='hidden'||s.opacity==='0'){vis=false;break}el=el.parentElement}return (a.textContent||'').trim().slice(0,28)+(vis?'':' [INVISIBLE]')}));}
 notes.push('tab stops: '+stops.join(' | '));await c.close();}
console.log(notes.join('\n'));console.log('errors',JSON.stringify(errs));await b.close()})();
