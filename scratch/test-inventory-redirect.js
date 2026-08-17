import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\ansh\\.gemini\\antigravity-ide\\brain\\259685ff-2bd7-483e-8851-554565a560ce';

async function testInventoryRedirectFlow() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

  // 1. Capture updated Homepage project list with Dashboard buttons
  await page.evaluate(() => {
    if (typeof window.showHomepageGateway === 'function') window.showHomepageGateway();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'tab_1_cards_with_dashboard_btn.png') });
  console.log('Homepage cards captured');

  // 2. Click a project card to test direct Inventory redirect
  const clickCardResult = await page.evaluate(() => {
    const card = document.querySelector('.hp-project-card');
    if (card) {
      card.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'test_card_click_inventory.png') });
  
  const activeTabAfterCardClick = await page.evaluate(() => {
    const browseSec = document.getElementById('browseSection');
    const isBrowseVisible = browseSec && !browseSec.classList.contains('is-hidden') && window.getComputedStyle(browseSec).display !== 'none';
    const overlay = document.getElementById('homepageProjectsGatewayContainer');
    const isOverlayClosed = !overlay || overlay.classList.contains('is-closed') || overlay.classList.contains('is-hidden');
    return { isBrowseVisible, isOverlayClosed };
  });
  console.log('Card Click Result:', activeTabAfterCardClick);

  // 3. Open Gateway again and click Dashboard button
  await page.evaluate(() => {
    if (typeof window.showHomepageGateway === 'function') window.showHomepageGateway();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const dashBtn = document.querySelector('.hp-card-btn-dashboard');
    if (dashBtn) dashBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'test_dashboard_btn_click.png') });

  const activeTabAfterDashClick = await page.evaluate(() => {
    const dashSec = document.getElementById('dashboardSection');
    const isDashVisible = dashSec && !dashSec.classList.contains('is-hidden') && window.getComputedStyle(dashSec).display !== 'none';
    return { isDashVisible };
  });
  console.log('Dashboard Button Click Result:', activeTabAfterDashClick);

  await browser.close();
}

testInventoryRedirectFlow().catch(console.error);
