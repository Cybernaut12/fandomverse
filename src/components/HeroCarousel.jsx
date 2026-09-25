import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Play, Bookmark, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
const HERO_SLIDES = [
    {
        id: 'alita-battle-angel',
        title: 'Alita: Battle Angel',
        category: 'Featured Movie',
        categoryType: 'movies',
        excerpt: 'A restored cyborg awakens in Iron City and discovers a destiny built for battle.',
        image: 'https://image.tmdb.org/t/p/original/8RKBHHRqOMOLh5qW3sS6TSFTd8h.jpg',
        trailerUrl: 'https://www.youtube.com/embed/w7pYhpJaJW8',
        rating: 8.4,
    },
    {
        id: 'the-batman',
        title: 'The Batman',
        category: 'Featured Movie',
        categoryType: 'movies',
        excerpt: 'Gotham gets a symbol in Tim Burton\'s dark, electric take on the legendary vigilante.',
        image: 'https://image.tmdb.org/t/p/original/rhc7OF7tC9HPu0X8DBKQJzaGRbu.jpg',
        trailerUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4',
        rating: 8.8,
    },
    {
        id: 'demon-slayer-mugen-train',
        title: 'Demon Slayer: Mugen Train',
        category: 'Featured Anime',
        categoryType: 'anime',
        excerpt: 'Tanjiro and the Demon Slayer Corps board a train for a mission that tests every promise they made.',
        image: 'https://image.tmdb.org/t/p/original/ddPXPozK5AieIJB4Igw2RK0YwTO.jpg',
        trailerUrl: 'https://www.youtube.com/embed/bFwdl2PPPXM',
        rating: 8.9,
    },
    {
        id: 'dune-part-two',
        title: 'Dune: Part Two',
        category: 'Featured Movie',
        categoryType: 'movies',
        excerpt: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        image: '/images/dune-banner.jpg',
        trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
        rating: 8.8,
    },
    {
        id: 'cyberpunk-2077',
        title: 'Cyberpunk 2077',
        category: 'Featured Game',
        categoryType: 'gaming',
        excerpt: 'Enter Night City, a neon-soaked open world where every choice rewrites the legend you become.',
        image: '/images/cyberpunk-banner.jpg',
        trailerUrl: 'https://www.youtube.com/embed/8X2kIfS6fb8',
        rating: 9.3,
    },
];
export const HeroCarousel = () => {
    const { setSelectedVideoClip, navigateToCategory, navigateToMedia, toggleBookmark, isBookmarked, setCurrentView } = useApp();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const featured = HERO_SLIDES[activeIndex];
    useEffect(() => {
        if (isPaused)
            return;
        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
        }, 5500);
        return () => window.clearInterval(timer);
    }, [isPaused]);
    const showPrevious = () => {
        setActiveIndex((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    };
    const showNext = () => {
        setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    };
    const handleWatchTrailer = (e) => {
        e.stopPropagation();
        setSelectedVideoClip({
            id: `trailer-${featured.id}`,
            title: `${featured.title} – Official Trailer`,
            category: featured.categoryType,
            type: 'trailer',
            duration: '2:30',
            thumbnail: featured.image,
            embedUrl: featured.trailerUrl,
            description: featured.excerpt,
            releaseStatus: 'recently-released'
        });
    };
    const handleOpenMedia = () => {
        navigateToMedia(featured.id);
    };
    return (<section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] rounded-3xl overflow-hidden border border-white/10 flex items-end select-none group shadow-2xl bg-[#050609]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Background Images with Crossfade and Subtle Zoom */}
      {HERO_SLIDES.map((slide, idx) => (<div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out" fetchPriority={idx === 0 ? 'high' : 'auto'}/>
        </div>))}

      {/* Cinematic Vignette Gradients matching the pull */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050609]/95 via-[#050609]/65 to-transparent pointer-events-none"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050609] via-transparent to-[#050609]/40 pointer-events-none"/>
      <div className="absolute inset-0 bg-radial-at-t from-[#e8a87c]/10 via-transparent to-transparent pointer-events-none"/>

      {/* Hero Content Shell */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-8 sm:pb-12 pt-16 sm:pt-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Column: Display Title, Subtitle & Primary CTAs */}
          <div className="lg:col-span-8 max-w-2xl space-y-4 sm:space-y-6">
            
            {/* Top Category Tag */}
            <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#e8a87c] font-semibold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e8a87c]"/>
              <span>{featured.category}</span>
            </p>

            {/* Display Heading: "Stories for Every World." */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#f5f0ea] leading-[0.95] tracking-tight drop-shadow-xl">
              Stories<br />
              for Every<br />
              <span className="text-[#e8a87c] drop-shadow-[0_0_25px_rgba(232,168,124,0.35)]">
                World.
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xs sm:text-sm md:text-base text-slate-300/90 max-w-lg leading-relaxed font-light">
              Movies. Series. Anime. Manga. Games. Discover, track, collect, belong.
            </p>

            {/* CTA Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button onClick={() => {
            const elem = document.getElementById('featured-coverflow');
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
            }
            else {
                setCurrentView('discover');
            }
        }} className="inline-flex items-center gap-2 bg-[#e8a87c] hover:bg-[#f0b992] text-[#0a0a0f] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[#e8a87c]/20 hover:shadow-[#e8a87c]/35 transform active:scale-95">
                <span>Explore Now</span>
                <ArrowRight className="w-4 h-4"/>
              </button>

              <button onClick={handleWatchTrailer} className="inline-flex items-center gap-2 text-[#f5f0ea] hover:text-[#e8a87c] text-xs sm:text-sm font-medium px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-white/15 hover:border-[#e8a87c]/40 bg-black/40 backdrop-blur-md transition-all group/btn">
                <span className="w-6 h-6 rounded-full border border-white/30 group-hover/btn:border-[#e8a87c] flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5"/>
                </span>
                <span>Watch Trailer</span>
              </button>

              <button onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(featured.id);
        }} className={`p-2.5 sm:p-3 rounded-xl border transition-all ${isBookmarked(featured.id)
            ? 'bg-[#e8a87c]/20 text-[#e8a87c] border-[#e8a87c]/40'
            : 'bg-black/40 text-slate-300 hover:text-white border-white/15 hover:bg-white/10'}`} title="Bookmark for later" aria-label="Bookmark featured item">
                <Bookmark className={`w-4 h-4 ${isBookmarked(featured.id) ? 'fill-[#e8a87c]' : ''}`}/>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Featured Meta Panel with Divider */}
          <div className="lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-8 pb-1 space-y-3">
            
            <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#e8a87c]">
              {featured.category}
            </p>

            <button onClick={handleOpenMedia} className="text-left group/title block">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#f5f0ea] group-hover/title:text-[#e8a87c] leading-tight transition-colors line-clamp-2">
                {featured.title}
              </h2>
            </button>

            <p className="text-xs sm:text-sm text-slate-300/80 line-clamp-2 leading-relaxed">
              {featured.excerpt}
            </p>

            {/* Counter and Slide Navigation Arrows */}
            <div className="flex items-center justify-between pt-3 text-slate-300/80">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e8a87c]">
                0{activeIndex + 1} / 0{HERO_SLIDES.length}
              </span>
              
              <div className="flex items-center space-x-2">
                <button type="button" onClick={showPrevious} className="p-2 rounded-lg bg-black/40 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-[#e8a87c] transition-colors" aria-label="Previous hero slide">
                  <ArrowLeft className="w-4 h-4"/>
                </button>
                <button type="button" onClick={showNext} className="p-2 rounded-lg bg-black/40 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-[#e8a87c] transition-colors" aria-label="Next hero slide">
                  <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Slide Indicator Dashes */}
        <div className="pt-6 sm:pt-8 flex items-center space-x-2" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((slide, index) => (<button key={slide.id} type="button" onClick={() => setActiveIndex(index)} className={`h-1 rounded-full transition-all duration-300 ${index === activeIndex
                ? 'w-10 bg-[#e8a87c] shadow-sm shadow-[#e8a87c]/50'
                : 'w-3 bg-white/25 hover:bg-white/50'}`} aria-label={`Show ${slide.title}`} aria-selected={index === activeIndex} role="tab"/>))}
        </div>

      </div>
    </section>);
};
