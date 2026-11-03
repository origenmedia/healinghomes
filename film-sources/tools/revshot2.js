const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [name, w, dark] of [['desk', 1280, false], ['phone', 390, true]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: dark ? 'dark' : 'light' });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
    await p.goto('file://' + process.argv[2], { waitUntil: 'load' });
    await p.evaluate(async () => { for (const i of document.images) i.loading = 'eager'; await new Promise(r => setTimeout(r, 1500)); });
    for (const id of ['scene-8', 'scene-9']) {
      const el = await p.$('#' + id); await el.screenshot({ path: process.argv[3] + `_${name}_${id}.png` });
    }
    console.log(name, await p.evaluate(() => [document.documentElement.scrollWidth, innerWidth]), errs.slice(0,3));
    await ctx.close();
  }
  await b.close();
})();
