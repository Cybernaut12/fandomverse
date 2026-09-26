import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  ArrowUpRight, 
  Sparkles, 
  Bell, 
  BellRing, 
  Flame, 
  Tv, 
  Users, 
  ShoppingBag, 
  Calendar 
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import './EventCategorySection.css';

function formatEventDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }),
    year: d.getFullYear().toString(),
    full: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

function getCountdownText(dateStr) {
  const target = new Date(`${dateStr}T00:00:00`);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'Archived Stage';
  if (diffDays === 0) return 'Live Today';
  if (diffDays === 1) return 'Tomorrow';
  return `In ${diffDays} Days`;
}

// Dynamic experiential badges based on category & event
function getExperienceTags(category, idx) {
  switch (category) {
    case 'anime':
      return [
        { icon: <Tv size={12} />, label: 'Studio Showcase' },
        { icon: <Users size={12} />, label: 'Voice Cast Q&A' },
        { icon: <ShoppingBag size={12} />, label: 'Limited Merch' }
      ];
    case 'gaming':
      return [
        { icon: <Sparkles size={12} />, label: 'Live Gameplay Demo' },
        { icon: <Tv size={12} />, label: 'World Premiere Reveal' },
        { icon: <Flame size={12} />, label: 'Pro Arena Stage' }
      ];
    case 'k-pop':
      return [
        { icon: <Flame size={12} />, label: 'World Stadium Finale' },
        { icon: <Users size={12} />, label: 'Lightstick Sync' },
        { icon: <Sparkles size={12} />, label: 'VIP Soundcheck' }
      ];
    case 'movies':
    case 'tv-shows':
      return [
        { icon: <Tv size={12} />, label: 'Hall H Exclusive' },
        { icon: <Users size={12} />, label: 'Director & Cast Panel' },
        { icon: <Sparkles size={12} />, label: '70mm Preview' }
      ];
    default:
      return [
        { icon: <Sparkles size={12} />, label: 'Official Panel' },
        { icon: <Users size={12} />, label: 'Creator Alley' },
        { icon: <ShoppingBag size={12} />, label: 'Exclusive Drop' }
      ];
  }
}

export function EventCategorySection({ evts, cat }) {
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
        // ignore
      }
      return updated;
    });
  };

  if (!evts || evts.length === 0) return null;

  const hexToRgb = (hex) => {
    if (!hex) return '201, 162, 39';
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  };

  const rgbColor = hexToRgb(cat.accentColor);

  return (
    <section 
      className="section-padding cat-stage-section"
      style={{
        '--cat-accent': cat.accentColor || '#c9a227',
        '--cat-rgb': rgbColor,
      }}
    >
      <div className="container-wide">
        <SectionHeader
          title={`${cat.name} Live Stages & Conventions`}
          subtitle={`Official stadium tours, keynote halls, and premier gatherings curated for ${cat.name} fans.`}
          link="/events"
          linkLabel="Full Gathering Schedule"
        />

        <div className="cat-stage-grid">
          {evts.map((event, idx) => {
            const d = formatEventDate(event.date);
            const countdown = getCountdownText(event.date);
            const isReminded = reminders[event.id];
            const tags = getExperienceTags(cat.slug, idx);

            return (
              <div key={event.id} className="stage-deck-card">
                {/* Visual Media Poster */}
                <div className="stage-deck-media">
                  <img src={event.image} alt={event.title} className="stage-deck-img" loading="lazy" />
                  <div className="stage-deck-overlay" />

                  {/* Beacon Tag */}
                  <span className="stage-deck-beacon">
                    <span className="stage-beacon-glow" />
                    <span>{countdown}</span>
                  </span>
                </div>

                {/* Central Program Information */}
                <div className="stage-deck-content">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1.5">
                      <span 
                        className="badge rounded-pill px-2.5 py-1 text-uppercase fw-bold"
                        style={{
                          backgroundColor: `rgba(${rgbColor}, 0.15)`,
                          color: cat.accentColor,
                          border: `1px solid rgba(${rgbColor}, 0.35)`,
                          fontSize: '0.675rem'
                        }}
                      >
                        Official Gathering #{idx + 1}
                      </span>
                    </div>

                    <Link to={`/event/${event.id}`} className="text-decoration-none">
                      <h3 className="stage-deck-title">{event.title}</h3>
                    </Link>

                    <div className="stage-deck-location">
                      <MapPin size={15} style={{ color: cat.accentColor }} className="flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>

                    <p className="stage-deck-desc">{event.description}</p>
                  </div>

                  {/* Highlights Tags */}
                  <div className="stage-experience-tags">
                    {tags.map((tag, tIdx) => (
                      <span key={tIdx} className="stage-exp-tag">
                        <span style={{ color: cat.accentColor }}>{tag.icon}</span>
                        <span>{tag.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Hub & Date Block */}
                <div className="stage-deck-action-hub">
                  <div className="stage-date-display">
                    <span className="stage-date-day">{d.day}</span>
                    <span className="stage-date-month-year">{d.month} • {d.year}</span>
                  </div>

                  <div className="w-100">
                    <Link to={`/event/${event.id}`} className="stage-rsvp-btn text-decoration-none">
                      <span>Enter Stage</span>
                      <ArrowUpRight size={16} />
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => toggleReminder(e, event.id)}
                      className={`stage-remind-toggle w-100 justify-content-center ${isReminded ? 'active' : ''}`}
                    >
                      {isReminded ? (
                        <>
                          <BellRing size={13} />
                          <span>Saved in Schedule</span>
                        </>
                      ) : (
                        <>
                          <Bell size={13} />
                          <span>Remind Me</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
