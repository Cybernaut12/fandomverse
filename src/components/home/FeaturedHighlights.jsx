import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Star, Compass, Sparkles } from 'lucide-react';
import './FeaturedHighlights.css';

export function FeaturedHighlights() {
  const navigate = useNavigate();

  // Curated landmark titles with authentic high-resolution imagery and verified fallbacks
  const featuredCards = [
    {
      id: 'featured-dune',
      title: 'Dune: Part Two',
      location: 'Arrakis, Southern Erg Desert',
      category: 'movies',
      categoryLabel: 'Cinema',
      description: 'Paul Atreides unites with Chani and the Fremen while seeking vengeance against the conspirators who destroyed his family in a vast galactic holy war.',
      image: '/images/dune-cover.jpg',
      fallbackImage: '/images/dune-banner.jpg',
      stats: {
        label1: 'Format',
        val1: 'IMAX 70mm',
        label2: 'Global Box',
        val2: '$714M',
        label3: 'Audience',
        val3: '9.8 ★',
      },
      highlightBadge: 'Denis Villeneuve Era',
    },
    {
      id: 'featured-elden-ring',
      title: 'Elden Ring: Shadow of the Erdtree',
      location: 'The Lands Between, Realm of Shadow',
      category: 'gaming',
      categoryLabel: 'Gaming',
      description: 'Guided by Empyrean Miquella, Tarnished step into the Land of Shadow to unravel the dark history of Queen Marika and conquer colossal demi-gods.',
      image: '/images/elden-ring-banner.jpg',
      fallbackImage: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg',
      stats: {
        label1: 'Scope',
        val1: '80+ Hrs',
        label2: 'Fandom Hype',
        val2: '99°',
        label3: 'Critic Score',
        val3: '9.8 ★',
      },
      highlightBadge: 'GOTY Masterpiece',
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
        val3: '9.9 ★',
      },
      highlightBadge: 'Oscar Nominee',
    },
    {
      id: 'featured-cyberpunk',
      title: 'Cyberpunk 2077: Phantom Liberty',
      location: 'Dogtown, Night City Sprawl',
      category: 'gaming',
      categoryLabel: 'Gaming',
      description: 'Infiltrate the walled lawless enclave of Dogtown in a high-stakes spy thriller alongside FIA agent Solomon Reed and songstress Songbird.',
      image: '/images/cyberpunk-banner.jpg',
      fallbackImage: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
      stats: {
        label1: 'Campaign',
        val1: 'Phantom Lib.',
        label2: 'Setting',
        val2: 'Night City 2.1',
        label3: 'Rating',
        val3: '9.5 ★',
      },
      highlightBadge: 'Ultimate Edition',
    },
    {
      id: 'featured-solo-leveling',
      title: 'Solo Leveling: Arise',
      location: 'Seoul, Double Dungeon Gate',
      category: 'anime',
      categoryLabel: 'Anime / Manhwa',
      description: 'Weakest E-rank hunter Sung Jinwoo awakens a mysterious quest system that grants him the unique ability to level up infinitely and summon the Shadow Army.',
      image: '/images/solo-leveling-cover.jpg',
      fallbackImage: '/images/solo-leveling-banner.jpg',
      stats: {
        label1: 'Hunter Rank',
        val1: 'Shadow Monarch',
        label2: 'Global Reads',
        val2: '14B+ Views',
        label3: 'Score',
        val3: '9.6 ★',
      },
      highlightBadge: 'Global Sensation',
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
        val3: '9.5 ★',
      },
      highlightBadge: 'Matt Reeves Saga',
    },
  ];

  // Default to index 2 (Spider-Man: Across the Spider-Verse) to match screenshot
  const [activeIndex, setActiveIndex] = useState(2);
  const total = featuredCards.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCardClick = (idx, card) => {
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    } else {
      navigate(`/category/${card.category}`);
    }
  };

  return (
    <section id="highlights" className="featured-coverflow-section">
      {/* Background Ambient Radial Glow */}
      <div className="featured-coverflow-ambient-glow" />

      {/* Header with Title and Nav Controls */}
      <div className="featured-coverflow-header">
        <div>
          <div>
            <span className="featured-spotlight-badge">
              <Sparkles size={14} />
              <span>Spotlight Realms</span>
            </span>
            <span className="featured-curated-label">Curated Showcase</span>
          </div>
          <h2 className="featured-coverflow-title">
            Featured Across the <span className="featured-accent-text">Fandoms</span>
          </h2>
          <p className="featured-coverflow-subtitle">
            A story to read, a trailer to catch, and iconic worlds to explore across 6 premier realms
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="featured-nav-controls">
          <div className="featured-counter">
            0{activeIndex + 1} / 0{total}
          </div>
          <button
            type="button"
            onClick={prevSlide}
            className="featured-nav-btn"
            aria-label="Previous realm"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="featured-nav-btn"
            aria-label="Next realm"
            title="Next (Right Arrow)"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 3D Overlapping Coverflow Stack Container */}
      <div className="featured-stack-container">
        <div className="featured-stack-wrapper">
          {featuredCards.map((card, idx) => {
            let offset = idx - activeIndex;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

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
            } else if (offset === -1) {
              translateX = -180;
              scale = 0.9;
              zIndex = 30;
              opacity = 0.88;
              rotate = -3;
            } else if (offset === 1) {
              translateX = 180;
              scale = 0.9;
              zIndex = 30;
              opacity = 0.88;
              rotate = 3;
            } else if (offset === -2) {
              translateX = -340;
              scale = 0.78;
              zIndex = 20;
              opacity = 0.55;
              rotate = -5;
            } else if (offset === 2) {
              translateX = 340;
              scale = 0.78;
              zIndex = 20;
              opacity = 0.55;
              rotate = 5;
            }

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx, card)}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                className="featured-card-wrapper"
              >
                {/* Physical Card Container */}
                <div className={`featured-card ${isCenter ? 'featured-card-center' : 'featured-card-side'}`}>
                  {/* Top Photographic Scenic Artwork */}
                  <div className="featured-media-box">
                    <img
                      src={card.image}
                      alt={card.title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          target.src = card.fallbackImage;
                        }
                      }}
                      className="featured-media-img"
                      loading="lazy"
                    />
                    <div className="featured-media-overlay" />

                    {/* Top Category Badge */}
                    <span className="featured-category-badge">
                      {card.categoryLabel}
                    </span>

                    {/* Top Right Rating Badge */}
                    <span className="featured-rating-badge">
                      <Star size={12} fill="#e8a87c" color="#e8a87c" />
                      <span>{card.stats.val3.replace(' ★', '')}</span>
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div className="featured-card-body">
                    <div>
                      <h3 className="featured-card-title">{card.title}</h3>
                      <div className="featured-card-location">
                        <MapPin size={14} color="#e8a87c" />
                        <span>{card.location}</span>
                      </div>
                    </div>

                    {/* Realm Lore */}
                    <div>
                      <span className="featured-realm-label">Realm Lore</span>
                      <p className="featured-realm-desc">{card.description}</p>
                    </div>

                    {/* 3-Column Stats Row */}
                    <div className="featured-stats-grid">
                      <div>
                        <span className="featured-stat-label">{card.stats.label1}</span>
                        <span className="featured-stat-value">{card.stats.val1}</span>
                      </div>
                      <div className="featured-stat-col-center">
                        <span className="featured-stat-label">{card.stats.label2}</span>
                        <span className="featured-stat-value">{card.stats.val2}</span>
                      </div>
                      <div>
                        <span className="featured-stat-label">{card.stats.label3}</span>
                        <span className="featured-stat-value">{card.stats.val3}</span>
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="featured-bottom-row">
                      <div>
                        <span className="featured-milestone-label">Fandom Milestone</span>
                        <span className="featured-milestone-val">{card.highlightBadge}</span>
                      </div>

                      {/* Circular Action Button with Compass */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(idx, card);
                        }}
                        className="featured-compass-btn"
                        title={`Explore ${card.title}`}
                        aria-label={`Explore ${card.title}`}
                      >
                        <Compass size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots and Thumbnail Strip */}
      <div className="featured-pagination-wrap">
        {/* Pagination Dots */}
        <div className="featured-dots">
          {featuredCards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`featured-dot ${activeIndex === i ? 'featured-dot-active' : 'featured-dot-inactive'}`}
              aria-label={`Jump to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Preview Selector */}
        <div className="featured-thumbnail-bar">
          {featuredCards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`featured-thumb-btn ${activeIndex === i ? 'featured-thumb-btn-active' : 'featured-thumb-btn-inactive'}`}
            >
              <img
                src={card.image}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = card.fallbackImage;
                }}
                className="featured-thumb-img"
              />
              <span className={`featured-thumb-text ${activeIndex === i ? 'featured-thumb-text-active' : 'featured-thumb-text-inactive'}`}>
                {card.title.split(':')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export const FeaturedFandomsCoverflow = FeaturedHighlights;
export default FeaturedHighlights;
