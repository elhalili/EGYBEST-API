const express = require('express');
const Episode = require('../../modules/Episode');
const Seasons = require('../../modules/Seasons');
const animeList = require('../../modules/animeEpisodeList');
const route = express.Router();

// anime season episodes
route.get('/season/:name', async (req, res) => {
    const list = await animeList(req.params.name);

    res.json(list);
});

// episode watch
route.get('/episode/:name', async (req, res) => {
    const list = await Episode(req.params.name, 'episode');

    res.json(list);
});

// anime seasons
route.get('/:name', async (req, res) => {
    const list = await Seasons(req.params.name, 'anime');

    res.json(list);
});


module.exports = route;