const fs = require('fs');
const https = require('https');

const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));
const comics = media.filter(m => m.category === 'comics');

function checkUrl(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      // Follow redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res2 => {
          resolve({ status: res2.statusCode, size: res2.headers['content-length'] });
        }).on('error', e => resolve({ error: e.message }));
      } else {
        resolve({ status: res.statusCode, size: res.headers['content-length'] });
      }
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  console.log('Auditing comic covers...');
  for (const c of comics) {
    const res = await checkUrl(c.coverImage);
    const size = parseInt(res.size || '0');
    // Openlibrary returns a 1x1 or 807-byte placeholder when no cover exists!
    if (size < 1000) {
      console.log(`SUSPICIOUS SMALL/MISSING COVER: [${c.id}] ${c.title} -> size: ${size} bytes (${c.coverImage})`);
    }
  }
  console.log('Done checking comic covers.');
}
run();
