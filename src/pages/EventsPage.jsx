import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { events } from '@/data/events';
import { categories } from '@/data/categories';
import { EventMediaSection } from '@/components/event/EventMediaSection';
import './EventsPage.css';

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const formatEventDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
});

const getEventStatus = (event) => new Date(`${event.date}T00:00:00`) < startOfToday() ? 'Past' : 'Upcoming';

export function EventsPage() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('soonest');
  const today = startOfToday();
  const upcoming = useMemo(() => [...events]
    .filter((event) => new Date(`${event.date}T00:00:00`) >= today)
    .sort((a, b) => a.date.localeCompare(b.date)), []);
  const featured = upcoming[0] || [...events].sort((a, b) => b.date.localeCompare(a.date))[0];
  const categoryOptions = categories.filter((category) => events.some((event) => event.category === category.slug));

  const visibleEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const categoryMatches = categoryFilter === 'all' || event.category === categoryFilter;
      const statusMatches = statusFilter === 'all' || getEventStatus(event).toLowerCase() === statusFilter;
      return categoryMatches && statusMatches;
    });
    return filtered.sort((a, b) => {
      if (sortOrder === 'title') return a.title.localeCompare(b.title);
      return sortOrder === 'latest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });
  }, [categoryFilter, statusFilter, sortOrder]);

  return (
    <div className="min-vh-100 fv-bg-ink-900 fv-pt-16">
      <section className="events-hub-hero position-relative overflow-hidden d-flex align-items-end">
        {featured && <img src={featured.image} alt="" className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover" fetchPriority="high"/>}
        <div className="position-absolute fv-inset-0 events-hub-shade" />
        <div className="position-relative container-wide fv-py-12 fv-md-py-16 fv-z-10">
          <span className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-widest fv-text-brand-400">FandomVerse calendar</span>
          <h1 className="fv-display-font fv-text-5xl fv-md-text-7xl fv-text-paper-50 fv-tracking-wide fv-leading-none fv-mt-3">Events &amp; gatherings</h1>
          <p className="fv-text-lg fv-text-paper-200 fv-max-w-2xl fv-mt-4">Find conventions, premieres, festivals, and fan meetups from across the fandoms.</p>
          <div className="d-flex flex-wrap gap-3 fv-mt-5">
            <a href="#all-events" className="btn btn-sm fv-bg-brand-500 fv-text-ink-900 fv-heading-font fw-semibold">Browse events</a>
            <span className="d-inline-flex align-items-center gap-2 fv-text-sm fv-text-paper-200"><CalendarDays size={16}/>{upcoming.length} upcoming</span>
          </div>
        </div>
      </section>

      <section id="all-events" className="section-padding fv-grid-texture">
        <div className="container-wide">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-4 fv-mb-6">
            <div>
              <p className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-widest fv-text-brand-400 fv-mb-2">Across every fandom</p>
              <h2 className="fv-display-font fv-text-4xl fv-md-text-5xl fv-text-paper-50 fv-tracking-wide">Find your next event</h2>
              <p className="fv-text-paper-300 fv-mt-2">Open an event for its details, related videos, and audio.</p>
            </div>
            <div className="events-hub-controls">
              <label className="visually-hidden" htmlFor="events-category-filter">Filter by fandom</label>
              <select id="events-category-filter" className="form-select form-select-sm bg-dark text-light border-secondary events-hub-control" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                <option value="all">All fandoms</option>
                {categoryOptions.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
              </select>
              <label className="visually-hidden" htmlFor="events-status-filter">Filter by date</label>
              <select id="events-status-filter" className="form-select form-select-sm bg-dark text-light border-secondary events-hub-control" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">All dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
              <label className="visually-hidden" htmlFor="events-sort">Sort events</label>
              <select id="events-sort" className="form-select form-select-sm bg-dark text-light border-secondary events-hub-control" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                <option value="soonest">Soonest first</option>
                <option value="latest">Latest first</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 fv-mb-5" aria-label="Filter events by fandom">
            <button type="button" className={`events-filter-pill ${categoryFilter === 'all' ? 'active' : ''}`} aria-pressed={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>All</button>
            {categoryOptions.map((category) => (
              <button type="button" key={category.slug} className={`events-filter-pill ${categoryFilter === category.slug ? 'active' : ''}`} aria-pressed={categoryFilter === category.slug} onClick={() => setCategoryFilter(category.slug)}>{category.name}</button>
            ))}
          </div>

          {visibleEvents.length ? (
            <div className="fv-grid fv-grid-cols-1 fv-md-grid-cols-2 fv-xl-grid-cols-3 fv-gap-4">
              {visibleEvents.map((event) => {
                const category = categories.find((item) => item.slug === event.category);
                const status = getEventStatus(event);
                return (
                  <Link to={`/event/${event.id}`} key={event.id} className="events-hub-card fv-group rounded-4 overflow-hidden border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                    <div className="events-hub-card-image position-relative overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-105" loading="lazy" />
                      <span className="events-hub-status">{status}</span>
                      {category && <span className="events-hub-category" style={{ '--event-accent': category.accentColor }}>{category.name}</span>}
                    </div>
                    <div className="fv-p-4 fv-md-p-5">
                      <span className="d-flex align-items-center gap-2 fv-text-xs fv-text-brand-300"><CalendarDays size={14}/>{formatEventDate(event.date)}</span>
                      <h3 className="fv-heading-font fv-text-xl fv-font-semibold fv-text-paper-50 fv-leading-tight fv-mt-2 fv-group-hover-text-brand-400 fv-transition-colors">{event.title}</h3>
                      <p className="d-flex align-items-center gap-2 fv-text-xs fv-text-paper-300 fv-mt-2"><MapPin size={14} className="flex-shrink-0"/><span>{event.location}</span></p>
                      <p className="fv-text-sm fv-text-paper-300 fv-mt-3 fv-clamp-3">{event.description}</p>
                      <span className="d-inline-flex align-items-center gap-2 fv-text-sm fv-text-brand-400 fv-mt-4">Event details <ArrowUpRight size={16}/></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center fv-py-12 fv-bg-ink-800 rounded-3 border fv-border-ink-600">
              <p className="fv-text-paper-200">No events match these filters.</p>
              <button type="button" className="btn btn-sm btn-outline-light fv-mt-3" onClick={() => { setCategoryFilter('all'); setStatusFilter('all'); }}>Clear filters</button>
            </div>
          )}
        </div>
      </section>

      <EventMediaSection event={{ category: 'all' }}/>
    </div>
  );
}