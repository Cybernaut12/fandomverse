import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  CategoryType, 
  MediaItem, 
  CharacterProfile, 
  FeaturedArticle, 
  MediaClip, 
  GalleryImage, 
  MerchandiseItem, 
  CartItem, 
  UserProgressItem, 
  ReviewItem,
  CalendarRelease,
  SpotifyTrack,
  FandomDebate,
  DebateArgument
} from '../types';

import mediaData from '../data/media.json';
import characterData from '../data/characters.json';
import eventData from '../data/events.json';
import merchandiseData from '../data/merchandise.json';
import articleData from '../data/articles.json';
import reviewData from '../data/reviews.json';
import releaseData from '../data/releases.json';
import galleryData from '../data/galleries.json';
import audioClipData from '../data/audioClips.json';
import musicTracksData from '../data/musicTracks.json';
import debatesData from '../data/debates.json';

export type AppView = 
  | 'home' 
  | 'discover' 
  | 'category' 
  | 'collection' 
  | 'progress' 
  | 'reviews' 
  | 'calendar' 
  | 'profile' 
  | 'merchandise' 
  | 'music'
  | 'community'
  | 'trailers'
  | 'contact' 
  | 'about';

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  banner: string;
  location: string;
  website: string;
  joinedDate: string;
  itemsCount: number;
  completedCount: number;
  listsCount: number;
  reviewsCount: number;
  followers: number;
  following: number;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  
  // Real-time & Visitor Counter (SRS page 14)
  currentTime: Date;
  visitorCount: number;
  
  // Modals
  selectedMedia: MediaItem | null;
  setSelectedMedia: (item: MediaItem | null) => void;
  selectedCharacter: CharacterProfile | null;
  setSelectedCharacter: (char: CharacterProfile | null) => void;
  selectedArticle: FeaturedArticle | null;
  setSelectedArticle: (art: FeaturedArticle | null) => void;
  selectedVideoClip: MediaClip | null;
  setSelectedVideoClip: (clip: MediaClip | null) => void;
  lightboxImage: GalleryImage | null;
  setLightboxImage: (img: GalleryImage | null) => void;
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isBookmarksModalOpen: boolean;
  setIsBookmarksModalOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  
  // Data
  mediaList: MediaItem[];
  characters: CharacterProfile[];
  events: typeof eventData;
  merchandise: MerchandiseItem[];
  articles: FeaturedArticle[];
  reviews: ReviewItem[];
  releases: CalendarRelease[];
  galleries: GalleryImage[];
  audioClips: MediaClip[];
  
  // Bookmarks (LocalStorage) & Personal Notes (SessionStorage) - SRS page 13
  bookmarks: string[]; // item IDs
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  sessionNotes: Record<string, string>;
  setSessionNote: (id: string, note: string) => void;
  getSessionNote: (id: string) => string;
  exportBookmarksList: () => string;
  
  // Shopping Cart & Billing Total (SRS page 12)
  cart: CartItem[];
  addToCart: (product: MerchandiseItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  
  // Collection & Progress Tracker (Screen 5 & 6)
  userProgress: Record<string, UserProgressItem>;
  updateProgressUnits: (mediaId: string, delta: number) => void;
  setProgressStatus: (mediaId: string, status: UserProgressItem['status']) => void;
  setUserRating: (mediaId: string, rating: number) => void;
  
  // Reviews
  addReview: (review: Omit<ReviewItem, 'id' | 'likes' | 'date'>) => void;
  
  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  currentUser: { isLoggedIn: boolean; name: string; email: string };
  setCurrentUser: React.Dispatch<React.SetStateAction<{ isLoggedIn: boolean; name: string; email: string }>>;
  
  // Music Section (Spotify Tracks Dataset)
  musicTracks: SpotifyTrack[];
  currentPlayingTrack: SpotifyTrack | null;
  isPlaying: boolean;
  playTrack: (track: SpotifyTrack) => void;
  pauseTrack: () => void;
  togglePlayPause: () => void;
  favoriteTrackIds: string[];
  toggleFavoriteTrack: (trackId: string) => void;
  isFavoriteTrack: (trackId: string) => boolean;

  // Community Section (Fandom Debates & Hot Takes)
  debates: FandomDebate[];
  userVotes: Record<string, 'A' | 'B'>;
  voteDebate: (debateId: string, stance: 'A' | 'B') => void;
  addDebateArgument: (debateId: string, arg: { author: string; authorAvatar: string; badge?: string; stance: 'A' | 'B'; title: string; content: string; canonCitation?: string }) => void;
  likeDebateArgument: (debateId: string, argumentId: string) => void;
  createDebate: (debate: { title: string; category: CategoryType; platforms: string[]; description: string; banner?: string; stanceA: { title: string; summary: string }; stanceB: { title: string; summary: string }; tags: string[] }) => void;

  // Navigation helpers & History
  navigationHistory: AppView[];
  canGoBack: boolean;
  goBack: () => void;
  navigateToMedia: (mediaId: string) => void;
  navigateToCategory: (cat: CategoryType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewState] = useState<AppView>('home');
  const [navigationHistory, setNavigationHistory] = useState<AppView[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('anime');

  const setCurrentView = (view: AppView | ((prev: AppView) => AppView)) => {
    setCurrentViewState(curr => {
      const next = typeof view === 'function' ? view(curr) : view;
      if (next !== curr) {
        setNavigationHistory(h => [...h.slice(-30), curr]);
      }
      return next;
    });
  };
  
  // Clock state
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Visitor Counter simulation via LocalStorage (SRS page 14)
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    const stored = localStorage.getItem('fandomverse_visitor_count');
    if (stored) {
      const parsed = parseInt(stored, 10);
      const nextCount = parsed + 1;
      localStorage.setItem('fandomverse_visitor_count', nextCount.toString());
      return nextCount;
    }
    const initial = 12482; // realistic lively community count
    localStorage.setItem('fandomverse_visitor_count', initial.toString());
    return initial;
  });

  // Modal states
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<FeaturedArticle | null>(null);
  const [selectedVideoClip, setSelectedVideoClip] = useState<MediaClip | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  // Data collections
  const [mediaList] = useState<MediaItem[]>(mediaData as MediaItem[]);
  const [characters] = useState<CharacterProfile[]>(characterData as CharacterProfile[]);
  const [events] = useState(eventData);
  const [merchandise] = useState<MerchandiseItem[]>(merchandiseData as MerchandiseItem[]);
  const [articles] = useState<FeaturedArticle[]>(articleData as FeaturedArticle[]);
  const [reviews, setReviews] = useState<ReviewItem[]>(reviewData as ReviewItem[]);
  const [releases] = useState<CalendarRelease[]>(releaseData as CalendarRelease[]);
  const [galleries] = useState<GalleryImage[]>(galleryData as GalleryImage[]);
  const [audioClips] = useState<MediaClip[]>(audioClipData as MediaClip[]);

  // User Authentication state
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: true,
    name: 'WizrdBytes',
    email: 'wizrd@fandomverse.io'
  });

  // User Profile (Screen 9)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'WizrdBytes',
    username: '@wizrdbytes',
    bio: 'Stories, games and worlds that stay with me. Artist • Designer • Built for 10k.',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b127691-9zqh1xpIubn7.png',
    banner: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg',
    location: 'Nigeria',
    website: 'wizrdbytes.com',
    joinedDate: 'Mar 2021',
    itemsCount: 428,
    completedCount: 214,
    listsCount: 37,
    reviewsCount: 68,
    followers: 1200,
    following: 384
  });

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  // Bookmarks in LocalStorage (SRS page 13)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fandomverse_bookmarks');
      return saved ? JSON.parse(saved) : ['one-piece', 'the-batman', 'elden-ring', 'arcane'];
    } catch {
      return ['one-piece', 'the-batman'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fandomverse_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  // Session Notes in SessionStorage (SRS page 13)
  const [sessionNotes, setSessionNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = sessionStorage.getItem('fandomverse_session_notes');
      return saved ? JSON.parse(saved) : {
        'one-piece': 'Must finish Egghead Arc before the weekend!',
        'the-batman': 'Rewatch with the soundbar at maximum volume.'
      };
    } catch {
      return {};
    }
  });

  const setSessionNote = (id: string, note: string) => {
    setSessionNotes(prev => {
      const updated = { ...prev, [id]: note };
      try {
        sessionStorage.setItem('fandomverse_session_notes', JSON.stringify(updated));
      } catch (e) {
        console.error('Session storage error:', e);
      }
      return updated;
    });
  };

  const getSessionNote = (id: string) => sessionNotes[id] || '';

  // Export Bookmarks as Formatted List (SRS page 13)
  const exportBookmarksList = (): string => {
    const bookmarkedMedia = mediaList.filter(m => bookmarks.includes(m.id));
    const lines: string[] = [
      `# FANDOMVERSE - MY CURATED BOOKMARKS EXPORT`,
      `Exported on: ${new Date().toLocaleString()}`,
      `Total Bookmarked Items: ${bookmarkedMedia.length}`,
      `===================================================\n`
    ];

    bookmarkedMedia.forEach((item, idx) => {
      const note = sessionNotes[item.id];
      lines.push(`${idx + 1}. [${item.category.toUpperCase()}] ${item.title} (${item.year})`);
      lines.push(`   Rating: ${item.rating}/10 | Genres: ${item.genres.join(', ')}`);
      lines.push(`   Platform/Studio: ${item.platformOrStudio || 'N/A'}`);
      if (note) {
        lines.push(`   Personal Session Note: "${note}"`);
      }
      lines.push(`   Synopsis: ${item.synopsis}`);
      lines.push(``);
    });

    return lines.join('\n');
  };

  // Cart State (SRS page 12)
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      { product: merchandiseData[0] as MerchandiseItem, quantity: 1 },
      { product: merchandiseData[3] as MerchandiseItem, quantity: 2 }
    ];
  });

  const addToCart = (product: MerchandiseItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // User Progress Tracker (Screen 5 & Screen 6)
  const [userProgress, setUserProgress] = useState<Record<string, UserProgressItem>>(() => {
    try {
      const saved = localStorage.getItem('fandomverse_user_progress');
      if (saved) return JSON.parse(saved);
    } catch {}

    return {
      'one-piece': {
        mediaId: 'one-piece',
        currentUnits: 1080,
        totalUnits: 1120,
        unitType: 'chapters',
        status: 'reading',
        personalRating: 10,
        lastUpdated: 'Today'
      },
      'the-last-of-us': {
        mediaId: 'the-last-of-us',
        currentUnits: 7,
        totalUnits: 9,
        unitType: 'episodes',
        status: 'watching',
        personalRating: 9,
        lastUpdated: 'Yesterday'
      },
      'studio-ghibli-collection': {
        mediaId: 'studio-ghibli-collection',
        currentUnits: 12,
        totalUnits: 22,
        unitType: 'episodes',
        status: 'watching',
        personalRating: 10,
        lastUpdated: '3 days ago'
      },
      'elden-ring': {
        mediaId: 'elden-ring',
        currentUnits: 65,
        totalUnits: 100,
        unitType: 'hours',
        status: 'playing',
        personalRating: 10,
        lastUpdated: '2 days ago'
      },
      'monster': {
        mediaId: 'monster',
        currentUnits: 18,
        totalUnits: 162,
        unitType: 'chapters',
        status: 'on-hold',
        personalRating: 9,
        lastUpdated: '1 month ago'
      },
      'dune-part-two': {
        mediaId: 'dune-part-two',
        currentUnits: 166,
        totalUnits: 166,
        unitType: 'hours',
        status: 'completed',
        personalRating: 10,
        lastUpdated: '2 days ago'
      },
      'solo-leveling': {
        mediaId: 'solo-leveling',
        currentUnits: 10,
        totalUnits: 24,
        unitType: 'episodes',
        status: 'watching',
        personalRating: 9,
        lastUpdated: '4 days ago'
      },
      'berserk': {
        mediaId: 'berserk',
        currentUnits: 130,
        totalUnits: 375,
        unitType: 'chapters',
        status: 'reading',
        personalRating: 10,
        lastUpdated: '1 week ago'
      }
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('fandomverse_user_progress', JSON.stringify(userProgress));
    } catch (e) {
      console.error(e);
    }
  }, [userProgress]);

  const updateProgressUnits = (mediaId: string, delta: number) => {
    setUserProgress(prev => {
      const current = prev[mediaId];
      if (!current) return prev;
      const newUnits = Math.min(current.totalUnits, Math.max(0, current.currentUnits + delta));
      const newStatus = newUnits >= current.totalUnits ? 'completed' : current.status;
      return {
        ...prev,
        [mediaId]: {
          ...current,
          currentUnits: newUnits,
          status: newStatus,
          lastUpdated: 'Just now'
        }
      };
    });
  };

  const setProgressStatus = (mediaId: string, status: UserProgressItem['status']) => {
    setUserProgress(prev => {
      const current = prev[mediaId];
      if (!current) return prev;
      return {
        ...prev,
        [mediaId]: { ...current, status, lastUpdated: 'Just now' }
      };
    });
  };

  const setUserRating = (mediaId: string, rating: number) => {
    setUserProgress(prev => {
      const current = prev[mediaId];
      if (!current) return prev;
      return {
        ...prev,
        [mediaId]: { ...current, personalRating: rating }
      };
    });
  };

  // Add Review
  const addReview = (newRev: Omit<ReviewItem, 'id' | 'likes' | 'date'>) => {
    const item: ReviewItem = {
      ...newRev,
      id: `rev-${Date.now()}`,
      likes: 1,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setReviews(prev => [item, ...prev]);
    setUserProfile(prev => ({ ...prev, reviewsCount: prev.reviewsCount + 1 }));
  };

  // Music State (Spotify Tracks)
  const [musicTracks] = useState<SpotifyTrack[]>(musicTracksData as SpotifyTrack[]);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fandomverse_favorite_tracks');
      return saved ? JSON.parse(saved) : ['0GjEhRrOhbyvjG1teNVk9P', '3ZFTkvIE7kyPt6Nu3PEmuV'];
    } catch {
      return ['0GjEhRrOhbyvjG1teNVk9P'];
    }
  });

  const [audioElement] = useState<HTMLAudioElement | null>(() => {
    if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
      return new Audio();
    }
    return null;
  });

  useEffect(() => {
    if (!audioElement) return;
    const handleEnded = () => setIsPlaying(false);
    audioElement.addEventListener('ended', handleEnded);
    return () => audioElement.removeEventListener('ended', handleEnded);
  }, [audioElement]);

  const playTrack = (track: SpotifyTrack) => {
    setCurrentPlayingTrack(track);
    setIsPlaying(true);
    if (audioElement && track.preview_audio) {
      audioElement.src = track.preview_audio;
      audioElement.currentTime = 0;
      audioElement.play().catch(() => {});
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    audioElement?.pause();
  };

  const togglePlayPause = () => {
    if (!currentPlayingTrack) {
      if (musicTracks.length > 0) {
        playTrack(musicTracks[0]);
      }
      return;
    }
    if (isPlaying) {
      pauseTrack();
    } else {
      setIsPlaying(true);
      audioElement?.play().catch(() => {});
    }
  };

  const toggleFavoriteTrack = (trackId: string) => {
    setFavoriteTrackIds(prev => {
      const next = prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId];
      try {
        localStorage.setItem('fandomverse_favorite_tracks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavoriteTrack = (trackId: string) => favoriteTrackIds.includes(trackId);

  // Community Debates State
  const [debates, setDebates] = useState<FandomDebate[]>(() => {
    try {
      const saved = localStorage.getItem('fandomverse_debates');
      return saved ? JSON.parse(saved) : (debatesData as unknown as FandomDebate[]);
    } catch {
      return debatesData as unknown as FandomDebate[];
    }
  });

  const [userVotes, setUserVotes] = useState<Record<string, 'A' | 'B'>>(() => {
    try {
      const saved = localStorage.getItem('fandomverse_debate_votes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const voteDebate = (debateId: string, stance: 'A' | 'B') => {
    setUserVotes(prev => {
      const oldVote = prev[debateId];
      if (oldVote === stance) return prev;

      const nextVotes = { ...prev, [debateId]: stance };
      try {
        localStorage.setItem('fandomverse_debate_votes', JSON.stringify(nextVotes));
      } catch {}

      setDebates(prevDebates => {
        const updated = prevDebates.map(d => {
          if (d.id !== debateId) return d;
          let stanceAVotes = d.stanceA.votes;
          let stanceBVotes = d.stanceB.votes;

          if (oldVote === 'A') stanceAVotes = Math.max(0, stanceAVotes - 1);
          if (oldVote === 'B') stanceBVotes = Math.max(0, stanceBVotes - 1);

          if (stance === 'A') stanceAVotes += 1;
          if (stance === 'B') stanceBVotes += 1;

          return {
            ...d,
            stanceA: { ...d.stanceA, votes: stanceAVotes },
            stanceB: { ...d.stanceB, votes: stanceBVotes }
          };
        });
        try {
          localStorage.setItem('fandomverse_debates', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      return nextVotes;
    });
  };

  const addDebateArgument = (debateId: string, arg: { author: string; authorAvatar: string; badge?: string; stance: 'A' | 'B'; title: string; content: string; canonCitation?: string }) => {
    const newArg: DebateArgument = {
      id: `arg-${Date.now()}`,
      debateId,
      author: arg.author,
      authorAvatar: arg.authorAvatar,
      badge: arg.badge || 'Debater',
      stance: arg.stance,
      title: arg.title,
      content: arg.content,
      canonCitation: arg.canonCitation,
      likes: 1,
      createdAt: new Date().toISOString(),
      repliesCount: 0
    };

    setDebates(prev => {
      const next = prev.map(d => {
        if (d.id !== debateId) return d;
        return {
          ...d,
          arguments: [newArg, ...d.arguments]
        };
      });
      try {
        localStorage.setItem('fandomverse_debates', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const likeDebateArgument = (debateId: string, argumentId: string) => {
    setDebates(prev => {
      const next = prev.map(d => {
        if (d.id !== debateId) return d;
        return {
          ...d,
          arguments: d.arguments.map(a => a.id === argumentId ? { ...a, likes: a.likes + 1 } : a)
        };
      });
      try {
        localStorage.setItem('fandomverse_debates', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const createDebate = (newD: { title: string; category: CategoryType; platforms: string[]; description: string; banner?: string; stanceA: { title: string; summary: string }; stanceB: { title: string; summary: string }; tags: string[] }) => {
    const created: FandomDebate = {
      id: `debate-${Date.now()}`,
      title: newD.title,
      category: newD.category,
      platforms: newD.platforms,
      description: newD.description,
      banner: newD.banner || 'https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg',
      stanceA: { title: newD.stanceA.title, summary: newD.stanceA.summary, votes: 1 },
      stanceB: { title: newD.stanceB.title, summary: newD.stanceB.summary, votes: 0 },
      tags: newD.tags,
      featured: false,
      createdAt: new Date().toISOString().split('T')[0],
      arguments: []
    };

    setDebates(prev => {
      const next = [created, ...prev];
      try {
        localStorage.setItem('fandomverse_debates', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Navigation helpers
  const navigateToMedia = (mediaId: string) => {
    const found = mediaList.find(m => m.id === mediaId);
    if (found) {
      setSelectedMedia(found);
    }
  };

  const navigateToCategory = (cat: CategoryType) => {
    setActiveCategory(cat);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    // 1. Topmost transient overlays (video player & lightbox) must dismiss first
    if (selectedVideoClip) {
      setSelectedVideoClip(null);
      return;
    }
    if (lightboxImage) {
      setLightboxImage(null);
      return;
    }

    // 2. Global overlay drawers & dialogs
    if (isSearchModalOpen) {
      setIsSearchModalOpen(false);
      return;
    }
    if (isBookmarksModalOpen) {
      setIsBookmarksModalOpen(false);
      return;
    }
    if (isReviewModalOpen) {
      setIsReviewModalOpen(false);
      return;
    }
    if (isAuthModalOpen) {
      setIsAuthModalOpen(false);
      return;
    }
    if (isCartOpen) {
      setIsCartOpen(false);
      return;
    }

    // 3. Entity detail modals
    if (selectedCharacter) {
      setSelectedCharacter(null);
      return;
    }
    if (selectedArticle) {
      setSelectedArticle(null);
      return;
    }
    if (selectedMedia) {
      setSelectedMedia(null);
      return;
    }

    setNavigationHistory(prev => {
      if (prev.length === 0) {
        setCurrentViewState('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return [];
      }
      const nextHistory = [...prev];
      const prevView = nextHistory.pop() || 'home';
      setCurrentViewState(prevView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return nextHistory;
    });
  };

  const canGoBack = currentView !== 'home' || navigationHistory.length > 0 || !!selectedMedia || !!selectedCharacter || !!selectedArticle || !!selectedVideoClip || isSearchModalOpen || isBookmarksModalOpen || isCartOpen;

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      activeCategory,
      setActiveCategory,
      currentTime,
      visitorCount,
      selectedMedia,
      setSelectedMedia,
      selectedCharacter,
      setSelectedCharacter,
      selectedArticle,
      setSelectedArticle,
      selectedVideoClip,
      setSelectedVideoClip,
      lightboxImage,
      setLightboxImage,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isCartOpen,
      setIsCartOpen,
      isBookmarksModalOpen,
      setIsBookmarksModalOpen,
      isSearchModalOpen,
      setIsSearchModalOpen,
      isReviewModalOpen,
      setIsReviewModalOpen,
      isChatbotOpen,
      setIsChatbotOpen,
      mediaList,
      characters,
      events,
      merchandise,
      articles,
      reviews,
      releases,
      galleries,
      audioClips,
      bookmarks,
      toggleBookmark,
      isBookmarked,
      sessionNotes,
      setSessionNote,
      getSessionNote,
      exportBookmarksList,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartItemCount,
      userProgress,
      updateProgressUnits,
      setProgressStatus,
      setUserRating,
      addReview,
      userProfile,
      updateUserProfile,
      currentUser,
      setCurrentUser,
      musicTracks,
      currentPlayingTrack,
      isPlaying,
      playTrack,
      pauseTrack,
      togglePlayPause,
      favoriteTrackIds,
      toggleFavoriteTrack,
      isFavoriteTrack,
      debates,
      userVotes,
      voteDebate,
      addDebateArgument,
      likeDebateArgument,
      createDebate,
      navigateToMedia,
      navigateToCategory,
      navigationHistory,
      canGoBack,
      goBack
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
