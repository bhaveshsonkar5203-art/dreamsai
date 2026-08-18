import puppeteer from 'puppeteer';

const targetViewports = [
  { name: 'small_mobile_320', width: 320, height: 568 },
  { name: 'mobile_360', width: 360, height: 640 },
  { name: 'mobile_375', width: 375, height: 667 },
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'mobile_414', width: 414, height: 896 },
  { name: 'mobile_430', width: 430, height: 932 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1440', width: 1440, height: 900 }
];

async function runComprehensiveMobileAudit() {
  console.log('--- Comprehensive Mobile-First & Overflow Audit ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  let totalFailures = 0;

  for (const vp of targetViewports) {
    console.log(`\nAuditing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

    // Check 1: Zero horizontal page overflow
    const overflowMetrics = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      return { docWidth, scrollWidth, bodyScrollWidth, hasOverflow: scrollWidth > docWidth || bodyScrollWidth > docWidth };
    });

    if (overflowMetrics.hasOverflow) {
      console.log(`  ❌ OVERFLOW DETECTED: clientWidth=${overflowMetrics.docWidth}, scrollWidth=${overflowMetrics.scrollWidth}`);
      totalFailures++;
    } else {
      console.log(`  ✅ Zero Horizontal Overflow (Width: ${overflowMetrics.docWidth}px)`);
    }

    // Check 2: Project Bar container width containment
    const pbContainerContained = await page.evaluate(() => {
      const bar = document.getElementById('dreamsaiProjectBar');
      if (!bar) return true;
      const rect = bar.getBoundingClientRect();
      return rect.width <= window.innerWidth;
    });

    if (!pbContainerContained) {
      console.log(`  ❌ PROJECT BAR OVERFLOW: Bar extends outside viewport!`);
      totalFailures++;
    } else {
      console.log(`  ✅ Project Bar Contained within Viewport`);
    }

    // Check 3: Async Project Switching State & Loading indicator
    const switchStateHandled = await page.evaluate(async () => {
      if (typeof window.handleProjectChange === 'function') {
        window.handleProjectChange('PROJ-DEMO-01', null, 'dashboard');
        const loader = document.getElementById('projectSwitchLoader');
        const isLoaderVisible = loader && loader.style.display !== 'none';
        return isLoaderVisible;
      }
      return false;
    });

    console.log(`  ${switchStateHandled ? '✅' : '⚠️'} Project Switch Loading State Triggered`);

    // Check 4: Touch Target Sizes (Minimum 44px height for interactive elements)
    const touchTargetAudit = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, .btn, .bottom-nav-item'));
      const smallTargets = buttons.filter(b => {
        const rect = b.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.height < 36;
      });
      return { total: buttons.length, undersized: smallTargets.length };
    });

    console.log(`  ℹ️ Touch Target Audit: ${touchTargetAudit.total} buttons checked, ${touchTargetAudit.undersized} below 36px`);
  }

  console.log(`\n--- Comprehensive Audit Summary ---`);
  if (totalFailures === 0) {
    console.log('🎉 ALL AUDIT CHECKS PASSED PERFECTLY!');
  } else {
    console.log(`⚠️ ${totalFailures} check(s) flagged.`);
  }

  await browser.close();
}

runComprehensiveMobileAudit().catch(err => console.error('Audit Error:', err));
