import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  MapPin, 
  Calendar, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  X
} from 'lucide-react';
import { events } from '@/data/events';
import { categories } from '@/data/categories';
import { EventMediaSection } from '@/components/event/EventMediaSection';
import './EventsPage.css';

function formatDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    year: d.getFullYear().toString(),
    full: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

export function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [soonPage, setSoonPage] = useState(0);

  // Curated list of marquee featured events for the top stage carousel
  const featuredEvents = useMemo(() => {
    return [
      events.find((e) => e.id === 'evt-003') || events[0], // Crunchyroll Anime Awards 2026
      events.find((e) => e.id === 'evt-001') || events[1], // AnimeJapan 2026
      events.find((e) => e.id === 'evt-tv-001') || events[2], // San Diego Comic-Con: Hall H
      events.find((e) => e.id === 'evt-kpop-001') || events[3], // BLACKPINK WORLD TOUR: FINAL
    ].filter(Boolean);
  }, []);

  const currentFeatured = featuredEvents[featuredIdx] || events[0];
  const featuredCat = categories.find((c) => c.slug === currentFeatured.category);
  const featuredDate = formatDate(currentFeatured.date);

  const nextFeatured = () => {
    setFeaturedIdx((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevFeatured = () => {
    setFeaturedIdx((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  // Filtered upcoming events list
  const filteredEvents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return events.filter((ev) => {
      // Map category tab 'music' to 'k-pop' if selected
      const matchesCategory =
        activeCategory === 'all' ||
        ev.category === activeCategory ||
        (activeCategory === 'music' && ev.category === 'k-pop');

      const matchesSearch =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Happening soon list (window of 3 events with pagination, starting with the iconic trio from mockup)
  const allSoonEvents = useMemo(() => {
    const priorityIds = ['evt-001', 'evt-007', 'evt-016', 'evt-003', 'evt-music-001', 'evt-tv-001'];
    const priority = priorityIds.map((id) => events.find((e) => e.id === id)).filter(Boolean);
    const rest = events.filter((e) => !priorityIds.includes(e.id));
    return [...priority, ...rest];
  }, []);

  const totalSoon = allSoonEvents.length;
  const soonSlice = useMemo(() => {
    const start = (soonPage * 3) % totalSoon;
    return [
      allSoonEvents[start % totalSoon],
      allSoonEvents[(start + 1) % totalSoon],
      allSoonEvents[(start + 2) % totalSoon],
    ].filter(Boolean);
  }, [soonPage, totalSoon, allSoonEvents]);

  const nextSoon = () => setSoonPage((prev) => prev + 1);
  const prevSoon = () => setSoonPage((prev) => (prev > 0 ? prev - 1 : Math.floor(totalSoon / 3)));

  // Category filter tabs matching the inspiration bar
  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'anime', label: 'Anime' },
    { id: 'movies', label: 'Movies' },
    { id: 'tv-shows', label: 'TV Shows' },
    { id: 'music', label: 'Music' },
    { id: 'comics', label: 'Comics' },
    { id: 'gaming', label: 'Gaming' },
  ];

  return (
    <div className="events-page-root">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (NO SPILL, CLEAN RESPONSIVE FLEX)                         */}
      {/* ========================================================================= */}
      <section className="inspo-hero">
        <div className="events-custom-container">
          <div className="hero-flex-row">
            {/* Left Content */}
            <div className="hero-left-content">
              <span className="hero-eyebrow">
                CONVENTIONS. FESTIVALS. TOURS. PREMIERES.
              </span>

              <h1 className="hero-main-title">
                Events &amp; <span className="coral-gradient-text">Gatherings</span>
              </h1>

              <p className="hero-lead-text">
                Where the fandoms come together. Discover upcoming conventions, festivals, tours, and premieres from around the world.
              </p>

              <a href="#upcoming-events" className="btn-coral-pill">
                <span>Explore Events</span>
                <ArrowRight size={16} />
              </a>

              {/* 3-Column Stats Row */}
              <div className="hero-stats-bar">
                <div className="stat-item">
                  <span className="stat-val">{events.length}</span>
                  <span className="stat-desc">Events This Month</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">{categories.length}</span>
                  <span className="stat-desc">Categories</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">Global</span>
                  <span className="stat-desc">Locations</span>
                </div>
              </div>
            </div>

            {/* Right Visual Slices Collage */}
            <div className="hero-collage-wrap">
              <div className="hero-slices-deck">
                <div className="slice-panel">
                  <img src="/images/anime/jjk-banner.jpg" alt="Anime Gathering" className="slice-img" />
                  <div className="slice-overlay" />
                </div>
                <div className="slice-panel">
                  <img src="/images/events/lollapalooza-festival.jpg" alt="Music Festival Concert" className="slice-img" />
                  <div className="slice-overlay" />
                </div>
                <div className="slice-panel">
                  <img src="/images/events/comic-con-hall-h.jpg" alt="Comic Con Panel" className="slice-img" />
                  <div className="slice-overlay" />
                </div>
                <div className="slice-panel">
                  <img src="/images/events/comic-convention-nyc.jpg" alt="Comic Book Hero Showcase" className="slice-img" />
                  <div className="slice-overlay" />
                </div>
              </div>

              <div className="hero-handwritten-watermark">
                <span>✦ All Fandoms One Place</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED EVENT SHOWCASE (STAGE CAROUSEL)                               */}
      {/* ========================================================================= */}
      <section className="inspo-featured-wrap">
        <div className="events-custom-container">
          <div className="featured-stage-banner">
            <img
              key={currentFeatured.id}
              src={currentFeatured.image}
              alt={currentFeatured.title}
              className="featured-bg-photo"
            />
            <div className="featured-vignette" />

            {/* Left Content */}
            <div className="featured-banner-inner">
              <div className="featured-eyebrow-tag">
                <Sparkles size={13} />
                <span>FEATURED EVENT</span>
              </div>

              <div>
                <span className="featured-category-pill">
                  {featuredCat?.name || currentFeatured.category}
                </span>
              </div>

              <h2 className="featured-event-headline">
                {currentFeatured.title}
              </h2>

              <div className="featured-details-list">
                <div className="featured-detail-row">
                  <MapPin size={15} className="text-secondary flex-shrink-0" />
                  <span>{currentFeatured.location}</span>
                </div>
                <div className="featured-detail-row">
                  <Calendar size={15} className="text-secondary flex-shrink-0" />
                  <span>{featuredDate.full}</span>
                </div>
              </div>

              <Link to={`/event/${currentFeatured.id}`} className="btn-coral-pill">
                <span>View Event</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Bottom-Right Carousel Pagination Controls */}
            <div className="featured-pagination-dock">
              <span className="pagination-counter-text">
                {String(featuredIdx + 1).padStart(2, '0')} / {String(featuredEvents.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={prevFeatured}
                className="featured-arrow-circle"
                aria-label="Previous Featured Event"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextFeatured}
                className="featured-arrow-circle"
                aria-label="Next Featured Event"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. UPCOMING EVENTS GRID (4 ON A ROW)                                      */}
      {/* ========================================================================= */}
      <section id="upcoming-events" className="inspo-upcoming-wrap">
        <div className="events-custom-container">
          
          {/* Section Header */}
          <div className="section-header-row">
            <h2 className="section-headline">
              Upcoming <span className="coral-gradient-text">Events</span>
            </h2>
            <button 
              type="button" 
              className="view-all-events-btn"
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            >
              <span>View All Events</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Filter Toolbar: Category Pills + Search */}
          <div className="filter-search-deck">
            <div className="category-chips-rail">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`category-chip-btn ${activeCategory === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="search-field-pill-box">
              <Search size={14} className="search-magnifier-icon" />
              <input
                type="text"
                className="search-field-input"
                placeholder="Search events, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary text-decoration-none pe-3"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* 4-Column Card Grid (Fit 4 on a row) */}
          {filteredEvents.length > 0 ? (
            <div className="inspo-cards-matrix">
              {filteredEvents.map((event) => {
                const cat = categories.find((c) => c.slug === event.category);
                const d = formatDate(event.date);

                return (
                  <Link key={event.id} to={`/event/${event.id}`} className="inspo-event-tile">
                    {/* Media with Floating Date Badge */}
                    <div className="tile-media-area">
                      <img src={event.image} alt={event.title} className="tile-artwork-img" loading="lazy" />

                      <div className="tile-floating-date-chip">
                        <span className="date-chip-day">{d.day}</span>
                        <span className="date-chip-month">{d.month}</span>
                        <span className="date-chip-year">{d.year}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="tile-body-area">
                      <div>
                        <span className="tile-category-tag">
                          {cat?.name || event.category}
                        </span>

                        <h3 className="tile-event-name">{event.title}</h3>

                        <div className="tile-location-pin">
                          <MapPin size={12} className="text-secondary flex-shrink-0" />
                          <span className="text-truncate">{event.location}</span>
                        </div>
                      </div>

                      <div className="tile-footer-row">
                        <span className="tile-circle-link-btn">
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 rounded-4 border border-secondary border-opacity-15 bg-dark bg-opacity-40">
              <p className="text-secondary mb-3">No gatherings found matching your criteria.</p>
              <button
                type="button"
                className="btn-coral-pill"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HAPPENING SOON CAROUSEL STRIP                                          */}
      {/* ========================================================================= */}
      <section className="inspo-happening-soon-wrap">
        <div className="events-custom-container">
          <div className="section-header-row">
            <h2 className="section-headline">
              Happening <span className="coral-gradient-text">Soon</span>
            </h2>
            <button 
              type="button" 
              className="view-all-events-btn"
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="soon-carousel-deck">
            {/* Left Nav Arrow */}
            <button
              type="button"
              className="soon-nav-arrow-btn"
              onClick={prevSoon}
              aria-label="Previous soon events"
            >
              <ChevronLeft size={18} />
            </button>

            {/* 3 Compact Cards */}
            <div className="soon-cards-container">
              {soonSlice.map((item, idx) => {
                const countdowns = [
                  { d: '5D', h: '12H', m: '34M' },
                  { d: '12D', h: '08H', m: '20M' },
                  { d: '18D', h: '10H', m: '05M' },
                ];
                const cd = countdowns[idx] || { d: '24D', h: '06H', m: '15M' };

                return (
                  <Link key={item.id} to={`/event/${item.id}`} className="soon-mini-card">
                    {/* Left Stacked Countdown Block */}
                    <div className="soon-stacked-countdown">
                      <span className="soon-time-line primary-day">{cd.d}</span>
                      <span className="soon-time-line">{cd.h}</span>
                      <span className="soon-time-line">{cd.m}</span>
                    </div>

                    {/* Thumbnail */}
                    <div className="soon-media-thumb">
                      <img src={item.image} alt={item.title} className="soon-thumb-photo" loading="lazy" />
                    </div>

                    {/* Title & Location */}
                    <div className="soon-text-col">
                      <h4 className="soon-event-title">{item.title}</h4>
                      <div className="soon-event-venue">
                        <MapPin size={11} className="text-secondary flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right Nav Arrow */}
            <button
              type="button"
              className="soon-nav-arrow-btn"
              onClick={nextSoon}
              aria-label="Next soon events"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Media Section */}
      <EventMediaSection event={{ category: 'all' }} />

    </div>
  );
}