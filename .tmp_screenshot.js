const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', err => console.log('PAGE ERR', err.message));

  const out = '.tmp_screens';
  fs.mkdirSync(out, { recursive: true });

  // ── HOMEPAGE ──
  await page.goto('http://localhost:8765/index.html', { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content: '.custom-cursor,.preloader{display:none!important}' });
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/x_home_hero.png` });

  await page.evaluate(() => {
    const el = document.getElementById('portfolio');
    window.scrollTo({ top: el.offsetTop, behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/x_home_portfolio.png` });

  // Scroll down a bit to see featured + regular grid
  await page.evaluate(() => {
    const el = document.getElementById('portfolio');
    window.scrollTo({ top: el.offsetTop + 500, behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/x_home_portfolio_b.png` });

  // ── DEDICATED CASE PAGE ──
  await page.goto('http://localhost:8765/proyectos/indra-visionai.html', { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content: '.custom-cursor,.preloader{display:none!important}' });
  await page.waitForTimeout(1200);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/x_case_top.png` });

  await page.evaluate(() => {
    const ch = document.querySelector('.chapter[data-target="0"]');
    if (ch) window.scrollTo({ top: ch.getBoundingClientRect().top + window.scrollY - 200, behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/x_case_ch0.png` });

  await page.evaluate(() => {
    const ch = document.querySelector('.chapter[data-target="3"]');
    if (ch) window.scrollTo({ top: ch.getBoundingClientRect().top + window.scrollY - 200, behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/x_case_ch3.png` });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/x_case_outro.png` });

  // Mobile homepage portfolio
  await ctx.close();
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mctx.newPage();
  await mp.goto('http://localhost:8765/index.html', { waitUntil: 'domcontentloaded' });
  await mp.addStyleTag({ content: '.custom-cursor,.preloader{display:none!important}' });
  await mp.waitForTimeout(1000);
  await mp.evaluate(() => window.scrollTo(0, 0));
  await mp.waitForTimeout(300);
  await mp.screenshot({ path: `${out}/x_mob_hero.png` });

  await mp.evaluate(() => {
    const el = document.getElementById('portfolio');
    window.scrollTo({ top: el.offsetTop, behavior: 'instant' });
  });
  await mp.waitForTimeout(400);
  await mp.screenshot({ path: `${out}/x_mob_portfolio.png` });

  await browser.close();
  console.log('DONE');
})();
