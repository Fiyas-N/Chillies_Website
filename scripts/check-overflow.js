import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function check() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const widths = [1920, 1440, 1280, 1024, 820, 768, 600, 480, 390, 360, 320];

  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 900 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1200));

    const result = await page.evaluate((targetWidth) => {
      const docW = document.documentElement.offsetWidth;
      const scrollW = document.documentElement.scrollWidth;
      const bodyScrollW = document.body.scrollWidth;
      const issues = [];

      document.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        // Ignore horizontally scrollable carousel tracks themselves
        if (
          r.right > targetWidth + 2 &&
          !el.closest('.food-grid, .location-grid, .review-track, .insta-grid')
        ) {
          issues.push({
            tag: el.tagName,
            cls: typeof el.className === 'string' ? el.className : (el.className?.baseVal || ''),
            id: el.id,
            right: Math.round(r.right),
            width: Math.round(r.width),
            excess: Math.round(r.right - targetWidth),
          });
        }
      });

      return {
        viewportWidth: targetWidth,
        docW,
        scrollW,
        bodyScrollW,
        hasHorizontalScroll: scrollW > targetWidth || bodyScrollW > targetWidth,
        offendingElements: issues,
      };
    }, w);

    console.log(
      `Viewport ${w}px: hasHorizontalScroll=${result.hasHorizontalScroll}, docW=${result.docW}, scrollW=${result.scrollW}, offenders=${result.offendingElements.length}`
    );
    if (result.offendingElements.length > 0) {
      console.log('  Offenders:', JSON.stringify(result.offendingElements.slice(0, 8), null, 2));
    }

    await page.close();
  }

  await browser.close();
}

check().catch((e) => {
  console.error(e);
  process.exit(1);
});
