import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { events } from '@/data/events';
import { categories } from '@/data/categories';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { SectionHeader } from '@/components/ui/SectionHeader';
function formatDate(date) {
    const d = new Date(date);
    return {
        day: d.getDate().toString().padStart(2, '0'),
        month: d.toLocaleString('en-US', { month: 'short' }),
        year: d.getFullYear().toString(),
    };
}
export function EventsSection() {
    // Sort by date and take upcoming
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6);
    return (<section id="events" className="section-padding fv-bg-ink-900 fv-grid-texture">
      <div className="container-wide">
        <SectionHeader title="Events & Gatherings" subtitle="Conventions, festivals, tours, and premieres — where the fandoms come together in person."/>

        {/* Timeline-style layout */}
        <div className="position-relative">
          {/* Vertical line */}
          <div className="position-absolute fv-left-27px fv-md-left-39px fv-top-0 fv-bottom-0 fv-w-px fv-bg-ink-600"/>

          <div className="fv-space-y-4">
            {sorted.map((event) => {
            const cat = categories.find((c) => c.slug === event.category);
            const d = formatDate(event.date);
            return (<Link key={event.id} to={`/event/${event.id}`} className="fv-group position-relative d-flex fv-gap-4 fv-md-gap-6 align-items-start">
                  {/* Date d-block */}
                  <div className="position-relative flex-shrink-0 fv-w-14 fv-md-w-20 text-center rounded-3 fv-p-2 fv-md-p-3 border fv-z-10" style={{
                    backgroundColor: cat ? `${cat.accentColor}15` : 'fv-bg-ink-700',
                    borderColor: cat ? `${cat.accentColor}40` : '#3a3a52',
                }}>
                    <p className="fv-display-font fv-text-2xl fv-md-text-3xl fv-leading-none" style={{ color: cat?.accentColor }}>
                      {d.day}
                    </p>
                    <p className="fv-text-10px fv-md-text-xs fv-text-paper-300 fv-uppercase fv-heading-font fv-mt-0-5">
                      {d.month}
                    </p>
                    <p className="fv-text-10px fv-text-paper-300-50 fv-heading-font">{d.year}</p>
                  </div>

                  {/* Content */}
                  <div className="flex-fill fv-bg-ink-800 fv-group-hover-bg-ink-700 rounded-3 fv-p-4 border fv-border-ink-600 fv-group-hover-border-ink-500 fv-transition-all d-flex flex-column fv-sm-flex-row fv-gap-4">
                    <img src={event.image} alt={event.title} className="w-100 fv-sm-w-32 fv-h-32 fv-sm-h-24 rounded-2 object-fit-cover flex-shrink-0" loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/anime/jjk-banner.jpg'; }}/>
                    <div className="flex-fill ">
                      <div className="d-flex align-items-center gap-2 fv-mb-1-5">
                        <CategoryBadge category={event.category}/>
                      </div>
                      <h3 className="fv-heading-font fv-text-lg fv-font-semibold fv-text-paper-50 fv-group-hover-text-brand-400 fv-transition-colors fv-clamp-1">
                        {event.title}
                      </h3>
                      <p className="fv-text-sm fv-text-paper-300 fv-mt-1 d-flex align-items-center fv-gap-1-5">
                        <MapPin className="fv-w-3-5 fv-h-3-5 flex-shrink-0"/>
                        <span className="fv-clamp-1">{event.location}</span>
                      </p>
                      <p className="fv-text-xs fv-text-paper-300-60 fv-mt-1-5 fv-clamp-2 d-none fv-sm-block">
                        {event.description}
                      </p>
                    </div>
                    <ArrowUpRight className="fv-w-5 fv-h-5 fv-text-paper-300-30 fv-group-hover-text-brand-400 fv-group-hover-translate-x-1 fv-group-hover-translate-y-1 fv-transition-all flex-shrink-0 fv-self-center"/>
                  </div>
                </Link>);
        })}
          </div>
        </div>
      </div>
    </section>);
}
