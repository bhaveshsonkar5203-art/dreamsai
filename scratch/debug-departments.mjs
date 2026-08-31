import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER_LOG', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGEERROR', err.toString()));
  page.on('requestfailed', req => console.log('REQUEST_FAILED', req.url(), req.failure()?.errorText || 'unknown'));

  await page.goto('http://127.0.0.1:4177/dreamsai/', { waitUntil: 'domcontentloaded', timeout: 120000 });
  const result = await page.evaluate(async () => {
    const url = 'https://script.google.com/macros/s/AKfycbxT3mIpM_TuLkuZ2465rnQf5z30qhLtDdhcKt282CReeRVbVkqkLfu2M0lXTXXZyc9D/exec';
    try {
      const res = await fetch(url, { cache: 'no-store' });
      const text = await res.text();
      return {
        ok: res.ok,
        status: res.status,
        text: text.slice(0, 300)
      };
    } catch (err) {
      return { error: String(err) };
    }
  });

  console.log('FETCH_RESULT', JSON.stringify(result, null, 2));
  console.log('DOM_COUNT', await page.$$eval('#departmentCardsContainer .department-card', els => els.length));
  console.log('BODY', (await page.$eval('body', el => el.innerText)).slice(0, 500));
  await browser.close();
})();
