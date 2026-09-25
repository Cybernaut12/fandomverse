const https = require('https');

function check(url) {
  return new Promise(resolve => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', e => resolve({ url, error: e.message }));
    req.setTimeout(5000, () => { req.destroy(); resolve({ url, timeout: true }); });
  });
}

async function run() {
  const list = [
    'https://static.tvmaze.com/uploads/images/original_untouched/618/1545777.jpg',
    'https://static.tvmaze.com/uploads/images/original_untouched/594/1486674.jpg',
    'https://static.tvmaze.com/uploads/images/medium_portrait/632/1580063.jpg'
  ];
  for (const u of list) {
    console.log(await check(u));
  }
}
run();
