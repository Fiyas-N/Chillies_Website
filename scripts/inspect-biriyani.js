import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  await new Promise((r) => setTimeout(r, 2500));

  const info = await page.evaluate(() => {
    const h2 = document.querySelector('.signature-band h2');
    const em = h2 ? h2.querySelector('em') : null;
    const div = h2 ? h2.closest('.signature-band > div') : null;
    const band = document.querySelector('.signature-band');
    const art = document.querySelector('.signature-art');

    function getChain(el) {
      const chain = [];
      let cur = el;
      while (cur && cur !== document.body) {
        const cs = window.getComputedStyle(cur);
        chain.push({
          tag: cur.tagName,
          className: cur.className,
          overflow: cs.overflow,
          overflowX: cs.overflowX,
          overflowY: cs.overflowY,
          clipPath: cs.clipPath,
          width: cs.width,
          maxWidth: cs.maxWidth,
          transform: cs.transform,
          rect: cur.getBoundingClientRect(),
        });
        cur = cur.parentElement;
      }
      return chain;
    }

    return {
      h2Rect: h2?.getBoundingClientRect(),
      emRect: em?.getBoundingClientRect(),
      divRect: div?.getBoundingClientRect(),
      artRect: art?.getBoundingClientRect(),
      bandRect: band?.getBoundingClientRect(),
      emChain: getChain(em),
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

inspect();

