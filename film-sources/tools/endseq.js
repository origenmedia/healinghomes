const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [W,H,tag] of [[412,915,'phone'],[1440,900,'desk']]){
 const c=await b.newContext({viewport:{width:W,height:H},isMobile:W<600,hasTouch:W<600});const p=await c.newPage();
 await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(2500);
 const info=await p.evaluate(()=>{const e=document.querySelector('.sf');return {top:e.offsetTop,h:e.offsetHeight,vh:innerHeight}});
 const fend=info.top+info.h-info.vh*1.6; // the film reaches its last frame here, then holds
 const stops=[['a',fend-info.vh*0.25],['b',fend],['c',fend+info.vh*0.3],['d',fend+info.vh*0.6],['e',fend+info.vh*0.95],['g',fend+info.vh*1.3]];
 for(const [k,y] of stops){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(1200);await p.screenshot({path:`review/${tag}-end-${k}.jpg`,type:'jpeg',quality:70});}
 await p.evaluate(()=>scrollTo(0,document.body.scrollHeight));await p.waitForTimeout(800);
 await p.screenshot({path:`review/${tag}-end-f.jpg`,type:'jpeg',quality:70});
 await c.close();}
await b.close()})();
