const fs = require('fs');
const https = require('https');
const http = require('http');

const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));

console.log('Total media items:', media.length);

// Check if any title or franchise seems completely disconnected or if any image has known bad keywords
media.forEach(m => {
  // Let's check for obvious mismatched strings
  const titleLower = m.title.toLowerCase();
  const coverLower = (m.coverImage || '').toLowerCase();
  
  // Check if Game of Thrones or last of us or spider-verse leaked into unrelated titles
  if (coverLower.includes('1xs1oq') && !titleLower.includes('game of thrones') && !titleLower.includes('thrones')) {
    console.log('Suspicious GOT poster in:', m.title, m.category, m.coverImage);
  }
  if (coverLower.includes('co1r7f') && !titleLower.includes('last of us')) {
    console.log('Suspicious TLOU cover in:', m.title, m.category, m.coverImage);
  }
});

console.log('Finished preliminary check.');
