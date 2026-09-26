import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Calendar, Bell, BellRing, Sparkles, Clock, Compass } from 'lucide-react';
import { events } from '@/data/events';
import { categories } from '@/data/categories';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import './EventsSection.css';

function formatDate(date) {
  const d = new Date(`${date}T00:00:00`);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }),
    year: d.getFullYear().toString(),
    full: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

function getDaysUntil(dateStr) {
  const target = new Date(`${dateStr}T00:00:00`);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'Past Event';
  if (diffDays === 0) return 'Happening Today';
  if (diffDays === 1) return 'Tomorrow';
  return `In ${diffDays} days`;
}

export function EventsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('fv_event_reminders');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleReminder = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    setReminders((prev) => {
      const updated = { ...prev, [eventId]: !prev[eventId] };
      try {
        localStorage.setItem('fv_event_reminders', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  // Sort all events by date
  const allSorted = useMemo(() => {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  // Filtered list based on active category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return allSorted;
    return allSorted.filter((e) => e.category === selectedCategory);
  }, [allSorted, selectedCategory]);

  // Spotlight the first upcoming or marquee event in current category
  const [spotlightId, setSpotlightId] = useState(null);

  useEffect(() => {
    if (filteredEvents.length > 0) {
      setSpotlightId(filteredEvents[0].id);
    }
  }, [selectedCategory, filteredEvents]);

  const spotlightEvent = filteredEvents.find((e) => e.id === spotlightId) || filteredEvents[0] || allSorted[0];
  const spotlightCat = categories.find((c) => c.slug === spotlightEvent?.category);
  const spotlightDate = spotlightEvent ? formatDate(spotlightEvent.date) : null;
  const spotlightCountdown = spotlightEvent ? getDaysUntil(spotlightEvent.date) : '';

  // Other events to show in the right-hand list
  const listEvents = useMemo(() => {
    return filteredEvents.slice(0, 5);
  }, [filteredEvents]);

  return (
    <section id="events" className="section-padding fv-bg-ink-900 fv-grid-texture events-section-wrapper">
      <div className="container-wide">
        <SectionHeader
          title="Events & Gatherings"
          subtitle="Conventions, world tours, anime expos, and premier fan celebrations where worlds collide in person."
          link="/events"
          linkLabel="View Full Calendar"
        />

        {/* Category Pill Filters */}
        <div className="events-category-bar" role="tablist" aria-label="Filter events by category">
          <button
            type="button"
            className={`events-cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
            style={{ '--cat-accent': '#c9a227' }}
          >
            All Gatherings ({allSorted.length})
          </button>
          {categories.map((cat) => {
            const count = allSorted.filter((e) => e.category === cat.slug).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.slug}
                type="button"
                className={`events-cat-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.slug)}
                style={{ '--cat-accent': cat.accentColor }}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* 2-Column Responsive Layout: Spotlight Showcase on Left, Timeline List on Right */}
        <div className="row g-4 align-items-stretch">
          
          {/* LEFT: Featured Spotlight Event Card */}
          {spotlightEvent && (
            <div className="col-12 col-lg-6 col-xl-5">
              <div
                className="event-spotlight-card"
                style={{ '--spotlight-accent': spotlightCat?.accentColor || '#c9a227' }}
              >
                <div className="event-spotlight-image-container">
                  <img
                    src={spotlightEvent.image}
                    alt={spotlightEvent.title}
                    className="event-spotlight-img"
                    loading="lazy"
                  />
                  <div className="event-spotlight-gradient" />

                  <div className="event-spotlight-badge-row">
                    <span className="event-pulse-pill">
                      <span className="pulse-dot" />
                      Featured Gathering
                    </span>
                    <span className="countdown-pill">{spotlightCountdown}</span>
                  </div>
                </div>

                <div className="event-spotlight-body">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <CategoryBadge category={spotlightEvent.category} />
                    </div>

                    <h3 className="fv-heading-font fv-text-2xl fv-md-text-3xl fv-font-bold text-white mb-2 leading-tight">
                      {spotlightEvent.title}
                    </h3>

                    <div className="event-meta-info mb-3">
                      <span className="event-meta-item text-light">
                        <Calendar size={14} className="text-warning flex-shrink-0" />
                        <strong>{spotlightDate?.full}</strong>
                      </span>
                      <span className="event-meta-item">
                        <MapPin size={14} className="text-danger flex-shrink-0" />
                        <span>{spotlightEvent.location}</span>
                      </span>
                    </div>

                    <p className="fv-text-sm text-secondary line-clamp-3 mb-0">
                      {spotlightEvent.description}
                    </p>
                  </div>

                  <div className="event-spotlight-actions">
                    <Link
                      to={`/event/${spotlightEvent.id}`}
                      className="btn btn-sm px-4 py-2 fv-heading-font fw-bold d-inline-flex align-items-center gap-2 rounded-pill flex-grow-1 justify-content-center"
                      style={{
                        backgroundColor: spotlightCat?.accentColor || '#c9a227',
                        color: '#0b0c10',
                      }}
                    >
                      <span>Explore Gathering</span>
                      <ArrowUpRight size={16} />
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => toggleReminder(e, spotlightEvent.id)}
                      className={`btn btn-sm px-3 py-2 border rounded-pill d-inline-flex align-items-center gap-2 transition-all ${
                        reminders[spotlightEvent.id]
                          ? 'btn-outline-danger active text-danger bg-danger-subtle'
                          : 'btn-outline-secondary text-light'
                      }`}
                      title="Set reminder for this event"
                    >
                      {reminders[spotlightEvent.id] ? (
                        <>
                          <BellRing size={16} className="text-danger" />
                          <span className="d-none d-sm-inline">Saved</span>
                        </>
                      ) : (
                        <>
                          <Bell size={16} />
                          <span className="d-none d-sm-inline">Remind Me</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT: Upcoming Timeline List */}
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="events-timeline-list">
              {listEvents.map((event) => {
                const cat = categories.find((c) => c.slug === event.category);
                const d = formatDate(event.date);
                const isSelected = event.id === spotlightEvent?.id;
                const isReminded = reminders[event.id];

                return (
                  <div
                    key={event.id}
                    className={`event-list-item ${isSelected ? 'selected' : ''}`}
                    style={{ '--event-cat-accent': cat?.accentColor || '#c9a227' }}
                    onMouseEnter={() => setSpotlightId(event.id)}
                  >
                    {/* Date Block */}
                    <div
                      className="event-date-box"
                      style={{
                        borderColor: cat ? `${cat.accentColor}40` : 'rgba(255, 255, 255, 0.1)',
                        backgroundColor: cat ? `${cat.accentColor}12` : 'rgba(11, 12, 16, 0.7)',
                      }}
                    >
                      <span className="event-date-day" style={{ color: cat?.accentColor }}>
                        {d.day}
                      </span>
                      <span className="event-date-month">{d.month}</span>
                      <span className="event-date-year">{d.year}</span>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="event-thumb-wrapper d-none d-sm-block">
                      <img src={event.image} alt={event.title} className="event-thumb-img" loading="lazy" />
                    </div>

                    {/* Main Content */}
                    <div className="event-content-main">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <CategoryBadge category={event.category} />
                      </div>
                      <Link to={`/event/${event.id}`} className="text-decoration-none">
                        <h4 className="event-item-title">{event.title}</h4>
                      </Link>
                      <div className="event-item-location">
                        <MapPin size={12} className="flex-shrink-0 text-muted" />
                        <span className="text-truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="event-item-actions">
                      <button
                        type="button"
                        onClick={(e) => toggleReminder(e, event.id)}
                        className={`event-remind-btn ${isReminded ? 'active' : ''}`}
                        aria-label={`Toggle reminder for ${event.title}`}
                        title={isReminded ? 'Reminder set' : 'Notify me'}
                      >
                        {isReminded ? <BellRing size={14} /> : <Bell size={14} />}
                      </button>

                      <Link
                        to={`/event/${event.id}`}
                        className="event-arrow-link"
                        aria-label={`View ${event.title}`}
                      >
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View Full Calendar CTA banner at the bottom */}
            <div className="mt-4 p-3 rounded-4 border border-secondary border-opacity-25 bg-dark bg-opacity-50 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-2 text-secondary fv-text-sm">
                <Sparkles size={16} className="text-warning flex-shrink-0" />
                <span>
                  Looking for more dates? Browse all <strong>{allSorted.length} conventions and showcases</strong>.
                </span>
              </div>
              <Link
                to="/events"
                className="btn btn-sm btn-outline-light rounded-pill px-4 fv-heading-font text-nowrap"
              >
                Browse All Events →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
