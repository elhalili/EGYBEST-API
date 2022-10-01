const express = require('express');
const route = express.Router();
const axios = require('axios');
const e = require('express');

route.get('/:name', async (req, res) => {
    console.log(req.params.name);
    const response = await axios.get(`https://asla.egybest.bid/autoComplete.php?q=${req.params.name}`);
    const data = response.data[req.params.name].map(e => {
        e.u = '/api/' + e.u;
        e.i = 'https://i.egycdn.com/pic/' + e.i + '.jpg';
        
        return e;
    });
    res.json(data);
});

module.exports = route;