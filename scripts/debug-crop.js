import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  
  await page.waitForFunction(() => !document.querySelector('[aria-label="Loading Chillies Restaurant website"]'), { timeout: 8000 }).catch(() => console.log('Loader wait timeout, continuing'));

  await new Promise(r => setTimeout(r, 1000));

  const heroH1 = await page.$('.hero h1');
  if (heroH1) {
    await heroH1.screenshot({ path: 'C:/Users/nfiya/.gemini/antigravity/brain/e1b94d16-2dd6-4118-9c26-e85c1953736b/test-brings-clean.png' });
  }

  await page.evaluate(() => {
    document.querySelector('.signature-band')?.scrollIntoView({ block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1500));

  const sigH2 = await page.$('.signature-band h2');
  if (sigH2) {
    await sigH2.screenshot({ path: 'C:/Users/nfiya/.gemini/antigravity/brain/e1b94d16-2dd6-4118-9c26-e85c1953736b/test-biriyani-clean.png' });
  }

  const sigBand = await page.$('.signature-band');
  if (sigBand) {
    await sigBand.screenshot({ path: 'C:/Users/nfiya/.gemini/antigravity/brain/e1b94d16-2dd6-4118-9c26-e85c1953736b/test-sigband-clean.png' });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
}
test();
