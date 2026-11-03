const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [w,h] of [[1437,743],[412,915]]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto('http://localhost:3010/en',{waitUntil:'networkidle'});await p.waitForTimeout(600);await p.screenshot({path:`shots/top_${w}_0.png`});
await p.evaluate(()=>scrollTo(0,innerHeight*1.2));await p.waitForTimeout(700);await p.screenshot({path:`shots/top_${w}_1.png`});}
await b.close()})();
