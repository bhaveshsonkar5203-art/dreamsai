import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\ansh\\.gemini\\antigravity-ide\\brain\\259685ff-2bd7-483e-8851-554565a560ce';

async function testHomeGateway() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

  await page.evaluate(() => {
    if (typeof window.showHomepageGateway === 'function') window.showHomepageGateway();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(outDir, 'tab_1_home_gateway_updated.png') });
  console.log('Updated Home Gateway captured!');
  await browser.close();
}

testHomeGateway().catch(console.error);
