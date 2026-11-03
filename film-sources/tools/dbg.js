const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});
p.on('console',m=>console.log('console',m.text()));p.on('requestfailed',r=>console.log('fail',r.url()));p.on('response',r=>{if(r.url().includes('img'))console.log(r.status(),r.url())});
await p.goto('http://localhost:8765/');await p.waitForTimeout(2500);
await p.evaluate(()=>scrollTo(0,document.getElementById('film').offsetTop+800));await p.waitForTimeout(800);
console.log(await p.evaluate(()=>[window.__lastFrameMs,document.getElementById('cv').width,document.getElementById('bar').style.width]));await b.close()})();
