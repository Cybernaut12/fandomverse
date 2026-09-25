const fs = require('fs');
const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));
const comics = media.filter(m => m.category === 'comics').slice(0, 10);

comics.forEach((c, idx) => {
  console.log(`[${idx + 1}] ${c.id}: ${c.title}`);
  console.log(`  Cover: ${c.coverImage}`);
  console.log(`  Banner: ${c.bannerImage}`);
});
