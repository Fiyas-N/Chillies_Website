import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\nfiya\\.gemini\\antigravity\\brain\\e1b94d16-2dd6-4118-9c26-e85c1953736b\\screenshots';

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'tablet-landscape-1024', width: 1024, height: 768 },
  { name: 'tablet-portrait-768', width: 768, height: 1024 },
  { name: 'mobile-portrait-390', width: 390, height: 844 },
];

const SECTIONS = [
  { id: 'hero', selector: '.hero', label: 'Hero Section' },
  { id: 'menu', selector: '.menu-section', label: 'Menu & Food Carousel' },
  { id: 'signature', selector: '.signature-band', label: 'Signature Dum Biriyani Band' },
  { id: 'story', selector: '.story-section', label: 'Our Story & Timeline' },
  { id: 'locations', selector: '.locations-section', label: 'Locations & Ribbon' },
  { id: 'footer', selector: 'footer', label: 'Reviews & Footer' },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

    // Wait for the cinematic loader to finish fading out
    await page.waitForFunction(() => {
      const loader = document.querySelector('[role="status"][aria-label*="Loading"]');
      return !loader || loader.style.visibility === 'hidden' || loader.style.opacity === '0';
    }, { timeout: 10000 }).catch(() => {});

    // Allow extra time for GSAP entrance and layout stabilization
    await new Promise((r) => setTimeout(r, 1000));

    // Scroll through the entire page to trigger lazy loading and GSAP scroll triggers
    await page.evaluate(async () => {
      const scrollStep = 500;
      const totalHeight = document.body.scrollHeight;
      for (let y = 0; y <= totalHeight; y += scrollStep) {
        if (window.__lenis) {
          window.__lenis.scrollTo(y, { immediate: true });
        } else {
          window.scrollTo(0, y);
        }
        await new Promise((r) => setTimeout(r, 40));
      }
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    });
    await new Promise((r) => setTimeout(r, 600));

    // Full page screenshot for overall flow
    const fullPagePath = path.join(ARTIFACT_DIR, `${vp.name}-fullpage.png`);
    await page.screenshot({ path: fullPagePath, fullPage: true });
    console.log(`Saved full page: ${fullPagePath}`);

    // Section by section screenshots
    for (const sec of SECTIONS) {
      try {
        const el = await page.$(sec.selector);
        if (el) {
          // Scroll element smoothly into view
          await page.evaluate((selector) => {
            const target = document.querySelector(selector);
            if (target) {
              if (window.__lenis) {
                window.__lenis.scrollTo(target, { offset: -80, immediate: true });
              } else {
                const rect = target.getBoundingClientRect();
                window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'instant' });
              }
            }
          }, sec.selector);
          await new Promise((r) => setTimeout(r, 400));

          const secPath = path.join(ARTIFACT_DIR, `${vp.name}-${sec.id}.png`);
          await el.screenshot({ path: secPath });
          console.log(`Saved ${sec.label}: ${secPath}`);
        }
      } catch (err) {
        console.error(`Error capturing ${sec.id} on ${vp.name}:`, err.message);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('\nAll audit screenshots captured successfully!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
