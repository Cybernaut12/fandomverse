const TMDB_KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

async function queryTmdb(q, type = 'multi') {
  const res = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_KEY}&query=${encodeURIComponent(q)}`);
  const d = await res.json();
  return d.results && d.results[0] ? d.results[0] : null;
}

async function queryAnilistChar(name) {
  const query = `
    query ($search: String) {
      Character(search: $search) {
        id
        name { full }
        image { large }
      }
    }
  `;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { search: name } })
  });
  const d = await res.json();
  return d.data?.Character?.image?.large || null;
}

async function run() {
  const onePiece = await queryTmdb('One Piece', 'tv');
  console.log('One Piece:', { poster: onePiece.poster_path, backdrop: onePiece.backdrop_path });

  const alita = await queryTmdb('Alita: Battle Angel', 'movie');
  console.log('Alita:', { poster: alita.poster_path, backdrop: alita.backdrop_path });

  const berserk = await queryTmdb('Berserk', 'tv');
  console.log('Berserk:', { poster: berserk ? berserk.poster_path : null, backdrop: berserk ? berserk.backdrop_path : null });

  const kaiju = await queryTmdb('Kaiju No. 8', 'tv');
  console.log('Kaiju No 8:', { poster: kaiju.poster_path, backdrop: kaiju.backdrop_path });

  const penguin = await queryTmdb('The Penguin', 'tv');
  console.log('The Penguin:', { poster: penguin.poster_path, backdrop: penguin.backdrop_path });

  const spy = await queryTmdb('Spy x Family', 'tv');
  console.log('Spy x Family:', { poster: spy.poster_path, backdrop: spy.backdrop_path });

  const csm = await queryTmdb('Chainsaw Man', 'tv');
  console.log('Chainsaw Man:', { poster: csm.poster_path, backdrop: csm.backdrop_path });

  const jjk = await queryTmdb('Jujutsu Kaisen', 'tv');
  console.log('Jujutsu Kaisen:', { poster: jjk.poster_path, backdrop: jjk.backdrop_path });

  const nami = await queryAnilistChar('Nami');
  console.log('Nami image:', nami);
}

run();
