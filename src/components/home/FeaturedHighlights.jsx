import { CalendarDays, Newspaper, Play, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import { events } from '@/data/events';
import { mediaItems } from '@/data/media';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { SectionHeader } from '@/components/ui/SectionHeader';

function getFeaturedItems() {
  const featuredArticle = [...articles]
    .filter((article) => article.featured)
    .sort((a, b) => b.date.localeCompare(a.date))[0] ?? articles[0];

  const featuredTrailer = mediaItems.find((item) => (
    item.type === 'trailer' && item.category !== featuredArticle.category
  )) ?? mediaItems.find((item) => item.type === 'trailer');

  const today = new Date().toISOString().slice(0, 10);
  const upcomingEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const featuredEvent = upcomingEvents.find((event) => (
    event.date >= today
    && event.category !== featuredArticle.category
    && event.category !== featuredTrailer?.category
  )) ?? upcomingEvents.find((event) => event.date >= today) ?? upcomingEvents[0];

  return [
    {
      id: featuredArticle.id,
      kind: 'Featured article',
      title: featuredArticle.title,
      description: featuredArticle.excerpt,
      image: featuredArticle.image,
      category: featuredArticle.category,
      date: featuredArticle.date,
      icon: Newspaper,
      link: `/article/${featuredArticle.slug}`,
      action: 'Read article',
    },
    {
      id: featuredTrailer.id,
      kind: 'Featured trailer',
      title: featuredTrailer.title,
      description: featuredTrailer.description,
      image: featuredTrailer.thumbnail,
      category: featuredTrailer.category,
      date: featuredTrailer.duration,
      icon: Play,
      link: '/#trailers',
      action: 'Browse trailers',
    },
    {
      id: featuredEvent.id,
      kind: 'Upcoming event',
      title: featuredEvent.title,
      description: featuredEvent.description,
      image: featuredEvent.image,
      category: featuredEvent.category,
      date: featuredEvent.date,
      icon: CalendarDays,
      link: `/event/${featuredEvent.id}`,
      action: 'Event details',
    },
  ];
}

function formatEventDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function FeaturedHighlights() {
  const items = getFeaturedItems();

  return (
    <section id="highlights" className="section-padding fv-bg-ink-800 fv-grid-texture">
      <div className="container-wide">
        <SectionHeader
          title="Featured Across the Fandoms"
          subtitle="A story to read, a trailer to catch, and an event coming up."
        />

        <div className="row g-4">
          {items.map((item) => {
            const Icon = item.icon;
            const detail = item.kind === 'Upcoming event'
              ? `${formatEventDate(item.date)} · ${item.description}`
              : item.kind === 'Featured trailer'
                ? `${item.date} · ${item.description}`
                : item.description;

            return (
              <div key={item.id} className="col-12 col-md-4">
                <Link
                  to={item.link}
                  className="featured-highlight-card fv-group d-flex flex-column h-100 overflow-hidden rounded-4 border fv-border-ink-600 fv-bg-ink-900 fv-hover-border-ink-500 fv-transition-all"
                  aria-label={`${item.action}: ${item.title}`}
                >
                  <div className="img-zoom position-relative fv-aspect-16-10 fv-bg-ink-700">
                    <img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover" loading="lazy" />
                    <div className="featured-highlight-image-overlay position-absolute fv-inset-0" />
                    <span className="position-absolute fv-top-3 fv-left-3 d-inline-flex align-items-center fv-gap-1 fv-px-2 fv-py-1 rounded-pill fv-bg-ink-900-80 fv-text-xs fv-heading-font fv-text-paper-50">
                      <Icon className="fv-w-3 fv-h-3" aria-hidden="true" />
                      {item.kind}
                    </span>
                    {item.kind === 'Featured trailer' && (
                      <span className="featured-play-indicator position-absolute rounded-pill fv-bg-brand-500-90 d-flex align-items-center justify-content-center fv-text-ink-900" aria-hidden="true">
                        <Play className="fv-w-5 fv-h-5 fv-fill-current" />
                      </span>
                    )}
                  </div>

                  <div className="flex-fill d-flex flex-column fv-p-4">
                    <CategoryBadge category={item.category} />
                    <h3 className="fv-mt-3 fv-mb-2 fv-heading-font fv-text-xl fv-text-paper-50 fv-leading-tight fv-clamp-2 fv-group-hover-text-brand-300 fv-transition-colors">
                      {item.title}
                    </h3>
                    <p className="fv-text-sm fv-text-paper-300 fv-leading-relaxed fv-clamp-2">{detail}</p>
                    <span className="d-inline-flex align-items-center fv-gap-1 fv-mt-auto fv-pt-3 fv-text-sm fv-heading-font fv-text-brand-300">
                      {item.action}
                      <ArrowUpRight className="fv-w-4 fv-h-4 fv-transition-transform fv-group-hover-translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
