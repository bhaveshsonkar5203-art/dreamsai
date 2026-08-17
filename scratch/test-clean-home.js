import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\ansh\\.gemini\\antigravity-ide\\brain\\259685ff-2bd7-483e-8851-554565a560ce';

async function testCleanHome() {
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

  // Check if .top-bar and .page-shell are hidden
  const visibilityStatus = await page.evaluate(() => {
    const topBar = document.querySelector('.top-bar');
    const pageShell = document.querySelector('.page-shell');
    const gateway = document.getElementById('homepageProjectsGatewayContainer');
    const isTopBarHidden = topBar ? window.getComputedStyle(topBar).display === 'none' : true;
    const isPageShellHidden = pageShell ? window.getComputedStyle(pageShell).display === 'none' : true;
    const isGatewayVisible = gateway ? window.getComputedStyle(gateway).display !== 'none' : false;
    return { isTopBarHidden, isPageShellHidden, isGatewayVisible };
  });

  console.log('Homepage Visibility Status:', visibilityStatus);

  // Scroll down to the bottom of the page and capture screenshot
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, 'tab_1_home_bottom_scroll.png') });
  console.log('Bottom scroll captured!');

  await browser.close();
}

testCleanHome().catch(console.error);
