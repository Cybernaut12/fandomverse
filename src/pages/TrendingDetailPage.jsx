import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Film } from 'lucide-react';
import { TrendingArtwork } from '@/components/home/TrendingArtwork';
import { getTrendingItemBySlug, trendingItems } from '@/data/trendingItems';

export function TrendingDetailPage() {
  const { slug } = useParams();
  const item = slug ? getTrendingItemBySlug(slug) : undefined;

  if (!item) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center fv-bg-ink-900 fv-pt-20">
        <div className="text-center">
          <p className="fv-text-paper-300 fv-mb-4">Trending item not found.</p>
          <Link to="/#featured" className="fv-text-brand-400 fv-hover-text-brand-300">Back to trending</Link>
        </div>
      </div>
    );
  }

  const related = trendingItems.filter((relatedItem) => relatedItem.slug !== item.slug).slice(0, 4);

  return (
    <article className="min-vh-100 fv-bg-ink-900 fv-pt-16">
      <section className="position-relative fv-h-60vh fv-min-h-400px d-flex align-items-end overflow-hidden">
        <TrendingArtwork key={item.id} item={item} loading="eager" className="position-absolute fv-inset-0 h-100 w-100 object-fit-cover" />
        <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-70 fv-to-ink-900-30" />
        <div className="position-relative fv-z-10 container-wide fv-pb-12">
          <Link to="/#featured" className="d-inline-flex align-items-center gap-2 fv-text-sm fv-text-paper-300 fv-hover-text-paper-50 fv-mb-4 fv-transition-colors">
            <ArrowLeft className="fv-h-4 fv-w-4" /> Back to trending
          </Link>
          <div className="fv-mb-4 d-flex align-items-center fv-gap-3">
            <span className="rounded-pill border fv-border-brand-300-50 fv-bg-ink-900-70 fv-px-3 fv-py-1 fv-text-xs fv-uppercase fv-tracking-0-16em fv-text-brand-300 text-capitalize">
              {item.category.replace('-', ' ')}
            </span>
            <span className="d-flex align-items-center fv-gap-1-5 fv-text-sm fv-text-paper-300">
              <CalendarDays className="fv-h-3-5 fv-w-3-5" /> Trending this week
            </span>
          </div>
          <h1 className="fv-max-w-4xl fv-display-font fv-text-4xl fv-leading-tight fv-tracking-wide fv-text-paper-50 fv-sm-text-5xl fv-lg-text-6xl">{item.title}</h1>
          <p className="fv-mt-4 fv-max-w-2xl fv-text-lg fv-text-paper-200">{item.excerpt}</p>
        </div>
      </section>

      <section className="container-narrow fv-py-12 fv-md-py-16">
        <div className="fv-mb-8 d-flex align-items-center gap-2 border-bottom fv-border-ink-600 fv-pb-5 fv-text-sm fv-uppercase fv-tracking-0-18em fv-text-brand-300">
          <Film className="fv-h-4 fv-w-4" /> The story
        </div>
        <div>
          {item.overview.map((paragraph) => (
            <p key={paragraph} className="fv-mb-6 fv-body-font fv-text-lg fv-leading-relaxed fv-text-paper-100">{paragraph}</p>
          ))}
        </div>

        <div className="fv-mt-10 fv-grid fv-gap-3 border-top fv-border-ink-600 fv-pt-8 fv-sm-grid-cols-2">
          {item.facts.map((fact) => (
            <div key={fact.label} className="rounded-3 border fv-border-ink-600 fv-bg-ink-800-70 fv-p-4">
              <p className="fv-text-10px fv-uppercase fv-tracking-0-2em fv-text-brand-300">{fact.label}</p>
              <p className="fv-mt-2 fv-text-sm fv-text-paper-100">{fact.value}</p>
            </div>
          ))}
        </div>
        <p className="fv-mt-6 fv-text-xs fv-text-paper-300-55">Overview based on the Wikipedia article: {item.wikipedia}.</p>
      </section>

      <section className="border-top fv-border-ink-600 fv-bg-ink-800-70 fv-py-12">
        <div className="container-wide">
          <h2 className="fv-mb-6 fv-display-font fv-text-3xl fv-tracking-wide fv-text-paper-50">More from the fandoms</h2>
          <div className="d-flex fv-snap-x fv-gap-3 fv-overflow-x-auto fv-scrollbar-hidden fv-pb-3">
            {related.map((relatedItem) => (
              <Link key={relatedItem.id} to={`/trending/${relatedItem.slug}`} className="fv-group fv-min-w-132px fv-snap-start fv-sm-min-w-150px">
                <div className="position-relative fv-aspect-3-4 overflow-hidden fv-bg-ink-800">
                  <TrendingArtwork item={relatedItem} className="h-100 w-100 object-fit-cover fv-transition-transform fv-duration-500 fv-group-hover-scale-105" />
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-black-80 fv-via-transparent fv-to-transparent" />
                </div>
                <h3 className="fv-mt-2 fv-clamp-2 fv-heading-font fv-text-xs fv-text-paper-100 fv-group-hover-text-brand-300">{relatedItem.title}</h3>
                <p className="fv-mt-1 fv-text-10px text-capitalize fv-text-paper-300-55">{relatedItem.category.replace('-', ' ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
