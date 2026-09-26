import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  ArrowRight, 
  ArrowUpRight, 
  Flame, 
  Mail, 
  Check, 
  Sparkles, 
  LayoutGrid,
  Calendar,
  Clock
} from 'lucide-react';
import { articles } from '@/data/articles';
import { categories } from '@/data/categories';
import './ArticlesPage.css';

// Helper to format date strings cleanly (e.g., "Sep 20, 2026")
function formatDate(dateStr) {
  if (!dateStr) return 'Sep 2026';
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Estimate reading time from article body
function getReadTime(body) {
  if (!body) return '5 min read';
  const words = Array.isArray(body) ? body.join(' ').split(/\s+/).length : 250;
  const minutes = Math.max(3, Math.ceil(words / 45) + 3);
  return `${minutes} min read`;
}

// Get tag CSS class by category
function getTagClass(category) {
  const map = {
    anime: 'tag-anime',
    gaming: 'tag-gaming',
    movies: 'tag-movies',
    'tv-shows': 'tag-tv-shows',
    'k-pop': 'tag-music',
    music: 'tag-music',
    comics: 'tag-comics',
    manga: 'tag-manga',
  };
  return map[category] || 'tag-anime';
}

export function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('latest'); // 'latest' | 'trending' | 'most-read'
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // 1. Featured Spotlight Article (Top Right of Hero)
  const featuredArticle = useMemo(() => {
    return (
      articles.find((a) => a.id === 'art-002') || // Frieren: Beyond Journey's End
      articles.find((a) => a.featured) ||
      articles[0]
    );
  }, []);

  // 2. Categories Deck configuration with rich thumbnails
  const categoryFilters = [
    { id: 'all', label: 'All Articles', icon: LayoutGrid, isIcon: true },
    { id: 'anime', label: 'Anime', img: '/images/anime/jjk-banner.jpg' },
    { id: 'movies', label: 'Movies', img: '/images/dune-banner.jpg' },
    { id: 'tv-shows', label: 'TV Shows', img: '/images/tv/stranger-things-banner.jpg' },
    { id: 'k-pop', label: 'Music', img: '/images/kpop/blackpink-banner.jpg' },
    { id: 'gaming', label: 'Gaming', img: '/images/gaming/cyberpunk-banner.jpg' },
    { id: 'comics', label: 'Comics', img: '/images/comics/spiderman-cover.jpg' },
    { id: 'manga', label: 'Manga', img: '/images/manga/one-piece-vol1.jpg' },
  ];

  // 3. Editorial Spotlight Item (Tall Left Card)
  const spotlightArticle = useMemo(() => {
    return articles.find((a) => a.id === 'art-001') || articles[0]; // Jujutsu Kaisen
  }, []);

  // 4. Stacked 3 Horizontal Articles
  const stackedArticles = useMemo(() => {
    return [
      articles.find((a) => a.id === 'art-game-001') || articles[1], // Cyberpunk 2077
      articles.find((a) => a.id === 'art-007') || articles[2],      // Dune: Part Two
      articles.find((a) => a.id === 'art-kpop-001') || articles[3], // BTS Global Phenomenon
    ].filter(Boolean);
  }, []);

  // 5. Trending Top 5 Sidebar Articles
  const trendingArticles = useMemo(() => {
    return [
      articles.find((a) => a.id === 'art-019') || articles[4],      // One Piece: Final Saga / Setting Sail
      articles.find((a) => a.id === 'art-002') || articles[5],      // Frieren: Beyond Journey's End
      articles.find((a) => a.id === 'art-game-002') || articles[6], // The Witcher 3
      articles.find((a) => a.id === 'art-tv-002') || articles[7],   // Stranger Things
      articles.find((a) => a.id === 'art-016') || articles[8],      // Ultimate Spider-Man
    ].filter(Boolean);
  }, []);

  // 6. Popular This Month (Bottom 4 Cards)
  const popularArticles = useMemo(() => {
    return [
      articles.find((a) => a.id === 'art-tv-001') || articles[9],   // The Last of Us
      articles.find((a) => a.id === 'art-017') || articles[10],     // Batman of Two Worlds
      articles.find((a) => a.id === 'art-game-003') || articles[11],// Fallout Wasteland
      articles.find((a) => a.id === 'art-020') || articles[12],     // Chainsaw Man
    ].filter(Boolean);
  }, []);

  // 7. Filtered Articles (Active when user searches or picks a category)
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return articles.filter((a) => {
      const matchesCat =
        activeCategory === 'all' ||
        a.category === activeCategory ||
        (activeCategory === 'k-pop' && (a.category === 'k-pop' || a.category === 'music'));

      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const isDefaultView = activeCategory === 'all' && !searchQuery.trim();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="articles-page-root">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (CLEAN EDITORIAL HEADER + SEARCH)                         */}
      {/* ========================================================================= */}
      <section className="articles-hero-section">
        <div className="articles-custom-container">
          <div className="hero-editorial-header">
            <p className="hero-eyebrow-line">
              NEWS. INSIGHTS. REVIEWS. CULTURE.
            </p>

            <h1 className="hero-editorial-title">
              <span className="coral-gradient-text">Articles</span>
            </h1>

            <p className="hero-editorial-subtext">
              Stay up to date with the latest in anime, movies, music, gaming and everything fandom.
            </p>

            <div className="hero-search-wrapper">
              <Search size={15} className="hero-search-icon" />
              <input
                type="text"
                className="hero-search-input"
                placeholder='Search articles, e.g. "One Piece", "Dune", "Cyberpunk"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="hero-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORIES FILTER BAR                                                  */}
      {/* ========================================================================= */}
      <section className="articles-categories-section">
        <div className="articles-custom-container">
          <div className="section-head-bar">
            <h3 className="section-title-clean">Categories</h3>
            <button
              type="button"
              className="section-link-arrow"
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            >
              <span>View All Categories</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="category-tiles-deck">
            {categoryFilters.map((cat) => {
              const isActive = activeCategory === cat.id;
              const IconComp = cat.icon;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (searchQuery) setSearchQuery('');
                  }}
                  className={`category-tile-btn ${isActive ? 'active' : ''}`}
                >
                  <div className="category-tile-icon-box">
                    {cat.isIcon ? (
                      <IconComp size={15} />
                    ) : (
                      <img src={cat.img} alt={cat.label} className="category-tile-thumb" />
                    )}
                  </div>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DEFAULT VIEW OR SEARCH/CATEGORY FILTERED VIEW                          */}
      {/* ========================================================================= */}
      {isDefaultView ? (
        <>
          {/* ========================================================================= */}
          {/* 3A. LATEST ARTICLES + TRENDING SIDEBAR (MAIN 2-COLUMN SECTION)            */}
          {/* ========================================================================= */}
          <section className="latest-trending-section">
            <div className="articles-custom-container">
              <div className="latest-header-row">
                <h2 className="section-title-clean">
                  Latest <span className="coral-gradient-text">Articles</span>
                </h2>

                <div className="pill-switcher-group">
                  <button
                    type="button"
                    onClick={() => setActiveTab('latest')}
                    className={`pill-switch-btn ${activeTab === 'latest' ? 'active' : ''}`}
                  >
                    Latest
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('trending')}
                    className={`pill-switch-btn ${activeTab === 'trending' ? 'active' : ''}`}
                  >
                    Trending
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('most-read')}
                    className={`pill-switch-btn ${activeTab === 'most-read' ? 'active' : ''}`}
                  >
                    Most Read
                  </button>
                </div>
              </div>

              <div className="latest-layout-grid">
                
                {/* Left Area (Split into 1 Tall Spotlight + 3 Stacked Cards) */}
                <div className="editorial-spotlight-deck">
                  
                  {/* Tall Spotlight Card */}
                  {spotlightArticle && (
                    <Link to={`/article/${spotlightArticle.slug}`} className="tall-spotlight-tile">
                      <div className="tall-media-container">
                        <img
                          src={spotlightArticle.image}
                          alt={spotlightArticle.title}
                          className="tall-artwork-img"
                          loading="lazy"
                        />
                        <span className="tall-category-badge">
                          {spotlightArticle.category}
                        </span>
                      </div>

                      <div className="tall-body-content">
                        <div>
                          <h3 className="tall-article-headline">
                            {spotlightArticle.title}
                          </h3>
                          <p className="tall-article-desc mt-2">
                            {spotlightArticle.excerpt}
                          </p>
                        </div>

                        <div className="article-author-byline mt-3">
                          <div className="author-mini-dot">
                            {spotlightArticle.author.charAt(0)}
                          </div>
                          <span>By {spotlightArticle.author}</span>
                          <span>•</span>
                          <span>{formatDate(spotlightArticle.date)}</span>
                          <span>•</span>
                          <span>{getReadTime(spotlightArticle.body)}</span>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Right Stacked 3 Compact Cards */}
                  <div className="stacked-cards-deck">
                    {stackedArticles.map((art) => (
                      <Link key={art.id} to={`/article/${art.slug}`} className="horizontal-article-card">
                        <div className="h-card-thumb-wrap">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="h-card-img"
                            loading="lazy"
                          />
                        </div>

                        <div className="h-card-body">
                          <div>
                            <span className={`category-tag-mini ${getTagClass(art.category)}`}>
                              {art.category === 'k-pop' ? 'Music' : art.category}
                            </span>
                            <h4 className="h-card-title mt-1">
                              {art.title}
                            </h4>
                          </div>

                          <div className="article-author-byline">
                            <span>By {art.author}</span>
                            <span>•</span>
                            <span>{getReadTime(art.body)}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                </div>

                {/* Right Area (Trending Articles Sidebar) */}
                <div className="trending-sidebar-card">
                  <h3 className="trending-card-header">
                    <Flame size={18} className="text-danger flex-shrink-0" />
                    <span>Trending Articles</span>
                  </h3>

                  <div className="trending-items-stack">
                    {trendingArticles.map((item, idx) => (
                      <Link key={item.id} to={`/article/${item.slug}`} className="trending-item-row">
                        <span className="trending-rank-num">{idx + 1}</span>

                        <div className="trending-thumb-wrap">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="trending-thumb-img"
                            loading="lazy"
                          />
                        </div>

                        <div className="trending-item-text">
                          <h4 className="trending-item-title">{item.title}</h4>
                          <span className="trending-item-date">{formatDate(item.date)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3B. POPULAR THIS MONTH & NEWSLETTER SUBSCRIPTION                          */}
          {/* ========================================================================= */}
          <section className="popular-newsletter-section">
            <div className="articles-custom-container">
              <div className="section-head-bar">
                <h3 className="section-title-clean">
                  Popular <span className="coral-gradient-text">This Month</span>
                </h3>
                <button
                  type="button"
                  className="section-link-arrow"
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                >
                  <span>View All</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="popular-newsletter-grid">
                
                {/* 4 Cards Grid */}
                <div className="popular-cards-matrix">
                  {popularArticles.map((art) => (
                    <Link key={art.id} to={`/article/${art.slug}`} className="popular-article-card">
                      <div className="popular-card-media">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="popular-card-img"
                          loading="lazy"
                        />
                        <span className={`popular-badge-pill ${getTagClass(art.category)}`}>
                          {art.category === 'k-pop' ? 'Music' : art.category}
                        </span>
                      </div>

                      <div className="popular-card-body">
                        <h4 className="popular-card-title">{art.title}</h4>
                        
                        <div className="article-author-byline mt-2">
                          <div className="author-mini-dot">{art.author.charAt(0)}</div>
                          <span className="text-truncate">By {art.author}</span>
                          <span>•</span>
                          <span>{getReadTime(art.body)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Newsletter Subscribe Card */}
                <div className="stay-in-the-loop-card">
                  <div>
                    <div className="stay-icon-envelope mb-3">
                      <Mail size={18} />
                    </div>

                    <h3 className="stay-title">Stay in the Loop</h3>
                    <p className="stay-desc">
                      Get the latest articles, event updates, and exclusive content delivered to your inbox.
                    </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="stay-form-wrap">
                    <div className="stay-input-container">
                      <Mail size={14} className="stay-input-icon" />
                      <input
                        type="email"
                        required
                        className="stay-input-field"
                        placeholder="Enter your email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="stay-submit-btn">
                      {subscribed ? (
                        <span className="d-flex align-items-center justify-content-center gap-1">
                          <Check size={14} /> Subscribed!
                        </span>
                      ) : (
                        'Subscribe'
                      )}
                    </button>

                    {subscribed && (
                      <p className="stay-success-msg mt-2">
                        🎉 Thank you! Check your inbox for updates.
                      </p>
                    )}
                  </form>
                </div>

              </div>
            </div>
          </section>
        </>
      ) : (
        /* ========================================================================= */
        /* 3C. FILTERED ARTICLES GRID (SEARCH & CATEGORY ACTIVE)                     */
        /* ========================================================================= */
        <section className="filtered-results-wrap">
          <div className="articles-custom-container">
            <div className="section-head-bar mb-4">
              <h2 className="section-title-clean">
                {searchQuery ? (
                  <>Search Results for <span className="coral-gradient-text">"{searchQuery}"</span></>
                ) : (
                  <>Articles in <span className="coral-gradient-text">{activeCategory.toUpperCase()}</span></>
                )}
                <span className="text-secondary fs-6 fw-normal ms-2">({filteredArticles.length})</span>
              </h2>

              <button
                type="button"
                className="section-link-arrow"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              >
                <span>Clear Filters</span>
                <X size={14} />
              </button>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="filtered-grid-matrix">
                {filteredArticles.map((art) => (
                  <Link key={art.id} to={`/article/${art.slug}`} className="popular-article-card">
                    <div className="popular-card-media">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="popular-card-img"
                        loading="lazy"
                      />
                      <span className={`popular-badge-pill ${getTagClass(art.category)}`}>
                        {art.category === 'k-pop' ? 'Music' : art.category}
                      </span>
                    </div>

                    <div className="popular-card-body">
                      <div>
                        <h4 className="popular-card-title">{art.title}</h4>
                        <p className="text-secondary small mt-2 line-clamp-2" style={{ fontSize: '0.78rem' }}>
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="article-author-byline mt-3">
                        <div className="author-mini-dot">{art.author.charAt(0)}</div>
                        <span className="text-truncate">By {art.author}</span>
                        <span>•</span>
                        <span>{getReadTime(art.body)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 rounded-4 border border-secondary border-opacity-15 bg-dark bg-opacity-40">
                <p className="text-secondary mb-3">No articles found matching your criteria.</p>
                <button
                  type="button"
                  className="btn-coral-pill"
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
