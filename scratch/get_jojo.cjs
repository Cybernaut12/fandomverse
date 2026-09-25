const fs = require('fs');
const https = require('https');

const query = JSON.stringify({
  query: `query {
    Media(search: "Vento Aureo", type: MANGA) {
      id
      title { romaji english }
      coverImage { extraLarge large }
      bannerImage
    }
  }`
});

const req = https.request('https://graphql.anilist.co', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(query),
    'User-Agent': 'Mozilla/5.0'
  }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const json = JSON.parse(d);
    console.log(JSON.stringify(json, null, 2));
    if (json.data && json.data.Media) {
      const media = JSON.parse(fs.readFileSync('./src/data/media.json', 'utf8'));
      const jojo = media.find(m => m.id === 'jojos-part-5-golden-wind-manga');
      if (jojo) {
        jojo.coverImage = json.data.Media.coverImage.extraLarge || json.data.Media.coverImage.large;
        if (json.data.Media.bannerImage) jojo.bannerImage = json.data.Media.bannerImage;
        fs.writeFileSync('./src/data/media.json', JSON.stringify(media, null, 2), 'utf8');
        console.log('Updated jojo:', jojo.coverImage);
      }
    }
  });
});
req.write(query);
req.end();
