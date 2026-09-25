const fs = require('fs');

const b64 = fs.readFileSync('public/images/logo.png').toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <title>FandomVerse Mark</title>
  <image href="data:image/png;base64,${b64}" width="64" height="64" preserveAspectRatio="xMidYMid meet" />
</svg>
`;

fs.writeFileSync('public/logo-icon.svg', svg);
fs.writeFileSync('public/favicon.svg', svg);
console.log('Successfully updated logo-icon.svg and favicon.svg');
