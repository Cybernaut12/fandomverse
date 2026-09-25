const fs = require('fs');
const path = require('path');

const srcImg = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\45d9ff66-56cd-49b5-9dd5-8e91d53d64d8\\.user_uploaded\\media_1790324258461.png';
const destImg = 'public/logo.png';

// 1. Copy image to public/logo.png
fs.copyFileSync(srcImg, destImg);
console.log('Copied to', destImg);

// 2. Read image buffer & base64
const imgBuffer = fs.readFileSync(destImg);
const base64Img = imgBuffer.toString('base64');
const dataUri = `data:image/png;base64,${base64Img}`;

// 3. Create fandomverse-mark.svg
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <title>FandomVerse Mark</title>
  <image href="${dataUri}" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet" />
</svg>
`;
fs.writeFileSync('public/fandomverse-mark.svg', markSvg);
console.log('Updated public/fandomverse-mark.svg');

// 4. Create fandomverse-logo.svg
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 76" fill="none">
  <title>FandomVerse</title>
  <g transform="translate(4, 6)">
    <image href="${dataUri}" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet" />
  </g>
  <text x="82" y="52" font-family="'Space Grotesk', system-ui, -apple-system, sans-serif" font-size="44" font-weight="700" letter-spacing="0.5">
    <tspan fill="#FEFEF9">Fandom</tspan><tspan fill="#e8a87c">Verse</tspan>
  </text>
</svg>
`;
fs.writeFileSync('public/fandomverse-logo.svg', logoSvg);
console.log('Updated public/fandomverse-logo.svg');

// Also copy to discover and fandoms public directories if present
if (fs.existsSync('discover/public')) {
  fs.copyFileSync(srcImg, 'discover/public/logo.png');
  fs.writeFileSync('discover/public/fandomverse-mark.svg', markSvg);
  console.log('Copied to discover/public');
}
if (fs.existsSync('fandoms/public')) {
  fs.copyFileSync(srcImg, 'fandoms/public/logo.png');
  fs.writeFileSync('fandoms/public/fandomverse-mark.svg', markSvg);
  console.log('Copied to fandoms/public');
}
