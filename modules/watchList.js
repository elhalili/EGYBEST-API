const axios = require('axios');

async function getWatchList(streamUrl) {

    const file = await axios(streamUrl);
    const data = file.data.slice(0, -2).split('\n').filter(ele => ele[0] !== '#').map(e => e.replace('stream.m3u8', '').replace('stream', 'watch'));
    console.log(data);

    return [
        {
            '240p': data[0]
        },
        {
            '360p': data[1]
        },
        {
            '480p': data[2]
        },
        {
            '720p': data[3]
        },
        {
            '1080p': data[4]
        },
    ]
}

module.exports.getWatchList = getWatchList;