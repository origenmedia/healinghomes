const {chromium}=require('playwright');const OUT=process.argv[2];
(async()=>{const b=await chromium.launch();const errs=[];
for(const [W,H,tag] of [[360,780,'p360'],[412,915,'p412']]){
 const c=await b.newContext({viewport:{width:W,height:H},isMobile:true,hasTouch:true});const p=await c.newPage();
 p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/api/contact',r=>r.fulfill({status:200,body:'{"ok":true}',contentType:'application/json'}));
 await p.goto('http://localhost:3010/en/contact?topic=list',{waitUntil:'load'});await p.waitForTimeout(900);
 await p.screenshot({path:`${OUT}/${tag}-r-list.jpg`,type:'jpeg',quality:70});
 await p.fill('#cf-name','Test');await p.fill('#cf-email','t@example.com');await p.click('.cf .btn');await p.waitForTimeout(900);
 await p.screenshot({path:`${OUT}/${tag}-r-thanks.jpg`,type:'jpeg',quality:70});
 await p.goto('http://localhost:3010/en/el-refugio',{waitUntil:'load'});await p.waitForTimeout(800);
 const el=await p.$('table.compare');await el.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await el.screenshot({path:`${OUT}/${tag}-r-table.jpg`,type:'jpeg',quality:72});
 await c.close();}
console.log('errors',JSON.stringify(errs));await b.close()})();
