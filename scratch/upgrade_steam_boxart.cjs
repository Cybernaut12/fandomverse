const fs = require('fs');
const https = require('https');

function checkUrl(url) {
  return new Promise(resolve => {
    https.get(url, res => resolve(res.statusCode)).on('error', () => resolve(500));
  });
}

async function run() {
  const media = JSON.parse(fs.readFileSync('./src/data/media.json', 'utf8'));

  for (const m of media) {
    if (m.category === 'gaming' && m.coverImage.includes('header.jpg')) {
      const portraitUrl = m.coverImage.replace('header.jpg', 'library_600x900.jpg');
      const status = await checkUrl(portraitUrl);
      if (status === 200) {
        // Set bannerImage to header.jpg if bannerImage not set or same
        if (!m.bannerImage || m.bannerImage === m.coverImage) {
          m.bannerImage = m.coverImage;
        }
        m.coverImage = portraitUrl;
        console.log(`Upgraded ${m.title} to 600x900 box art!`);
      }
    }
  }

  fs.writeFileSync('./src/data/media.json', JSON.stringify(media, null, 2), 'utf8');
  console.log('Finished upgrading Steam games!');
}

run();
