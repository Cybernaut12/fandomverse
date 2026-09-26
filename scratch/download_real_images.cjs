const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Check if redirect
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const downloads = [
  // TV SHOWS (Posters/Banners)
  { url: 'https://media.themoviedb.org/t/p/original/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg', dest: 'public/images/tv/the-last-of-us-banner.jpg' },
  { url: 'https://media.themoviedb.org/t/p/original/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg', dest: 'public/images/tv/stranger-things-banner.jpg' },
  { url: 'https://media.themoviedb.org/t/p/original/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg', dest: 'public/images/tv/house-of-the-dragon-banner.jpg' },
  { url: 'https://media.themoviedb.org/t/p/original/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg', dest: 'public/images/tv/severance-banner.jpg' },
  { url: 'https://media.themoviedb.org/t/p/original/in1R2dDc421JxsoRWaIIAqVI2KE.jpg', dest: 'public/images/tv/the-boys-banner.jpg' },
  { url: 'https://media.themoviedb.org/t/p/original/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', dest: 'public/images/tv/wednesday-banner.jpg' },

  // CHARACTERS
  { url: 'https://media.themoviedb.org/t/p/original/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg', dest: 'public/images/characters/joel-miller.jpg' }, // Pedro Pascal
  { url: 'https://media.themoviedb.org/t/p/original/kHO7hdNEVuTnQ0OjjrxP1RcAa0e.jpg', dest: 'public/images/characters/eleven.jpg' }, // Millie Bobby Brown
  { url: 'https://media.themoviedb.org/t/p/original/ww6L2ksfJNMbuiIdDuvVKndUHsv.jpg', dest: 'public/images/characters/mark-scout.jpg' }, // Adam Scott
  { url: 'https://media.themoviedb.org/t/p/original/3OxEvzh5KaCB5tzCRv7GeyI1SXX.jpg', dest: 'public/images/characters/homelander.jpg' }, // Antony Starr
];

async function run() {
  for (const d of downloads) {
    try {
      console.log(`Downloading ${d.url} to ${d.dest}`);
      await download(d.url, d.dest);
    } catch (e) {
      console.error(`Failed ${d.dest}:`, e.message);
    }
  }
}
run();
