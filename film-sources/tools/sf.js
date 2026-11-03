const {chromium}=require('playwright');
(async()=>{const W=+process.argv[2],H=+process.argv[3];const b=await chromium.launch();
const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,isMobile:W<600,hasTouch:W<600});
const p=await c.newPage();if(W<600){const cdp=await c.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});}const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(3000);
const info=await p.evaluate(()=>{const v=document.querySelector('.sf-video');return v?{rs:v.readyState,src:v.currentSrc,dur:v.duration}:null});
const span=await p.evaluate(()=>{const e=document.querySelector('.sf');return e.offsetHeight-innerHeight});
const shots=[];
for(const f of [0,0.1,0.25,0.37,0.43,0.7,0.97,1]){await p.evaluate(y=>scrollTo(0,y),span*f);await p.waitForTimeout(900);
 const t=await p.evaluate(()=>{const v=document.querySelector('.sf-video');return v?v.currentTime.toFixed(2):'-'});
 const fn=`shots/sf_${W}_${f}.png`;await p.screenshot({path:fn});shots.push([f,t]);}
console.log(JSON.stringify({info,errs,shots,overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));await b.close()})();
