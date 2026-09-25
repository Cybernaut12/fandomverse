// Test and fetch real images for all titles
import fs from 'fs';

const testCandidates = {
  "one-piece": {
    cover: "https://image.tmdb.org/t/p/w780/e3NBjA6g17qjvcWj9jG6Xh2eJ1E.jpg", // One Piece anime poster TMDB
    banner: "https://image.tmdb.org/t/p/w1280/4fJp2m1iCfl8gVw2yVq2X0K7G8z.jpg"
  },
  "the-batman": {
    cover: "https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg"
  },
  "dune-part-two": {
    cover: "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg"
  },
  "alita-battle-angel": {
    cover: "https://image.tmdb.org/t/p/w780/xRWht48C2V8XNfzvRypQI2eTvdD.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/8RKBHHRqOMOL9rGWSATtQsiS1eW.jpg"
  },
  "the-last-of-us": {
    cover: "https://image.tmdb.org/t/p/w780/uKvVjK0B1IRTG2AhytK21YRmyqZ.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg"
  },
  "shogun": {
    cover: "https://image.tmdb.org/t/p/w780/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/adA5dnmK0RgzFuvq1dJq7fS9pZ.jpg"
  },
  "fallout": {
    cover: "https://image.tmdb.org/t/p/w780/AnsSKR9LuK0T9bA0PFiC09vg3z.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/2rmK7mnchw9Xr3XdiTFSxTTvYqi.jpg"
  },
  "arcane": {
    cover: "https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/1R6cvOzZ9Yq9G2kWk1s0Y9uY6aW.jpg"
  },
  "spider-man-spider-verse": {
    cover: "https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg"
  },
  "the-boys": {
    cover: "https://image.tmdb.org/t/p/w780/2zmTngzbB5YJgVv20v1yR8jRzC5.jpg",
    banner: "https://image.tmdb.org/t/p/w1280/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg"
  },
  "elden-ring": {
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49wj.jpg",
    banner: "https://images.igdb.com/igdb/image/upload/t_1080p/sc7e2c.jpg"
  },
  "cyberpunk-2077": {
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.jpg",
    banner: "https://images.igdb.com/igdb/image/upload/t_1080p/sc6qqu.jpg"
  }
};

async function testAll() {
  for (const [key, obj] of Object.entries(testCandidates)) {
    const res1 = await fetch(obj.cover, { method: 'HEAD' });
    const res2 = await fetch(obj.banner, { method: 'HEAD' });
    console.log(key, 'Cover:', res1.status, 'Banner:', res2.status);
  }
}
testAll();
