const fs = require('fs');
const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));
const comics = media.filter(m => m.category === 'comics');

console.log('Total comics:', comics.length);
comics.forEach((c, idx) => {
  console.log(`[${idx + 1}] ID: ${c.id} | Title: ${c.title}`);
  console.log(`    Cover: ${c.coverImage}`);
  console.log(`    Banner: ${c.bannerImage}`);
});
