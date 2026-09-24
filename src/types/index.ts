export type CategoryType = 
  | 'anime' 
  | 'gaming' 
  | 'movies' 
  | 'tv-shows' 
  | 'k-pop' 
  | 'comics' 
  | 'manga';

export type MediaType = 'movie' | 'tv' | 'anime' | 'manga' | 'game' | 'comic' | 'k-pop';

export type ContentFormatType = 'article' | 'gallery' | 'video' | 'audio' | 'character' | 'event' | 'merchandise' | 'release';

export interface ArcOrSeason {
  title: string;
  range: string;
  description: string;
  status?: string;
}

export interface CastMember {
  name: string;
  role: string;
  character: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  mediaId?: string;
  mediaTitle?: string;
  mediaCategory?: CategoryType;
  mediaPoster?: string;
  author: string;
  avatar: string;
  rating: number; // 1 to 5 or 1 to 10
  date: string;
  title: string;
  content: string;
  likes: number;
  badge?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  originalTitle?: string;
  category: CategoryType;
  mediaType: MediaType;
  coverImage: string;
  bannerImage: string;
  rating: number; // 0 to 10
  ratingCount?: string;
  year: number;
  ongoing?: boolean;
  runtimeOrChapters?: string;
  ageRating?: string;
  genres: string[];
  platformOrStudio?: string;
  synopsis: string;
  quote?: string;
  rank?: string;
  membersCount?: string;
  trailerUrl?: string;
  featured?: boolean;
  trending?: boolean;
  hiddenGem?: boolean;
  topArcs?: ArcOrSeason[];
  cast?: CastMember[];
  tags: string[];
  totalUnits?: number; // total episodes, chapters, or hours
  unitType?: 'chapters' | 'episodes' | 'hours' | 'volumes' | 'tracks';
}

export interface UserProgressItem {
  mediaId: string;
  currentUnits: number;
  totalUnits: number;
  unitType: 'chapters' | 'episodes' | 'hours' | 'volumes' | 'tracks';
  status: 'watching' | 'reading' | 'playing' | 'completed' | 'on-hold' | 'dropped';
  personalRating?: number;
  lastUpdated: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  japaneseName?: string;
  category: CategoryType;
  series: string;
  image: string;
  role: 'Protagonist' | 'Antagonist' | 'Supporting' | 'Deuteragonist' | 'Idol';
  biography: string;
  traits: string[];
  powersOrSkills?: string[];
  quotes: string[];
  actorOrVoice?: string;
}

export interface EventHighlight {
  id: string;
  title: string;
  category: CategoryType;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  bannerImage: string;
  badge: 'Upcoming' | 'Ongoing' | 'Past' | 'Registration Open';
  attendeesCount?: string;
  url?: string;
}

export interface FeaturedArticle {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  coverImage: string;
  summary: string;
  content: string[];
  tags: string[];
  likes: number;
  relatedMediaIds: string[];
}

export interface GalleryImage {
  id: string;
  category: CategoryType;
  title: string;
  franchise: string;
  imageUrl: string;
  description: string;
  artistOrStudio: string;
  likes: number;
}

export interface MediaClip {
  id: string;
  title: string;
  category: CategoryType;
  type: 'trailer' | 'interview' | 'podcast' | 'ost' | 'fan-video';
  duration: string;
  thumbnail: string;
  embedUrl: string;
  audioUrl?: string;
  description: string;
  releaseStatus: 'upcoming' | 'recently-released';
  authorOrHost?: string;
}

export interface MerchandiseItem {
  id: string;
  name: string;
  category: CategoryType;
  franchise: string;
  price: number;
  originalPrice?: number;
  priceRange?: string;
  image: string;
  description: string;
  badge?: 'Official' | 'Limited Edition' | 'Best Seller' | 'Pre-Order';
  inStock: boolean;
  rating: number;
  itemType: 'Figures' | 'Apparel' | 'Collectibles' | 'Accessories' | 'Plushies' | 'Art Prints' | 'Drinkware';
}

export interface CartItem {
  product: MerchandiseItem;
  quantity: number;
}

export interface CalendarRelease {
  id: string;
  title: string;
  category: CategoryType;
  date: string; // e.g. "2026-09-04"
  time?: string;
  day: number;
  month: number; // 9 for Sept
  year: number; // 2026
  platform: string;
  format: string; // e.g. "TV Episode", "Steam / PC", "Theatrical", "Simulcast"
  coverImage: string;
  synopsis: string;
  reminded?: boolean;
}

export interface BookmarkNote {
  itemId: string;
  note: string;
  updatedAt: string;
}

export interface ChatbotQA {
  id: string;
  triggers: string[];
  response: string;
  quickReplies?: string[];
  suggestedAction?: {
    label: string;
    route: string;
    targetId?: string;
  };
}

export interface SpotifyTrack {
  track_id: string;
  track_name: string;
  artists: string;
  album_name: string;
  album_cover: string;
  popularity: number;
  duration_ms: number;
  duration: string;
  explicit: boolean;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  time_signature: number;
  track_genre: string;
  fandom_franchise: string;
  category: CategoryType;
  preview_audio?: string;
  lyrics_snippet?: string;
  spotify_url?: string;
}

export interface DebateArgument {
  id: string;
  debateId: string;
  author: string;
  authorAvatar: string;
  badge?: string;
  stance: 'A' | 'B';
  title: string;
  content: string;
  canonCitation?: string;
  likes: number;
  createdAt: string;
  repliesCount?: number;
}

export interface FandomDebate {
  id: string;
  title: string;
  category: CategoryType;
  platforms: string[];
  description: string;
  banner: string;
  stanceA: {
    title: string;
    summary: string;
    votes: number;
  };
  stanceB: {
    title: string;
    summary: string;
    votes: number;
  };
  tags: string[];
  featured?: boolean;
  arguments: DebateArgument[];
  createdAt: string;
}

