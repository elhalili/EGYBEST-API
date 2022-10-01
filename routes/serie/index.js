const express = require('express');
const Episode = require('../../modules/Episode');
const Seasons = require('../../modules/Seasons');
const serieList = require('../../modules/serieEpisodeList');
const route = express.Router();

// serie season episodes
route.get('/season/:name', async (req, res) => {
    const list = await serieList(req.params.name);

    res.json(list);
});

// episode watch
route.get('/episode/:name', async (req, res) => {
    const list = await Episode(req.params.name, 'episode');

    res.json(list);
});

// serie seasons
route.get('/:name', async (req, res) => {
    const list = await Seasons(req.params.name, 'series');

    res.json(list);
});


module.exports = route;