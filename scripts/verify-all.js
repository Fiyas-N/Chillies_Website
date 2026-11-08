import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const viewports = [
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'tablet-landscape-1024', width: 1024, height: 768 },
  { name: 'tablet-portrait-768', width: 768, height: 1024 },
  { name: 'mobile-landscape-820', width: 820, height: 420 },
  { name: 'mobile-portrait-390', width: 390, height: 844 },
  { name: 'mobile-portrait-360', width: 360, height: 780 },
];

async function verify() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => !document.querySelector('[aria-label="Loading Chillies Restaurant website"]'), { timeout: 6000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 600));

    // 1. Hero H1 screenshot
    const heroH1 = await page.$('.hero h1');
    if (heroH1) {
      await heroH1.screenshot({ path: `C:/Users/nfiya/.gemini/antigravity/brain/e1b94d16-2dd6-4118-9c26-e85c1953736b/verify-${vp.name}-h1.png` });
    }

    // 2. Scroll to menu section and capture
    await page.evaluate(() => {
      document.querySelector('#menu')?.scrollIntoView({ block: 'start' });
    });
    await new Promise(r => setTimeout(r, 600));
    const menuSec = await page.$('.menu-section');
    if (menuSec) {
      await menuSec.screenshot({ path: `C:/Users/nfiya/.gemini/antigravity/brain/e1b94d16-2dd6-4118-9c26-e85c1953736b/verify-${vp.name}-menu.png` });
    }

    // 3. Scroll to signature dish and capture H2
    await page.evaluate(() => {
      document.querySelector('.signature-band')?.scrollIntoView({ block: 'center' });
    });
    await new Promise(r => setTimeout(r, 800));
    const sigH2 = await page.$('.signature-band h2');
    if (sigH2) {
      await sigH2.screenshot({ path: `C:/Users/nfiya/.gemini/antigravity/brain/e1b94d16-2dd6-4118-9c26-e85c1953736b/verify-${vp.name}-biriyani.png` });
    }

    // Check horizontal scroll
    const hasScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`Viewport ${vp.name} (${vp.width}x${vp.height}): hasHorizontalScroll=${hasScroll}`);
  }

  await browser.close();
  console.log('All verifications complete!');
}

verify();

