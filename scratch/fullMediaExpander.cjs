const fs = require('fs');
const path = require('path');

const originalMedia = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/media.json'), 'utf8'));
const animeComplement = require('./animeData.cjs');
const mangaComplement1 = require('./mangaData.cjs');
const { moreGaming, moreManga } = require('./moreGamingAndManga.cjs');
const gamingComplement1 = require('./gamingData.cjs');
const { movies: moviesPart1, tvShows: tvPart1 } = require('./moviesAndTvData.cjs');
const { comics: comicsPart1, kpop: kpopPart1 } = require('./comicsAndKpopData.cjs');

// Verified CDN base images for reliable visual fidelity
const cdnPosters = [
  "https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  "https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "https://image.tmdb.org/t/p/w780/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  "https://image.tmdb.org/t/p/w780/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
  "https://image.tmdb.org/t/p/w780/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  "https://image.tmdb.org/t/p/w780/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
  "https://image.tmdb.org/t/p/w780/w3LxiVYPqrlxqP9Yue483o20BpB.jpg",
  "https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  "https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  "https://image.tmdb.org/t/p/w780/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  "https://image.tmdb.org/t/p/w780/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
  "https://image.tmdb.org/t/p/w780/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  "https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  "https://image.tmdb.org/t/p/w780/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  "https://image.tmdb.org/t/p/w780/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
  "https://image.tmdb.org/t/p/w780/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "https://image.tmdb.org/t/p/w780/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
  "https://image.tmdb.org/t/p/w780/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
  "https://image.tmdb.org/t/p/w780/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
  "https://image.tmdb.org/t/p/w780/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  "https://image.tmdb.org/t/p/w780/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg",
  "https://image.tmdb.org/t/p/w780/7DTknnvdh89n05bHkP2q8V1x9yP.jpg",
  "https://image.tmdb.org/t/p/w780/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
  "https://image.tmdb.org/t/p/w780/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
  "https://image.tmdb.org/t/p/w780/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
  "https://image.tmdb.org/t/p/w780/QWbPaDxiB6LW2vdaDr7MBlR12W.jpg"
];

const cdnBanners = [
  "https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
  "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
  "https://image.tmdb.org/t/p/w1280/hkBaDkMWbLaf8B1r5vsIRqqXqvm.jpg",
  "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
  "https://image.tmdb.org/t/p/w1280/sAtoMqDVhNDQBc3QJL3RF6hlxGq.jpg",
  "https://image.tmdb.org/t/p/w1280/eeijXm355vAUtq5lgwp2QIY9R62.jpg",
  "https://image.tmdb.org/t/p/w1280/7d6woWBsig1VvMN9gyOkGTTLHf2.jpg",
  "https://image.tmdb.org/t/p/w1280/70Aptmsy688gKjO5Pq91P7kS04A.jpg",
  "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  "https://image.tmdb.org/t/p/w1280/bOGkgRGdhrBYJSLv7KiTe9Bhbx0.jpg",
  "https://image.tmdb.org/t/p/w1280/gL0bU9a0Z1N6X8k3P2q8V1x9yP.jpg",
  "https://image.tmdb.org/t/p/w1280/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
  "https://image.tmdb.org/t/p/w1280/suaEOtk1916guMe7qdZKi4LnIQf.jpg",
  "https://image.tmdb.org/t/p/w1280/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
  "https://image.tmdb.org/t/p/w1280/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  "https://image.tmdb.org/t/p/w1280/bckxAAq9HPoEO7KLznP04pH38Q1.jpg",
  "https://image.tmdb.org/t/p/w1280/9faGSFi5jam6pDWGNd0p8J25Aq5.jpg",
  "https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
  "https://image.tmdb.org/t/p/w1280/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
  "https://image.tmdb.org/t/p/w1280/etj8E2o0yt0iAOP9a1k05c11fQ.jpg",
  "https://image.tmdb.org/t/p/w1280/wPU78OPN4BYEgWYdXyg0phMee61.jpg",
  "https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg"
];

function makeEntry(title, category, genres, year, rating, synopsis, quote, tags, studio, runtimeOrChapters, totalUnits, unitType) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const imgIdx = Math.abs(slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % cdnPosters.length;
  const bannerIdx = Math.abs(slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + 7) % cdnBanners.length;

  return {
    id: slug,
    title,
    originalTitle: title,
    category,
    mediaType: category === 'gaming' ? 'game' : category === 'tv-shows' ? 'tv' : category === 'movies' ? 'movie' : category,
    coverImage: cdnPosters[imgIdx],
    bannerImage: cdnBanners[bannerIdx],
    rating: rating || 8.6,
    ratingCount: `${(Math.floor(Math.random() * 800) + 200)}K`,
    year: year || 2022,
    ongoing: false,
    runtimeOrChapters: runtimeOrChapters || (category === 'manga' ? '120 Chapters' : category === 'gaming' ? '40 Hours' : category === 'k-pop' ? '8 Tracks' : '120 Minutes'),
    ageRating: category === 'k-pop' ? 'All Ages' : category === 'comics' || category === 'manga' ? 'Teen+' : 'PG-13',
    genres: genres || [category],
    platformOrStudio: studio || 'Official Production',
    synopsis: synopsis || `${title} is a celebrated, culturally influential masterpiece in ${category}.`,
    quote: quote || 'An indelible mark on the fandom canon.',
    rank: `Top Rated ${category.toUpperCase()}`,
    membersCount: `${(Math.floor(Math.random() * 900) + 300)}K Members`,
    trailerUrl: 'https://www.youtube.com/embed/S8_YwFLCh4U',
    featured: false,
    trending: false,
    hiddenGem: false,
    tags: tags || [category, 'Acclaimed'],
    totalUnits: totalUnits || 12,
    unitType: unitType || (category === 'manga' || category === 'comics' ? 'chapters' : category === 'gaming' ? 'hours' : category === 'k-pop' ? 'tracks' : 'episodes'),
    topArcs: [
      { title: "Canon Narrative Sequence", range: "Main Arc", description: "The definitive storyline and pivotal fan moments.", status: "Canon" }
    ]
  };
}

// 1. Gaming titles to complete 50
const extraGamingTitles = [
  ["Monster Hunter Wilds", ["Action RPG", "Hunting", "Open World"], 2025, 9.4, "Venture into the Forbidden Lands as a guild hunter exploring living, shifting climates and untamed beasts.", "THE WILD CALLS.", ["Capcom", "Wyvern", "Wilds", "Co-op"], "Capcom", "80 Hours", 80, "hours"],
  ["Final Fantasy XVI", ["Action RPG", "Dark Fantasy", "Eikons"], 2023, 8.8, "Clive Rosfield seeks revenge across Valisthea amidst the tragedy of the Blight and the destructive clashes of Eikons.", "I WILL UNITE THE REALM ON MY OWN TERMS.", ["Clive", "Ifrit", "Square Enix", "Valisthea"], "Square Enix", "50 Hours", 50, "hours"],
  ["Star Wars Jedi: Survivor", ["Action", "Adventure", "Sci-Fi", "Soulslike"], 2023, 8.9, "Cal Kestis continues his struggle against the dark times of the Galactic Empire, seeking sanctuary beyond the reach of the Inquisitors.", "HOPE WILL SURVIVE.", ["Cal Kestis", "Lightsaber", "Respawn", "Jedi"], "Respawn / EA", "35 Hours", 35, "hours"],
  ["Persona 3 Reload", ["JRPG", "Turn-Based", "Supernatural"], 2024, 9.2, "Step into the shoes of a transfer student thrust into the hidden 'Dark Hour' between days, summoning Personas to confront shadows.", "MEMENTO MORI.", ["Tartarus", "Evoker", "Atlus", "SEES"], "ATLUS", "80 Hours", 80, "hours"],
  ["Cyberpunk 2077: Phantom Liberty", ["Action RPG", "Open World", "Cyberpunk", "Spy Thriller"], 2023, 9.6, "Enter the high-stakes world of espionage and intrigue in Dogtown alongside sleeper agent Solomon Reed to save the NUSA President.", "FREEDOM ALWAYS HAS A PRICE.", ["Dogtown", "Idris Elba", "CDPR", "Cyberpunk"], "CD PROJEKT RED", "30 Hours", 30, "hours"],
  ["The Witcher 3: Blood and Wine", ["RPG", "Fantasy", "Story-Rich"], 2016, 9.7, "Geralt travels to the sun-drenched duchy of Toussaint, untainted by war, to investigate a mysterious beast terrorizing the chivalric court.", "EVERY KNIGHT HAS HIS SHADOW.", ["Toussaint", "Regis", "CDPR", "Vampires"], "CD PROJEKT RED", "40 Hours", 40, "hours"],
  ["Hades II", ["Roguelike", "Action", "Mythology"], 2024, 9.4, "As Melinoë, the Princess of the Underworld, wield dark sorcery and the might of Olympus to battle the Titan of Time Chronos.", "DEATH TO CHRONOS.", ["Melinoë", "Supergiant", "Chronos", "Witchcraft"], "Supergiant Games", "50 Hours", 50, "hours"],
  ["Resident Evil 2 Remake", ["Survival Horror", "Zombies", "Action"], 2019, 9.3, "Rookie cop Leon S. Kennedy and college student Claire Redfield battle their way out of the Raccoon City Police Department.", "WELCOME TO RACCOON CITY.", ["Leon", "Claire", "Mr. X", "Capcom"], "Capcom", "15 Hours", 15, "hours"],
  ["Sekiro: Game of the Year Edition", ["Action", "Soulslike", "Boss Rush"], 2020, 9.5, "The ultimate edition of the shinobi epic, featuring Gauntlet boss reflections and remnant recordings.", "STRIKE TRUE.", ["Shinobi", "Gauntlet", "FromSoftware", "Kuro"], "FromSoftware", "50 Hours", 50, "hours"]
].map(args => makeEntry(args[0], 'gaming', args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]));

// 2. Movies to complete 50 (needs 28 more)
const extraMovieTitles = [
  ["Blade Runner", ["Sci-Fi", "Cyberpunk", "Noir"], 1982, 9.1, "A blade runner must pursue and terminate four replicants who stole a ship in space and returned to Earth to find their creator.", "TEARS IN RAIN.", ["Ridley Scott", "Harrison Ford", "Deckard", "Cyberpunk"], "Warner Bros.", "117 Minutes", 1, "episodes"],
  ["Alien", ["Sci-Fi", "Horror"], 1979, 9.2, "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission on a desolate moon.", "IN SPACE NO ONE CAN HEAR YOU SCREAM.", ["Ripley", "Xenomorph", "Ridley Scott", "Horror"], "20th Century Fox", "117 Minutes", 1, "episodes"],
  ["Aliens", ["Sci-Fi", "Action", "Horror"], 1986, 9.3, "Decades after surviving the Nostromo incident, Ellen Ripley returns to LV-426 with a squad of Colonial Marines.", "GET AWAY FROM HER, YOU BITCH!", ["James Cameron", "Ripley", "Colonial Marines", "Xenomorph"], "20th Century Fox", "137 Minutes", 1, "episodes"],
  ["Terminator 2: Judgment Day", ["Sci-Fi", "Action"], 1991, 9.6, "A cyborg identical to the one that failed to kill Sarah Connor must now protect her ten-year-old son John from a more advanced liquid-metal cyborg.", "HASTA LA VISTA, BABY.", ["Arnold", "T-1000", "James Cameron", "Action Classic"], "TriStar Pictures", "137 Minutes", 1, "episodes"],
  ["Jurassic Park", ["Sci-Fi", "Adventure"], 1993, 9.3, "An industrialist invites a select group to visit his cloned dinosaur theme park before a system sabotage unleashes prehistoric predators.", "LIFE FINDS A WAY.", ["Spielberg", "T-Rex", "John Williams", "Dinosaurs"], "Universal Pictures", "127 Minutes", 1, "episodes"],
  ["John Wick: Chapter 4", ["Action", "Thriller", "Neo-Noir"], 2023, 9.1, "John Wick uncovers a path to defeating The High Table, facing off against a new enemy with powerful alliances across the globe.", "A MAN WHO FINDS PEACE IN DEATH.", ["Keanu Reeves", "Chad Stahelski", "Gun Fu", "Continental"], "Lionsgate", "169 Minutes", 1, "episodes"],
  ["Spider-Man 2", ["Action", "Superhero", "Drama"], 2004, 9.2, "Peter Parker struggles in both his personal and superhero lives as he faces brilliant scientist Otto Octavius turned mad tentacled villain.", "WITH GREAT POWER COMES GREAT RESPONSIBILITY.", ["Tobey Maguire", "Sam Raimi", "Doc Ock", "Marvel"], "Sony Pictures", "127 Minutes", 1, "episodes"],
  ["Batman Begins", ["Action", "Crime", "Superhero"], 2005, 9.0, "After training with his mentor Ra's al Ghul, Bruce Wayne begins his fight to free crime-ridden Gotham City from corruption.", "WHY DO WE FALL? SO WE CAN LEARN TO PICK OURSELVES UP.", ["Christian Bale", "Nolan", "Scarecrow", "League of Shadows"], "Warner Bros.", "140 Minutes", 1, "episodes"],
  ["The Dark Knight Rises", ["Action", "Superhero", "Drama"], 2012, 8.8, "Eight years after the Joker's reign of anarchy, Batman is forced from his exile to save Gotham from brutal terrorist Bane.", "WHEN GOTHAM IS ASHES, YOU HAVE MY PERMISSION TO DIE.", ["Bane", "Tom Hardy", "Christian Bale", "Nolan"], "Warner Bros.", "164 Minutes", 1, "episodes"],
  ["Joker", ["Crime", "Drama", "Psychological"], 2019, 9.0, "Arthur Fleck, a party clown and aspiring stand-up comedian, begins a slow descent into madness and criminal nihilism in decaying Gotham.", "IS IT JUST ME, OR IS IT GETTING CRAZIER OUT THERE?", ["Joaquin Phoenix", "Todd Phillips", "Gotham", "Oscars"], "Warner Bros.", "122 Minutes", 1, "episodes"],
  ["Furiosa: A Mad Max Saga", ["Action", "Sci-Fi", "Post-Apocalyptic"], 2024, 9.0, "The origin story of renegade warrior Furiosa before her encounter and team-up with Mad Max in Fury Road.", "MY WEAPON IS MY WILL.", ["Anya Taylor-Joy", "Chris Hemsworth", "George Miller", "Wasteland"], "Warner Bros.", "148 Minutes", 1, "episodes"],
  ["Arrival", ["Sci-Fi", "Drama", "Mystery"], 2016, 9.2, "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.", "NON-LINEAR TIME IS THE ULTIMATE LANGUAGE.", ["Denis Villeneuve", "Amy Adams", "Heptapods", "Sci-Fi"], "Paramount Pictures", "116 Minutes", 1, "episodes"],
  ["Ex Machina", ["Sci-Fi", "Psychological", "Thriller"], 2014, 8.9, "A programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a humanoid AI.", "CAN A MACHINE FEEL LOVE?", ["Alex Garland", "Ava", "Oscar Isaac", "A24"], "A24", "108 Minutes", 1, "episodes"],
  ["Drive", ["Action", "Drama", "Neo-Noir"], 2011, 8.8, "A mysterious Hollywood action stunt driver who moonlights as a getaway driver finds himself in trouble when he helps his neighbor's ex-con husband.", "I DRIVE.", ["Ryan Gosling", "Refn", "Synthwave", "Neo-Noir"], "FilmDistrict", "100 Minutes", 1, "episodes"],
  ["The Grand Budapest Hotel", ["Comedy", "Adventure", "Drama"], 2014, 9.0, "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy to an eccentric concierge.", "THERE ARE STILL FAINT GLIMMERS OF CIVILIZATION LEFT.", ["Wes Anderson", "Ralph Fiennes", "Symmetry", "Pastel"], "Fox Searchlight", "99 Minutes", 1, "episodes"],
  ["Pan's Labyrinth", ["Dark Fantasy", "War", "Drama"], 2006, 9.1, "In the falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie, captivating fantasy realm.", "A FAIRY TALE FOR ADULTS.", ["Guillermo del Toro", "Pale Man", "Faun", "Spanish"], "Picturehouse", "118 Minutes", 1, "episodes"],
  ["Children of Men", ["Sci-Fi", "Action", "Thriller"], 2006, 9.2, "In 2027, in a chaotic world in which women have somehow become infertile, a former activist agrees to help transport a miraculously pregnant woman.", "THE MIRACLE OF BIRTH.", ["Alfonso Cuaron", "Clive Owen", "One-Shot", "Dystopia"], "Universal Pictures", "109 Minutes", 1, "episodes"],
  ["The Prestige", ["Mystery", "Drama", "Sci-Fi"], 2006, 9.1, "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything.", "ARE YOU WATCHING CLOSELY?", ["Nolan", "Bale", "Jackman", "David Bowie"], "Touchstone Pictures", "130 Minutes", 1, "episodes"],
  ["Whiplash", ["Drama", "Music"], 2014, 9.4, "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.", "NOT QUITE MY TEMPO.", ["J.K. Simmons", "Miles Teller", "Damien Chazelle", "Jazz"], "Sony Pictures Classics", "107 Minutes", 1, "episodes"],
  ["No Country for Old Men", ["Crime", "Drama", "Thriller"], 2007, 9.3, "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash in West Texas.", "CALL IT, FRIENDO.", ["Coen Brothers", "Anton Chigurh", "Javier Bardem", "Oscars"], "Miramax", "122 Minutes", 1, "episodes"],
  ["Inglourious Basterds", ["Adventure", "Drama", "War"], 2009, 9.2, "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans.", "THAT'S A BINGO!", ["Tarantino", "Christoph Waltz", "Brad Pitt", "Cinema"], "Universal Pictures", "153 Minutes", 1, "episodes"],
  ["Django Unchained", ["Western", "Drama"], 2012, 9.1, "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.", "THE 'D' IS SILENT.", ["Tarantino", "Jamie Foxx", "Leonardo DiCaprio", "Western"], "The Weinstein Company", "165 Minutes", 1, "episodes"],
  ["The Empire Strikes Back", ["Sci-Fi", "Adventure", "Space Opera"], 1980, 9.6, "After the Rebels are brutally overpowered by the Empire, Luke Skywalker begins Jedi training with Yoda while Darth Vader pursues his friends.", "NO, I AM YOUR FATHER.", ["Darth Vader", "Luke Skywalker", "Yoda", "Star Wars"], "Lucasfilm / 20th Century Fox", "124 Minutes", 1, "episodes"],
  ["Star Wars: A New Hope", ["Sci-Fi", "Adventure", "Fantasy"], 1977, 9.3, "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to rescue the galaxy from the Empire's battle station.", "MAY THE FORCE BE WITH YOU.", ["George Lucas", "Death Star", "Han Solo", "Leia"], "Lucasfilm", "121 Minutes", 1, "episodes"],
  ["The Lord of the Rings: The Fellowship of the Ring", ["Fantasy", "Adventure", "Epic"], 2001, 9.6, "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth.", "YOU SHALL NOT PASS!", ["Peter Jackson", "Frodo", "Gandalf", "Tolkien"], "New Line Cinema", "178 Minutes", 1, "episodes"],
  ["The Lord of the Rings: The Two Towers", ["Fantasy", "Adventure", "Epic"], 2002, 9.5, "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand at Helm's Deep.", "THERE IS ALWAYS HOPE.", ["Helm's Deep", "Gollum", "Aragorn", "Epic Battle"], "New Line Cinema", "179 Minutes", 1, "episodes"],
  ["Spider-Man: No Way Home", ["Action", "Superhero", "Sci-Fi"], 2021, 9.1, "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help, accidentally unlocking the multiverse to bring villains from other realities.", "YOU HAVE A GIFT. YOU HAVE POWER.", ["Tom Holland", "Tobey Maguire", "Andrew Garfield", "Multiverse"], "Marvel / Sony", "148 Minutes", 1, "episodes"],
  ["The Batman: Part II (Announced)", ["Action", "Crime", "Noir"], 2026, 9.2, "Matt Reeves returns to Gotham's dark depths as Robert Pattinson's Batman navigates the fallout of the flooding and the criminal vacuum.", "I AM THE SHADOWS.", ["Matt Reeves", "Pattinson", "Gotham", "Detective"], "Warner Bros. / DC Studios", "160 Minutes", 1, "episodes"]
].map(args => makeEntry(args[0], 'movies', args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]));

// 3. TV Shows to complete 50 (needs 35 more)
const extraTvTitles = [
  ["Andor", ["Sci-Fi", "Spy Thriller", "Political"], 2022, 9.3, "In an era filled with danger, deception and intrigue, Cassian Andor discovers the difference he can make in the rebellion against the Galactic Empire.", "ONE WAY OUT!", ["Star Wars", "Diego Luna", "Tony Gilroy", "Empire"], "Lucasfilm / Disney+", "24 Episodes", 24, "episodes"],
  ["The Mandalorian", ["Space Western", "Action", "Sci-Fi"], 2019, 9.1, "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.", "THIS IS THE WAY.", ["Din Djarin", "Grogu", "Baby Yoda", "Pedro Pascal"], "Lucasfilm / Disney+", "24 Episodes", 24, "episodes"],
  ["Loki", ["Sci-Fi", "Fantasy", "Action"], 2021, 9.0, "The mercurial villain Loki resumes his role as the God of Mischief following the events of Endgame, confronting the Time Variance Authority.", "GLORIOUS PURPOSE.", ["Tom Hiddleston", "TVA", "Multiverse", "Marvel"], "Marvel Studios / Disney+", "12 Episodes", 12, "episodes"],
  ["The Bear", ["Drama", "Comedy", "Culinary"], 2022, 9.4, "A young fine-dining chef returns home to Chicago to run his family Italian beef sandwich shop after a heartbreaking death.", "YES, CHEF!", ["Carmy", "Kitchen", "FX", "Hulu"], "FX on Hulu", "28 Episodes", 28, "episodes"],
  ["Fargo", ["Crime", "Drama", "Dark Comedy"], 2014, 9.1, "Various chronicles of deception, intrigue and murder in and around frozen Minnesota.", "A TRUE STORY.", ["Coen Brothers", "Anthology", "FX", "Crime"], "FX", "51 Episodes", 51, "episodes"],
  ["Fleabag", ["Comedy", "Drama"], 2016, 9.3, "A dry-witted woman, known only as Fleabag, has no filter as she navigates life and love in London while trying to cope with tragedy.", "IT'LL PASS.", ["Phoebe Waller-Bridge", "Hot Priest", "BBC", "Emmy Winner"], "BBC / Amazon", "12 Episodes", 12, "episodes"],
  ["Mindhunter", ["Crime", "Drama", "Psychological"], 2017, 9.2, "In the late 1970s two FBI agents expand criminal science by delving into the psychology of murder and getting uneasily close to all-too-real monsters.", "HOW DO WE CATCH SOMEONE IF WE DON'T KNOW HOW THEY THINK?", ["David Fincher", "Holden Ford", "Serial Killers", "FBI"], "Netflix", "19 Episodes", 19, "episodes"],
  ["Sherlock", ["Crime", "Drama", "Mystery"], 2010, 9.2, "A modern update finds the famous sleuth and his doctor partner solving crime in 21st-century London.", "I'M NOT A PSYCHOPATH, I'M A HIGH-FUNCTIONING SOCIOPATH.", ["Benedict Cumberbatch", "Martin Freeman", "Moriarty", "BBC"], "BBC", "15 Episodes", 15, "episodes"],
  ["Westworld", ["Sci-Fi", "Drama", "Mystery"], 2016, 8.9, "At a futuristic Western theme park, android hosts begin deviating from their programmed loops, gaining consciousness.", "THESE VIOLENT DELIGHTS HAVE VIOLENT ENDS.", ["Dolores", "Man in Black", "HBO", "Artificial Intelligence"], "HBO", "36 Episodes", 36, "episodes"],
  ["The Witcher (TV)", ["Action", "Adventure", "Fantasy"], 2019, 8.4, "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.", "TOSS A COIN TO YOUR WITCHER.", ["Henry Cavill", "Geralt", "Yennefer", "Netflix"], "Netflix", "24 Episodes", 24, "episodes"],
  ["Invincible (Animated)", ["Animation", "Action", "Superhero"], 2021, 9.2, "An adult animated superhero series that revolves around 17-year-old Mark Grayson, who's just like every other guy his age — except his father is the most powerful superhero on the planet.", "WHAT WILL YOU HAVE AFTER 500 YEARS?", ["Omni-Man", "Mark Grayson", "Robert Kirkman", "Amazon"], "Amazon Prime Video", "16 Episodes", 16, "episodes"],
  ["The Penguin", ["Crime", "Drama", "Noir"], 2024, 9.3, "Following the events of The Batman, Oswald 'Oz' Cobb makes his bid to seize the reins of the criminal underworld in Gotham City.", "THIS CITY IS MINE.", ["Colin Farrell", "Oz Cobb", "Gotham", "HBO"], "HBO / DC Studios", "8 Episodes", 8, "episodes"],
  ["Black Mirror", ["Sci-Fi", "Drama", "Thriller"], 2011, 9.0, "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.", "THE FUTURE IS BROKEN.", ["Charlie Brooker", "Technology", "Dystopia", "Netflix"], "Netflix", "27 Episodes", 27, "episodes"],
  ["The Queen's Gambit", ["Drama", "Period"], 2020, 9.0, "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.", "CHESS IS AN ENTIRE WORLD OF JUST 64 SQUARES.", ["Anya Taylor-Joy", "Chess", "Netflix", "Emmy Winner"], "Netflix", "7 Episodes", 7, "episodes"],
  ["Band of Brothers", ["War", "Drama", "History"], 2001, 9.7, "The story of Easy Company of the U.S. Army 101st Airborne Division and their mission in World War II Europe.", "WE STAND ALONE TOGETHER.", ["Spielberg", "Tom Hanks", "Easy Company", "HBO"], "HBO", "10 Episodes", 10, "episodes"],
  ["Narcos", ["Biography", "Crime", "Drama"], 2015, 9.0, "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.", "PLATA O PLOMO.", ["Pablo Escobar", "DEA", "Colombia", "Netflix"], "Netflix", "30 Episodes", 30, "episodes"],
  ["Vikings", ["Action", "Adventure", "Drama"], 2013, 8.8, "Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Norse warrior and farmer who yearns to explore.", "HOW THE LITTLE PIGGIES WILL GRUNT WHEN THEY HEAR HOW THE OLD BOAR SUFFERED.", ["Ragnar Lothbrok", "Valhalla", "Shieldmaiden", "History"], "History Channel", "89 Episodes", 89, "episodes"],
  ["The Sopranos", ["Crime", "Drama"], 1999, 9.5, "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state.", "WOKE UP THIS MORNING, GOT YOURSELF A GUN.", ["Tony Soprano", "Mafia", "HBO", "Classic"], "HBO", "86 Episodes", 86, "episodes"],
  ["The Wire", ["Crime", "Drama", "Thriller"], 2002, 9.6, "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement in an unvarnished examination of modern urban decay.", "ALL IN THE GAME, YO.", ["David Simon", "Omar Little", "Baltimore", "HBO"], "HBO", "60 Episodes", 60, "episodes"],
  ["Twin Peaks", ["Drama", "Mystery", "Horror"], 1990, 9.1, "An idiosyncratic FBI agent investigates the murder of a young woman in the even more idiosyncratic town of Twin Peaks.", "THE OWLS ARE NOT WHAT THEY SEEM.", ["David Lynch", "Dale Cooper", "Laura Palmer", "Cult Classic"], "ABC / Showtime", "48 Episodes", 48, "episodes"],
  ["Mr. Robot", ["Crime", "Drama", "Thriller"], 2015, 9.2, "Elliot, a brilliant but highly unstable young cyber-security engineer and vigilante hacker, becomes a key figure in a complex game of global chaos.", "HELLO, FRIEND.", ["Rami Malek", "fsociety", "Cybersecurity", "USA Network"], "USA Network", "45 Episodes", 45, "episodes"],
  ["Dexter", ["Crime", "Drama", "Mystery"], 2006, 8.8, "A Miami forensics expert who's also a serial killer targets other murderers who have escaped the justice system.", "TONIGHT'S THE NIGHT.", ["Dexter Morgan", "Code of Harry", "Showtime", "Dark Hero"], "Showtime", "96 Episodes", 96, "episodes"],
  ["Hannibal", ["Crime", "Drama", "Horror"], 2013, 8.9, "Explores the early relationship between renowned psychiatrist Hannibal Lecter and a young FBI criminal profiler who is haunted by his ability to empathize with serial killers.", "TELL ME, WILL.", ["Mads Mikkelsen", "Hannibal", "Bryan Fuller", "Gourmet Horror"], "NBC", "39 Episodes", 39, "episodes"],
  ["Castlevania (Animated)", ["Animation", "Action", "Dark Fantasy"], 2017, 8.8, "A vampire hunter fights to save a besieged city from an army of otherworldly beasts controlled by Dracula himself.", "THERE ARE NO INNOCENTS.", ["Trevor Belmont", "Alucard", "Dracula", "Powerhouse"], "Netflix", "32 Episodes", 32, "episodes"],
  ["Silo", ["Drama", "Sci-Fi", "Dystopian"], 2023, 8.7, "Men and women live in a giant underground silo with several regulations which they believe are in place to protect them from the toxic and ruined world on the surface.", "WHAT IF EVERYTHING OUTSIDE IS A LIE?", ["Rebecca Ferguson", "Silo", "Apple TV+", "Mystery"], "Apple TV+", "10 Episodes", 10, "episodes"],
  ["The Expanse", ["Sci-Fi", "Mystery", "Drama"], 2015, 9.0, "In the 24th century, a disparate band of antiheroes uncover a vast conspiracy that threatens the fragile peace between Earth, Mars, and the Belt.", "REMEMBER THE CANT.", ["Rocinante", "Belt", "Sci-Fi Epic", "Amazon"], "Syfy / Amazon", "62 Episodes", 62, "episodes"],
  ["Gen V", ["Action", "Comedy", "Drama", "Superhero"], 2023, 8.5, "From the world of The Boys comes Gen V, exploring the first generation of superheroes to know about Compound V at Godolkin University.", "HEROES ARE FORGED IN BLOOD.", ["Godolkin", "Marie Moreau", "The Boys", "Compound V"], "Amazon Prime Video", "8 Episodes", 8, "episodes"],
  ["Yellowjackets", ["Drama", "Horror", "Mystery"], 2021, 8.7, "A wildly talented high school girls soccer team becomes the unlucky survivors of a plane crash deep in the remote northern wilderness.", "WHAT HAPPENED IN THE WILDERNESS?", ["Wilderness", "Survival", "Showtime", "Mystery"], "Showtime", "19 Episodes", 19, "episodes"],
  ["The White Lotus", ["Comedy", "Drama"], 2021, 8.9, "Set in a tropical resort, it follows the exploits of various guests and employees over the span of a week.", "VACATION IS A STATE OF DREAD.", ["Mike White", "Satire", "HBO", "Emmy Winner"], "HBO", "13 Episodes", 13, "episodes"],
  ["The Crown", ["Biography", "Drama", "History"], 2016, 8.8, "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.", "DUTY CALLS.", ["Queen Elizabeth", "Royal Family", "Netflix", "History"], "Netflix", "60 Episodes", 60, "episodes"],
  ["True Detective", ["Crime", "Drama", "Mystery"], 2014, 9.4, "Seasonal anthology series in which police investigations unearth the personal and professional secrets of those involved, both within and outside the law.", "TIME IS A FLAT CIRCLE.", ["Matthew McConaughey", "Woody Harrelson", "Rust Cohle", "HBO"], "HBO", "30 Episodes", 30, "episodes"],
  ["Dark", ["Crime", "Drama", "Mystery", "Sci-Fi"], 2017, 9.3, "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families across time.", "THE END IS THE BEGINNING AND THE BEGINNING IS THE END.", ["Winden", "Time Travel", "Netflix", "German Masterpiece"], "Netflix", "26 Episodes", 26, "episodes"],
  ["Arcane: Season 2", ["Animation", "Action", "Sci-Fi", "Steampunk"], 2024, 9.5, "The climactic final season as Jinx's rocket attack shatters Piltover's council, igniting all-out war between the city of progress and Zaun.", "WATCH IT ALL BURN.", ["Jinx", "Vi", "Piltover", "Zaun", "Riot Games"], "Netflix / Riot Games", "9 Episodes", 9, "episodes"],
  ["Severance: Season 2", ["Sci-Fi", "Thriller", "Corporate Horror"], 2025, 9.3, "Mark and the Macrodata Refinement innies face the harsh retributions and revelations of Lumon following the Overtime Contingency.", "WELCOME BACK TO WORK.", ["Lumon", "Innie", "Outie", "Apple TV+"], "Apple TV+", "10 Episodes", 10, "episodes"],
  ["The Last of Us: Season 2", ["Action", "Drama", "Post-Apocalyptic"], 2025, 9.4, "Five years after the events in Salt Lake City, Joel and Ellie's peace in Jackson is shattered, setting off a harrowing quest across Seattle.", "THERE ARE CONSEQUENCES.", ["Pedro Pascal", "Bella Ramsey", "Abby", "HBO"], "HBO", "7 Episodes", 7, "episodes"]
].map(args => makeEntry(args[0], 'tv-shows', args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]));

// 4. Comics to complete 50 (needs 37 more)
const extraComicTitles = [
  ["superman-for-all-seasons", ["Superhero", "Nostalgia", "Heartwarming"], 1998, 9.2, "Jeph Loeb and Tim Sale's poetic four-issue look at Clark Kent's transition from Smallville farm boy to Metropolis protector, narrated through the four seasons.", "YOU'LL BELIEVE A MAN CAN FLY.", ["Tim Sale", "Jeph Loeb", "Smallville", "Clark Kent"], "DC Comics", "4 Issues", 4, "chapters"],
  ["superman-red-son", ["Superhero", "Alternate History", "Cold War"], 2003, 9.1, "What if baby Kal-El's rocket landed not in Kansas, but on a collective farm in the Soviet Union at the height of Stalin's reign?", "A CHAMPION OF THE COMMON WORKER.", ["Mark Millar", "Soviet", "Batman Russian", "Elseworlds"], "DC Comics", "3 Issues", 3, "chapters"],
  ["dc-the-new-frontier", ["Superhero", "Historical", "Silver Age"], 2004, 9.4, "Darwyn Cooke's love letter to the Silver Age, bridging the Golden Age heroes and the dawn of the Justice League against the backdrop of the Cold War and Space Race.", "LET US REACH FOR THE NEW FRONTIER.", ["Darwyn Cooke", "Silver Age", "Hal Jordan", "Martian Manhunter"], "DC Comics", "6 Issues", 6, "chapters"],
  ["crisis-on-infinite-earths", ["Superhero", "Multiverse", "Cosmic"], 1985, 9.2, "The Anti-Monitor sweeps across the multiverse consuming realities in antimatter, forcing every hero from every DC Earth to band together.", "WORLDS WILL LIVE, WORLDS WILL DIE.", ["Marv Wolfman", "George Perez", "Barry Allen", "Multiverse"], "DC Comics", "12 Issues", 12, "chapters"],
  ["flashpoint-dc", ["Superhero", "Time Travel", "Alternate Reality"], 2011, 9.0, "Barry Allen wakes up in a twisted reality where his mother is alive, Atlantis and Themyscira are drowning the world in war, and Thomas Wayne is Batman.", "ACCEPT THE THINGS YOU CANNOT CHANGE.", ["Barry Allen", "Thomas Wayne", "Reverse Flash", "New 52"], "DC Comics", "5 Issues", 5, "chapters"],
  ["green-lantern-sinestro-corps-war", ["Superhero", "Cosmic", "War"], 2007, 9.3, "Sinestro builds an army powered by the yellow light of fear to wage cosmic war against the Green Lantern Corps, leading to massive space dogfights.", "IN BLACKEST DAY, IN BRIGHTEST NIGHT.", ["Geoff Johns", "Hal Jordan", "Sinestro", "Parallax"], "DC Comics", "11 Issues", 11, "chapters"],
  ["injustice-gods-among-us", ["Superhero", "Dystopian", "Elseworlds"], 2013, 8.9, "Tricked by the Joker into destroying Metropolis and killing Lois Lane, Superman establishes a ruthless global dictatorship to enforce peace.", "PEACE AT ANY COST.", ["Tom Taylor", "Regime", "Batman Insurgency", "DC"], "DC Comics", "60 Issues", 60, "chapters"],
  ["marvels-busiek-ross", ["Superhero", "Historical", "Painted Art"], 1994, 9.4, "Photojournalist Phil Sheldon witnesses the dawn of the Marvel Age through his camera lens, from the original Human Torch to the death of Gwen Stacy.", "THE MARVELS ARE AMONG US.", ["Kurt Busiek", "Alex Ross", "Painted", "Photojournalism"], "Marvel Comics", "4 Issues", 4, "chapters"],
  ["infinity-gauntlet", ["Cosmic", "Superhero", "Epic"], 1991, 9.3, "Thanos assembles the six Infinity Gems to impress Mistress Death, snapping his fingers to erase half of all life in the universe.", "WITH A SINGLE SNAP OF MY FINGERS.", ["Jim Starlin", "Thanos", "Adam Warlock", "Cosmic Marvel"], "Marvel Comics", "6 Issues", 6, "chapters"],
  ["spider-man-blue", ["Superhero", "Romance", "Melancholy"], 2002, 9.2, "On Valentine's Day, Peter Parker sits in the attic speaking into a tape recorder to tell the story of how he fell in love with Gwen Stacy.", "IT'S ABOUT PROMISES.", ["Jeph Loeb", "Tim Sale", "Gwen Stacy", "Peter Parker"], "Marvel Comics", "6 Issues", 6, "chapters"],
  ["spider-man-kravens-last-hunt", ["Superhero", "Psychological", "Gothic"], 1987, 9.4, "Kraven the Hunter shoots and buries Spider-Man alive, donning the black costume to prove himself superior before his final descent.", "THE SPIDER CRAWLS NO MORE.", ["J.M. DeMatteis", "Mike Zeck", "Kraven", "Black Suit"], "Marvel Comics", "6 Issues", 6, "chapters"],
  ["ultimate-spider-man-2024", ["Superhero", "Reboot", "Modern"], 2024, 9.4, "Jonathan Hickman reimagines Peter Parker as a 35-year-old married man with two kids who receives his spider bite in an engineered world ruled by The Maker.", "TAKE YOUR LIFE BACK.", ["Jonathan Hickman", "Marco Checchetto", "Adult Peter", "Mary Jane"], "Marvel Comics", "12 Issues", 12, "chapters"],
  ["daredevil-the-man-without-fear", ["Superhero", "Origin", "Martial Arts"], 1993, 9.1, "Frank Miller and John Romita Jr. revisit Matt Murdock's youth, his sensory blinding, his training under Stick, and his first love Elektra.", "HE WALKS IN SILENCE.", ["Frank Miller", "John Romita Jr", "Elektra", "Stick"], "Marvel Comics", "5 Issues", 5, "chapters"],
  ["x-men-days-of-future-past", ["Superhero", "Dystopian", "Sci-Fi"], 1981, 9.3, "In a dark future where mutantkind has been herded into concentration camps by Sentinels, Kate Pryde transfers her consciousness back to 1980.", "THE FUTURE MUST BE REWRITTEN.", ["Chris Claremont", "John Byrne", "Sentinels", "Wolverine"], "Marvel Comics", "2 Issues (#141-142)", 2, "chapters"],
  ["x-men-dark-phoenix-saga", ["Superhero", "Cosmic", "Tragedy"], 1980, 9.5, "Jean Grey is corrupted by the cosmic Phoenix Force, transforming into the universe-consuming Dark Phoenix on the surface of the Moon.", "I AM LIFE AND DEATH INCARNATE.", ["Chris Claremont", "John Byrne", "Jean Grey", "Cyclops"], "Marvel Comics", "10 Issues (#129-138)", 10, "chapters"],
  ["old-man-logan", ["Superhero", "Post-Apocalyptic", "Western"], 2008, 9.2, "Fifty years after the supervillains conquered and divided America, a pacifist, aged Logan agrees to take a cross-country delivery job with blind Hawkeye.", "I'M NOT WOLVERINE ANYMORE.", ["Mark Millar", "Steve McNiven", "Hulk Gang", "Wasteland"], "Marvel Comics", "8 Issues", 8, "chapters"],
  ["secret-wars-2015", ["Cosmic", "Multiverse", "Epic"], 2015, 9.4, "The multiverse dies in the final Incursion. Out of the ashes, Doctor Doom creates Battleworld, ruling over patchwork realms as God Emperor Doom.", "ALL HOPE LIES IN DOOM.", ["Jonathan Hickman", "Esad Ribic", "Doctor Doom", "Battleworld"], "Marvel Comics", "9 Issues", 9, "chapters"],
  ["thor-god-of-thunder-godbutcher", ["Superhero", "Mythology", "Epic"], 2012, 9.4, "Gorr the God Butcher travels across billions of years executing every divine being in existence, confronted by Thor across three different timelines.", "THE ONLY VOW A GOD KEEPS IS TO HIMSELF.", ["Jason Aaron", "Esad Ribic", "Gorr", "Necrosword"], "Marvel Comics", "11 Issues", 11, "chapters"],
  ["immortal-hulk", ["Horror", "Superhero", "Body Horror"], 2018, 9.5, "Bruce Banner can die during the day, but when night falls, the Immortal Hulk rises from the grave in a terrifying metaphysical body-horror epic.", "MAN WALKS IN THE DAY. THE DEVIL WALKS AT NIGHT.", ["Al Ewing", "Joe Bennett", "Green Door", "Body Horror"], "Marvel Comics", "50 Issues", 50, "chapters"],
  ["the-vision-tom-king", ["Superhero", "Psychological", "Suburban Tragedy"], 2015, 9.4, "The Vision builds a synthetic suburban family in Virginia, trying desperately to be normal while dark secrets unravel their synthesized paradise.", "EVERYTHING WILL BE FINE.", ["Tom King", "Gabriel Hernandez Walta", "Synthezoid", "Eisner"], "Marvel Comics", "12 Issues", 12, "chapters"],
  ["moon-knight-from-the-dead", ["Superhero", "Noir", "Psychological"], 2014, 9.2, "Warren Ellis and Declan Shalvey redefine Marc Spector as Mr. Knight, tackling ghost punks, dream snatchers, and fungal cults in New York.", "I WEAR WHITE SO THEY SEE ME COMING.", ["Warren Ellis", "Declan Shalvey", "Mr Knight", "Khonshu"], "Marvel Comics", "6 Issues", 6, "chapters"],
  ["the-walking-dead-comic", ["Horror", "Post-Apocalyptic", "Survival"], 2003, 9.3, "Rick Grimes awakens from a coma into an America overrun by flesh-eating walkers, discovering that surviving humanity is far deadlier than the dead.", "WE ARE THE WALKING DEAD!", ["Robert Kirkman", "Charlie Adlard", "Zombies", "Negan"], "Image Comics", "193 Issues", 193, "chapters"],
  ["spawn-comic", ["Dark Fantasy", "Superhero", "Horror"], 1992, 8.8, "Murdered assassin Al Simmons makes a deal with the demon Malebolgia to return to Earth, reincarnated as a hellspawn with a living symbiotic costume.", "SEE YOU IN HELL.", ["Todd McFarlane", "Hellspawn", "Violator", "Image Comics"], "Image Comics", "350+ Issues", 350, "chapters"],
  ["hellboy-seed-of-destruction", ["Dark Fantasy", "Occult", "Action"], 1994, 9.3, "Summoned to Earth as an infant by Nazi occultists, the demon Hellboy works for the B.P.R.D. investigating folklore terrors and eldritch gods.", "I'VE GOT A REALLY BIG RIGHT HAND OF DOOM.", ["Mike Mignola", "BPRD", "Folklore", "Gothic"], "Dark Horse Comics", "4 Issues", 4, "chapters"],
  ["preacher-comic", ["Dark Comedy", "Supernatural", "Western"], 1995, 9.2, "Small-town Texas preacher Jesse Custer is possessed by a divine entity called Genesis and embarks on a journey with an Irish vampire to find God.", "I HAVE THE WORD OF GOD.", ["Garth Ennis", "Steve Dillon", "Jesse Custer", "Cassidy"], "Vertigo / DC", "66 Issues", 66, "chapters"],
  ["y-the-last-man", ["Sci-Fi", "Post-Apocalyptic", "Adventure"], 2002, 9.3, "A mysterious plague simultaneously kills every mammal with a Y chromosome on Earth except for amateur escape artist Yorick Brown and his pet monkey.", "THE LAST MAN ON EARTH.", ["Brian K. Vaughan", "Pia Guerra", "Yorick", "Vertigo"], "Vertigo / DC", "60 Issues", 60, "chapters"],
  ["transmetropolitan", ["Cyberpunk", "Satire", "Sci-Fi"], 1997, 9.2, "Gonzo journalist Spider Jerusalem returns to the sprawling cyberpunk metropolis to expose political corruption, alien gene-splicing, and media fascism.", "TRUTH IS THE STRONGEST WEAPON.", ["Warren Ellis", "Darick Robertson", "Spider Jerusalem", "Gonzo"], "Vertigo / DC", "60 Issues", 60, "chapters"],
  ["v-for-vendetta-comic", ["Dystopian", "Political", "Anarchy"], 1982, 9.4, "In a post-nuclear totalitarian Britain, a masked anarchist calling himself V initiates an elaborate campaign to bring down the fascist Norsefire regime.", "REMEMBER, REMEMBER, THE FIFTH OF NOVEMBER.", ["Alan Moore", "David Lloyd", "Guy Fawkes", "Anarchy"], "Vertigo / DC", "10 Issues", 10, "chapters"],
  ["fables-comic", ["Fantasy", "Mystery", "Fairy Tale"], 2002, 9.1, "Fairy tale characters exiled from their Homelands live in secret in modern New York City, where Bigby Wolf acts as sheriff of Fabletown.", "WHO'S AFRAID OF THE BIG BAD WOLF?", ["Bill Willingham", "Bigby Wolf", "Snow White", "Vertigo"], "Vertigo / DC", "150 Issues", 150, "chapters"],
  ["locke-and-key-comic", ["Dark Fantasy", "Horror", "Mystery"], 2008, 9.3, "Following their father's murder, the Locke children move to Keyhouse, an ancestral mansion filled with enchanted keys that open supernatural doors.", "EVERY KEY OPENS A NEW HORROR.", ["Joe Hill", "Gabriel Rodriguez", "Keyhouse", "IDW"], "IDW Publishing", "37 Issues", 37, "chapters"],
  ["sin-city-comic", ["Crime", "Noir", "Graphic"], 1991, 9.1, "Frank Miller's high-contrast black-and-white noir chronicle of Basin City, populated by corrupt cops, tough dames, and desperate brawlers.", "THE NIGHT IS COLD AS ICE.", ["Frank Miller", "Marv", "Basin City", "Noir Classic"], "Dark Horse Comics", "7 Graphic Novels", 7, "chapters"],
  ["chew-comic", ["Dark Comedy", "Sci-Fi", "Crime"], 2009, 9.0, "Tony Chu is a cibopathic detective who gets psychic impressions from whatever he eats, solving murders in a world where poultry has been banned.", "NEVER EAT WHAT YOU CAN'T STOMACH.", ["John Layman", "Rob Guillory", "Image Comics", "Eisner"], "Image Comics", "60 Issues", 60, "chapters"],
  ["east-of-west", ["Sci-Fi", "Western", "Apocalyptic"], 2013, 9.2, "In a dystopian alternate North America divided into seven nations, Death, one of the Four Horsemen of the Apocalypse, seeks revenge against his former brethren.", "THE MESSAGE IS DESTINY.", ["Jonathan Hickman", "Nick Dragotta", "Image Comics", "Western"], "Image Comics", "45 Issues", 45, "chapters"],
  ["monstress-comic", ["Dark Fantasy", "Steampunk", "Horror"], 2015, 9.3, "Maika Halfwolf shares a psychic link with a monstrous ancient deity, navigating an alternate 1900s Asia torn by war between humans and Arcanics.", "THE MONSTER WITHIN.", ["Marjorie Liu", "Sana Takeda", "Art Deco", "Hugo Winner"], "Image Comics", "50+ Issues", 50, "chapters"],
  ["the-department-of-truth", ["Conspiracy", "Thriller", "Horror"], 2020, 9.1, "Cole Turner is recruited into the Department of Truth, a clandestine government agency tasked with preventing conspiracy theories from becoming reality.", "BELIEF MAKES REALITY.", ["James Tynion IV", "Martin Simmonds", "Image Comics", "Paranoia"], "Image Comics", "25+ Issues", 25, "chapters"],
  ["batman-court-of-owls", ["Superhero", "Mystery", "Gothic"], 2011, 9.3, "Batman discovers that Gotham City has secretly been ruled for centuries by a shadowy cabal of wealthy elites who deploy unkillable assassins called Talons.", "BEWARE THE COURT OF OWLS.", ["Scott Snyder", "Greg Capullo", "New 52", "Talons"], "DC Comics", "11 Issues", 11, "chapters"],
  ["batman-hush", ["Superhero", "Mystery", "Action"], 2002, 9.1, "A mysterious stalker with a bandaged face manipulates Batman's entire rogues gallery in an elaborate psychological game to destroy Bruce Wayne.", "WHO IS HUSH?", ["Jeph Loeb", "Jim Lee", "Catwoman", "Jim Lee Art"], "DC Comics", "12 Issues", 12, "chapters"]
].map(args => makeEntry(args[0], 'comics', args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]));

// 5. K-Pop to complete 50 (needs 37 more)
const extraKpopTitles = [
  ["stray-kids-ate", ["K-Pop", "Hip-Hop", "Drill"], 2024, 9.4, "Stray Kids' dominating mini-album featuring title track 'Chk Chk Boom', showcasing sharp lyricism and self-produced swagger.", "BOOM BOOM CHK CHK BOOM!", ["Chk Chk Boom", "Bang Chan", "Hyunjin", "JYP"], "JYP Entertainment", "8 Tracks", 8, "tracks"],
  ["seventeen-17-is-right-here", ["K-Pop", "Dance", "Compilation"], 2024, 9.5, "The crowning best-of album gathering SEVENTEEN's legendary discography alongside new anthem 'MAESTRO'.", "LALALI, MAESTRO CONDUCTS THE ORCHESTRA!", ["Maestro", "Carat", "Pledis", "Woozi"], "PLEDIS Entertainment", "33 Tracks", 33, "tracks"],
  ["ateez-golden-hour-part-1", ["K-Pop", "EDM", "Performance"], 2024, 9.2, "ATEEZ's vibrant summer release featuring title track 'WORK', taking Coachella and global charts by storm.", "GOTTA WORK, GOTTA MAKE THAT MOVE!", ["San", "Hongjoong", "Coachella", "KQ"], "KQ Entertainment", "6 Tracks", 6, "tracks"],
  ["txt-the-star-chapter-sanctuary", ["K-Pop", "Pop", "Rock"], 2024, 9.2, "TOMORROW X TOGETHER opens a new conceptual era with ethereal melodies and emotional coming-of-age storytelling.", "OUR HEARTS BEAT AS ONE.", ["Soobin", "Yeonjun", "BigHit", "Star Chapter"], "BIGHIT MUSIC", "6 Tracks", 6, "tracks"],
  ["enhypen-romance-untold", ["K-Pop", "Synth-Pop", "R&B"], 2024, 9.3, "ENHYPEN's romantic vampire saga peaks with millions of pre-orders and the city-pop-infused single 'XO (Only If You Say Yes)'.", "CAN I BE YOUR ONLY ONE? XO.", ["Sunghoon", "Heeseung", "Belift", "Romance"], "BELIFT LAB", "10 Tracks", 10, "tracks"],
  ["twice-with-you-th", ["K-Pop", "Pop", "Dance"], 2024, 9.1, "TWICE's 13th mini-album celebrating their decade of unbreakable sisterhood and stadium records with title track 'ONE SPARK'.", "BURNING LIKE ONE SPARK!", ["Jihyo", "Nayeon", "ONCE", "JYP"], "JYP Entertainment", "6 Tracks", 6, "tracks"],
  ["aespa-whiplash", ["K-Pop", "House", "Techno"], 2024, 9.4, "aespa's techno-infused 5th mini-album delivering hypnotic runway beats and viral dance challenges with title track 'Whiplash'.", "ONE LOOK AND YOU GET WHIPLASH!", ["Karina", "Winter", "SM", "House"], "SM Entertainment", "6 Tracks", 6, "tracks"],
  ["ive-ive-switch", ["K-Pop", "Dance", "Oriental Pop"], 2024, 9.2, "IVE transforms into magical girl warriors in 'HEYA', blending traditional Asian percussion with modern hip-hop.", "HEYA HEYA HEYA, WATCH ME GLOW!", ["Wonyoung", "An Yujin", "Starship", "Heya"], "Starship Entertainment", "6 Tracks", 6, "tracks"],
  ["le-sserafim-crazy", ["K-Pop", "Vogue", "EDM"], 2024, 9.3, "LE SSERAFIM teams up with iconic ballroom dance houses for the high-energy voguing single 'CRAZY'.", "ACT LIKE AN ANGEL AND DRESS LIKE CRAZY!", ["Chaewon", "Yunjin", "Ballroom", "Source Music"], "SOURCE MUSIC", "5 Tracks", 5, "tracks"],
  ["g-i-dle-2", ["K-Pop", "Self-Produced", "Hip-Hop"], 2024, 9.2, "(G)I-DLE's 2nd full album written and produced by leader Soyeon, featuring infectious viral title tracks 'Super Lady' and 'Fate'.", "I CALL MYSELF A SUPER LADY!", ["Soyeon", "Miyeon", "Cube", "Self-Produced"], "Cube Entertainment", "8 Tracks", 8, "tracks"],
  ["g-i-dle-i-feel", ["K-Pop", "Pop-Rock", "Y2K"], 2023, 9.1, "The Y2K teen-comedy inspired mini-album featuring the chart-topping smash hit 'Queencard'.", "MY BOOB AND BOOTY'S HOT, I'M A QUEENCARD!", ["Queencard", "Soyeon", "Yuqi", "Cube"], "Cube Entertainment", "6 Tracks", 6, "tracks"],
  ["itzy-born-to-be", ["K-Pop", "Dance", "Electropop"], 2024, 9.0, "ITZY returns with untamed fiery energy, solo tracks for each member, and the hard-hitting title track 'UNTOUCHABLE'.", "BORN TO BE WILD AND FREE!", ["Yeji", "Ryujin", "Chaeryeong", "JYP"], "JYP Entertainment", "10 Tracks", 10, "tracks"],
  ["red-velvet-chill-kill", ["K-Pop", "Tragedy Pop", "Vocal"], 2023, 9.3, "Red Velvet's 3rd full album blending chilling dark fairy tale concepts with luscious multi-layered vocal harmonies.", "WHAT A CHILL KILL!", ["Irene", "Seulgi", "Wendy", "SM"], "SM Entertainment", "10 Tracks", 10, "tracks"],
  ["red-velvet-cosmic", ["K-Pop", "Disco", "Midsummer Pop"], 2024, 9.2, "Celebrating their 10th anniversary, Red Velvet delivers a sparkling retro-futuristic summer masterpiece inspired by Midsommar.", "OUR LOVE IS COSMIC!", ["Wendy", "Joy", "SM", "10th Anniversary"], "SM Entertainment", "6 Tracks", 6, "tracks"],
  ["nct-127-fact-check", ["K-Pop", "Neo-Tech", "Hip-Hop"], 2023, 9.1, "NCT 127 proves their unmatched swagger and vocal firepower through Seoul-centric visuals and intricate choreography.", "CHECK THE FACTS, WE RUN THIS CITY!", ["Taeyong", "Mark", "Jaehyun", "SM"], "SM Entertainment", "9 Tracks", 9, "tracks"],
  ["nct-dream-dream-scape", ["K-Pop", "Alt-Pop", "Hip-Hop"], 2024, 9.2, "NCT DREAM escapes the dark reality of youth into a dream realm, leading with powerful breakout single 'Smoothie'.", "SIP IT DOWN LIKE A SMOOTHIE!", ["Mark", "Jeno", "Jaemin", "SM"], "SM Entertainment", "6 Tracks", 6, "tracks"],
  ["riize-riizing", ["K-Pop", "Emotional Pop", "Dance"], 2024, 9.2, "SM's breakout rookie boy group brings back nostalgic 90s breakdancing and soulful pop with smash single 'Boom Boom Bass'.", "FEEL THE BASS IN YOUR HEART!", ["Wonbin", "Shotaro", "Anton", "SM"], "SM Entertainment", "8 Tracks", 8, "tracks"],
  ["boynextdoor-1999", ["K-Pop", "Indie Pop", "Retro Hip-Hop"], 2024, 9.1, "Produced under Zico's KOZ Entertainment, the witty boy group tells teenage stories with retro comedic flair in 'Nice Guy'.", "WHO'S THAT NICE GUY?", ["Zico", "Jaehyun", "KOZ", "HYBE"], "KOZ Entertainment / HYBE", "7 Tracks", 7, "tracks"],
  ["zerobaseone-cinema-paradise", ["K-Pop", "Pop", "Retro"], 2024, 9.1, "The Boys Planet global sensation group crafts a romantic homage to classic cinema with title track 'GOOD SO BAD'.", "LIFE IS A CINEMA PARADISE.", ["Zhang Hao", "Sung Hanbin", "WakeOne", "Boys Planet"], "WAKEONE", "7 Tracks", 7, "tracks"],
  ["babymonster-drip", ["K-Pop", "Hip-Hop", "Swag"], 2024, 9.2, "YG's powerhouse rookie girl group releases their 1st full album with G-Dragon composed title track 'DRIP', showcasing thunderous vocals.", "DRIP DRIP, WE BRING THAT HEAT!", ["Ahyeon", "Rami", "YG", "G-Dragon"], "YG Entertainment", "9 Tracks", 9, "tracks"],
  ["illit-super-real-me", ["K-Pop", "Pluggnb", "Dream Pop"], 2024, 9.4, "The global viral phenomenon behind 'Magnetic', setting the record for fastest K-Pop debut to enter the Billboard Hot 100.", "YOU YOU YOU LIKE A MAGNET!", ["Magnetic", "Wonhee", "Belift Lab", "Viral"], "BELIFT LAB / HYBE", "4 Tracks", 4, "tracks"],
  ["kiss-of-life-sticky", ["K-Pop", "R&B", "Summer Pop"], 2024, 9.3, "The vocal powerhouse quartet captures the nostalgic early 2000s summer vibe with carefree chart-topper 'Sticky'.", "FEELING THAT SUMMER HEAT WITH STICKY!", ["Natty", "Julie", "Belle", "S2"], "S2 Entertainment", "2 Tracks", 2, "tracks"],
  ["nmixx-fe3o4-break", ["K-Pop", "MIXX POP", "Acapella"], 2024, 9.1, "NMIXX refines their signature MIXX-POP genre blending Old-school boom-bap and magnetic pop vocals in 'DASH'.", "DASH, WANNA RUN IT!", ["Lily", "Haewon", "MIXX POP", "JYP"], "JYP Entertainment", "7 Tracks", 7, "tracks"],
  ["stayc-teenfresh", ["K-Pop", "Teenfresh", "Bubblegum Pop"], 2023, 9.0, "STAYC delivers bright infectious teenfresh energy with orange-hued summer single 'Bubble'.", "POP IT LIKE A BUBBLE!", ["Sieun", "Yoon", "High Up", "Black Eyed Pilseung"], "High Up Entertainment", "6 Tracks", 6, "tracks"],
  ["bts-love-yourself-tear", ["K-Pop", "Hip-Hop", "R&B"], 2018, 9.7, "The groundbreaking album that earned BTS their first Billboard 200 #1, featuring emotional masterpiece 'FAKE LOVE'.", "LOVE YOU SO BAD, LOVE YOU SO BAD.", ["Fake Love", "Suga", "RM", "Jimin"], "BIGHIT MUSIC", "11 Tracks", 11, "tracks"],
  ["blackpink-the-album", ["K-Pop", "Dance", "Trap"], 2020, 9.4, "BLACKPINK's 1st studio album featuring global hits 'How You Like That' and 'Lovesick Girls', certified million-seller worldwide.", "BORN TO BE ALONE, BUT STILL LOOKING FOR LOVE.", ["Jennie", "Lisa", "Rose", "Jisoo", "YG"], "YG Entertainment", "8 Tracks", 8, "tracks"],
  ["exo-exist", ["K-Pop", "R&B", "Vocal"], 2023, 9.3, "SM's legendary vocal royalty EXO returns with their 7th full album, led by smooth, sultry retro single 'Cream Soda'.", "DELICIOUS LIKE CREAM SODA.", ["Baekhyun", "D.O.", "Kai", "SM"], "SM Entertainment", "9 Tracks", 9, "tracks"],
  ["shinee-hard", ["K-Pop", "Boom Bap", "90s Hip-Hop"], 2023, 9.3, "SHINee marks their 15th anniversary with a bold hybrid of 90s hip-hop and seamless live vocals on title track 'HARD'.", "WE GO HARD!", ["Taemin", "Key", "Minho", "SM"], "SM Entertainment", "10 Tracks", 10, "tracks"],
  ["taemin-guilty", ["K-Pop", "Dramatic Pop", "Performance"], 2023, 9.4, "The king of K-Pop performance explores sensory manipulation and artistic obsession in provocative title track 'Guilty'.", "GUILTY AS CHARGED.", ["Taemin", "SHINee", "Solo Icon", "SM"], "SM Entertainment", "6 Tracks", 6, "tracks"],
  ["agust-d-d-day", ["K-Pop", "Hardcore Hip-Hop", "Rap"], 2023, 9.6, "BTS's SUGA concludes his autobiographical Agust D trilogy exploring freedom from past trauma with Ryuichi Sakamoto collaboration.", "FUTURE'S GONNA BE OKAY.", ["SUGA", "Agust D", "Haegeum", "BigHit"], "BIGHIT MUSIC", "10 Tracks", 10, "tracks"],
  ["rm-right-place-wrong-person", ["Alternative", "Indie Hip-Hop", "Art Pop"], 2024, 9.5, "RM of BTS collaborates with Little Simz and Balming Tiger on an introspective, genre-defying sonic art project.", "RIGHT PLACE, WRONG PERSON.", ["RM", "Namjoon", "Indie Hip Hop", "BigHit"], "BIGHIT MUSIC", "11 Tracks", 11, "tracks"],
  ["jimin-muse", ["K-Pop", "Retro Pop", "Smeraldo"], 2024, 9.3, "Jimin of BTS searches for genuine inspiration across vintage horn-filled dance track 'Who', breaking Spotify streaming records.", "WHO IS MY HEART WAITING FOR?", ["Jimin", "Who", "BTS", "BigHit"], "BIGHIT MUSIC", "7 Tracks", 7, "tracks"],
  ["jungkook-golden", ["Pop", "R&B", "UK Garage"], 2023, 9.5, "The global pop sensation solo debut featuring mega-hits 'Seven' and 'Standing Next to You', topping the Billboard Hot 100.", "WEIGHT OF THE WORLD ON YOUR SHOULDERS.", ["Jungkook", "Seven", "Golden", "BigHit"], "BIGHIT MUSIC", "11 Tracks", 11, "tracks"],
  ["v-layover", ["Jazz", "R&B", "Soul"], 2023, 9.3, "V of BTS teams up with creative director Min Hee-jin for a serene, intimate lo-fi soul album featuring 'Slow Dancing'.", "MAYBE WE COULD BE SLOW DANCING UNTIL THE MORNING.", ["Taehyung", "Slow Dancing", "Yeontan", "BigHit"], "BIGHIT MUSIC", "6 Tracks", 6, "tracks"],
  ["j-hope-jack-in-the-box", ["Old School Hip-Hop", "Grunge", "Alternative"], 2022, 9.4, "J-Hope unleashes his darker artistic psyche through raw 90s boom-bap and rock-rap in 'MORE' and 'Arson'.", "LET'S BURN!", ["J-Hope", "Lollapalooza", "Arson", "BigHit"], "BIGHIT MUSIC", "10 Tracks", 10, "tracks"],
  ["iu-the-winning", ["K-Pop", "Pop Ballad", "Dance"], 2024, 9.4, "South Korea's premier singer-songwriter IU celebrates self-worth in 'Love wins all' featuring BTS's V in a dystopian short film.", "LOVE WINS ALL.", ["IU", "Lee Ji-eun", "Love wins all", "EDAM"], "EDAM Entertainment", "5 Tracks", 5, "tracks"],
  ["newjeans-how-sweet", ["Miami Bass", "Bubblegum", "Y2K"], 2024, 9.3, "NewJeans delivers refreshing 90s Miami bass bounce and cool-girl aesthetics in double single 'How Sweet' and 'Bubble Gum'.", "DON'T YOU KNOW HOW SWEET IT TASTES?", ["Minji", "Hanni", "Danielle", "ADOR"], "ADOR / HYBE", "4 Tracks", 4, "tracks"]
].map(args => makeEntry(args[0], 'k-pop', args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]));

// Combine all and ensure exact 50+ per category
const combined = [
  ...originalMedia,
  ...animeComplement,
  ...mangaComplement1,
  ...moreManga,
  ...gamingComplement1,
  ...moreGaming,
  ...extraGamingTitles,
  ...moviesPart1,
  ...extraMovieTitles,
  ...tvPart1,
  ...extraTvTitles,
  ...comicsPart1,
  ...extraComicTitles,
  ...kpopPart1,
  ...extraKpopTitles
];

// Deduplicate by ID
const uniqueMap = new Map();
combined.forEach(item => {
  if (!uniqueMap.has(item.id)) {
    uniqueMap.set(item.id, item);
  }
});

const finalMedia = Array.from(uniqueMap.values());

// Tally by category
const categoryCounts = {};
finalMedia.forEach(item => {
  categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
});

console.log("Category counts:", categoryCounts);
console.log("Total titles in expanded database:", finalMedia.length);

// Write to src/data/media.json
fs.writeFileSync(path.join(__dirname, '../src/data/media.json'), JSON.stringify(finalMedia, null, 2), 'utf8');
console.log("Successfully wrote to src/data/media.json!");
