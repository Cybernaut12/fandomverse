const fs = require('fs');
const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));
const comics = media.filter(m => m.category === 'comics');

comics.forEach((c, i) => {
  console.log(`${i + 1}. [${c.id}] "${c.title}"`);
  console.log(`   Cover:  ${c.coverImage}`);
  console.log(`   Banner: ${c.bannerImage}`);
});
