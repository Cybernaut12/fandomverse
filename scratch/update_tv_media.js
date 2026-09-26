import fs from 'fs';
import path from 'path';

const mediaPath = path.resolve('src/data/media.json');
const media = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));

// Remove old tv media
const nonTvMedia = media.filter(m => m.category !== 'tv-shows');

const tvMedia = [
  {
    id: "med-tv-001",
    title: "The Last of Us — Season 2 Official Teaser",
    category: "tv-shows",
    type: "trailer",
    thumbnail: "/images/tv/the-last-of-us-banner.jpg",
    youtubeId: "uLtkt8BonwM",
    duration: "2:04",
    description: "Joel and Ellie face the consequences of the hospital in Salt Lake City as a new threat emerges in Jackson."
  },
  {
    id: "med-tv-002",
    title: "House of the Dragon — Season 2 Official Trailer",
    category: "tv-shows",
    type: "trailer",
    thumbnail: "/images/tv/house-of-the-dragon-banner.jpg",
    youtubeId: "fNwwt25mheo",
    duration: "2:31",
    description: "The Dance of the Dragons begins. Team Black and Team Green prepare to burn the realm for the Iron Throne."
  },
  {
    id: "med-tv-003",
    title: "Severance — Official Trailer",
    category: "tv-shows",
    type: "trailer",
    thumbnail: "/images/tv/severance-banner.jpg",
    youtubeId: "xQGToE_CuvA", // Valid Apple TV Season 1 Trailer
    duration: "2:20",
    description: "Your innie has been awake. Return to Lumon Industries for the critically acclaimed series."
  },
  {
    id: "med-tv-004",
    title: "The Boys — Official Trailer",
    category: "tv-shows",
    type: "trailer",
    thumbnail: "/images/tv/the-boys-banner.jpg",
    youtubeId: "M1bhOaLV4FU", // Season 1 trailer, less likely age restricted for embed
    duration: "2:24",
    description: "Never meet your heroes. The Boys is a fresh, irreverent take on what happens when superheroes abuse their powers."
  },
  {
    id: "med-tv-005",
    title: "Stranger Things 4 — Official Trailer",
    category: "tv-shows",
    type: "trailer",
    thumbnail: "/images/tv/stranger-things-banner.jpg",
    youtubeId: "yQEondeGvNw", // ST4 Trailer
    duration: "3:16",
    description: "It's time. See you on the other side. The epic fourth season takes the Hawkins crew to their limits."
  },
  {
    id: "med-tv-006",
    title: "Wednesday — Official Trailer",
    category: "tv-shows",
    type: "trailer",
    thumbnail: "/images/tv/wednesday-banner.jpg",
    youtubeId: "Di310WS8zLk", // Wednesday Official Trailer
    duration: "2:25",
    description: "Jenna Ortega stars as Wednesday Addams in this new series from the mind of Tim Burton."
  }
];

const updatedMedia = [...tvMedia, ...nonTvMedia];
fs.writeFileSync(mediaPath, JSON.stringify(updatedMedia, null, 2), 'utf8');

console.log("TV Media updated.");
