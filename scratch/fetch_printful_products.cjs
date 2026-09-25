const fs = require('fs');
const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function run() {
  const data = await get('https://api.printful.com/products');
  const products = data.result;
  console.log('Total products from Printful API:', products.length);

  const hoodies = products.filter(p => p.title.toLowerCase().includes('hoodie'));
  const tshirts = products.filter(p => p.title.toLowerCase().includes('t-shirt') || p.title.toLowerCase().includes('tee'));
  const joggers = products.filter(p => p.title.toLowerCase().includes('jogger') || p.title.toLowerCase().includes('sweatpant'));
  const mugs = products.filter(p => p.title.toLowerCase().includes('mug'));
  const caps = products.filter(p => p.title.toLowerCase().includes('hat') || p.title.toLowerCase().includes('cap') || p.title.toLowerCase().includes('beanie'));

  console.log('Found hoodies:', hoodies.length);
  console.log('Found tshirts:', tshirts.length);
  console.log('Found joggers:', joggers.length);
  console.log('Found mugs:', mugs.length);
  console.log('Found caps:', caps.length);

  const sampleHoodies = hoodies.slice(0, 10).map(p => ({ id: p.id, title: p.title, image: p.image }));
  const sampleTees = tshirts.slice(0, 10).map(p => ({ id: p.id, title: p.title, image: p.image }));
  const sampleJoggers = joggers.slice(0, 10).map(p => ({ id: p.id, title: p.title, image: p.image }));
  const sampleMugs = mugs.slice(0, 10).map(p => ({ id: p.id, title: p.title, image: p.image }));

  console.log('Sample Hoodies:', JSON.stringify(sampleHoodies, null, 2));
  console.log('Sample Mugs:', JSON.stringify(sampleMugs, null, 2));
  console.log('Sample Joggers:', JSON.stringify(sampleJoggers, null, 2));
}

run();
