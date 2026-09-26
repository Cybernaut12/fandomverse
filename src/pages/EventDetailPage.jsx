import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { getEventById, getEventsByCategory } from '@/data/events';
import { getCategory } from '@/data/categories';
import { getArticlesByCategory } from '@/data/articles';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { EventMediaSection } from '@/components/event/EventMediaSection';
export function EventDetailPage() {
    const { id } = useParams();
    const event = id ? getEventById(id) : undefined;
    if (!event) {
        return (<div className="min-vh-100 d-flex align-items-center justify-content-center fv-bg-ink-900 fv-pt-20">
        <div className="text-center">
          <p className="fv-text-paper-300 fv-mb-4">Event not found.</p>
          <Link to="/" className="fv-text-brand-400 fv-hover-text-brand-300">Back home</Link>
        </div>
      </div>);
    }
    const cat = getCategory(event.category);
    const related = getEventsByCategory(event.category)
        .filter((e) => e.id !== event.id)
        .slice(0, 3);
    const relatedArticles = getArticlesByCategory(event.category).slice(0, 2);
    return (<div className="min-vh-100 fv-bg-ink-900 fv-pt-16">
      {/* Hero */}
      <section className="position-relative fv-h-50vh fv-min-h-350px d-flex align-items-end overflow-hidden">
        <img src={event.image} alt={event.title} className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover" fetchPriority="high"/>
        <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-70 fv-to-ink-900-30"/>
        {cat && <div className="position-absolute fv-inset-0 fv-opacity-20" style={{ background: `linear-gradient(to bottom, ${cat.accentColor}30, transparent 60%)` }}/>}
        <div className="position-relative container-wide fv-pb-12 fv-z-10">
          <Link to={`/category/${event.category}`} className="d-inline-flex align-items-center fv-gap-1 fv-text-sm fv-text-paper-300 fv-hover-text-paper-50 fv-mb-4 fv-transition-colors">
            <ArrowLeft className="fv-w-4 fv-h-4"/>
            Back to {cat?.name}
          </Link>
          <div className="d-flex align-items-center fv-gap-3 fv-mb-4">
            <CategoryBadge category={event.category} size="md"/>
          </div>
          <h1 className="fv-display-font fv-text-4xl fv-md-text-5xl fv-lg-text-6xl fv-text-paper-50 fv-tracking-wide fv-leading-tight fv-max-w-3xl fv-text-balance fv-text-shadow-lg">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Details */}
      <section className="fv-py-12 fv-md-py-16">
        <div className="container-narrow">
          <div className="fv-grid fv-grid-cols-1 fv-sm-grid-cols-2 fv-gap-4 fv-mb-8">
            <div className="fv-bg-ink-800 rounded-3 fv-p-5 border fv-border-ink-600">
              <div className="d-flex align-items-center gap-2 fv-text-paper-300-60 fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-mb-2">
                <Calendar className="fv-w-4 fv-h-4"/>
                <span>Date</span>
              </div>
              <p className="fv-text-paper-50 fv-heading-font fv-text-lg">
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="fv-bg-ink-800 rounded-3 fv-p-5 border fv-border-ink-600">
              <div className="d-flex align-items-center gap-2 fv-text-paper-300-60 fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-mb-2">
                <MapPin className="fv-w-4 fv-h-4"/>
                <span>Location</span>
              </div>
              <p className="fv-text-paper-50 fv-heading-font fv-text-lg">{event.location}</p>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between fv-mb-6 fv-pb-6 border-bottom fv-border-ink-600">
            <span className="fv-text-sm fv-text-paper-300 fv-heading-font">About this event</span>
            <BookmarkButton id={event.id} type="event" title={event.title} category={event.category} image={event.image} url={`/event/${event.id}`}/>
          </div>

          <p className="fv-text-paper-100 fv-text-lg fv-leading-relaxed fv-body-font" style={{ lineHeight: 1.8 }}>
            {event.description}
          </p>
        </div>
      </section>

      {/* Playable videos and audio */}
      <EventMediaSection key={event.id} event={event}/>

      {/* Related Events */}
      {related.length > 0 && (<section className="fv-py-12 fv-bg-ink-800 border-top fv-border-ink-600">
          <div className="container-wide">
            <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-6">More {cat?.name} Events</h2>
            <div className="fv-grid fv-grid-cols-1 fv-md-grid-cols-3 fv-gap-4">
              {related.map((rel) => (<Link key={rel.id} to={`/event/${rel.id}`} className="fv-group position-relative rounded-4 overflow-hidden fv-aspect-16-10">
                  <img src={rel.image} alt={rel.title} className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-105" loading="lazy"/>
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-40 fv-to-transparent"/>
                  <div className="position-absolute fv-bottom-0 fv-p-5">
                    <span className="fv-text-xs fv-heading-font" style={{ color: cat?.accentColor }}>
                      {new Date(rel.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <h3 className="fv-display-font fv-text-xl fv-text-paper-50 fv-tracking-wide fv-mt-1 fv-clamp-2 fv-group-hover-text-brand-400 fv-transition-colors">{rel.title}</h3>
                  </div>
                  <ArrowUpRight className="position-absolute fv-top-3 fv-right-3 fv-w-5 fv-h-5 fv-text-paper-50 fv-opacity-0 fv-group-hover-opacity-100 fv-transition-all"/>
                </Link>))}
            </div>
          </div>
        </section>)}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (<section className="fv-py-12 fv-bg-ink-900 border-top fv-border-ink-600">
          <div className="container-wide">
            <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-6">Related Articles</h2>
            <div className="fv-grid fv-grid-cols-1 fv-md-grid-cols-2 fv-gap-4">
              {relatedArticles.map((rel) => (<Link key={rel.id} to={`/article/${rel.slug}`} className="fv-group d-flex fv-gap-4 fv-bg-ink-800 fv-hover-bg-ink-700 rounded-3 fv-p-4 border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                  <img src={rel.image} alt={rel.title} className="fv-w-24 fv-h-24 rounded-2 object-fit-cover flex-shrink-0" loading="lazy"/>
                  <div className="">
                    <CategoryBadge category={rel.category}/>
                    <h3 className="fv-text-sm fv-heading-font fv-font-medium fv-text-paper-100 fv-mt-1-5 fv-clamp-2 fv-group-hover-text-brand-400 fv-transition-colors">{rel.title}</h3>
                  </div>
                </Link>))}
            </div>
          </div>
        </section>)}
    </div>);
}
