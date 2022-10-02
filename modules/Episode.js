const puppeteer = require('puppeteer');
const { getWatchList } = require('./watchList');

async function Episode(name, type) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));


    await page.goto('https://jano.egybest.promo/' + type + '/' + name, {
        waitUntil: "domcontentloaded",
    });
    console.log('https://jano.egybest.promo/' + type + '/' + name);
    await new Promise(r => setTimeout(r, 1000));

    // Get iframe url
    const watchUrl = await page.evaluate(() => {
        return document.querySelector('iframe').src;
    });
    console.log(watchUrl);
    // await page.screenshot({path: '1.png'});

    await page.deleteCookie();
    await page.goto(watchUrl);
    await page.deleteCookie();
    // await page.screenshot({path: '2.png'}); 

    // declare object
    const link = await page.$('.vidplay');             
    // declare promise
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));    
    await link.click();                             // click, a new tab opens
    const newPage = await newPagePromise;           // open new tab /window, 
    await new Promise(r => setTimeout(r, 1000));
    await newPage.close(); 
    await page.goto(watchUrl);
    // await page.screenshot({path: '3.png'});

    const streamDataUrl = await page.evaluate(() => {
        return document.querySelector('source').src;
    });
    console.log(streamDataUrl)

    await browser.close();

    const list = await getWatchList(streamDataUrl);

    return list;
};

module.exports = Episode;