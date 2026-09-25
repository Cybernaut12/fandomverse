const fs = require('fs');
const https = require('https');

const comics = JSON.parse(fs.readFileSync('scratch/all_comics_list.json', 'utf8'));

function getJson(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function checkImageSize(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res2 => {
          resolve({ status: res2.statusCode, size: parseInt(res2.headers['content-length'] || '0') });
        }).on('error', () => resolve({ size: 0 }));
      } else {
        resolve({ status: res.statusCode, size: parseInt(res.headers['content-length'] || '0') });
      }
    }).on('error', () => resolve({ size: 0 }));
  });
}

async function run() {
  console.log(`Starting cover search for ${comics.length} comics...`);
  const results = {};

  for (const c of comics) {
    // Clean up title for search
    const cleanTitle = c.title.replace(/\(.*?\)/g, '').replace(/Vol\..*$/i, '').trim();
    const author = c.platformOrStudio.split('/')[1]?.split('&')[0]?.trim() || '';
    const query = encodeURIComponent(`${cleanTitle} ${author}`.trim());
    const data = await getJson(`https://openlibrary.org/search.json?q=${query}&limit=5`);

    let bestCover = null;
    if (data && data.docs) {
      for (const doc of data.docs) {
        if (doc.cover_i) {
          const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
          const check = await checkImageSize(url);
          if (check.status === 200 && check.size > 15000) {
            bestCover = { id: doc.cover_i, url, size: check.size, title: doc.title };
            break;
          }
        }
      }
    }

    if (bestCover) {
      console.log(`[OK] ${c.id}: "${c.title}" -> ${bestCover.id} (${bestCover.size} bytes)`);
      results[c.id] = bestCover.url;
    } else {
      console.log(`[FAILED] ${c.id}: "${c.title}"`);
    }
  }

  fs.writeFileSync('scratch/resolved_comic_covers.json', JSON.stringify(results, null, 2));
  console.log('Saved resolved_comic_covers.json');
}

run();
