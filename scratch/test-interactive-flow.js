import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\ansh\\.gemini\antigravity-ide\\brain\\259685ff-2bd7-483e-8851-554565a560ce';

async function testInteractivity() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.toString()));
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

  // 1. Initial State is Gateway
  console.log('Testing Home Gateway...');
  const cardCount = await page.evaluate(() => document.querySelectorAll('.hp-project-card').length);
  console.log('Number of project cards on Home Gateway:', cardCount);

  // 2. Click the first project card to enter project dashboard
  console.log('Clicking first project card...');
  await page.evaluate(() => {
    const firstCard = document.querySelector('.hp-project-card');
    if (firstCard) firstCard.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const isGatewayHidden = await page.evaluate(() => {
    const el = document.getElementById('homepageProjectsGatewayContainer');
    return el ? el.style.display === 'none' : true;
  });
  console.log('Is gateway hidden after clicking project card?', isGatewayHidden);

  const activeProjectTitle = await page.evaluate(() => {
    const titleEl = document.querySelector('.dash-title');
    return titleEl ? titleEl.innerText : 'None';
  });
  console.log('Active Dashboard Title:', activeProjectTitle);

  // 3. Switch to Inventory Tab
  await page.evaluate(() => window.switchTab('browse'));
  await new Promise(r => setTimeout(r, 600));
  const inventoryItemsCount = await page.evaluate(() => document.querySelectorAll('#grid .card').length);
  console.log('Inventory visible cards rendered:', inventoryItemsCount);

  // 4. Click a jewelry card to add to pull
  await page.evaluate(() => {
    const firstItem = document.querySelector('#grid .card');
    if (firstItem) firstItem.click();
  });
  await new Promise(r => setTimeout(r, 300));
  const selectedCount = await page.evaluate(() => window.selected.length);
  console.log('Selected items count after click:', selectedCount);

  // 5. Switch to Pulls Tab
  await page.evaluate(() => window.switchTab('selected'));
  await new Promise(r => setTimeout(r, 300));
  const pullCards = await page.evaluate(() => document.querySelectorAll('#selectedArea .selection-card').length);
  console.log('Pull workspace rendered items:', pullCards);

  // 6. Switch back to Home Gateway via "ALL PROJECTS GATEWAY" button
  await page.evaluate(() => window.showHomepageGateway());
  await new Promise(r => setTimeout(r, 300));
  const isGatewayVisibleAgain = await page.evaluate(() => {
    const el = document.getElementById('homepageProjectsGatewayContainer');
    return el ? el.style.display !== 'none' : false;
  });
  console.log('Is gateway visible again after showHomepageGateway()?', isGatewayVisibleAgain);

  console.log('Errors logged during flow:', errors.length ? errors : 'None! Zero console errors.');
  await browser.close();
}

testInteractivity().catch(console.error);
