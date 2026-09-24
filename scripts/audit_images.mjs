import fs from 'fs';

async function audit() {
  const files = [
    'src/data/media.json',
    'src/data/characters.json',
    'src/data/releases.json',
    'src/data/merchandise.json',
    'src/data/galleries.json',
    'src/data/articles.json',
    'src/data/audioClips.json',
    'src/data/events.json',
    'src/data/reviews.json'
  ];

  const allUrls = new Set();

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const regex = /https:\/\/[^"\s]+/g;
    let match;
    while ((match = regex.exec(raw)) !== null) {
      const url = match[0];
      if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.webp')) {
        allUrls.add(url);
      }
    }
  }

  console.log(`Total unique image URLs to test: ${allUrls.size}`);
  let passed = 0;
  const failedList = [];

  for (const url of allUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(6000) });
      if (res.status === 200) {
        passed++;
      } else {
        failedList.push({ url, status: res.status });
      }
    } catch (e) {
      failedList.push({ url, error: e.message });
    }
  }

  console.log(`Audit Complete: ${passed} Passed, ${failedList.length} Failed out of ${allUrls.size}`);
  if (failedList.length > 0) {
    console.log('Failed URLs:');
    failedList.forEach(f => console.log(f));
  }
}

audit();
