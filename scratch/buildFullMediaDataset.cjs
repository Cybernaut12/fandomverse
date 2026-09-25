const fs = require('fs');
const path = require('path');

// Read existing media to preserve all 28 original hand-crafted items
const originalMedia = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/media.json'), 'utf8'));

// Helper to construct uniform MediaItem
function createMediaItem(config) {
  const {
    id,
    title,
    originalTitle = title,
    category,
    mediaType = category === 'gaming' ? 'game' : category === 'tv-shows' ? 'tv' : category === 'movies' ? 'movie' : category,
    coverImage,
    bannerImage,
    rating = 8.5,
    ratingCount = '750K',
    year = 2023,
    ongoing = false,
    runtimeOrChapters = 'Complete',
    ageRating = 'PG-13',
    genres = [category],
    platformOrStudio = 'Global Studio',
    synopsis = `${title} is a critically acclaimed title in ${category}.`,
    quote = 'A celebrated chapter in pop culture.',
    rank = `Top Rated ${category.toUpperCase()}`,
    membersCount = '800K Members',
    trailerUrl = 'https://www.youtube.com/embed/S8_YwFLCh4U',
    featured = false,
    trending = false,
    hiddenGem = false,
    tags = [category, 'Iconic'],
    totalUnits = 12,
    unitType = category === 'manga' || category === 'comics' ? 'chapters' : category === 'gaming' ? 'hours' : category === 'k-pop' ? 'tracks' : 'episodes',
    topArcs = [
      { title: "Definitive Storyline", range: "Main Canon", description: "The core narrative sequence celebrated by fans worldwide.", status: "Canon" }
    ]
  } = config;

  return {
    id,
    title,
    originalTitle,
    category,
    mediaType,
    coverImage,
    bannerImage: bannerImage || coverImage,
    rating,
    ratingCount,
    year,
    ongoing,
    runtimeOrChapters,
    ageRating,
    genres,
    platformOrStudio,
    synopsis,
    quote,
    rank,
    membersCount,
    trailerUrl,
    featured,
    trending,
    hiddenGem,
    tags,
    totalUnits,
    unitType,
    topArcs
  };
}

console.log("Original items count:", originalMedia.length);
