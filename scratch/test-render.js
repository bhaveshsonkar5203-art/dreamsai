import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\ansh\\.gemini\\antigravity-ide\\brain\\259685ff-2bd7-483e-8851-554565a560ce';

async function testScreenshots() {
  console.log('Launching browser with puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(e => console.log('Navigation timeout handled'));

  const dataLen = await page.evaluate(() => {
    return Array.isArray(window.data) ? window.data.length : -1;
  });
  console.log('Current data length on page:', dataLen);

  // 1. Home Gateway View
  console.log('Capturing Home Gateway...');
  await page.evaluate(() => {
    if (typeof window.showHomepageGateway === 'function') window.showHomepageGateway();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_1_home_gateway.png') });

  // 2. Project Dashboard View
  console.log('Capturing Dashboard View...');
  await page.evaluate(() => {
    if (typeof window.switchTab === 'function') window.switchTab('dashboard');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_2_dashboard.png') });

  // 3. Inventory Catalog View
  console.log('Capturing Inventory View...');
  await page.evaluate(() => {
    if (typeof window.switchTab === 'function') window.switchTab('browse');
    if (!window.data || !window.data.length) {
      if (typeof window.getFallbackCatalogData === 'function') {
        window.data = window.getFallbackCatalogData();
        window.rebuildDataIndex();
        if (typeof window.initFilter === 'function') window.initFilter();
        if (typeof window.render === 'function') window.render();
      }
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_3_inventory.png') });

  // 4. Pulls Workspace View with items selected
  console.log('Capturing Pulls View...');
  await page.evaluate(() => {
    window.selected = ['RNG-901', 'NCK-401', 'EAR-601'];
    if (typeof window.updateTabBadge === 'function') window.updateTabBadge();
    if (typeof window.switchTab === 'function') window.switchTab('selected');
    if (typeof window.renderSelected === 'function') window.renderSelected();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_4_pulls.png') });

  // 5. Final Tray View
  console.log('Capturing Final Tray View...');
  await page.evaluate(() => {
    if (typeof window.switchTab === 'function') window.switchTab('finalTray');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_5_final_tray.png') });

  // 6. Returns Processing View
  console.log('Capturing Returns View...');
  await page.evaluate(() => {
    if (typeof window.switchTab === 'function') window.switchTab('returnProducts');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_6_returns.png') });

  console.log('SUCCESS: All 6 tabs captured!');
  await browser.close();
}

testScreenshots().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
