const express = require('express');

const PORT = process.env.PORT | 1000;

const app = express();

app.use('/api/auto-complete/', require('./routes/auto-complete/'));
app.use('/api/movie/', require('./routes/movie/'));
app.use('/api/series/', require('./routes/serie/'));
app.use('/api/anime/', require('./routes/anime/'));


app.use((req, res) => {
    console.log('API: bad request');

    res
        .status(400)
        .json('{"msg": "bad request"}');
});

app.listen(PORT, () => {
    console.log(`The API is running at PORT ${PORT}`);
});