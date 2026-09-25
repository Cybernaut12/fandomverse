import React, { useState, useEffect } from 'react';
import { Star, Bookmark, Play, Film, Tv, Gamepad2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const MediaCard = ({ item, showProgress = true, rank }) => {
    const { setSelectedMedia, toggleBookmark, isBookmarked, userProgress, updateProgressUnits } = useApp();
    const [imgSrc, setImgSrc] = useState(item.coverImage);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        setImgSrc(item.coverImage);
        setHasError(false);
    }, [item.coverImage]);
    const handleImageError = () => {
        if (imgSrc !== item.bannerImage && item.bannerImage) {
            setImgSrc(item.bannerImage);
        }
        else {
            setHasError(true);
        }
    };
    const progress = userProgress[item.id];
    const progressPercent = progress
        ? Math.min(100, Math.round((progress.currentUnits / progress.totalUnits) * 100))
        : 0;
    const categoryColorMap = {
        'anime': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        'gaming': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        'movies': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        'tv-shows': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
        'k-pop': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
        'comics': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
        'manga': 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    };
    const categoryIconMap = {
        'anime': <Sparkles className="w-8 h-8 text-purple-400/80"/>,
        'gaming': <Gamepad2 className="w-8 h-8 text-emerald-400/80"/>,
        'movies': <Film className="w-8 h-8 text-amber-400/80"/>,
        'tv-shows': <Tv className="w-8 h-8 text-sky-400/80"/>,
        'manga': <BookOpen className="w-8 h-8 text-rose-400/80"/>,
        'comics': <Layers className="w-8 h-8 text-indigo-400/80"/>,
        'k-pop': <Sparkles className="w-8 h-8 text-pink-400/80"/>
    };
    return (<div onClick={() => setSelectedMedia(item)} className="group relative rounded-xl glass-card overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/60 border border-white/[0.08] hover:border-white/20">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        {!hasError ? (<img src={imgSrc} alt={item.title} loading="lazy" onError={handleImageError} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter brightness-[0.95]"/>) : (<div className="w-full h-full bg-gradient-to-br from-slate-900 via-[#101423] to-slate-950 flex flex-col items-center justify-center p-4 text-center space-y-2 border-b border-white/5">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
              {categoryIconMap[item.category] || <Film className="w-8 h-8 text-cyan-400"/>}
            </div>
            <span className="text-xs font-bold text-white line-clamp-2 px-2">
              {item.title}
            </span>
            <span className="text-[10px] text-cyan-400/90 font-mono font-semibold uppercase tracking-wider">
              {item.category.replace('-', ' ')}
            </span>
          </div>)}
        
        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-black/30"/>

        {/* Top Badges: Category & Rating */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center space-x-1.5">
            {rank !== undefined && (<span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded-md bg-gradient-to-tr from-[#d5774b] to-[#e8a87c] text-[#0a0a0f] border border-white/20 shadow-md">
                #{rank}
              </span>)}
            <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border backdrop-blur-md shadow-sm ${categoryColorMap[item.category] || 'text-slate-300 bg-slate-800'}`}>
              {item.category.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-amber-400 text-[11px] font-semibold shadow-sm">
            <Star className="w-2.5 h-2.5 fill-amber-400"/>
            <span>{item.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-black flex items-center justify-center shadow-lg shadow-cyan-500/40 transform transition hover:scale-110">
            <Play className="w-5 h-5 fill-black ml-0.5"/>
          </div>
        </div>

        {/* Quick Bookmark Toggle button */}
        <button onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(item.id);
        }} className={`absolute bottom-2.5 right-2.5 p-2 rounded-lg backdrop-blur-md transition-all z-10 ${isBookmarked(item.id)
            ? 'bg-amber-500 text-black shadow-md'
            : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'}`} title={isBookmarked(item.id) ? 'Remove Bookmark' : 'Bookmark Item'}>
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(item.id) ? 'fill-current' : ''}`}/>
        </button>
      </div>

      {/* Card Info Section */}
      <div className="p-3.5 flex flex-col justify-between flex-grow space-y-2">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-1">
            <span>{item.year}</span>
            <span>•</span>
            <span className="truncate">{item.genres.slice(0, 2).join(', ')}</span>
          </div>
        </div>

        {/* Progress Bar (if in user collection and tracked) */}
        {showProgress && progress && (<div className="pt-2 border-t border-white/[0.06] space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="capitalize text-slate-400 font-mono">
                {progress.status}: {progress.currentUnits}/{progress.totalUnits} {progress.unitType}
              </span>
              <span className="text-cyan-400 font-bold font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}/>
            </div>
          </div>)}
      </div>
    </div>);
};
