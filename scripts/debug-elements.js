import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const info = await page.evaluate(() => {
    // Check all elements inside hero h1 and their styles
    const h1 = document.querySelector('.hero h1');
    const h1HTML = h1.outerHTML;
    const spans = [...h1.querySelectorAll('*')].map(s => ({
      tag: s.tagName,
      className: s.className,
      textContent: s.textContent,
      color: window.getComputedStyle(s).color,
      opacity: window.getComputedStyle(s).opacity,
      visibility: window.getComputedStyle(s).visibility,
      transform: window.getComputedStyle(s).transform,
      filter: window.getComputedStyle(s).filter,
      clipPath: window.getComputedStyle(s).clipPath,
      mixBlendMode: window.getComputedStyle(s).mixBlendMode,
      overflow: window.getComputedStyle(s).overflow,
    }));

    // Check what is at several points over h1
    const r = h1.getBoundingClientRect();
    const points = [];
    for (let x = r.left + 10; x < r.right; x += 40) {
      for (let y = r.top + 10; y < r.bottom; y += 40) {
        const top = document.elementFromPoint(x, y);
        if (top && top !== h1 && !h1.contains(top)) {
          points.push({ x, y, tag: top.tagName, className: top.className, id: top.id });
        }
      }
    }

    return { h1HTML, spans, points: points.slice(0, 10) };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}
test();
