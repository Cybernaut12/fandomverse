import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Compass, 
  Play, 
  Star, 
  Calendar, 
  Film, 
  Tv, 
  Gamepad2, 
  BookOpen, 
  Layers, 
  Users, 
  ShoppingBag,
  Clock,
  Radio,
  ExternalLink,
  Swords,
  Headphones,
  Pause,
  ThumbsUp,
  CheckCircle2,
  Heart,
  Activity,
  Maximize2,
  Clapperboard,
  ListVideo,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeroCarousel } from '../components/HeroCarousel';
import { MediaCard } from '../components/MediaCard';
import type { CategoryType, MediaClip } from '../types';

export const HomeView: React.FC = () => {
  const { 
    mediaList, 
    characters, 
    articles, 
    events, 
    merchandise, 
    audioClips,
    setSelectedMedia, 
    setSelectedCharacter, 
    setSelectedArticle, 
    setSelectedVideoClip,
    addToCart,
    navigateToCategory, 
    setCurrentView,
    visitorCount,
    debates,
    userVotes,
    voteDebate,
    musicTracks,
    currentPlayingTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    isFavoriteTrack,
    toggleFavoriteTrack
  } = useApp();

  // Trending items (12 items to fill 2 full rows on 6-column desktop grid)
  const trendingItems = mediaList.filter(item => item.trending).slice(0, 12);
  const featuredMerch = merchandise.slice(0, 4);
  const topCharacters = characters.slice(0, 6);
  const topArticles = articles.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  // Blockbuster Cinema Trailers State & Catalog
  const [activeTrailerId, setActiveTrailerId] = useState<string>('gta-vi');
  const [trailerFilter, setTrailerFilter] = useState<'all' | 'gaming' | 'tv-shows' | 'anime' | 'movies'>('all');
  const [isInlineCinemaPlaying, setIsInlineCinemaPlaying] = useState<boolean>(false);

  const blockbusterTrailers = [
    {
      id: 'gta-vi',
      title: 'Grand Theft Auto VI – Official Reveal Trailer 1',
      mediaId: 'gta-vi',
      franchise: 'Grand Theft Auto VI',
      category: 'gaming' as CategoryType,
      duration: '1:31',
      studio: 'Rockstar Games',
      quality: '4K 60FPS',
      year: 2025,
      status: 'Upcoming 2025',
      thumbnail: '/images/gta-vi-banner.jpg',
      coverImage: '/images/gta-vi-cover.jpg',
      embedUrl: 'https://www.youtube.com/embed/QdBZY2fkU-0',
      synopsis: 'Headed to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of Grand Theft Auto yet.',
      tagline: 'Trust? Trust is everything.'
    },
    {
      id: 'the-blacklist',
      title: 'The Blacklist – Official FBI Surrender Trailer',
      mediaId: 'the-blacklist',
      franchise: 'The Blacklist',
      category: 'tv-shows' as CategoryType,
      duration: '2:15',
      studio: 'NBC / Sony Pictures',
      quality: '1080p HD',
      year: 2013,
      status: 'Complete Series',
      thumbnail: 'https://static.tvmaze.com/uploads/images/original_untouched/81/204138.jpg',
      coverImage: '/images/the-blacklist-cover.jpg',
      embedUrl: 'https://www.youtube.com/embed/XihA6GWIBdM',
      synopsis: 'Raymond Reddington, one of the FBI\'s most wanted fugitives, surrenders at FBI Headquarters with an explosive offer to help catch the world\'s most elusive criminals.',
      tagline: 'Value loyalty above all else.'
    },
    {
      id: 'the-mentalist',
      title: 'The Mentalist – Official Series Trailer',
      mediaId: 'the-mentalist',
      franchise: 'The Mentalist',
      category: 'tv-shows' as CategoryType,
      duration: '2:05',
      studio: 'CBS / Warner Bros.',
      quality: '1080p HD',
      year: 2008,
      status: 'Complete Series',
      thumbnail: 'https://static.tvmaze.com/uploads/images/original_untouched/79/199141.jpg',
      coverImage: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/1239.jpg',
      embedUrl: 'https://www.youtube.com/embed/5U2zBGYdG-c',
      synopsis: 'Patrick Jane consults for the California Bureau of Investigation (CBI), solving homicides using sheer psychological observation while hunting Red John.',
      tagline: 'There is no such thing as psychics... just keen observation.'
    },
    {
      id: 'my-hero-academia',
      title: 'My Hero Academia – Official Anime Trailer',
      mediaId: 'my-hero-academia',
      franchise: 'My Hero Academia',
      category: 'anime' as CategoryType,
      duration: '1:48',
      studio: 'Studio Bones / TOHO animation',
      quality: '1080p HD',
      year: 2024,
      status: 'Final War Arc',
      thumbnail: 'https://static.tvmaze.com/uploads/images/original_untouched/219/547891.jpg',
      coverImage: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg',
      embedUrl: 'https://www.youtube.com/embed/D5fy4e4A8Wk',
      synopsis: 'In a superhuman society where 80% have superpowers called Quirks, Izuku Midoriya inherits One For All to battle the ultimate evil and protect hero society.',
      tagline: 'PLUS ULTRA!'
    },
    {
      id: 'dune-part-two',
      title: 'Dune: Part Two – Official Theatrical Trailer',
      mediaId: 'dune-part-two',
      franchise: 'Dune: Part Two',
      category: 'movies' as CategoryType,
      duration: '2:45',
      studio: 'Warner Bros. / Legendary Pictures',
      quality: '4K IMAX',
      year: 2024,
      status: 'Theatrical Hit',
      thumbnail: 'https://image.tmdb.org/t/p/w1280/eZ239CUp1d6OryZEBPnO2n87gMG.jpg',
      coverImage: 'https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      embedUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
      synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
      tagline: 'Long live the fighters.'
    },
    {
      id: 'the-batman',
      title: 'The Batman – Main Theatrical Trailer',
      mediaId: 'the-batman',
      franchise: 'The Batman',
      category: 'movies' as CategoryType,
      duration: '2:38',
      studio: 'Warner Bros. Pictures / DC',
      quality: '4K UHD',
      year: 2022,
      status: 'Blockbuster Hit',
      thumbnail: 'https://image.tmdb.org/t/p/w1280/rvtdN5XkWAfGX6xDuPL6yYS2seK.jpg',
      coverImage: 'https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg',
      embedUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4',
      synopsis: 'In his second year of fighting crime, Batman pursues the Riddler, a sadistic serial killer who leaves a trail of cryptic clues across Gotham City.',
      tagline: 'I am vengeance.'
    },
    {
      id: 'solo-leveling',
      title: 'Solo Leveling – Official Anime Trailer',
      mediaId: 'solo-leveling',
      franchise: 'Solo Leveling',
      category: 'anime' as CategoryType,
      duration: '2:12',
      studio: 'A-1 Pictures / Aniplex',
      quality: '1080p HD',
      year: 2024,
      status: 'Season 2 Arise',
      thumbnail: 'https://image.tmdb.org/t/p/w1280/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
      coverImage: 'https://cdn.myanimelist.net/images/anime/1066/141019l.jpg',
      embedUrl: 'https://www.youtube.com/embed/916OD9A32xU',
      synopsis: 'When an E-rank hunter known as the weakest hunter of all mankind awakens with a mysterious player system, he alone begins leveling up without limit.',
      tagline: 'Arise.'
    },
    {
      id: 'shogun',
      title: 'Shōgun – Official FX Series Trailer',
      mediaId: 'shogun',
      franchise: 'Shōgun',
      category: 'tv-shows' as CategoryType,
      duration: '2:24',
      studio: 'FX Networks / Hulu',
      quality: '4K UHD',
      year: 2024,
      status: 'Emmy Record Holder',
      thumbnail: 'https://image.tmdb.org/t/p/w1280/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
      coverImage: 'https://image.tmdb.org/t/p/w780/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
      embedUrl: 'https://www.youtube.com/embed/yFNAPJ9S4eE',
      synopsis: 'In feudal Japan, Lord Yoshii Toranaga discovers secrets that could tip the scales of power as civil war looms over the realm.',
      tagline: 'Destiny is forged in steel.'
    },
    {
      id: 'fallout',
      title: 'Fallout – Official Prime Video Trailer',
      mediaId: 'fallout',
      franchise: 'Fallout',
      category: 'tv-shows' as CategoryType,
      duration: '3:17',
      studio: 'Amazon MGM Studios / Kilter Films',
      quality: '4K UHD',
      year: 2024,
      status: 'Season 2 Confirmed',
      thumbnail: 'https://image.tmdb.org/t/p/w1280/coaPCIqQBPUZsOnJcWZxhaORcDT.jpg',
      coverImage: 'https://image.tmdb.org/t/p/w780/c15BtJxCXMrISLVmysdsnZUPQft.jpg',
      embedUrl: 'https://www.youtube.com/embed/V-bugHM9gV4',
      synopsis: 'Two hundred years after the nuclear apocalypse, gentle vault dwellers leave their underground fallout shelter to confront the bizarre and violent wasteland.',
      tagline: 'War. War never changes.'
    },
    {
      id: 'one-piece',
      title: 'One Piece: Egghead Island Arc – Official Teaser',
      mediaId: 'one-piece',
      franchise: 'One Piece',
      category: 'anime' as CategoryType,
      duration: '1:52',
      studio: 'Toei Animation',
      quality: '1080p 60FPS',
      year: 2024,
      status: 'Egghead Island Saga',
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
      coverImage: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
      embedUrl: 'https://www.youtube.com/embed/S8_YwFLCh4U',
      synopsis: 'Luffy and the Straw Hat Pirates arrive on the island of the future 500 years ahead, meeting the enigmatic genius Dr. Vegapunk.',
      tagline: 'The Drums of Liberation sound across the seas!'
    }
  ];

  const filteredTrailers = trailerFilter === 'all' 
    ? blockbusterTrailers 
    : blockbusterTrailers.filter(t => t.category === trailerFilter);

  const activeTrailer = blockbusterTrailers.find(t => t.id === activeTrailerId) || blockbusterTrailers[0];

  // Spotlight debate & music tracks
  const spotlightDebate = debates.find(d => d.featured) || debates[0];
  const secondaryDebates = debates.filter(d => d.id !== spotlightDebate?.id).slice(0, 2);
  const homeMusicTracks = musicTracks.slice(0, 6);

  const categoriesConfig: { cat: CategoryType; label: string; desc: string; icon: React.ReactNode; color: string; count: number }[] = [
    { cat: 'anime', label: 'Anime', desc: 'Sakuga battles, shonen legends & fantasy epics', icon: <Sparkles className="w-5 h-5" />, color: 'from-purple-600 to-indigo-600', count: mediaList.filter(m => m.category === 'anime').length },
    { cat: 'gaming', label: 'Gaming', desc: 'Open world masterpieces, RPGs & stealth thrillers', icon: <Gamepad2 className="w-5 h-5" />, color: 'from-emerald-600 to-teal-600', count: mediaList.filter(m => m.category === 'gaming').length },
    { cat: 'movies', label: 'Movies', desc: 'Cinematic universes, sci-fi sagas & auteur noir', icon: <Film className="w-5 h-5" />, color: 'from-amber-600 to-orange-600', count: mediaList.filter(m => m.category === 'movies').length },
    { cat: 'tv-shows', label: 'TV Shows', desc: 'Prestige serials, dystopian waste & feudal politics', icon: <Tv className="w-5 h-5" />, color: 'from-sky-600 to-blue-600', count: mediaList.filter(m => m.category === 'tv-shows').length },
    { cat: 'manga', label: 'Manga', desc: 'Weekly shonen, dark fantasy seinen & ink art', icon: <BookOpen className="w-5 h-5" />, color: 'from-rose-600 to-red-600', count: mediaList.filter(m => m.category === 'manga').length },
    { cat: 'comics', label: 'Comics', desc: 'Graphic novels, multiversal crises & vigilante noir', icon: <Layers className="w-5 h-5" />, color: 'from-indigo-600 to-violet-600', count: mediaList.filter(m => m.category === 'comics').length },
    { cat: 'k-pop', label: 'K-Pop', desc: 'Global pop icons, stadium tours & meta-lore', icon: <Sparkles className="w-5 h-5" />, color: 'from-pink-600 to-rose-500', count: mediaList.filter(m => m.category === 'k-pop').length }
  ];

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300">
      
      {/* 1. Hero Carousel (Screen 1) */}
      <section>
        <HeroCarousel />
      </section>

      {/* 2. Trending This Week (Screen 1 lower section) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Flame className="w-5 h-5 fill-orange-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
                Trending This Week
              </h2>
              <p className="text-xs text-slate-400">
                Most engaged titles across anime, movies, TV, and gaming
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('discover')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 group"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {trendingItems.map(item => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 3. Explore Category Hubs (7 Fandom Universes) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
              Explore Fandom Hubs
            </h2>
            <p className="text-xs text-slate-400">
              Dedicated portals curated with articles, image galleries, trailers, and character rosters
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categoriesConfig.map(cat => (
            <div
              key={cat.cat}
              onClick={() => navigateToCategory(cat.cat)}
              className="group p-5 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-tr ${cat.color} text-white shadow-lg shadow-black/40`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  {cat.count} Titles
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 group-hover:text-white transition-colors">
                <span>Enter Hub</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Fandom Coliseum: Live Community Debates */}
      {spotlightDebate && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Swords className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
                  Fandom Coliseum & Debates
                </h2>
                <p className="text-xs text-slate-400">
                  Cross-platform collisions, powerscaling, and hot takes. Vote live and defend your stance.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('community')}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center space-x-1 group"
            >
              <span>Enter Coliseum ({debates.length} Battles)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Spotlight Debate Card */}
          <div className="rounded-3xl border border-rose-500/25 bg-[#0f111c] overflow-hidden shadow-2xl relative">
            <div className="relative h-44 sm:h-56 w-full overflow-hidden">
              <img 
                src={spotlightDebate.banner} 
                alt={spotlightDebate.title}
                className="w-full h-full object-cover brightness-75 scale-105 hover:scale-100 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f111c] via-[#0f111c]/70 to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                {spotlightDebate.platforms.map((p, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-rose-300 border border-rose-500/30">
                    {p}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider inline-flex items-center space-x-1">
                  <Flame className="w-3 h-3 text-rose-400" />
                  <span>Trending Collision</span>
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white font-heading line-clamp-1 drop-shadow-md">
                  {spotlightDebate.title}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {(() => {
                const totalVotes = spotlightDebate.stanceA.votes + spotlightDebate.stanceB.votes;
                const pctA = totalVotes > 0 ? Math.round((spotlightDebate.stanceA.votes / totalVotes) * 100) : 50;
                const pctB = 100 - pctA;
                const myVote = userVotes[spotlightDebate.id];

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <span className="text-cyan-400 font-bold">Side A: {pctA}%</span>
                      <span>{totalVotes.toLocaleString()} Votes Logged</span>
                      <span className="text-rose-400 font-bold">Side B: {pctB}%</span>
                    </div>

                    <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-white/10 shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-l-full transition-all duration-500" 
                        style={{ width: `${pctA}%` }} 
                      />
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-r-full transition-all duration-500" 
                        style={{ width: `${pctB}%` }} 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className={`p-3.5 rounded-xl border transition-all ${
                        myVote === 'A' ? 'bg-cyan-950/30 border-cyan-500 shadow-md ring-1 ring-cyan-500/50' : 'bg-white/[0.03] border-white/10'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-cyan-400 truncate">{spotlightDebate.stanceA.title}</span>
                          {myVote === 'A' && <span className="text-[10px] text-cyan-300 font-bold">Your Vote</span>}
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2 mb-3">{spotlightDebate.stanceA.summary}</p>
                        <button
                          onClick={() => voteDebate(spotlightDebate.id, 'A')}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                            myVote === 'A' ? 'bg-cyan-500 text-black' : 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Vote Side A ({spotlightDebate.stanceA.votes})</span>
                        </button>
                      </div>

                      <div className={`p-3.5 rounded-xl border transition-all ${
                        myVote === 'B' ? 'bg-rose-950/30 border-rose-500 shadow-md ring-1 ring-rose-500/50' : 'bg-white/[0.03] border-white/10'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-rose-400 truncate">{spotlightDebate.stanceB.title}</span>
                          {myVote === 'B' && <span className="text-[10px] text-rose-300 font-bold">Your Vote</span>}
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2 mb-3">{spotlightDebate.stanceB.summary}</p>
                        <button
                          onClick={() => voteDebate(spotlightDebate.id, 'B')}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                            myVote === 'B' ? 'bg-rose-500 text-white' : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Vote Side B ({spotlightDebate.stanceB.votes})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Secondary Matchup Teasers */}
              {secondaryDebates.length > 0 && (
                <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {secondaryDebates.map(d => (
                    <div 
                      key={d.id}
                      onClick={() => setCurrentView('community')}
                      className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 cursor-pointer flex items-center space-x-3 transition-colors group"
                    >
                      <img src={d.banner} alt={d.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold text-rose-400 font-mono block truncate">{d.platforms[0]}</span>
                        <h4 className="text-xs font-bold text-white group-hover:text-rose-300 truncate">{d.title}</h4>
                        <span className="text-[10px] text-slate-400">{d.arguments.length} arguments logged</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. Spotify Fandom Music Hub */}
      {homeMusicTracks.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Headphones className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
                  Spotify Fandom Music Hub
                </h2>
                <p className="text-xs text-slate-400">
                  Iconic anime themes, orchestral scores & K-Pop anthems. Stream previews with real audio metrics.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('music')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 group"
            >
              <span>Explore All Tracks ({musicTracks.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeMusicTracks.map(track => {
              const isCurrent = currentPlayingTrack?.track_id === track.track_id;
              const isThisPlaying = isCurrent && isPlaying;
              const isFav = isFavoriteTrack(track.track_id);

              return (
                <div 
                  key={track.track_id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center space-x-3.5 group ${
                    isThisPlaying
                      ? 'bg-purple-950/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                      : 'bg-white/[0.02] border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.05]'
                  }`}
                >
                  {/* Album Cover & Play Button Overlay */}
                  <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shadow-md">
                    <img 
                      src={track.album_cover} 
                      alt={track.track_name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => {
                        if (isCurrent) {
                          togglePlayPause();
                        } else {
                          playTrack(track);
                        }
                      }}
                      className="absolute inset-0 bg-black/40 hover:bg-black/50 flex items-center justify-center transition-all"
                      title={isThisPlaying ? "Pause Preview" : "Play Preview"}
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                        {isThisPlaying ? (
                          <Pause className="w-4 h-4 fill-black" />
                        ) : (
                          <Play className="w-4 h-4 fill-black ml-0.5" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Track Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide truncate">
                        {track.fandom_franchise}
                      </span>
                    </div>

                    <h4 
                      onClick={() => setCurrentView('music')}
                      className="text-xs font-bold text-white hover:text-emerald-300 transition-colors truncate cursor-pointer"
                    >
                      {track.track_name}
                    </h4>
                    
                    <p className="text-[11px] text-slate-400 truncate">
                      {track.artists}
                    </p>

                    <div className="flex items-center space-x-2 mt-1.5 text-[10px] text-slate-400 font-mono">
                      <span>{Math.round(track.tempo)} BPM</span>
                      <span>•</span>
                      <span>{Math.round(track.energy * 100)}% Energy</span>
                      <span>•</span>
                      <span>{track.duration}</span>
                    </div>
                  </div>

                  {/* Like button */}
                  <button
                    onClick={() => toggleFavoriteTrack(track.track_id)}
                    className={`p-2 rounded-xl transition-colors shrink-0 ${
                      isFav ? 'text-pink-500 hover:text-pink-400' : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                    title={isFav ? "Saved to Favorites" : "Add to Favorites"}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-pink-500' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Blockbuster Trailers & Cinema Hub */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
              <Clapperboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
                  Blockbuster Trailers & Cinema
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold uppercase">
                  4K / 60FPS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official theatrical teasers, gameplay reveals, and new season premieres
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full custom-scrollbar">
            {(
              [
                { id: 'all', label: 'All Trailers' },
                { id: 'gaming', label: 'Gaming' },
                { id: 'tv-shows', label: 'TV Shows' },
                { id: 'anime', label: 'Anime' },
                { id: 'movies', label: 'Movies' }
              ] as const
            ).map(tab => {
              const count = tab.id === 'all' 
                ? blockbusterTrailers.length 
                : blockbusterTrailers.filter(t => t.category === tab.id).length;
              const isActive = trailerFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTrailerFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 border border-purple-400/40'
                      : 'glass-panel text-slate-400 hover:text-white border-white/10 hover:border-white/20'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-black/30 text-cyan-200' : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grand Cinema Theater & Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Cinema Player Stage (8 cols on desktop) */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-2xl bg-[#090b10] group">
            
            {/* 16:9 Widescreen Cinema Screen */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {isInlineCinemaPlaying ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`${activeTrailer.embedUrl}${activeTrailer.embedUrl.includes('?') ? '&' : '?'}autoplay=1&enablejsapi=1`}
                    title={activeTrailer.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                  {/* Floating Exit Overlay */}
                  <div className="absolute top-3 right-3 flex items-center space-x-2 z-10">
                    <button
                      onClick={() => setIsInlineCinemaPlaying(false)}
                      className="px-2.5 py-1.5 rounded-lg bg-black/80 hover:bg-red-500/80 text-white border border-white/20 text-xs font-semibold transition-all backdrop-blur-md flex items-center space-x-1.5 shadow-lg"
                      title="Stop playing inline"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Close Video</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setIsInlineCinemaPlaying(true)}
                >
                  {/* High-res 16:9 Poster with zoom on hover */}
                  <img
                    src={activeTrailer.thumbnail}
                    alt={activeTrailer.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Vignette gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-black/40 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent w-full sm:w-2/3" />

                  {/* Top Badges Bar */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/40 backdrop-blur-md text-purple-200 border border-purple-500/50 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        {activeTrailer.category.replace('-', ' ')}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold shadow-sm">
                        {activeTrailer.quality}
                      </span>
                      <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md text-slate-100 border border-white/20 text-[11px] font-medium shadow-sm">
                        {activeTrailer.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-xs font-mono border border-white/15 shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{activeTrailer.duration}</span>
                    </div>
                  </div>

                  {/* Center Play Button Showcase */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                    <div className="relative group/play flex items-center justify-center">
                      <div className="absolute -inset-3 rounded-full bg-cyan-400/25 blur-md animate-pulse" />
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/50 group-hover:scale-110 active:scale-95 transition-all">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      Click to Play Inline • 16:9 Widescreen
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Meta Bar & Quick Controls */}
            <div className="p-4 sm:p-5 space-y-3 bg-[#0a0c13]/90 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-cyan-400 font-mono tracking-wider uppercase">
                      {activeTrailer.studio}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{activeTrailer.year}</span>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="text-xs text-purple-300 font-medium hidden sm:inline">
                      {activeTrailer.franchise}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white tracking-tight font-heading">
                    {activeTrailer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {activeTrailer.synopsis}
                  </p>
                  {activeTrailer.tagline && (
                    <p className="text-xs text-purple-300/90 italic font-serif">
                      "{activeTrailer.tagline}"
                    </p>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 pt-1 sm:pt-0 flex-shrink-0">
                  {isInlineCinemaPlaying ? (
                    <button
                      onClick={() => setIsInlineCinemaPlaying(false)}
                      className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white border border-red-500/40 text-xs font-semibold flex items-center space-x-1.5 transition-all active:scale-95"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Stop Video</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsInlineCinemaPlaying(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center space-x-1.5 transition-all active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Inline</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const clip: MediaClip = {
                        id: `trailer-${activeTrailer.id}`,
                        title: activeTrailer.title,
                        category: activeTrailer.category,
                        type: 'trailer',
                        duration: activeTrailer.duration,
                        thumbnail: activeTrailer.thumbnail,
                        embedUrl: activeTrailer.embedUrl,
                        description: activeTrailer.synopsis,
                        releaseStatus: activeTrailer.status.includes('Upcoming') ? 'upcoming' : 'recently-released',
                        authorOrHost: activeTrailer.studio
                      };
                      setSelectedVideoClip(clip);
                    }}
                    className="px-3.5 py-2 rounded-xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 text-xs font-medium flex items-center space-x-1.5 transition-all active:scale-95"
                    title="Open Fullscreen Cinema Player (Press Esc to Leave)"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Fullscreen</span>
                  </button>

                  <button
                    onClick={() => {
                      const target = mediaList.find(m => m.id === activeTrailer.mediaId);
                      if (target) setSelectedMedia(target);
                    }}
                    className="px-3 py-2 rounded-xl glass-panel hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 border border-purple-500/30 text-xs font-medium flex items-center space-x-1 transition-all"
                    title="View Franchise Hub & Community"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Hub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Playlist Queue (4 cols on desktop) */}
          <div className="lg:col-span-4 rounded-2xl glass-panel border border-white/15 p-4 space-y-3.5 bg-[#0a0c13]/80">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center space-x-2">
                <ListVideo className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold text-white tracking-wide uppercase font-heading">
                  Trailer Queue
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 font-semibold border border-white/10">
                {filteredTrailers.length} Selected
              </span>
            </div>

            {/* Scrollable Trailer Cards */}
            <div className="space-y-2.5 overflow-y-auto max-h-[460px] lg:max-h-[500px] pr-1.5 custom-scrollbar">
              {filteredTrailers.map(trailer => {
                const isActive = trailer.id === activeTrailerId;
                return (
                  <div
                    key={trailer.id}
                    onClick={() => {
                      setActiveTrailerId(trailer.id);
                    }}
                    className={`p-2 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/25 to-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-500/10'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    {/* 16:9 Thumbnail */}
                    <div className="relative w-24 sm:w-28 aspect-video rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 border border-white/10">
                      <img
                        src={trailer.thumbnail}
                        alt={trailer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 flex items-center justify-center transition-all ${
                        isActive ? 'bg-black/25' : 'bg-black/40 group-hover:bg-black/20'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                          isActive 
                            ? 'bg-cyan-400 text-black scale-100 shadow-md shadow-cyan-400/50' 
                            : 'bg-black/70 text-white group-hover:scale-110'
                        }`}>
                          <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono px-1 py-0.2 rounded bg-black/85 text-white">
                        {trailer.duration}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded font-mono ${
                          isActive 
                            ? 'bg-cyan-400/25 text-cyan-200 border border-cyan-400/30' 
                            : 'bg-white/10 text-slate-400'
                        }`}>
                          {trailer.category.replace('-', ' ')}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center space-x-1 text-[9px] font-bold text-cyan-400 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                            <span>Playing</span>
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-bold line-clamp-1 leading-snug transition-colors ${
                        isActive ? 'text-white font-extrabold' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {trailer.franchise}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">
                        {trailer.studio} • {trailer.year}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Queue Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">GTA VI, Blacklist, Mentalist & more</span>
              <span className="text-cyan-400 font-mono text-[10px] flex-shrink-0">Official 4K</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Long-Form Articles */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
              Featured Articles & News
            </h2>
            <p className="text-xs text-slate-400">
              Thoughtful deep dives and analysis from industry journalists and fandom critics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topArticles.map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group p-4 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/50 cursor-pointer flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                  <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/80 text-white backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <img src={article.authorAvatar} alt={article.author} className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-[11px] text-slate-300 font-medium truncate max-w-[120px]">{article.author}</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Popular Characters Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
              Popular Characters & Icons
            </h2>
            <p className="text-xs text-slate-400">
              Explore profiles, traits, abilities, and memorable lore quotes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {topCharacters.map(char => (
            <div
              key={char.id}
              onClick={() => setSelectedCharacter(char)}
              className="group p-3 rounded-2xl glass-card border border-white/10 hover:border-purple-400/50 cursor-pointer text-center space-y-2.5 transition-all hover:scale-105"
            >
              <img
                src={char.image}
                alt={char.name}
                className="w-20 h-20 mx-auto rounded-full object-cover ring-2 ring-purple-500/40 group-hover:ring-cyan-400 transition-all shadow-lg"
              />
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 truncate">
                  {char.name}
                </h4>
                <p className="text-[10px] text-purple-400 truncate font-mono">{char.series}</p>
                <span className="text-[9px] text-slate-400 uppercase font-semibold">{char.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Merchandise Spotlight Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
                Featured Merchandise
              </h2>
              <p className="text-xs text-slate-400">
                Officially licensed apparel, collector statues, and plushies with temporary cart calculation
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('merchandise')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 group"
          >
            <span>Visit Store</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredMerch.map(item => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/50 flex flex-col justify-between space-y-3 transition-all"
            >
              <div className="space-y-2">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.badge && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-cyan-300 border border-cyan-400/30">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">
                    {item.franchise} • {item.itemType}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{item.description}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all active:scale-95"
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Live Community Stats Banner */}
      <section className="p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">
              {visitorCount.toLocaleString()}
            </span>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Live Visitors</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">
              7 Fandoms
            </span>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Unified Categories</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
              35+
            </span>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Character Profiles</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              21+
            </span>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Global Events</p>
          </div>
        </div>
      </section>

    </div>
  );
};
