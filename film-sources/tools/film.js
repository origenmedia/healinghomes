const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const W=+process.argv[2]||412,H=+process.argv[3]||915;
const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,isMobile:W<600,hasTouch:W<600});
const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:3010/en',{waitUntil:'networkidle'});
const secs=await p.evaluate(()=>[...document.querySelectorAll('.film .sc')].map(s=>[s.className.split(' ')[1],s.getBoundingClientRect().top+scrollY,s.offsetHeight]));
const pts=+process.argv[4]||3;
const shots=[];
for(const [n,top,h] of secs){for(let k=0;k<pts;k++){const f=pts===1?0.5:k/(pts-1);await p.evaluate(y=>scrollTo(0,y),top+(h-H)*f);await p.waitForTimeout(700);const f2=`/tmp/claude-0/-home-user-healinghomes/603ebc98-7834-51bc-972c-046d2502793b/scratchpad/shots/${W}_${n}_${k}.png`;await p.screenshot({path:f2});shots.push(f2);}}
console.log(JSON.stringify({errs,overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),n:shots.length}));await b.close()})();
