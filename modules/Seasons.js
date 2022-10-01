const e = require('express');
const puppeteer = require('puppeteer');

async function Seasons(name, type) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));


    await page.goto('https://jano.egybest.promo/' + type + '/' + name);
    console.log('https://jano.egybest.promo/' + type + '/' + name);

    const seasonsList = await page.evaluate(() => {
        let data = [];
        let list = document.querySelectorAll('.movie');

        for (let i = 0; i < list.length; i++) {
            data.push({
                url: `/api/@@/season/` + list[i].href.split('/season/')[1],
                image: list[0].firstChild.src
            });
        };

        return data;
    });

    return seasonsList.map(e => {
        e.url = e.url.replace('@@', type);

        return e;
    });
}

module.exports = Seasons;