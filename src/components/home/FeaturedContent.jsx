import { Link } from 'react-router-dom';
import { trendingItems } from '@/data/trendingItems';
import { TrendingArtwork } from '@/components/home/TrendingArtwork';
import { BookmarkButton } from '@/components/ui/BookmarkButton';

export function FeaturedContent() {
  return (
    <section id="featured" className="section-padding fv-bg-ink-900 fv-grid-texture">
      <div className="container-wide">
        <div className="d-flex align-items-end justify-content-between fv-mb-5">
          <div>
            <p className="fv-text-10px fv-uppercase fv-tracking-0-25em fv-text-brand-300 fv-mb-2">Fresh from the worlds</p>
            <h2 className="fv-display-font fv-text-4xl fv-md-text-5xl fv-text-paper-50 fv-tracking-wide">Trending This Week</h2>
          </div>
          <Link to="/trending" className="d-none fv-sm-block fv-text-xs fv-heading-font fv-text-paper-300 fv-hover-text-brand-300">View all</Link>
        </div>
        <div className="d-flex fv-gap-3 fv-overflow-x-auto fv-scrollbar-hidden fv-pb-3 fv-snap-x">
          {trendingItems.map((item, index) => (
            <div key={item.id} className="position-relative fv-min-w-132px fv-snap-start fv-sm-min-w-150px">
              <Link
                to={`/trending/${item.slug}`}
                className="fv-group d-block"
                aria-label={`Read about ${item.title}`}
              >
                <div className="position-relative fv-aspect-3-4 overflow-hidden fv-bg-ink-800">
                  <TrendingArtwork item={item} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-500 fv-group-hover-scale-105" />
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-black-80 fv-via-transparent fv-to-transparent" />
                  <span className="position-absolute fv-bottom-2 fv-left-2 fv-text-10px fv-heading-font fv-text-paper-50-70">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="fv-heading-font fv-text-xs fv-text-paper-100 fv-mt-2 fv-clamp-2 fv-group-hover-text-brand-300">{item.title}</h3>
                <p className="fv-text-10px fv-text-paper-300-55 fv-mt-1 text-capitalize">{item.category.replace('-', ' ')}</p>
              </Link>
              <BookmarkButton
                id={item.id}
                type="media"
                title={item.title}
                category={item.category}
                image={item.image}
                url={`/trending/${item.slug}`}
                compact
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
