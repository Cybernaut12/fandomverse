const https = require('https');

function check(url) {
  return new Promise(r => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      r({ url, status: res.statusCode, location: res.headers.location });
    });
    req.on('error', e => r({ url, error: e.message }));
    req.setTimeout(5000, () => { req.destroy(); r({ url, timeout: true }); });
  });
}

async function run() {
  const list = [
    'https://upload.wikimedia.org/wikipedia/en/a/a2/Watchmen%2C_issue_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/7/77/Dark_knight_returns.jpg',
    'https://upload.wikimedia.org/wikipedia/en/b/b9/BatmanTheKillingJoke.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/52/Batman_Year_One.jpg',
    'https://upload.wikimedia.org/wikipedia/en/b/be/Batman_-_The_Long_Halloween.jpg',
    'https://upload.wikimedia.org/wikipedia/en/4/41/Batman_608.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/5a/Batman_Court_of_Owls.jpg',
    'https://upload.wikimedia.org/wikipedia/en/9/9f/TheWalkingDead1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/a/a6/Invincible_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/c/cb/All_Star_Superman_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/9/91/Kingdom_Come_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/a/ab/Saga_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/b/ba/Civil_War_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/f/f0/Daredevil227.jpg',
    'https://upload.wikimedia.org/wikipedia/en/4/4a/Infinity_Gauntlet_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/6/6c/X-Men_141.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/56/Uncanny_X-Men_135.jpg',
    'https://upload.wikimedia.org/wikipedia/en/9/93/V_for_Vendetta_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/8/84/The_Sandman_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/8/84/Spawn_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/3/37/Hellboy_Seed_of_Destruction_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/58/Preacher_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/0/02/Y_The_Last_Man_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/b/b6/Sin_City_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/8/86/Flashpoint_1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/8/80/Marvels_1.jpg'
  ];

  for (const u of list) {
    const res = await check(u);
    console.log(u.split('/').pop(), res.status);
  }
}
run();
