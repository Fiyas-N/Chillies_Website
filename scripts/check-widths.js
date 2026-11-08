import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage();

  const widths = [1920, 1600, 1440, 1366, 1280, 1180, 1080, 1024, 960, 900, 840, 768, 640, 480, 390, 360];

  for (const w of widths) {
    await page.setViewport({ width: w, height: 800 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => !document.querySelector('[aria-label="Loading Chillies Restaurant website"]'), { timeout: 6000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 600));

    await page.evaluate(() => {
      document.querySelector('.signature-band')?.scrollIntoView({ block: 'center' });
    });
    await new Promise(r => setTimeout(r, 800));

    const sigH2 = await page.$('.signature-band h2');
    if (sigH2) {
      await sigH2.screenshot({ path: `C:/Users/nfiya/.gemini/antigravity/brain/e1b94d16-2dd6-4118-9c26-e85c1953736b/sig-${w}.png` });
    }
  }

  await browser.close();
  console.log('All viewports checked');
}
test();
