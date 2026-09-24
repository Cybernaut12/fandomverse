import React, { useState, useEffect } from 'react';
import { Search, X, Film, Sparkles, BookOpen, Gamepad2, ShoppingBag, Users, FileText, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { CategoryType } from '../types';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    mediaList, 
    characters, 
    articles, 
    merchandise,
    events,
    setSelectedMedia, 
    setSelectedCharacter,
    setSelectedArticle,
    setCurrentView
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | CategoryType | 'character' | 'article' | 'merch'>('all');

  // Register Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(!isSearchModalOpen);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Filter media
  const matchingMedia = mediaList.filter(item => {
    const matchesQuery = !cleanQuery || 
      item.title.toLowerCase().includes(cleanQuery) ||
      (item.originalTitle && item.originalTitle.toLowerCase().includes(cleanQuery)) ||
      item.genres.some(g => g.toLowerCase().includes(cleanQuery)) ||
      item.tags.some(t => t.toLowerCase().includes(cleanQuery));

    const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
    return matchesQuery && matchesFilter;
  });

  // Filter characters
  const matchingCharacters = (selectedFilter === 'all' || selectedFilter === 'character') 
    ? characters.filter(char => 
        !cleanQuery || 
        char.name.toLowerCase().includes(cleanQuery) || 
        char.series.toLowerCase().includes(cleanQuery) ||
        char.traits.some(t => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  // Filter articles
  const matchingArticles = (selectedFilter === 'all' || selectedFilter === 'article')
    ? articles.filter(art => 
        !cleanQuery ||
        art.title.toLowerCase().includes(cleanQuery) ||
        art.tags.some(t => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  // Filter merchandise
  const matchingMerch = (selectedFilter === 'all' || selectedFilter === 'merch')
    ? merchandise.filter(m => 
        !cleanQuery ||
        m.name.toLowerCase().includes(cleanQuery) ||
        m.franchise.toLowerCase().includes(cleanQuery)
      )
    : [];

  const totalResults = matchingMedia.length + matchingCharacters.length + matchingArticles.length + matchingMerch.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl glass-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-black/40">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search movies, anime, manga, games, characters, merchandise, articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-400 border border-white/10">
            ESC
          </span>
        </div>

        {/* Filter Pills Bar */}
        <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'anime', label: 'Anime' },
            { id: 'movies', label: 'Movies' },
            { id: 'tv-shows', label: 'TV Shows' },
            { id: 'gaming', label: 'Gaming' },
            { id: 'manga', label: 'Manga' },
            { id: 'comics', label: 'Comics' },
            { id: 'k-pop', label: 'K-Pop' },
            { id: 'character', label: 'Characters' },
            { id: 'article', label: 'Articles' },
            { id: 'merch', label: 'Merchandise' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                selectedFilter === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {totalResults === 0 ? (
            <div className="text-center py-16 text-slate-500 space-y-2">
              <Search className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">No matching fandom items found</p>
              <p className="text-xs text-slate-500">Try searching for "One Piece", "Batman", "Solo Leveling", or "Elden Ring"</p>
            </div>
          ) : (
            <>
              {/* Media Results */}
              {matchingMedia.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Titles & Media ({matchingMedia.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingMedia.slice(0, 6).map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setSelectedMedia(item);
                        }}
                        className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-cyan-400/50 cursor-pointer flex items-center space-x-3 group transition-all"
                      >
                        <img src={item.coverImage} alt={item.title} className="w-10 h-14 rounded-md object-cover flex-shrink-0" />
                        <div className="overflow-hidden">
                          <span className="text-[10px] uppercase font-mono text-cyan-400 font-semibold">
                            {item.category} • {item.year}
                          </span>
                          <h5 className="text-xs font-bold text-white group-hover:text-cyan-400 truncate">
                            {item.title}
                          </h5>
                          <p className="text-[11px] text-slate-400">{item.rating} ★ • {item.genres.slice(0, 2).join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Characters Results */}
              {matchingCharacters.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Characters ({matchingCharacters.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingCharacters.slice(0, 4).map(char => (
                      <div
                        key={char.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setSelectedCharacter(char);
                        }}
                        className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-purple-400/50 cursor-pointer flex items-center space-x-3 group transition-all"
                      >
                        <img src={char.image} alt={char.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-500/50 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <span className="text-[10px] uppercase font-mono text-purple-400 font-semibold">
                            {char.role} • {char.series}
                          </span>
                          <h5 className="text-xs font-bold text-white group-hover:text-purple-300 truncate">
                            {char.name}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Merchandise Results */}
              {matchingMerch.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Merchandise ({matchingMerch.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingMerch.slice(0, 4).map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setCurrentView('merchandise');
                        }}
                        className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-emerald-400/50 cursor-pointer flex items-center space-x-3 group transition-all"
                      >
                        <img src={m.image} alt={m.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                        <div className="overflow-hidden flex-1">
                          <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                            {m.name}
                          </h5>
                          <span className="text-[10px] font-mono text-emerald-400">${m.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-slate-500">
          <span>{totalResults} results found across pre-populated client-side catalog</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
