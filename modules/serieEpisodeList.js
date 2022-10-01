const puppeteer = require('puppeteer');

async function serieList(name) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));


    await page.goto('https://jano.egybest.promo/season/' + name);
    console.log('https://jano.egybest.promo/season/' + name);

    const seasonsList = await page.evaluate(() => {
        let data = [];
        let list = document.querySelector('.movies_small').children;

        for (let i = 0; i < list.length; i++) {
            
            data.push({
                url: '/api/series/episode/' +  list[i].href.split('/episode/')[1],
                title: list[i].children[2].innerText,
                image: list[i].children[1].src
            });
        };

        return data;
    });

    return seasonsList;
};

module.exports = serieList;