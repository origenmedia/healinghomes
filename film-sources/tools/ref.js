const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:412,height:915},deviceScaleFactor:1.5});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:3010/en/el-refugio',{waitUntil:'networkidle'});
const y=await p.evaluate(()=>{const e=[...document.querySelectorAll('h2')].find(h=>h.textContent.includes('1.8 hectares'));return e.getBoundingClientRect().top+scrollY-10});
await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(400);await p.screenshot({path:'shots/ref_land.png',fullPage:false});
console.log(errs, await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth), await p.evaluate(()=>document.body.innerText.match(/\b14\b.{0,30}/g)));await b.close()})();
