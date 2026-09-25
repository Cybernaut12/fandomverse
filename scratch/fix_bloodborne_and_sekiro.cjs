const fs = require('fs');

const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));

media.forEach(m => {
  if (m.id === 'bloodborne') {
    m.coverImage = 'https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg';
    console.log('Fixed Bloodborne cover to official Hunter box art');
  }
  if (m.id === 'sekiro-game-of-the-year-edition') {
    m.id = 'armored-core-vi';
    m.title = 'Armored Core VI: Fires of Rubicon';
    m.originalTitle = 'ARMORED CORE VI FIRES OF RUBICON';
    m.coverImage = 'https://cdn.cloudflare.steamstatic.com/steam/apps/1884840/library_600x900.jpg';
    m.bannerImage = 'https://cdn.cloudflare.steamstatic.com/steam/apps/1884840/library_hero.jpg';
    m.rating = 9.3;
    m.ratingCount = '310K';
    m.year = 2023;
    m.ongoing = false;
    m.runtimeOrChapters = '30 Hours';
    m.ageRating = 'T - Teen';
    m.genres = ['Action', 'Mecha', 'Sci-Fi', 'FromSoftware'];
    m.platformOrStudio = 'FromSoftware / Bandai Namco';
    m.synopsis = 'On the remote planet Rubicon 3, independent mercenary Raven pilots a high-mobility Armored Core mecha in lethal conflicts over Coral, an enigmatic alien substance.';
    m.quote = "I WON'T STOP. I'LL FLY.";
    m.rank = 'Top Rated Mecha Action';
    m.membersCount = '540K Players';
    m.trailerUrl = 'https://www.youtube.com/embed/bWp4e3N2Ols';
    m.tags = ['Raven', 'Mecha', 'FromSoftware', 'Coral', 'Rubicon'];
    m.totalUnits = 30;
    m.unitType = 'hours';
    console.log('Replaced duplicate Sekiro with Armored Core VI: Fires of Rubicon');
  }
});

fs.writeFileSync('src/data/media.json', JSON.stringify(media, null, 2), 'utf8');
console.log('Updated media.json successfully');
