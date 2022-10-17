const puppeteer = require('puppeteer');
const { getWatchList } = require('./watchList');

async function Episode(name, type) {
    const browser = await puppeteer.launch();
    // open a new page
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // go to episode url
    await page.goto('https://asla.egybest.bid/' + type + '/' + name);
    await page.deleteCookie();
    await page.screenshot({path: '1.png'});
    // [!] => it must trigger an ads to get auth for watching

    // fisrt click for trigger an ads
    const clickedOne = await page.$('h1');
    const adsPagePromise1 = new Promise(x => browser.once('targetcreated', target => x(target.page())));  
    await clickedOne.click();      
    // open the ads page             
    const adsPage1 = await adsPagePromise1;            
    await new Promise(r => setTimeout(r, 2000));
    // close the ads page
    await adsPage1.close(); 
    await page.screenshot({path: '2.png'});

    console.log('https://asla.egybest.bid/' + type + '/' + name);

    // Get iframe url
    const watchUrl = await page.evaluate(() => {
        return document.querySelector('iframe').src;
    });
    console.log(watchUrl);


    // go to watch url
    await page.goto(watchUrl);
    await page.screenshot({path: '3.png'});

    // select the object which will be clicked
    const clickedTwo = await page.$('.vidplay');             
    // declare promise
    const adsPagePromise2 = new Promise(x => browser.once('targetcreated', target => x(target.page())));    
    await clickedTwo.click();                             // click, a new tab opens
    const adsPage2 = await adsPagePromise2;           // open new tab /window, 
    // wait for the page
    await new Promise(r => setTimeout(r, 1000));
    await adsPage2.close(); 

    await page.goto(watchUrl);
    await page.screenshot({path: '4.png'});

    // get the stream url (text file)
    const streamDataUrl = await page.evaluate(() => {
        return document.querySelector('source').src;
    });
    console.log(streamDataUrl)

    await browser.close();

    const list = await getWatchList(streamDataUrl);

    return list;
};

module.exports = Episode;