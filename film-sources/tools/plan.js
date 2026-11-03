const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:1000},deviceScaleFactor:2});
await p.goto('file:///tmp/claude-0/-home-user-healinghomes/603ebc98-7834-51bc-972c-046d2502793b/scratchpad/v8.html');await p.waitForTimeout(800);
const el=(await p.$$('.plan svg'))[0];await el.screenshot({path:'flight/plan_v8.png'});
const txt=await p.evaluate(()=>{const s=[...document.querySelectorAll('section.sec')].find(x=>x.textContent.includes('village from above'));return s?s.innerText:''});console.log(txt.slice(0,1500));
const after=await p.evaluate(()=>{const pl=document.querySelector('.plan');let n=pl.parentElement.nextElementSibling;return n?n.innerText.slice(0,1200):''});console.log('---',after);await b.close()})();
