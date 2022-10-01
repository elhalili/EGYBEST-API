const express = require('express');
const dotenv = require('dotenv');

const PORT = process.env.PORT | 1000;

dotenv.config();

const app = express();

app.use('/api/auto-complete/', require('./routes/auto-complete/'));
app.use('/api/movie/', require('./routes/movie/'));
app.use('/api/series/', require('./routes/serie/'));
app.use('/api/anime/', require('./routes/anime/'));


app.use((req, res) => {
    res
        .status(400)
        .json('{"msg": "bad request"}');
});

app.listen(PORT, () => {
    console.log(`The TV API is running at http://127.0.0.1:${PORT}`);
});