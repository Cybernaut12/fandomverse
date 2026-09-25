const https = require('https');

function anilistSearch(search) {
  const query = `
    query ($search: String) {
      Media (search: $search, type: MANGA) {
        id
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
          large
        }
      }
    }
  `;
  const postData = JSON.stringify({ query, variables: { search } });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'graphql.anilist.co',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: e.message });
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  const jjk = await anilistSearch('Jujutsu Kaisen');
  console.log('JJK:', jjk?.data?.Media?.coverImage);

  const csm = await anilistSearch('Chainsaw Man');
  console.log('CSM:', csm?.data?.Media?.coverImage);
}

run();
