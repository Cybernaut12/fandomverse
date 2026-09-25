import React, { useState } from 'react';
import { Search, Sparkles, Star, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MediaCard } from '../components/MediaCard';
export const DiscoverView = () => {
    const { mediaList, setSelectedMedia, navigateToCategory } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedRating, setSelectedRating] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');
    // Featured Discover cards (Screen 2: Arcane, Spider-Verse, Frieren)
    const discoverFeatured = mediaList.filter(m => m.id === 'arcane' || m.id === 'spider-man-spider-verse' || m.id === 'frieren-beyond-journeys-end');
    // Hidden gems (Screen 2: Pluto, Vinland Saga, Erased, Cyberpunk Edgerunners, Monster)
    const hiddenGems = mediaList.filter(m => m.hiddenGem || m.rating >= 8.5).slice(0, 5);
    // Filter media
    const filteredItems = mediaList.filter(item => {
        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matches = item.title.toLowerCase().includes(q) ||
                (item.originalTitle && item.originalTitle.toLowerCase().includes(q)) ||
                item.genres.some(g => g.toLowerCase().includes(q)) ||
                item.tags.some(t => t.toLowerCase().includes(q));
            if (!matches)
                return false;
        }
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
            return false;
        }
        // Genre filter
        if (selectedGenre !== 'all' && !item.genres.map(g => g.toLowerCase()).includes(selectedGenre.toLowerCase())) {
            return false;
        }
        // Year filter
        if (selectedYear !== 'all') {
            if (selectedYear === '2024' && item.year !== 2024)
                return false;
            if (selectedYear === '2023' && item.year !== 2023)
                return false;
            if (selectedYear === 'classic' && item.year > 2000)
                return false;
        }
        // Rating filter
        if (selectedRating !== 'all') {
            const minRating = parseFloat(selectedRating);
            if (item.rating < minRating)
                return false;
        }
        return true;
    });
    // Sorting
    filteredItems.sort((a, b) => {
        if (sortBy === 'rating')
            return b.rating - a.rating;
        if (sortBy === 'newest')
            return b.year - a.year;
        if (sortBy === 'alphabetical')
            return a.title.localeCompare(b.title);
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
    });
    return (<div className="space-y-12 pb-12 animate-in fade-in duration-200">
      
      {/* Discover Header */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-heading">
          Discover
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Explore new worlds, hidden gems, and stories worth your time.
        </p>
      </div>

      {/* Global Discover Search & Filter Controls (Screen 2) */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 shadow-xl space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400"/>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for movies, shows, anime, manga, or games..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"/>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
          
          {/* Category Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
              <option value="all" className="bg-slate-900">All Categories</option>
              <option value="anime" className="bg-slate-900">Anime</option>
              <option value="movies" className="bg-slate-900">Movies</option>
              <option value="tv-shows" className="bg-slate-900">TV Shows</option>
              <option value="gaming" className="bg-slate-900">Gaming</option>
              <option value="manga" className="bg-slate-900">Manga</option>
              <option value="comics" className="bg-slate-900">Comics</option>
              <option value="k-pop" className="bg-slate-900">K-Pop</option>
            </select>
          </div>

          {/* Genre Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Genre</label>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
              <option value="all" className="bg-slate-900">All Genres</option>
              <option value="action" className="bg-slate-900">Action</option>
              <option value="sci-fi" className="bg-slate-900">Sci-Fi</option>
              <option value="fantasy" className="bg-slate-900">Fantasy</option>
              <option value="cyberpunk" className="bg-slate-900">Cyberpunk</option>
              <option value="drama" className="bg-slate-900">Drama</option>
              <option value="mystery" className="bg-slate-900">Mystery</option>
              <option value="shonen" className="bg-slate-900">Shonen</option>
            </select>
          </div>

          {/* Release Year Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Release Year</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
              <option value="all" className="bg-slate-900">All Years</option>
              <option value="2024" className="bg-slate-900">2024</option>
              <option value="2023" className="bg-slate-900">2023</option>
              <option value="classic" className="bg-slate-900">Classic (pre-2000)</option>
            </select>
          </div>

          {/* Rating Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Minimum Rating</label>
            <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
              <option value="all" className="bg-slate-900">Any Rating</option>
              <option value="9.0" className="bg-slate-900">9.0+ Masterpiece</option>
              <option value="8.5" className="bg-slate-900">8.5+ Great</option>
              <option value="8.0" className="bg-slate-900">8.0+ Good</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
              <option value="popularity" className="bg-slate-900">Popularity</option>
              <option value="rating" className="bg-slate-900">Highest Rated</option>
              <option value="newest" className="bg-slate-900">Newest</option>
              <option value="alphabetical" className="bg-slate-900">A - Z</option>
            </select>
          </div>

        </div>
      </div>

      {/* Top Discover Spotlight Trio (Screen 2: Arcane, Spider-Man, Frieren) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400"/>
          <span>Curator's Top Highlights</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {discoverFeatured.map(item => (<div key={item.id} onClick={() => setSelectedMedia(item)} className="group relative rounded-2xl glass-panel border border-white/10 p-4 overflow-hidden cursor-pointer hover:border-cyan-400/50 hover:scale-[1.02] transition-all space-y-3">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                <img src={item.bannerImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-black/70 text-cyan-300 border border-cyan-400/30">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 px-2 py-0.5 rounded bg-black/80 text-amber-400 text-xs font-mono font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400"/>
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {item.synopsis}
                </p>
                <div className="mt-2 text-[11px] font-mono text-slate-500">
                  {item.runtimeOrChapters} • {item.genres.slice(0, 2).join(', ')}
                </div>
              </div>
            </div>))}
        </div>
      </section>

      {/* Hidden Gems Section (Screen 2: Pluto, Vinland Saga, Erased, Cyberpunk, Monster) */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-purple-400"/>
          <h2 className="text-lg font-bold text-white tracking-tight">Hidden Gems</h2>
          <span className="text-xs text-slate-500 font-mono">Stories that deserve your attention</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {hiddenGems.map(item => (<MediaCard key={item.id} item={item} showProgress={false}/>))}
        </div>
      </section>

      {/* Full Filtered Media Catalog Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <h2 className="text-lg font-bold text-white tracking-tight">
            All Catalog Titles ({filteredItems.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Client-side dataset
          </span>
        </div>

        {filteredItems.length === 0 ? (<div className="text-center py-16 text-slate-500 space-y-2">
            <Search className="w-10 h-10 mx-auto text-slate-600"/>
            <p className="text-sm font-semibold text-slate-300">No titles match your filters</p>
            <button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedGenre('all');
                setSelectedYear('all');
                setSelectedRating('all');
            }} className="text-xs text-cyan-400 underline">
              Reset All Filters
            </button>
          </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredItems.map(item => (<MediaCard key={item.id} item={item}/>))}
          </div>)}
      </section>

    </div>);
};
