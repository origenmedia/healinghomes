const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await c.newPage();
const url=process.argv[2], out=process.argv[3];
await p.goto(url,{waitUntil:'load'});
const H=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(250);}
await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(800);
const broken=await p.evaluate(()=>[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
await p.screenshot({path:out,type:'jpeg',quality:70,fullPage:true});
console.log(JSON.stringify({broken,count:await p.evaluate(()=>document.images.length)}));await b.close()})();
