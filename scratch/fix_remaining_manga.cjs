const fs = require('fs');
const https = require('https');

function post(url, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'Mozilla/5.0'
      }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const customSearches = {
  'billy-bat': 'Billy Bat',
  'pluto-manga': 'Pluto',
  'lone-wolf-and-cub': 'Kozure Ookami',
  'dragon-ball-manga': 'Dragon Ball',
  'nausicaa-manga': 'Kaze no Tani no Nausicaa',
  'witch-hat-atelier': 'Tongari Boushi no Atelier',
  'frieren-manga': 'Sousou no Frieren',
  'blue-lock-manga': 'Blue Lock',
  'real-takehiko-inoue': 'Real',
  'bleach-manga': 'Bleach',
  'hunter-x-hunter-manga': 'Hunter x Hunter',
  'death-note-manga': 'Death Note',
  'fullmetal-alchemist-manga': 'Hagane no Renkinjutsushi',
  'blade-of-the-immortal': 'Mugen no Juunin',
  'akira-manga': 'Akira',
  'choujin-x': 'Choujin X',
  'yokohama-kaidashi-kikou': 'Yokohama Kaidashi Kikou',
  'haikyuu-manga': 'Haikyuu!!',
  'attack-on-titan-manga': 'Shingeki no Kyojin',
  'dandadan-manga-extra': 'Chainsaw Man',
  'look-back-manga': 'Look Back',
  'goodbye-eri': 'Sayonara Eri',
  'uzumaki-deluxe': 'Tomie',
  'dr-stone-manga': 'Dr. Stone',
  'tokyo-revengers-manga': 'Tokyo Revengers',
  'gintama-manga': 'Gintama',
  'jojos-part-5-golden-wind-manga': 'JoJo no Kimyou na Bouken Part 5'
};

async function run() {
  const media = JSON.parse(fs.readFileSync('./src/data/media.json', 'utf8'));

  for (const [id, term] of Object.entries(customSearches)) {
    const item = media.find(m => m.id === id);
    if (!item) continue;
    try {
      const q = {
        query: `query ($search: String) {
          Media(search: $search, type: MANGA) {
            coverImage { extraLarge large }
            bannerImage
          }
        }`,
        variables: { search: term }
      };
      const res = await post('https://graphql.anilist.co', q);
      if (res.data && res.data.Media && res.data.Media.coverImage) {
        const cover = res.data.Media.coverImage.extraLarge || res.data.Media.coverImage.large;
        const banner = res.data.Media.bannerImage || cover;
        item.coverImage = cover;
        if (banner) item.bannerImage = banner;
        console.log(`Success ${id}:`, cover);
      } else {
        console.log(`No match for ${id}`);
      }
    } catch(e) {
      console.error(`Error for ${id}:`, e.message);
    }
  }

  fs.writeFileSync('./src/data/media.json', JSON.stringify(media, null, 2), 'utf8');
  console.log('Manga updates written successfully!');
}

run();
