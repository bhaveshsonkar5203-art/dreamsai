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
    await page.goto('http://127.0.0.1:4177/dreamsai/', { waitUntil: 'networkidle2', timeout: 120000 });
    await new Promise(resolve => setTimeout(resolve, 2500));

    const title = await page.title();
    const bodyText = await page.$eval('body', el => el.innerText).then(v => v.slice(0, 700));
    const cards = await page.$$eval('#departmentCardsContainer .department-card', els => els.map(el => el.innerText.trim()));

    console.log('TITLE', title);
    console.log('BODY_SNIP', bodyText.replace(/\s+/g, ' ').trim());
    console.log('DEPARTMENT_CARDS', JSON.stringify(cards.slice(0, 10)));
  } catch (error) {
    console.log('NAV_ERROR', error.toString());
  }

  await browser.close();
})();
