const puppeteer = require('puppeteer');

async function animeList(name) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));


    await page.goto('https://jano.egybest.promo/season/' + name);
    console.log('https://jano.egybest.promo/season/' + name);

    const seasonsList = await page.evaluate(() => {
        let data = [];
        let list = document.querySelectorAll('.ep_title');

        for (let i = 0; i < list.length; i++) {
            console.log(list[i])
            data.push({
                url: '/api/anime/episode/' + list[i].firstChild.href.split('/episode/')[1],
                title: list[i].firstChild.innerText
            });
        };

        return data;
    });

    return seasonsList;
};

module.exports = animeList;