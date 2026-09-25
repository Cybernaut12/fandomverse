import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { TrendingArtwork } from '@/components/home/TrendingArtwork';
import { trendingItems } from '@/data/trendingItems';

export function TrendingPage() {
  return (
    <section className="min-vh-100 fv-bg-ink-900 fv-pt-20">
      <div className="container-wide fv-py-10 fv-md-py-14">
        <Link to="/#featured" className="fv-mb-7 d-inline-flex align-items-center gap-2 fv-text-sm fv-text-paper-300 fv-transition-colors fv-hover-text-paper-50">
          <ArrowLeft className="fv-h-4 fv-w-4" /> Back to home
        </Link>
        <div className="fv-mb-8">
          <p className="fv-mb-2 fv-text-10px fv-uppercase fv-tracking-0-25em fv-text-brand-300">Fresh from the worlds</p>
          <h1 className="fv-display-font fv-text-4xl fv-tracking-wide fv-text-paper-50 fv-md-text-5xl">Trending This Week</h1>
          <p className="fv-mt-3 fv-max-w-2xl fv-text-sm fv-text-paper-300">This week’s picks across movies, anime, comics, games, TV, manga, and music.</p>
        </div>

        <div className="fv-grid fv-grid-cols-2 fv-gap-x-3 fv-gap-y-7 fv-sm-grid-cols-3 fv-sm-gap-x-4 fv-lg-grid-cols-4 fv-xl-grid-cols-5">
          {trendingItems.map((item) => (
            <div key={item.id} className="position-relative ">
              <Link to={`/trending/${item.slug}`} className="fv-group d-block" aria-label={`Read about ${item.title}`}>
                <div className="position-relative fv-aspect-3-4 overflow-hidden rounded-3 fv-bg-ink-800">
                  <TrendingArtwork item={item} className="h-100 w-100 object-fit-cover fv-transition-transform fv-duration-500 fv-group-hover-scale-105" />
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-black-80 fv-via-transparent fv-to-transparent" />
                </div>
                <h2 className="fv-mt-2 fv-clamp-2 fv-heading-font fv-text-sm fv-text-paper-100 fv-transition-colors fv-group-hover-text-brand-300">{item.title}</h2>
                <p className="fv-mt-1 fv-text-xs text-capitalize fv-text-paper-300-55">{item.category.replace('-', ' ')}</p>
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
