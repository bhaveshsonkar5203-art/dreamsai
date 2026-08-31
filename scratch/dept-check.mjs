import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.goto('http://127.0.0.1:4175/dreamsai/', { waitUntil: 'networkidle2', timeout: 120000 });
await new Promise(resolve => setTimeout(resolve, 2000));

const deptTexts = await page.$$eval('#departmentCardsContainer button, #departmentCardsContainer .department-card, [data-department]', els => els.map(el => ({
  text: (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim(),
  id: el.id || el.dataset.department || '',
  className: el.className
})));

console.log(JSON.stringify(deptTexts.slice(0, 20), null, 2));
await browser.close();
