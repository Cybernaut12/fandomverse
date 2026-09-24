const query = `
  query ($search: String) {
    Page(perPage: 3) {
      characters(search: $search) {
        id
        name {
          full
        }
        image {
          large
        }
      }
    }
  }
`;

async function searchChar(name) {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { search: name } })
    });
    const d = await res.json();
    return d.data?.Page?.characters || [];
  } catch (e) {
    return [];
  }
}

async function run() {
  const names = ['Frieren', 'Tanjirou', 'Guts', 'Yoichi Isagi', 'Satoru Gojo', 'Monkey D. Luffy', 'Levi'];
  for (const n of names) {
    const chars = await searchChar(n);
    console.log(n, '=>', chars.map(c => ({ name: c.name.full, img: c.image.large })));
  }
}
run();
