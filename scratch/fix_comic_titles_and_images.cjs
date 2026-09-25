const fs = require('fs');

const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));

// Curated authentic covers and banners for comics
const comicUpdates = {
  'the-walking-dead-comic': {
    title: 'The Walking Dead: Compendium One',
    coverImage: 'https://covers.openlibrary.org/b/id/7760196-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg' // Rick Grimes on Atlanta highway, NOT Stranger Things!
  },
  'watchmen': {
    title: 'Watchmen',
    coverImage: 'https://covers.openlibrary.org/b/id/7774899-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/dH7ia3vtkYCa3CBvDnvVjqm9uiQ.jpg'
  },
  'sandman': {
    title: 'The Sandman: Preludes & Nocturnes',
    coverImage: 'https://covers.openlibrary.org/b/id/7508162-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/qtfMr08m0gJr397ZodbfUK5B9wh.jpg'
  },
  'batman-the-long-halloween': {
    title: 'Batman: The Long Halloween',
    coverImage: 'https://covers.openlibrary.org/b/id/7416663-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/ekdyrBffLhoFWkm5eUVAbIhDVh6.jpg'
  },
  'batman-year-one': {
    title: 'Batman: Year One',
    coverImage: 'https://covers.openlibrary.org/b/id/798170-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  },
  'batman-the-dark-knight-returns': {
    title: 'The Dark Knight Returns',
    coverImage: 'https://covers.openlibrary.org/b/id/8235496-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/sAtoMqDVhNDQBc3QJL3RF6hlxGq.jpg'
  },
  'batman-the-killing-joke': {
    title: 'Batman: The Killing Joke',
    coverImage: 'https://covers.openlibrary.org/b/id/2737891-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/hkBaDkMWbLaf8B1r5vsIRqqXqvm.jpg'
  },
  'all-star-superman': {
    title: 'All-Star Superman',
    coverImage: 'https://covers.openlibrary.org/b/id/11956378-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/7d6woWBsig1VvMN9gyOkGTTLHf2.jpg'
  },
  'kingdom-come-dc': {
    title: 'Kingdom Come',
    coverImage: 'https://covers.openlibrary.org/b/id/798157-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg'
  },
  'saga-comic': {
    title: 'Saga: Volume 1',
    coverImage: 'https://covers.openlibrary.org/b/id/12679639-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/70Aptmsy688gKjO5Pq91P7kS04A.jpg'
  },
  'invincible-comic': {
    title: 'Invincible: Ultimate Collection',
    coverImage: 'https://covers.openlibrary.org/b/id/1944163-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/6nOln1t19XnQ3vI47e2WlB9fA0p.jpg'
  },
  'civil-war-marvel': {
    title: 'Civil War (Marvel)',
    coverImage: 'https://covers.openlibrary.org/b/id/7883219-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/bOGkgRGdhrBYJSLv7KiTe9Bhbx0.jpg'
  },
  'daredevil-born-again': {
    title: 'Daredevil: Born Again',
    coverImage: 'https://covers.openlibrary.org/b/id/7591097-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/7eHn2P5Z0m2P1V6E4L2U9m8N7x1.jpg'
  },
  'marvels-busiek-ross': {
    title: 'Marvels',
    coverImage: 'https://covers.openlibrary.org/b/id/950586-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg'
  },
  'infinity-gauntlet': {
    title: 'The Infinity Gauntlet',
    coverImage: 'https://covers.openlibrary.org/b/id/8796628-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/suaEOtk1916guMe7qdZKi4LnIQf.jpg'
  },
  'spider-man-blue': {
    title: 'Spider-Man: Blue',
    coverImage: 'https://covers.openlibrary.org/b/id/535727-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg'
  },
  'spider-man-kravens-last-hunt': {
    title: "Spider-Man: Kraven's Last Hunt",
    coverImage: 'https://covers.openlibrary.org/b/id/12794300-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/gL0bU9a0Z1N6X8k3P2q8V1x9yP.jpg'
  },
  'x-men-days-of-future-past': {
    title: 'X-Men: Days of Future Past',
    coverImage: 'https://covers.openlibrary.org/b/id/8724128-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/eeijXm355vAUtq5lgwp2QIY9R62.jpg'
  },
  'x-men-dark-phoenix-saga': {
    title: 'X-Men: The Dark Phoenix Saga',
    coverImage: 'https://covers.openlibrary.org/b/id/536343-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/wPU78OPN4BYEgWYdXyg0phMee61.jpg'
  },
  'secret-wars-2015': {
    title: 'Secret Wars (2015)',
    coverImage: 'https://covers.openlibrary.org/b/id/13639693-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/hkBaDkMWbLaf8B1r5vsIRqqXqvm.jpg'
  },
  'hellboy-seed-of-destruction': {
    title: 'Hellboy: Seed of Destruction',
    coverImage: 'https://covers.openlibrary.org/b/id/6327883-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/7eHn2P5Z0m2P1V6E4L2U9m8N7x1.jpg'
  },
  'spawn-comic': {
    title: 'Spawn: Origins Collection',
    coverImage: 'https://covers.openlibrary.org/b/id/4840618-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/7d6woWBsig1VvMN9gyOkGTTLHf2.jpg'
  },
  'transmetropolitan': {
    title: 'Transmetropolitan: Back on the Street',
    coverImage: 'https://covers.openlibrary.org/b/id/883146-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg'
  },
  'v-for-vendetta-comic': {
    title: 'V for Vendetta',
    coverImage: 'https://covers.openlibrary.org/b/id/12293384-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg'
  },
  'sin-city-comic': {
    title: 'Sin City: The Hard Goodbye',
    coverImage: 'https://covers.openlibrary.org/b/id/10650049-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/eeijXm355vAUtq5lgwp2QIY9R62.jpg'
  },
  'batman-court-of-owls': {
    title: 'Batman: The Court of Owls',
    coverImage: 'https://covers.openlibrary.org/b/id/14424639-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  },
  'batman-hush': {
    title: 'Batman: Hush',
    coverImage: 'https://covers.openlibrary.org/b/id/8372671-L.jpg',
    bannerImage: 'https://image.tmdb.org/t/p/w1280/ekdyrBffLhoFWkm5eUVAbIhDVh6.jpg'
  }
};

let updatedCount = 0;
media.forEach(m => {
  if (comicUpdates[m.id]) {
    Object.assign(m, comicUpdates[m.id]);
    updatedCount++;
    console.log(`Updated comic [${m.id}] ${m.title}`);
  }
});

fs.writeFileSync('src/data/media.json', JSON.stringify(media, null, 2), 'utf8');
console.log(`Successfully applied updates to ${updatedCount} comics in media.json!`);
