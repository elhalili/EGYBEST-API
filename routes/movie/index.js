const express = require('express');
const Episode = require('../../modules/Episode');
const route = express.Router();

// watch list
route.get('/:name', async (req, res) => {

    const list = await Episode(req.params.name, 'movie');
    res.json(list);
})

module.exports = route;