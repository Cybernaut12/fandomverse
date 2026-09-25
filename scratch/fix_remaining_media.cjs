const fs = require('fs');

const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));

const updates = {
  'invincible-animated': {
    coverImage: 'https://static.tvmaze.com/uploads/images/original_untouched/618/1545777.jpg',
    bannerImage: 'https://static.tvmaze.com/uploads/images/original_untouched/618/1545777.jpg'
  },
  'the-witcher-tv': {
    coverImage: 'https://static.tvmaze.com/uploads/images/original_untouched/594/1486674.jpg',
    bannerImage: 'https://static.tvmaze.com/uploads/images/original_untouched/594/1486674.jpg'
  },
  'the-crown': {
    coverImage: 'https://static.tvmaze.com/uploads/images/medium_portrait/632/1580063.jpg',
    bannerImage: 'https://static.tvmaze.com/uploads/images/medium_portrait/632/1580063.jpg'
  },
  'dandadan-manga-extra': {
    title: 'Chainsaw Man (Manga)',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105778-euxXZEIfDY2u.png',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/manga/banner/105778-vubq92c6v2d1.jpg'
  },
  'jujutsu-kaisen-manga': {
    coverImage: 'https://cdn.myanimelist.net/images/manga/3/210341.jpg',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/manga/banner/101517-j4lVdf4epg4M.jpg'
  }
};

let count = 0;
media.forEach(m => {
  if (updates[m.id]) {
    Object.assign(m, updates[m.id]);
    count++;
    console.log('Updated:', m.id, '->', m.title, m.coverImage);
  }
});

fs.writeFileSync('src/data/media.json', JSON.stringify(media, null, 2), 'utf8');
console.log('Successfully updated', count, 'titles in media.json');
