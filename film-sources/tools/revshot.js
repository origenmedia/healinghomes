const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const url = 'file://' + process.argv[2];
  for (const [name, w, h, dark] of [['desk', 1280, 900, false], ['phone', 390, 844, true]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light' });
    const p = await ctx.newPage();
    const errs = [];
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('pageerror', e => errs.push(String(e)));
    await p.goto(url, { waitUntil: 'load' });
    await p.evaluate(async () => { for (const i of document.images) { i.loading = 'eager'; } await new Promise(r => setTimeout(r, 1500)); });
    const sw = await p.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    await p.screenshot({ path: process.argv[3] + '_' + name + '.png', fullPage: true });
    console.log(name, 'scrollWidth/innerWidth', sw, 'errors', errs.slice(0, 5));
    await ctx.close();
  }
  await b.close();
})();
