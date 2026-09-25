import React, { useState } from 'react';
import { Layers, ListTodo, Search, Check, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const CollectionTrackerView = () => {
    const { currentView, setCurrentView, userProfile, userProgress, updateProgressUnits, setProgressStatus, mediaList, setSelectedMedia } = useApp();
    // Mode: 'collection' (Screen 5) vs 'progress' (Screen 6)
    const [activeMode, setActiveMode] = useState(currentView === 'progress' ? 'progress' : 'collection');
    // Collection filters (Screen 5)
    const [collectionCategory, setCollectionCategory] = useState('all');
    const [collectionSearch, setCollectionSearch] = useState('');
    const [collectionSort, setCollectionSort] = useState('recent');
    // Progress status filter (Screen 6)
    const [progressStatusFilter, setProgressStatusFilter] = useState('all');
    // Map progress items to media objects
    const trackedItemsList = Object.entries(userProgress).map(([mediaId, progressVal]) => {
        const progress = progressVal;
        const media = mediaList.find(m => m.id === mediaId) || {
            id: mediaId,
            title: mediaId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
            category: 'anime',
            mediaType: 'anime',
            coverImage: 'https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg',
            bannerImage: 'https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg',
            rating: 9.0,
            year: 2024,
            genres: ['Adventure', 'Action'],
            synopsis: 'Tracking in progress',
            tags: ['Tracked']
        };
        return { media, progress };
    });
    // Calculate status counts for Screen 6 pills
    const statusCounts = {
        all: trackedItemsList.length,
        watching: trackedItemsList.filter(i => i.progress.status === 'watching').length,
        reading: trackedItemsList.filter(i => i.progress.status === 'reading').length,
        playing: trackedItemsList.filter(i => i.progress.status === 'playing').length,
        completed: trackedItemsList.filter(i => i.progress.status === 'completed').length,
        'on-hold': trackedItemsList.filter(i => i.progress.status === 'on-hold').length,
        dropped: trackedItemsList.filter(i => i.progress.status === 'dropped').length,
    };
    // Filtered collection list (Screen 5)
    const filteredCollection = trackedItemsList.filter(({ media, progress }) => {
        if (collectionCategory !== 'all' && media.category !== collectionCategory)
            return false;
        if (collectionSearch.trim()) {
            const q = collectionSearch.toLowerCase();
            if (!media.title.toLowerCase().includes(q))
                return false;
        }
        return true;
    });
    // Filtered progress list (Screen 6)
    const filteredProgress = trackedItemsList.filter(({ progress }) => {
        if (progressStatusFilter !== 'all' && progress.status !== progressStatusFilter)
            return false;
        return true;
    });
    return (<div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header and Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-white/10">
        <div className="flex items-center space-x-4">
          <img src={userProfile.avatar} alt={userProfile.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/50 shadow-xl"/>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-heading">
                {activeMode === 'collection' ? 'My Collection' : 'My Progress'}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                {userProfile.username}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeMode === 'collection'
            ? 'All your movies, shows, anime, manga and games in one place.'
            : 'Track what you watch, read, and play across all your worlds.'}
            </p>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 self-start md:self-auto">
          <button onClick={() => setActiveMode('collection')} className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeMode === 'collection'
            ? 'bg-purple-600 text-white shadow-md'
            : 'text-slate-400 hover:text-white'}`}>
            <Layers className="w-4 h-4"/>
            <span>Collection Grid</span>
          </button>

          <button onClick={() => setActiveMode('progress')} className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeMode === 'progress'
            ? 'bg-cyan-500 text-black font-bold shadow-md'
            : 'text-slate-400 hover:text-white'}`}>
            <ListTodo className="w-4 h-4"/>
            <span>Progress Tracker</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: MY COLLECTION GRID (SCREEN 5) */}
      {/* ========================================================================= */}
      {activeMode === 'collection' && (<div className="space-y-6">
          
          {/* Category Filter Pills (Screen 5: All 426, Movies 120, TV 86, Anime 97, Manga 54, Games 70) */}
          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs">
              {[
                { id: 'all', label: 'All', count: userProfile.itemsCount },
                { id: 'movies', label: 'Movies', count: 120 },
                { id: 'tv-shows', label: 'TV Shows', count: 86 },
                { id: 'anime', label: 'Anime', count: 97 },
                { id: 'manga', label: 'Manga', count: 54 },
                { id: 'gaming', label: 'Games', count: 70 }
            ].map(cat => (<button key={cat.id} onClick={() => setCollectionCategory(cat.id)} className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${collectionCategory === cat.id
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-75 font-mono">({cat.count})</span>
                </button>))}
            </div>

            {/* Search and Sort Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400"/>
                <input type="text" value={collectionSearch} onChange={(e) => setCollectionSearch(e.target.value)} placeholder="Search your collection..." className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"/>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Sort:</span>
                <select value={collectionSort} onChange={(e) => setCollectionSort(e.target.value)} className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
                  <option value="recent">Recently Added</option>
                  <option value="rating">Personal Rating</option>
                  <option value="progress">Progress %</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Collection Grid Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCollection.map(({ media, progress }) => {
                const percent = Math.min(100, Math.round((progress.currentUnits / progress.totalUnits) * 100));
                return (<div key={media.id} onClick={() => setSelectedMedia(media)} className="group rounded-xl glass-card border border-white/10 hover:border-cyan-400/50 cursor-pointer overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.02]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                    <img src={media.coverImage} alt={media.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-300">
                      {progress.status.toUpperCase()}
                    </div>
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] font-bold text-amber-400 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400"/>
                      <span>{progress.personalRating || media.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 truncate">
                        {media.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 uppercase font-mono">{media.category}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>{progress.currentUnits}/{progress.totalUnits} {progress.unitType}</span>
                        <span className="text-cyan-400 font-bold">{percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" style={{ width: `${percent}%` }}/>
                      </div>
                    </div>
                  </div>
                </div>);
            })}
          </div>

        </div>)}

      {/* ========================================================================= */}
      {/* MODE 2: MY PROGRESS TRACKER (SCREEN 6) */}
      {/* ========================================================================= */}
      {activeMode === 'progress' && (<div className="space-y-6">
          
          {/* Status Filter Pills (Screen 6: All, Watching 8, Reading 5, Playing 2, Completed 294, On Hold 12, Dropped 3) */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs pb-1">
            {[
                { id: 'all', label: 'All', count: statusCounts.all },
                { id: 'watching', label: 'Watching', count: statusCounts.watching },
                { id: 'reading', label: 'Reading', count: statusCounts.reading },
                { id: 'playing', label: 'Playing', count: statusCounts.playing },
                { id: 'completed', label: 'Completed', count: statusCounts.completed },
                { id: 'on-hold', label: 'On Hold', count: statusCounts['on-hold'] },
                { id: 'dropped', label: 'Dropped', count: statusCounts.dropped }
            ].map(tab => (<button key={tab.id} onClick={() => setProgressStatusFilter(tab.id)} className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors flex items-center space-x-1.5 ${progressStatusFilter === tab.id
                    ? 'bg-cyan-500 text-black font-bold shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-80 font-mono">({tab.count})</span>
              </button>))}
          </div>

          {/* Progress Rows (Screen 6 format with increment buttons) */}
          <div className="space-y-3">
            {filteredProgress.map(({ media, progress }) => {
                const percent = Math.min(100, Math.round((progress.currentUnits / progress.totalUnits) * 100));
                const statusBadgeColor = {
                    'watching': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
                    'reading': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
                    'playing': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                    'completed': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                    'on-hold': 'text-slate-400 bg-slate-500/10 border-slate-500/20',
                    'dropped': 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                };
                return (<div key={media.id} className="p-4 rounded-xl glass-card border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Poster + Title + Category */}
                  <div className="flex items-center space-x-3.5 cursor-pointer group flex-1" onClick={() => setSelectedMedia(media)}>
                    <img src={media.coverImage} alt={media.title} className="w-12 h-16 rounded-lg object-cover flex-shrink-0"/>
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                          {media.title}
                        </h3>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusBadgeColor[progress.status]}`}>
                          {progress.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 uppercase font-mono">
                        {media.category} • Updated {progress.lastUpdated}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Progress Bar & Unit Counters */}
                  <div className="flex-1 max-w-md space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-semibold">
                        {progress.currentUnits} / {progress.totalUnits} {progress.unitType}
                      </span>
                      <span className="text-cyan-400 font-bold">{percent}%</span>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-300" style={{ width: `${percent}%` }}/>
                    </div>
                  </div>

                  {/* Right: Quick Action Controls */}
                  <div className="flex items-center space-x-2">
                    <button onClick={() => updateProgressUnits(media.id, progress.unitType === 'hours' ? 5 : 1)} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold transition-all">
                      +{progress.unitType === 'hours' ? '5 Hours' : `1 ${progress.unitType.slice(0, -1)}`}
                    </button>

                    <button onClick={() => setProgressStatus(media.id, 'completed')} disabled={progress.status === 'completed'} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors disabled:opacity-30" title="Mark as Completed">
                      <Check className="w-4 h-4 text-emerald-400"/>
                    </button>
                  </div>
                </div>);
            })}
          </div>

        </div>)}

    </div>);
};
