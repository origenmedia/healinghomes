const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
for(const [W,H,tag] of [[412,915,'phone'],[1440,900,'desk']]){
 const c=await b.newContext({viewport:{width:W,height:H},isMobile:W<600,hasTouch:W<600});const p=await c.newPage();
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:3010/en',{waitUntil:'load'});await p.waitForTimeout(1500);
 const links=await p.evaluate(()=>({header:document.querySelector('.sf-call')?.getAttribute('href'),end:document.querySelector('.sf-cap.end .quiet')?.getAttribute('href'),after:document.querySelector('.sf-after .call')?.getAttribute('href'),footer:[...document.querySelectorAll('footer a')].filter(a=>a.textContent.includes('Talk with Nathaniel')).map(a=>a.getAttribute('href'))}));
 console.log(tag,JSON.stringify(links));
 await p.goto('http://localhost:3010/en/contact',{waitUntil:'load'});await p.waitForTimeout(900);
 await p.screenshot({path:`qa/contact-${tag}-default.jpg`,type:'jpeg',quality:72,fullPage:true});
 await p.click('input[name=topic][value=call]');await p.waitForTimeout(500);
 const btn=await p.evaluate(()=>{const a=document.querySelector('.cf-book a');return a?{href:a.getAttribute('href'),text:a.textContent.trim()}:null});
 console.log(tag,'call choice ->',JSON.stringify(btn), '| head:', await p.textContent('#cf-head'), '| lede:', await p.textContent('#cf-lede'));
 await p.screenshot({path:`qa/contact-${tag}-call.jpg`,type:'jpeg',quality:72,fullPage:true});
 await p.goto('http://localhost:3010/en/el-refugio',{waitUntil:'load'});await p.waitForTimeout(800);
 const ref=await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>a.textContent.includes('Talk with Nathaniel')).map(a=>a.getAttribute('href')));
 console.log(tag,'el-refugio talk links',JSON.stringify(ref));
 await c.close();}
console.log('errors',JSON.stringify(errs));await b.close()})();
