import React, { useRef, useState } from 'react';
import { Flame, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MediaCard } from './MediaCard';
export const TrendingContinuousScroller = () => {
    const { mediaList, setCurrentView } = useApp();
    const scrollerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    // Filter trending items or use top-rated
    const trendingItems = mediaList.filter(item => item.trending);
    const displayItems = trendingItems.length > 0 ? trendingItems : mediaList.slice(0, 10);
    // Duplicate for seamless infinite loop
    const duplicatedList = [...displayItems, ...displayItems];
    const scrollLeft = () => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };
    const scrollRight = () => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };
    return (<section className="space-y-5 select-none">
      
      {/* Header with Title and Scroll Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-[#e8a87c]/15 text-[#e8a87c] border border-[#e8a87c]/25 shadow-lg shadow-[#e8a87c]/10">
            <Flame className="w-5 h-5 fill-[#e8a87c]"/>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
                Trending This Week
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e8a87c]/20 text-[#e8a87c] border border-[#e8a87c]/30 font-bold uppercase tracking-wider">
                Live Feed
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Most engaged titles across anime, movies, TV, and gaming — continuous stream
            </p>
          </div>
        </div>

        {/* Action and Scroll Nav Controls */}
        <div className="flex items-center space-x-3 self-end sm:self-auto">
          {/* Pause / Play Toggle */}
          <button onClick={() => setIsPaused(prev => !prev)} className="p-2 rounded-xl bg-white/5 hover:bg-[#e8a87c]/20 text-slate-300 hover:text-[#e8a87c] border border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-medium" title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"} aria-label="Toggle auto-scroll">
            {isPaused ? (<>
                <Play className="w-3.5 h-3.5 fill-current text-[#e8a87c]"/>
                <span className="hidden md:inline text-[11px]">Resume</span>
              </>) : (<>
                <Pause className="w-3.5 h-3.5 text-slate-300"/>
                <span className="hidden md:inline text-[11px]">Pause</span>
              </>)}
          </button>

          {/* Left / Right Manual Buttons */}
          <div className="flex items-center space-x-1.5">
            <button onClick={scrollLeft} className="p-2 rounded-xl bg-white/5 hover:bg-[#e8a87c]/20 text-slate-300 hover:text-[#e8a87c] border border-white/10 transition-colors active:scale-95" aria-label="Scroll left">
              <ChevronLeft className="w-4 h-4"/>
            </button>
            <button onClick={scrollRight} className="p-2 rounded-xl bg-white/5 hover:bg-[#e8a87c]/20 text-slate-300 hover:text-[#e8a87c] border border-white/10 transition-colors active:scale-95" aria-label="Scroll right">
              <ChevronRight className="w-4 h-4"/>
            </button>
          </div>

          <button onClick={() => setCurrentView('discover')} className="text-xs font-semibold text-[#e8a87c] hover:text-[#f5d1ba] flex items-center space-x-1 group pl-2 border-l border-white/10">
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"/>
          </button>
        </div>
      </div>

      {/* Scroller Viewport with Gradient Fade Edges */}
      <div className="relative overflow-hidden group/scroller rounded-2xl" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {/* Left Fade Vignette */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#08090d] via-[#08090d]/80 to-transparent z-20 pointer-events-none"/>
        
        {/* Right Fade Vignette */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#08090d] via-[#08090d]/80 to-transparent z-20 pointer-events-none"/>

        {/* Infinite Continuous Track */}
        <div ref={scrollerRef} className="flex space-x-4 py-2 overflow-x-auto scrollbar-none" style={{ scrollBehavior: 'smooth' }}>
          <div className="flex space-x-4" style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marqueeScroll 90s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
        }}>
            {duplicatedList.map((item, index) => {
            const rank = (index % displayItems.length) + 1;
            return (<div key={`${item.id}-${index}`} className="w-48 sm:w-56 shrink-0 relative transition-transform duration-300 hover:scale-[1.03] z-10">
                  <MediaCard item={item} rank={rank}/>
                </div>);
        })}
          </div>
        </div>
      </div>

    </section>);
};
