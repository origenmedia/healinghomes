const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [name,vw,vh] of [['d',1280,800],['m',390,844]]){
const p=await b.newPage({viewport:{width:vw,height:vh}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8765/');await p.waitForTimeout(1200);
const top=await p.evaluate(()=>document.getElementById('film').offsetTop);const span=await p.evaluate(()=>document.getElementById('film').offsetHeight-innerHeight);
for(const f of [0.05,0.5,0.95]){await p.evaluate(y=>scrollTo(0,y),top+span*f);await p.waitForTimeout(500);await p.screenshot({path:`/tmp/claude-0/-home-user-healinghomes/603ebc98-7834-51bc-972c-046d2502793b/scratchpad/s_${name}_${f}.png`});}
const ow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);console.log(name,'overflow',ow,errs);}
await b.close()})();
