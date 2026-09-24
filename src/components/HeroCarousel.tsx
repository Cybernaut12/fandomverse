import React, { useState, useEffect } from 'react';
import { Play, Compass, ChevronLeft, ChevronRight, Bookmark, Star, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { MediaItem } from '../types';

export const HeroCarousel: React.FC = () => {
  const { 
    mediaList, 
    setSelectedMedia, 
    setSelectedVideoClip, 
    audioClips, 
    toggleBookmark, 
    isBookmarked,
    navigateToCategory
  } = useApp();

  // Find top featured items
  const featuredItems = mediaList.filter(item => item.featured).slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (featuredItems.length || 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredItems.length, isPaused]);

  if (!featuredItems.length) return null;

  const currentItem = featuredItems[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % featuredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const handleWatchTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    const clip = {
      id: `trailer-${currentItem.id}`,
      title: `${currentItem.title} – Official Trailer`,
      category: currentItem.category,
      type: 'trailer' as const,
      duration: '2:30',
      thumbnail: currentItem.bannerImage || currentItem.coverImage,
      embedUrl: currentItem.trailerUrl || 'https://www.youtube.com/embed/S8_YwFLCh4U',
      description: currentItem.synopsis,
      releaseStatus: 'recently-released' as const
    };
    setSelectedVideoClip(clip);
  };

  return (
    <div 
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] rounded-2xl overflow-hidden glass-panel border border-white/10 group select-none transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Banner with gradient vignette */}
      <div className="absolute inset-0">
        <img
          src={currentItem.bannerImage}
          alt={currentItem.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = currentItem.coverImage;
          }}
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.08] transition-all duration-1000 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090d] via-[#08090d]/80 to-transparent w-full lg:w-2/3" />
        <div className="absolute inset-0 bg-radial-at-t from-purple-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-between py-10">
        
        {/* Top Badges */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="uppercase tracking-wider">Featured Fandom</span>
          </span>
          <span 
            onClick={() => navigateToCategory(currentItem.category)}
            className="cursor-pointer text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors uppercase tracking-wider"
          >
            {currentItem.category.replace('-', ' ')}
          </span>
        </div>

        {/* Hero Central / Lower Content */}
        <div className="max-w-2xl space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight drop-shadow-md">
              Stories for Every World.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal tracking-wide">
              Movies. Series. Anime. Manga. Games. Discover. Track. Collect. Belong.
            </p>
          </div>

          {/* Current Title Spotlight */}
          <div className="pt-2 pb-1 space-y-2 border-l-2 border-cyan-400/80 pl-4 bg-white/[0.02] rounded-r-lg">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono tracking-wider text-cyan-400 uppercase font-semibold">
                Spotlight: {currentItem.title}
              </span>
              <div className="flex items-center space-x-1 text-amber-400 text-xs font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{currentItem.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2 italic">
              "{currentItem.quote || currentItem.synopsis}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSelectedMedia(currentItem)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center space-x-2 transform active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Now</span>
            </button>

            <button
              onClick={handleWatchTrailer}
              className="px-5 py-3 rounded-xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-white/10 transition-all flex items-center space-x-2"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Watch Trailer</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(currentItem.id);
              }}
              className={`p-3 rounded-xl border transition-all ${
                isBookmarked(currentItem.id)
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'glass-panel text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
              title="Bookmark for later"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked(currentItem.id) ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Carousel Controls (1/5 < >) */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center space-x-2">
            {featuredItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-cyan-400 shadow-sm shadow-cyan-400/50' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-300 font-mono">
            <span>
              <strong className="text-white">{currentIndex + 1}</strong> / {featuredItems.length}
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
