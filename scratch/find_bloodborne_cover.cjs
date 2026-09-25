const https = require('https');

function check(url) {
  return new Promise(r => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      r({ url, status: res.statusCode, length: res.headers['content-length'] });
    });
    req.on('error', e => r({ url, error: e.message }));
    req.setTimeout(5000, () => { req.destroy(); r({ url, timeout: true }); });
  });
}

async function run() {
  const urls = [
    'https://m.media-amazon.com/images/M/MV5BN2EwYmU5OTktNmJhNi00Y2VmLTgxZDAtNmFkYTQ5MTcxYTAyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r78.jpg',
    'https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg'
  ];
  for (const u of urls) {
    console.log(await check(u));
  }
}
run();
