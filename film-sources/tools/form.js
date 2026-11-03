const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:412,height:915}})).newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));let sent=null;
await p.route('**/api/contact',r=>{sent=JSON.parse(r.request().postData());r.fulfill({status:200,body:'{"ok":true}',contentType:'application/json'})});
for(const t of ['list','call','invest']){await p.goto('http://localhost:3010/en/contact?topic='+t);await p.waitForTimeout(800);
 const h=await p.textContent('#cf-head');const l=await p.textContent('#cf-lede');const btn=await p.textContent('.cf .btn');const inv=await p.isChecked('.cf-check input');
 console.log(t,'|',h,'|',l,'|',btn,'| invest ticked:',inv);}
await p.goto('http://localhost:3010/en/contact?topic=list');await p.waitForTimeout(600);
await p.fill('#cf-name','Test Person');await p.fill('#cf-email','test@example.com');await p.fill('#cf-wa','+1 555 0100');
await p.click('text=Casa Raíz');await p.click('text=In 1 to 2 years');await p.check('.cf-check input');
await p.screenshot({path:'shots/form_list.png',fullPage:true});
await p.click('.cf .btn');await p.waitForTimeout(800);
console.log('SENT',JSON.stringify(sent));console.log('THANKS',(await p.textContent('.cf-thanks')).trim(), await p.getAttribute('.cf-thanks a','href'));
await p.screenshot({path:'shots/form_thanks.png'});console.log('errs',errs);await b.close()})();
