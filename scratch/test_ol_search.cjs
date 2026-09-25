const https = require('https');

function searchOL(title) {
  return new Promise(resolve => {
    https.get('https://openlibrary.org/search.json?q=' + encodeURIComponent(title) + '&limit=1', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const doc = json.docs?.[0];
          resolve({
            title: doc?.title,
            cover_i: doc?.cover_i,
            cover_url: doc?.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null
          });
        } catch (e) {
          resolve({ error: e.message });
        }
      });
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  const titles = [
    'The Walking Dead Compendium One',
    'Batman The Long Halloween',
    'Batman The Killing Joke',
    'All-Star Superman',
    'Invincible Ultimate Collection',
    'Saga Volume 1'
  ];
  for (const t of titles) {
    const res = await searchOL(t);
    console.log(t, '->', res);
  }
}
run();
