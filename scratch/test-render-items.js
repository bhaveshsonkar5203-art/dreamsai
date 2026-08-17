import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\ansh\\.gemini\\antigravity-ide\\brain\\259685ff-2bd7-483e-8851-554565a560ce';

async function testScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

  // Populate sample selection
  await page.evaluate(() => {
    if (Array.isArray(window.data) && window.data.length >= 3) {
      window.selected = [window.data[0]["Serial No"], window.data[1]["Serial No"], window.data[2]["Serial No"]];
      if (typeof window.updateTabBadge === 'function') window.updateTabBadge();
      if (typeof window.syncCurrentSelectionToProject === 'function') window.syncCurrentSelectionToProject();
    }
  });

  // 4. Pulls Workspace View with items selected
  console.log('Capturing Pulls View with populated items...');
  await page.evaluate(() => {
    if (typeof window.switchTab === 'function') window.switchTab('selected');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_4_pulls_active.png') });

  // 6. Returns Processing View with items
  console.log('Capturing Returns View with populated items...');
  await page.evaluate(() => {
    if (typeof window.switchTab === 'function') window.switchTab('returnProducts');
    if (typeof window.loadReturnProductsFromFinalTray === 'function') window.loadReturnProductsFromFinalTray();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_6_returns_active.png') });

  await browser.close();
}

testScreenshots().catch(console.error);
