const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://google.com/');

    const buttonSelector = 'button#L2AGLb';
    await page.waitForSelector(buttonSelector, { state: 'visible' });
    await page.click(buttonSelector);

    const searchBar = 'textarea[jsname="yZiJbe"]';
    await page.waitForSelector(searchBar, { state: 'visible' });
    await page.click(searchBar);

    await page.type(searchBar, 'Donald Trump');
    await page.keyboard.press('Enter')

    const wikiPediaPage = 'h3[class="LC20lb MBeuO DKV0Md"]'
    await page.waitForSelector(wikiPediaPage, {state: 'visible'});
    await page.click(wikiPediaPage);

    setTimeout(() => {
        browser.close();
    }, 100000);
})();
