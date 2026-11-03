const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [W,H,tag] of [[412,915,'phone'],[1440,900,'desk']]){
 const c=await b.newContext({viewport:{width:W,height:H},isMobile:W<600,hasTouch:W<600});const p=await c.newPage();
 await p.goto('http://localhost:3010/en/el-refugio',{waitUntil:'load'});await p.waitForTimeout(1500);
 await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);});
 await p.waitForTimeout(800);
 await p.screenshot({path:`sheet/img/${tag}-refugio.jpg`,type:'jpeg',quality:62,fullPage:true});
 await c.close();}
await b.close()})();
