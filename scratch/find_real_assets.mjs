// Query Wikimedia API or Wikipedia API which hosts high-res official posters and photos for all pop culture franchises
async function searchWikipediaImage(query) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages|extracts&pithumbsize=1000&exintro=1&explaintext=1&format=json&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query?.pages;
    if (pages) {
      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];
      return {
        title: page.title,
        image: page.thumbnail?.source || null,
        extract: page.extract ? page.extract.slice(0, 200) : null
      };
    }
  } catch(e) {
    return null;
  }
}

async function run() {
  const queries = [
    'One Piece',
    'The Batman (film)',
    'Alita: Battle Angel',
    'Dune: Part Two',
    'The Last of Us (TV series)',
    'Solo Leveling',
    'Shōgun (2024 TV series)',
    'Fallout (TV series)',
    'Blue Lock',
    'Arcane (TV series)',
    'Spider-Man: Across the Spider-Verse',
    'Frieren',
    'Pluto (manga)',
    'Vinland Saga (manga)',
    'Erased (manga)',
    'Cyberpunk: Edgerunners',
    'Elden Ring',
    'Berserk (manga)',
    'Cyberpunk 2077',
    'The Boys (TV series)',
    'Monster (manga)',
    'Watchmen',
    'The Sandman (comic book)',
    'BTS',
    'Blackpink',
    'NewJeans',
    'Batman: The Long Halloween',
    'Stray Kids',
    'Aespa'
  ];

  for (const q of queries) {
    const res = await searchWikipediaImage(q);
    if (res && res.image) {
      console.log(`OK: "${q}" -> ${res.image}`);
    } else {
      console.log(`MISSING: "${q}"`);
    }
  }
}

run();
