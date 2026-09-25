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

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function fixAnimeAndManga() {
  const media = JSON.parse(fs.readFileSync('./src/data/media.json', 'utf8'));

  const brokenAnimeIds = [
    'spirited-away',
    'a-silent-voice',
    'hells-paradise',
    'dorohedoro',
    'samurai-champloo',
    'princess-mononoke',
    'classroom-of-the-elite',
    'trigun-stampede'
  ];

  console.log('Fixing Anime with AniList...');
  for (const id of brokenAnimeIds) {
    const item = media.find(m => m.id === id);
    if (!item) continue;
    try {
      const q = {
        query: `query ($search: String) {
          Media(search: $search, type: ANIME) {
            coverImage { extraLarge large }
            bannerImage
          }
        }`,
        variables: { search: item.title }
      };
      const res = await post('https://graphql.anilist.co', q);
      if (res.data && res.data.Media) {
        const cover = res.data.Media.coverImage.extraLarge || res.data.Media.coverImage.large;
        const banner = res.data.Media.bannerImage || cover;
        console.log(`Updated Anime ${item.title}:`, cover);
        item.coverImage = cover;
        if (banner) item.bannerImage = banner;
      }
    } catch(err) {
      console.error(`Error fixing anime ${id}:`, err.message);
    }
  }

  // Also fix all Manga 404s with AniList (type: MANGA)
  const mangaList = media.filter(m => m.category === 'manga');
  console.log('Checking and fixing all Manga...');
  for (const item of mangaList) {
    // If it's a broken MAL link
    if (item.coverImage.includes('myanimelist.net/images/manga/')) {
      try {
        const q = {
          query: `query ($search: String) {
            Media(search: $search, type: MANGA) {
              coverImage { extraLarge large }
              bannerImage
            }
          }`,
          variables: { search: item.title.replace(/\(Manga\)/i, '').trim() }
        };
        const res = await post('https://graphql.anilist.co', q);
        if (res.data && res.data.Media) {
          const cover = res.data.Media.coverImage.extraLarge || res.data.Media.coverImage.large;
          const banner = res.data.Media.bannerImage || cover;
          console.log(`Updated Manga ${item.title}:`, cover);
          item.coverImage = cover;
          if (banner) item.bannerImage = banner;
        }
      } catch(err) {
        console.error(`Error fixing manga ${item.id}:`, err.message);
      }
    }
  }

  // Fix Jurassic Park in Movies (use TMDB)
  const jurassic = media.find(m => m.id === 'jurassic-park');
  if (jurassic) {
    try {
      const res = await get('https://api.themoviedb.org/3/search/movie?api_key=45db096956276717eb48b323c21ec28f&query=Jurassic%20Park');
      if (res.results && res.results[0]) {
        jurassic.coverImage = 'https://image.tmdb.org/t/p/w780' + res.results[0].poster_path;
        jurassic.bannerImage = 'https://image.tmdb.org/t/p/w1280' + res.results[0].backdrop_path;
        console.log('Updated Jurassic Park:', jurassic.coverImage);
      }
    } catch(e) { console.error('Error fixing Jurassic Park:', e.message); }
  }

  // Fix Bloodborne in Gaming
  const bloodborne = media.find(m => m.id === 'bloodborne');
  if (bloodborne) {
    // Authentic Bloodborne cover: Hunter standing in Yharnam holding Saw Cleaver
    bloodborne.coverImage = 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rb0.jpg';
    bloodborne.bannerImage = 'https://images.igdb.com/igdb/image/upload/t_1080p/sc7x7l.jpg';
    console.log('Updated Bloodborne:', bloodborne.coverImage);
  }

  // Fix TV Shows: Invincible and The Witcher
  const invincible = media.find(m => m.id === 'invincible-animated');
  if (invincible) {
    invincible.coverImage = 'https://image.tmdb.org/t/p/w780/dMOpdkrDC5dQxqNydgKxXjv2ukZ.jpg';
    invincible.bannerImage = 'https://image.tmdb.org/t/p/w1280/6UH52FkV81UeCECuNf9iizxM3Zt.jpg';
    console.log('Updated Invincible:', invincible.coverImage);
  }

  const witcherTv = media.find(m => m.id === 'the-witcher-tv');
  if (witcherTv) {
    witcherTv.coverImage = 'https://image.tmdb.org/t/p/w780/cZ0d3rtvXPVvuiX224379bhv8iX.jpg';
    witcherTv.bannerImage = 'https://image.tmdb.org/t/p/w1280/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg';
    console.log('Updated The Witcher TV:', witcherTv.coverImage);
  }

  // Fix Agust D D-DAY in K-Pop
  const agustD = media.find(m => m.id === 'agust-d-d-day');
  if (agustD) {
    try {
      const res = await get('https://itunes.apple.com/search?term=Agust+D+D-DAY&entity=album&limit=1');
      if (res.results && res.results[0]) {
        agustD.coverImage = res.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
        agustD.bannerImage = agustD.coverImage;
        console.log('Updated Agust D:', agustD.coverImage);
      }
    } catch(e) { console.error('Error fixing Agust D:', e.message); }
  }

  fs.writeFileSync('./src/data/media.json', JSON.stringify(media, null, 2), 'utf8');
  console.log('All media fixes written successfully!');
}

fixAnimeAndManga();
