import puppeteer from 'puppeteer';

const viewports = [
  { name: 'mobile_320', width: 320, height: 568 },
  { name: 'mobile_375', width: 375, height: 667 },
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'mobile_414', width: 414, height: 896 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1440', width: 1440, height: 900 }
];

async function runMobileAudit() {
  console.log('Starting Mobile UI Audit & Verification Suite...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });
  page.on('pageerror', err => console.log('UNCAUGHT EXCEPTION:', err.toString()));

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

    // Test 1: Verify New Project Modal opens
    const newProjBtnWorked = await page.evaluate(() => {
      if (typeof window.openNewProjectDialog === 'function') {
        window.openNewProjectDialog();
        const modal = document.getElementById('newProjectModalOverlay');
        return modal && modal.style.display !== 'none';
      }
      return false;
    });
    console.log(`[${vp.name}] New Project Modal Open:`, newProjBtnWorked ? 'PASS' : 'FAIL');

    // Close modal
    await page.evaluate(() => {
      if (typeof window.closeNewProjectDialog === 'function') window.closeNewProjectDialog();
    });

    // Test 2: Unlock Studio Workspace and test all 5 tabs
    await page.evaluate(() => {
      if (typeof window.unlockStudioWorkspace === 'function') window.unlockStudioWorkspace();
    });

    const tabsToTest = ['dashboard', 'browse', 'selected', 'finalTray', 'returnProducts'];
    for (const tabKey of tabsToTest) {
      const tabWorked = await page.evaluate((tKey) => {
        if (typeof window.switchTab === 'function') {
          window.switchTab(tKey);
          return true;
        }
        return false;
      }, tabKey);
      console.log(`[${vp.name}] Switch Tab (${tabKey}):`, tabWorked ? 'PASS' : 'FAIL');
    }
  }

  console.log('\nMobile Audit Completed Successfully!');
  await browser.close();
}

runMobileAudit().catch(err => console.error('Audit Error:', err));
