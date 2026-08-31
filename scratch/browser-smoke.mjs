import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER_LOG', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGEERROR', err.toString()));
  page.on('requestfailed', req => console.log('REQUEST_FAILED', req.url(), req.failure()?.errorText || 'unknown'));

  try {
    await page.goto('http://127.0.0.1:4175/dreamsai/', { waitUntil: 'networkidle2', timeout: 120000 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    const title = await page.title();
    const bodyText = await page.$eval('body', el => el.innerText).then(v => v.slice(0, 700));
    const departmentCards = await page.$$eval('#departmentCardsContainer .department-card, #departmentCardsContainer button', els => els.map(el => ({
      text: (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim(),
      id: el.id || el.dataset.department || '',
      className: el.className
    })));
    const buttonCount = await page.$$eval('button', btns => btns.length);
    console.log('TITLE', title);
    console.log('BODY_SNIP', bodyText.replace(/\s+/g, ' ').trim());
    console.log('BUTTONS', buttonCount);
    console.log('DEPARTMENT_CARDS', JSON.stringify(departmentCards.slice(0, 10), null, 2));

    const firstCard = await page.$('#departmentCardsContainer .department-card, #departmentCardsContainer button');
    if (firstCard) {
      await firstCard.click();
      await new Promise(resolve => setTimeout(resolve, 2000));
      const visibleGridText = await page.$eval('#grid', el => el.innerText).catch(() => '');
      console.log('GRID_SNIP', visibleGridText.replace(/\s+/g, ' ').slice(0, 300));
    }
  } catch (error) {
    console.log('NAV_ERROR', error.toString());
  }

  await browser.close();
})();
