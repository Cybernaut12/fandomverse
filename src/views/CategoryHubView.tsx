import React, { useState } from 'react';
import { 
  Sparkles, 
  Film, 
  Tv, 
  Gamepad2, 
  BookOpen, 
  Layers, 
  Calendar, 
  Image as ImageIcon, 
  Play, 
  Radio, 
  Users, 
  ShoppingBag, 
  FileText,
  Filter,
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MediaCard } from '../components/MediaCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import type { CategoryType, MediaItem } from '../types';

export const CategoryHubView: React.FC = () => {
  const { 
    activeCategory, 
    setActiveCategory, 
    mediaList, 
    characters, 
    events, 
    articles, 
    merchandise, 
    galleries, 
    audioClips,
    setSelectedMedia, 
    setSelectedCharacter, 
    setSelectedArticle, 
    setSelectedVideoClip,
    setLightboxImage,
    addToCart,
    setCurrentView
  } = useApp();

  const [contentTypeFilter, setContentTypeFilter] = useState<'all' | 'titles' | 'characters' | 'events' | 'galleries' | 'media' | 'articles' | 'merch'>('all');
  const [selectedSubTag, setSelectedSubTag] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'popularity' | 'newest' | 'alphabetical'>('popularity');
  const [cardSize, setCardSize] = useState<'standard' | 'large' | 'compact'>('standard');

  // Filter datasets by active category
  const categoryMedia = mediaList.filter(m => m.category === activeCategory);
  const categoryCharacters = characters.filter(c => c.category === activeCategory);
  const categoryEvents = events.filter(e => e.category === activeCategory);
  const categoryGalleries = galleries.filter(g => g.category === activeCategory);
  const categoryAudioClips = audioClips.filter(a => a.category === activeCategory);
  const categoryArticles = articles.filter(a => a.category === activeCategory);
  const categoryMerchandise = merchandise.filter(m => m.category === activeCategory);

  // Extract all unique sub-tags for this category
  const allSubTags = Array.from(new Set(categoryMedia.flatMap(m => m.tags)));

  // Filter titles by sub-tag
  const filteredTitles = categoryMedia.filter(item => {
    if (selectedSubTag !== 'all' && !item.tags.includes(selectedSubTag)) return false;
    return true;
  });

  // Sort titles
  filteredTitles.sort((a, b) => {
    if (sortOrder === 'newest') return b.year - a.year;
    if (sortOrder === 'alphabetical') return a.title.localeCompare(b.title);
    return b.rating - a.rating;
  });

  const categoryTitlesMap: Record<CategoryType, { name: string; tag: string; icon: React.ReactNode }> = {
    'anime': { name: 'Anime Universe', tag: 'Sakuga animation, legendary heroes & fantastical realms', icon: <Sparkles className="w-6 h-6 text-purple-400" /> },
    'gaming': { name: 'Gaming Portal', tag: 'Masterful RPGs, tactical stealth & untamed open worlds', icon: <Gamepad2 className="w-6 h-6 text-emerald-400" /> },
    'movies': { name: 'Movies & Cinema', tag: 'Epic blockbusters, auteur noir & cinematic spectacles', icon: <Film className="w-6 h-6 text-amber-400" /> },
    'tv-shows': { name: 'TV Shows & Prestige Series', tag: 'Dystopian epics, feudal politics & character drama', icon: <Tv className="w-6 h-6 text-sky-400" /> },
    'manga': { name: 'Manga Archives', tag: 'Serialized weekly shonen, dark seinen & master inkcraft', icon: <BookOpen className="w-6 h-6 text-rose-400" /> },
    'comics': { name: 'Comics & Graphic Novels', tag: 'Iconic multiverses, noir vigilantes & literary graphic arts', icon: <Layers className="w-6 h-6 text-indigo-400" /> },
    'k-pop': { name: 'K-Pop Multiverse', tag: 'Chart-dominating icons, stadium tours & synchronized performances', icon: <Sparkles className="w-6 h-6 text-pink-400" /> }
  };

  const currentCatInfo = categoryTitlesMap[activeCategory];

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-200">
      
      {/* Breadcrumb Navigation (SRS page 14) */}
      <Breadcrumbs 
        items={[
          { label: 'Category Hubs', onClick: () => setCurrentView('discover') },
          { label: currentCatInfo.name, active: true }
        ]} 
      />

      {/* Hub Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-white/10 border border-white/10">
              {currentCatInfo.icon}
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Category Hub • FandomVerse
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-heading">
                {currentCatInfo.name}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentCatInfo.tag}
          </p>

          {/* Quick Hub Stats Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              {categoryMedia.length} Curated Titles
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              {categoryCharacters.length} Character Profiles
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              {categoryEvents.length} Major Events
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              {categoryGalleries.length} Gallery Artworks
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Sorting Toolbar (SRS page 9) */}
      <div className="p-4 rounded-xl glass-card border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Content Type Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Content' },
            { id: 'titles', label: `Titles (${categoryMedia.length})` },
            { id: 'characters', label: `Characters (${categoryCharacters.length})` },
            { id: 'galleries', label: `Galleries (${categoryGalleries.length})` },
            { id: 'media', label: `Audio/Video (${categoryAudioClips.length})` },
            { id: 'events', label: `Events (${categoryEvents.length})` },
            { id: 'articles', label: `Articles (${categoryArticles.length})` },
            { id: 'merch', label: `Merch (${categoryMerchandise.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setContentTypeFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                contentTypeFilter === tab.id
                  ? 'bg-purple-600 text-white font-semibold shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sub-Tag Filter & Sorting */}
        <div className="flex items-center space-x-3 text-xs">
          {allSubTags.length > 0 && (
            <div className="flex items-center space-x-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedSubTag}
                onChange={(e) => setSelectedSubTag(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Sub-Tags</option>
                {allSubTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center space-x-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="popularity">Popularity / Rating</option>
              <option value="newest">Newest First</option>
              <option value="alphabetical">A - Z</option>
            </select>
          </div>
        </div>

      </div>

      {/* SECTION 1: TITLES CATALOG */}
      {(contentTypeFilter === 'all' || contentTypeFilter === 'titles') && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Curated Titles</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 font-mono">
                {filteredTitles.length}
              </span>
            </h2>

            {/* Card Size / Density Switcher */}
            <div className="flex items-center space-x-1.5 self-start sm:self-auto bg-black/40 p-1 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400 pl-2 pr-1 font-medium hidden sm:inline">Size:</span>
              <button
                onClick={() => setCardSize('large')}
                title="Large Poster View"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  cardSize === 'large'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Large
              </button>
              <button
                onClick={() => setCardSize('standard')}
                title="Standard View"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  cardSize === 'standard'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setCardSize('compact')}
                title="Compact Density View"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  cardSize === 'compact'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Compact
              </button>
            </div>
          </div>

          <div className={`grid gap-3 sm:gap-4 transition-all duration-300 ${
            cardSize === 'large'
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
              : cardSize === 'compact'
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'
          }`}>
            {filteredTitles.map(item => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: CHARACTER PROFILES (At least 5 per category as per SRS page 11) */}
      {(contentTypeFilter === 'all' || contentTypeFilter === 'characters') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Character Profiles ({categoryCharacters.length})
              </h2>
              <p className="text-xs text-slate-400">Click any character to view detailed biography, traits, powers & quotes</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {categoryCharacters.map(char => (
              <div
                key={char.id}
                onClick={() => setSelectedCharacter(char)}
                className="group p-3.5 rounded-2xl glass-card border border-white/10 hover:border-purple-400/50 cursor-pointer text-center space-y-3 transition-all hover:scale-105"
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-20 h-20 mx-auto rounded-full object-cover ring-2 ring-purple-500/40 group-hover:ring-cyan-400 transition-all shadow-lg"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10">
                    {char.role}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors mt-1.5 truncate">
                    {char.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">{char.series}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: IMAGE GALLERIES & LIGHTBOX (SRS page 9) */}
      {(contentTypeFilter === 'all' || contentTypeFilter === 'galleries') && categoryGalleries.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>Image Gallery & Artworks ({categoryGalleries.length})</span>
              </h2>
              <p className="text-xs text-slate-400">Click any artwork to open high-res lightbox viewer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryGalleries.map(img => (
              <div
                key={img.id}
                onClick={() => setLightboxImage(img)}
                className="group relative aspect-video rounded-xl overflow-hidden glass-card border border-white/10 cursor-pointer"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5">
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {img.title}
                  </h4>
                  <p className="text-[11px] text-slate-300">{img.franchise} • {img.artistOrStudio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: VIDEOS & AUDIO PODCASTS (SRS page 10) */}
      {(contentTypeFilter === 'all' || contentTypeFilter === 'media') && categoryAudioClips.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <Radio className="w-4 h-4 text-purple-400" />
              <span>
                {activeCategory === 'comics' || activeCategory === 'manga'
                  ? `Spotlights, Previews & Podcasts (${categoryAudioClips.length})`
                  : `Trailers, OSTs & Podcasts (${categoryAudioClips.length})`}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryAudioClips.map(clip => (
              <div
                key={clip.id}
                onClick={() => setSelectedVideoClip(clip)}
                className="p-3.5 rounded-xl glass-card border border-white/10 hover:border-purple-400/50 cursor-pointer flex items-center space-x-3.5 group transition-all"
              >
                <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                  <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-5 h-5 text-cyan-400 fill-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="overflow-hidden space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-purple-400">
                    {clip.type} • {clip.duration}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 truncate">
                    {clip.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{clip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 5: EVENT HIGHLIGHTS (At least 3 per category as per SRS page 11) */}
      {(contentTypeFilter === 'all' || contentTypeFilter === 'events') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Event Highlights ({categoryEvents.length})</span>
              </h2>
              <p className="text-xs text-slate-400">Conventions, premiere watch parties & summits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryEvents.map(evt => (
              <div key={evt.id} className="p-4 rounded-xl glass-card border border-white/10 space-y-3">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                  <img src={evt.bannerImage} alt={evt.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-amber-300 border border-amber-400/30">
                    {evt.badge}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">{evt.date}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{evt.title}</h4>
                  <p className="text-[11px] text-slate-400">{evt.location}</p>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">{evt.description}</p>
                </div>
                {evt.attendeesCount && (
                  <div className="pt-2 border-t border-white/[0.06] text-[10px] text-slate-400 font-mono">
                    Expected: {evt.attendeesCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
