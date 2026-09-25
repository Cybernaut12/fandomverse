import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Compass, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const FeaturedFandomsCoverflow = () => {
    const { mediaList, setSelectedMedia, navigateToCategory } = useApp();
    // Curated landmark titles with authentic high-resolution imagery and verified fallbacks
    const featuredCards = [
        {
            id: 'featured-dune',
            title: 'Dune: Part Two',
            location: 'Arrakis, Southern Erg Desert',
            category: 'movies',
            categoryLabel: 'Cinema',
            description: 'Paul Atreides unites with Chani and the Fremen while seeking vengeance against the conspirators who destroyed his family in a vast galactic holy war.',
            image: 'https://image.tmdb.org/t/p/w1280/eZ239CUp1d6OryZEBPnO2n87gMG.jpg',
            fallbackImage: 'https://image.tmdb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg',
            stats: {
                label1: 'Format',
                val1: 'IMAX 70mm',
                label2: 'Global Box',
                val2: '$714M',
                label3: 'Audience',
                val3: '9.8 ★'
            },
            highlightBadge: 'Denis Villeneuve Era',
            mediaIdMatch: 'dune-part-two'
        },
        {
            id: 'featured-elden-ring',
            title: 'Elden Ring: Shadow of the Erdtree',
            location: 'The Lands Between, Realm of Shadow',
            category: 'gaming',
            categoryLabel: 'Gaming',
            description: 'Guided by Empyrean Miquella, Tarnished step into the Land of Shadow to unravel the dark history of Queen Marika and conquer colossal demi-gods.',
            image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg',
            fallbackImage: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
            stats: {
                label1: 'Scope',
                val1: '80+ Hrs',
                label2: 'Fandom Hype',
                val2: '99°',
                label3: 'Critic Score',
                val3: '9.8 ★'
            },
            highlightBadge: 'GOTY Masterpiece',
            mediaIdMatch: 'elden-ring'
        },
        {
            id: 'featured-spider-verse',
            title: 'Spider-Man: Across the Spider-Verse',
            location: 'Earth-1610 / Nueva York, Multiverse',
            category: 'movies',
            categoryLabel: 'Animation',
            description: 'Miles Morales catapults across parallel dimensions, clashing with Miguel O\'Hara and the Spider-Society to save the people he loves most.',
            image: 'https://image.tmdb.org/t/p/w1280/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg',
            fallbackImage: 'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
            stats: {
                label1: 'Multiverse',
                val1: '240+ Spiders',
                label2: 'Visuals',
                val2: '6 Art Styles',
                label3: 'Rating',
                val3: '9.9 ★'
            },
            highlightBadge: 'Oscar Nominee',
            mediaIdMatch: 'spider-man-spider-verse'
        },
        {
            id: 'featured-cyberpunk',
            title: 'Cyberpunk 2077: Phantom Liberty',
            location: 'Dogtown, Night City Sprawl',
            category: 'gaming',
            categoryLabel: 'Gaming',
            description: 'Infiltrate the walled lawless enclave of Dogtown in a high-stakes spy thriller alongside FIA agent Solomon Reed and songstress Songbird.',
            image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg',
            fallbackImage: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
            stats: {
                label1: 'Campaign',
                val1: 'Phantom Lib.',
                label2: 'Setting',
                val2: 'Night City 2.1',
                label3: 'Rating',
                val3: '9.5 ★'
            },
            highlightBadge: 'Ultimate Edition',
            mediaIdMatch: 'cyberpunk-2077'
        },
        {
            id: 'featured-solo-leveling',
            title: 'Solo Leveling: Arise',
            location: 'Seoul, Double Dungeon Gate',
            category: 'manga',
            categoryLabel: 'Anime / Webtoon',
            description: 'Weakest E-rank hunter Sung Jinwoo awakens a mysterious quest system that grants him the unique ability to level up infinitely and summon the Shadow Army.',
            image: 'https://image.tmdb.org/t/p/w1280/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
            fallbackImage: 'https://cdn.myanimelist.net/images/anime/1066/141019l.jpg',
            stats: {
                label1: 'Hunter Rank',
                val1: 'Shadow Monarch',
                label2: 'Global Reads',
                val2: '14B+ Views',
                label3: 'Score',
                val3: '9.6 ★'
            },
            highlightBadge: 'Global Sensation',
            mediaIdMatch: 'solo-leveling'
        },
        {
            id: 'featured-the-batman',
            title: 'The Batman',
            location: 'Gotham City, Rain-Soaked Alleys',
            category: 'movies',
            categoryLabel: 'Cinema / Noir',
            description: 'Two years of stalking the streets as the Batman leads Bruce Wayne deep into the criminal underbelly of Gotham to unmask the sadistic Riddler.',
            image: 'https://image.tmdb.org/t/p/w1280/rvtdN5XkWAfGX6xDuPL6yYS2seK.jpg',
            fallbackImage: 'https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg',
            stats: {
                label1: 'Runtime',
                val1: '2h 56m',
                label2: 'Soundtrack',
                val2: 'Nirvana / Giacchino',
                label3: 'Score',
                val3: '9.5 ★'
            },
            highlightBadge: 'Matt Reeves Saga',
            mediaIdMatch: 'the-batman'
        }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const total = featuredCards.length;
    const nextSlide = () => {
        setActiveIndex(prev => (prev + 1) % total);
    };
    const prevSlide = () => {
        setActiveIndex(prev => (prev - 1 + total) % total);
    };
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft')
                prevSlide();
            if (e.key === 'ArrowRight')
                nextSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    const handleCardClick = (idx, card) => {
        if (idx !== activeIndex) {
            setActiveIndex(idx);
        }
        else {
            if (card.mediaIdMatch) {
                const found = mediaList.find(m => m.id === card.mediaIdMatch);
                if (found) {
                    setSelectedMedia(found);
                    return;
                }
            }
            navigateToCategory(card.category);
        }
    };
    return (<section id="featured-coverflow" className="relative space-y-6 pt-6 pb-12 overflow-hidden scroll-mt-24 select-none">
      
      {/* Background Ambient Radial Glow (Accent: #e8a87c) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090d] via-[#12141f]/70 to-[#08090d] pointer-events-none"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#e8a87c]/15 blur-[150px] rounded-full pointer-events-none"/>

      {/* Header with Title and Nav Controls */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-[#e8a87c]/15 text-[#e8a87c] border border-[#e8a87c]/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm shadow-[#e8a87c]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#e8a87c]"/>
              <span>Spotlight Realms</span>
            </span>
            <span className="text-[11px] font-mono text-[#e8a87c]/80 uppercase tracking-widest hidden sm:inline">
              Curated Showcase
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-heading">
            Featured Across the <span className="text-[#e8a87c] drop-shadow-[0_0_25px_rgba(232,168,124,0.35)]">Fandoms</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A story to read, a trailer to catch, and iconic worlds to explore across 6 premier realms
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center space-x-3 self-end sm:self-auto">
          <div className="text-xs font-mono text-[#e8a87c] font-bold mr-2">
            0{activeIndex + 1} / 0{total}
          </div>
          <button onClick={prevSlide} className="p-3 rounded-full bg-[#131520] hover:bg-[#e8a87c] text-[#e8a87c] hover:text-[#0a0a0f] border border-[#e8a87c]/30 hover:border-[#e8a87c] transition-all duration-200 active:scale-95 shadow-lg shadow-[#e8a87c]/10" aria-label="Previous realm" title="Previous (Left Arrow)">
            <ChevronLeft className="w-5 h-5"/>
          </button>
          <button onClick={nextSlide} className="p-3 rounded-full bg-[#131520] hover:bg-[#e8a87c] text-[#e8a87c] hover:text-[#0a0a0f] border border-[#e8a87c]/30 hover:border-[#e8a87c] transition-all duration-200 active:scale-95 shadow-lg shadow-[#e8a87c]/10" aria-label="Next realm" title="Next (Right Arrow)">
            <ChevronRight className="w-5 h-5"/>
          </button>
        </div>
      </div>

      {/* 3D Overlapping Coverflow Stack Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 flex items-center justify-center min-h-[560px] sm:min-h-[600px] z-10 overflow-hidden py-6">
        <div className="relative w-full flex items-center justify-center">
          {featuredCards.map((card, idx) => {
            // Calculate relative offset distance from active center card (-2, -1, 0, 1, 2)
            let offset = idx - activeIndex;
            if (offset < -Math.floor(total / 2))
                offset += total;
            if (offset > Math.floor(total / 2))
                offset -= total;
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible)
                return null;
            // Coordinate offsets to recreate the exact overlapping fan stack
            let translateX = 0;
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;
            let rotate = 0;
            if (isCenter) {
                translateX = 0;
                scale = 1.05;
                zIndex = 40;
                opacity = 1;
                rotate = 0;
            }
            else if (offset === -1) {
                translateX = -180;
                scale = 0.90;
                zIndex = 30;
                opacity = 0.88;
                rotate = -3;
            }
            else if (offset === 1) {
                translateX = 180;
                scale = 0.90;
                zIndex = 30;
                opacity = 0.88;
                rotate = 3;
            }
            else if (offset === -2) {
                translateX = -340;
                scale = 0.78;
                zIndex = 20;
                opacity = 0.55;
                rotate = -5;
            }
            else if (offset === 2) {
                translateX = 340;
                scale = 0.78;
                zIndex = 20;
                opacity = 0.55;
                rotate = 5;
            }
            return (<div key={card.id} onClick={() => handleCardClick(idx, card)} style={{
                    transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
                    zIndex: zIndex,
                    opacity: opacity
                }} className="absolute transition-all duration-500 ease-out cursor-pointer select-none origin-bottom">
                {/* Physical Card Container: Dark Obsidian with Rich Copper Accent (theme: #e8a87c) */}
                <div className={`w-[295px] sm:w-[335px] md:w-[360px] rounded-[32px] p-3.5 transition-all duration-300 ${isCenter
                    ? 'bg-[#141624] ring-2 ring-[#e8a87c] shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(232,168,124,0.3)] border border-[#e8a87c]/40'
                    : 'bg-[#10121c]/95 border border-[#e8a87c]/20 hover:border-[#e8a87c]/50 hover:brightness-110 shadow-2xl'}`}>
                  
                  {/* Top Photographic Scenic Artwork with Reliable Fallback */}
                  <div className="relative w-full aspect-[16/10.5] rounded-[24px] overflow-hidden bg-[#090a10] shadow-inner">
                    <img src={card.image} alt={card.title} onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = card.fallbackImage;
                    }
                }} className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.96] transition-transform duration-700 hover:scale-105" loading="lazy"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141624]/90 via-transparent to-black/30 pointer-events-none"/>
                    
                    {/* Top Category Badge in Accent (#e8a87c) */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#e8a87c] text-[#0a0a0f] text-[10px] font-mono font-black uppercase tracking-wider shadow-lg shadow-[#e8a87c]/30">
                        {card.categoryLabel}
                      </span>
                    </div>

                    {/* Top Right Rating Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/85 border border-[#e8a87c]/40 text-[#e8a87c] text-[11px] font-mono font-bold shadow-md flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-[#e8a87c] text-[#e8a87c]"/>
                        <span>{card.stats.val3.replace(' ★', '')}</span>
                      </span>
                    </div>
                  </div>

                  {/* Middle Content Section */}
                  <div className="px-3 pt-3.5 pb-2 space-y-3">
                    <div>
                      <h3 className="text-lg font-black text-[#f5f0ea] hover:text-[#e8a87c] tracking-tight leading-snug line-clamp-1 transition-colors">
                        {card.title}
                      </h3>
                      <div className="flex items-center text-[11px] font-medium text-slate-300 gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#e8a87c] flex-shrink-0"/>
                        <span className="truncate">{card.location}</span>
                      </div>
                    </div>

                    {/* Description Section */}
                    <div>
                      <span className="text-[10px] font-bold text-[#e8a87c]/80 uppercase tracking-wider block">
                        Realm Lore
                      </span>
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mt-0.5">
                        {card.description}
                      </p>
                    </div>

                    {/* 3-Column Stats Row in Theme (#e8a87c) */}
                    <div className="grid grid-cols-3 gap-1.5 py-2.5 px-3 bg-[#0a0c14]/90 rounded-2xl border border-[#e8a87c]/25 text-center shadow-inner">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                          {card.stats.label1}
                        </span>
                        <span className="text-xs font-black text-[#e8a87c] font-mono tracking-tight drop-shadow-[0_0_6px_rgba(232,168,124,0.3)]">
                          {card.stats.val1}
                        </span>
                      </div>
                      <div className="border-x border-white/10 px-1">
                        <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                          {card.stats.label2}
                        </span>
                        <span className="text-xs font-black text-[#e8a87c] font-mono tracking-tight drop-shadow-[0_0_6px_rgba(232,168,124,0.3)]">
                          {card.stats.val2}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                          {card.stats.label3}
                        </span>
                        <span className="text-xs font-black text-[#e8a87c] font-mono tracking-tight drop-shadow-[0_0_6px_rgba(232,168,124,0.3)]">
                          {card.stats.val3}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Row (Community Status & Round Action Button) */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">
                          Fandom Milestone
                        </span>
                        <span className="text-sm font-black text-[#e8a87c] font-mono tracking-tight">
                          {card.highlightBadge}
                        </span>
                      </div>

                      {/* Circular Action Button with Compass */}
                      <button onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(idx, card);
                }} className="w-11 h-11 rounded-full bg-[#e8a87c] hover:bg-[#f0b992] text-[#0a0a0f] flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#e8a87c]/35 group/btn active:scale-95 hover:scale-105" title={`Explore ${card.title}`} aria-label={`Explore ${card.title}`}>
                        <Compass className="w-5 h-5 group-hover/btn:rotate-45 transition-transform duration-300 stroke-[2.5]"/>
                      </button>
                    </div>

                  </div>

                </div>
              </div>);
        })}
        </div>
      </div>

      {/* Interactive Thumbnail Preview Bar & Pagination Dots */}
      <div className="relative max-w-xl mx-auto px-4 flex flex-col items-center space-y-4 z-20">
        
        {/* Pagination Dots */}
        <div className="flex items-center space-x-2">
          {featuredCards.map((_, i) => (<button key={i} onClick={() => setActiveIndex(i)} className={`transition-all duration-300 rounded-full ${activeIndex === i
                ? 'w-10 h-2 bg-[#e8a87c] shadow-[0_0_12px_rgba(232,168,124,0.6)]'
                : 'w-2 h-2 bg-white/20 hover:bg-[#e8a87c]/50'}`} aria-label={`Jump to slide ${i + 1}`}/>))}
        </div>

        {/* Thumbnail Preview Selector */}
        <div className="flex items-center space-x-2.5 overflow-x-auto scrollbar-none py-1 px-3 bg-[#131520]/80 rounded-2xl border border-[#e8a87c]/25 backdrop-blur-md">
          {featuredCards.map((card, i) => (<button key={card.id} onClick={() => setActiveIndex(i)} className={`group flex items-center space-x-2 px-2.5 py-1.5 rounded-xl transition-all ${activeIndex === i
                ? 'bg-[#e8a87c]/20 border border-[#e8a87c]/50 text-white shadow-md'
                : 'hover:bg-white/5 text-slate-400 hover:text-white border border-transparent'}`}>
              <img src={card.image} alt="" onError={(e) => {
                e.currentTarget.src = card.fallbackImage;
            }} className={`w-6 h-6 rounded-lg object-cover transition-all ${activeIndex === i ? 'ring-1 ring-[#e8a87c]' : 'opacity-60 group-hover:opacity-100'}`}/>
              <span className={`text-[11px] font-semibold whitespace-nowrap ${activeIndex === i ? 'text-[#e8a87c]' : 'text-slate-300'}`}>
                {card.title.split(':')[0]}
              </span>
            </button>))}
        </div>

      </div>

    </section>);
};
