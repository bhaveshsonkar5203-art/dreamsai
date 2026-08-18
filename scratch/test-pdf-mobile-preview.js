import puppeteer from 'puppeteer';

async function testPdfMobilePreview() {
  console.log('Testing Mobile PDF Preview Generation & Visibility...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('dialog', async dialog => {
    console.log('HANDLING DIALOG:', dialog.message());
    await dialog.dismiss();
  });

  // Set to mobile viewport (iPhone 13 - 390x844) with mobile user agent
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000));

  // 1. Switch to Pulls tab with selected items
  console.log('Switching to Selected tab...');
  await page.evaluate(() => {
    window.unlockStudioWorkspace();
    window.selected = ['RNG-901', 'NCK-401'];
    if (typeof window.updateTabBadge === 'function') window.updateTabBadge();
    window.switchTab('selected');
    if (typeof window.renderSelected === 'function') window.renderSelected();
  });

  // 2. Click Generate PDF in Pulls tab
  console.log('Triggering PDF Generation in Selected tab...');
  await page.evaluate(async () => {
    if (typeof window.generateSelectionPdf === 'function') {
      await window.generateSelectionPdf();
    }
  });

  await new Promise(r => setTimeout(r, 2000));

  // 3. Verify PDF preview visibility on mobile
  const selectedPreviewStatus = await page.evaluate(() => {
    const visualPages = document.getElementById('pdfVisualPagesPreview');
    const images = visualPages ? visualPages.querySelectorAll('img.pdf-page-image') : [];
    const placeholder = document.getElementById('previewPlaceholder');
    return {
      visualPagesHidden: visualPages ? visualPages.classList.contains('hidden') : true,
      imageCount: images.length,
      firstImageSrc: images.length > 0 ? images[0].src.substring(0, 30) : null,
      placeholderHidden: placeholder ? placeholder.classList.contains('hidden') : false
    };
  });

  console.log('Selected Tab Mobile Preview Status:', selectedPreviewStatus);

  // 4. Test Final Tray Tab PDF Generation
  console.log('\nTesting Final Tray Tab PDF Generation...');
  await page.evaluate(async () => {
    window.switchTab('finalTray');
    window.finalTraySerials = ['RNG-901', 'NCK-401', 'EAR-601'];
    if (typeof window.renderFinalTraySerialManager === 'function') {
      window.renderFinalTraySerialManager();
    }
    if (typeof window.generateFinalTrayFromSerials === 'function') {
      await window.generateFinalTrayFromSerials(true);
    }
  });

  await new Promise(r => setTimeout(r, 2000));

  const finalTrayPreviewStatus = await page.evaluate(() => {
    const panel = document.getElementById('finalTrayPreviewPanel');
    const visualPages = document.getElementById('finalTrayVisualPagesPreview');
    const images = visualPages ? visualPages.querySelectorAll('img.pdf-page-image') : [];
    return {
      panelVisible: panel ? !panel.classList.contains('hidden') : false,
      imageCount: images.length,
      firstImageSrc: images.length > 0 ? images[0].src.substring(0, 30) : null
    };
  });

  console.log('Final Tray Tab Mobile Preview Status:', finalTrayPreviewStatus);

  await browser.close();
}

testPdfMobilePreview().catch(err => console.error('Test Failed:', err));
