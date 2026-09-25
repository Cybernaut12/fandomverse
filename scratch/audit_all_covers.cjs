const fs = require('fs');
const https = require('https');
const http = require('http');

const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));

function checkUrl(url) {
  return new Promise(resolve => {
    if (!url) return resolve({ ok: false, status: 'NO_URL' });
    if (url.startsWith('/')) return resolve({ ok: true, status: 200, local: true });
    
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        // Follow redirects up to 302/301/307/308
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve({ ok: true, status: res.statusCode, redirect: res.headers.location });
        } else if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve({ ok: true, status: res.statusCode });
        } else {
          resolve({ ok: false, status: res.statusCode });
        }
        res.resume();
      });
      req.on('error', err => resolve({ ok: false, status: err.message }));
      req.setTimeout(8000, () => {
        req.destroy();
        resolve({ ok: false, status: 'TIMEOUT' });
      });
    } catch (e) {
      resolve({ ok: false, status: e.message });
    }
  });
}

async function run() {
  console.log('Auditing 354 cover images...');
  const failures = [];
  const batchSize = 20;
  for (let i = 0; i < media.length; i += batchSize) {
    const chunk = media.slice(i, i + batchSize);
    await Promise.all(chunk.map(async m => {
      const res = await checkUrl(m.coverImage);
      if (!res.ok) {
        failures.push({ id: m.id, title: m.title, category: m.category, coverImage: m.coverImage, status: res.status });
      }
    }));
    process.stdout.write('.');
  }
  console.log('\nAudit complete.');
  console.log('Failures count:', failures.length);
  if (failures.length > 0) {
    console.log(JSON.stringify(failures, null, 2));
  }
}

run();
