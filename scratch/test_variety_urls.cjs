const https = require('https');

function check(url) {
  return new Promise(r => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      r({ url, status: res.statusCode });
    });
    req.on('error', e => r({ url, error: e.message }));
    req.setTimeout(5000, () => { req.destroy(); r({ url, timeout: true }); });
  });
}

async function run() {
  const urls = [
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80'
  ];
  for (const u of urls) {
    console.log(await check(u));
  }
}
run();
