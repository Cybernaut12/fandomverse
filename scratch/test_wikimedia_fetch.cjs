const https = require('https');
const fs = require('fs');

function testFetch(url, outPath) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(outPath);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'FandomVerse/2.0 (Mozilla/5.0; Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, {
          headers: {
            'User-Agent': 'FandomVerse/2.0 (Mozilla/5.0; Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        }, res2 => {
          res2.pipe(file);
          file.on('finish', () => resolve({ status: res2.statusCode, size: fs.statSync(outPath).size }));
        });
      } else {
        res.pipe(file);
        file.on('finish', () => resolve({ status: res.statusCode, size: fs.statSync(outPath).size }));
      }
    });
    req.on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  const r1 = await testFetch('https://upload.wikimedia.org/wikipedia/en/9/9f/TheWalkingDead1.jpg', 'scratch/twd1.jpg');
  console.log('TWD1 from Wikimedia:', r1);

  const r2 = await testFetch('https://upload.wikimedia.org/wikipedia/en/a/a2/Watchmen%2C_issue_1.jpg', 'scratch/watchmen1.jpg');
  console.log('Watchmen from Wikimedia:', r2);
}
run();
