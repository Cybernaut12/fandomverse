import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/categories';
export function CategoryDiscovery() {
    return (<section id="categories" className="section-padding fv-bg-ink-900">
      <div className="container-wide">
        <div className="fv-mb-10">
          <p className="fv-text-sm fv-heading-font fv-uppercase fv-tracking-widest fv-text-brand-400 fv-mb-2">
            Seven Worlds
          </p>
          <h2 className="fv-display-font fv-text-5xl fv-md-text-6xl fv-text-paper-50 fv-tracking-wide">
            Pick Your Universe
          </h2>
        </div>

        <div className="fv-scrollbar-hidden fv-mx-4 fv-grid fv-grid-flow-col fv-auto-cols-minmax-9rem-1fr fv-snap-x fv-gap-3 fv-overflow-x-auto fv-px-4 fv-pb-2 fv-sm-mx-0 fv-sm-gap-4 fv-sm-px-0">
          {categories.map((cat) => (<Link key={cat.slug} to={`/category/${cat.slug}`} className="fv-group position-relative fv-aspect-4-5 fv-min-w-0 fv-snap-start rounded-4 overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
              <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-45 fv-to-ink-900-5"/>
              <div className="position-absolute fv-inset-0 fv-opacity-0 fv-group-hover-opacity-100 fv-transition-opacity fv-duration-300" style={{ background: `linear-gradient(to top, ${cat.accentColor}40, transparent 50%)` }}/>
              <div className="position-absolute fv-bottom-0 fv-left-0 fv-right-0 fv-p-3 fv-sm-p-4">
                <span className="d-inline-block fv-w-2-5 fv-h-2-5 rounded-pill fv-mb-1-5" style={{ backgroundColor: cat.accentColor }}/>
                <h3 className="fv-display-font fv-text-lg fv-sm-text-xl fv-xl-text-2xl fv-text-paper-50 fv-tracking-wide fv-leading-tight">
                  {cat.name}
                </h3>
                <p className="fv-text-10px fv-sm-text-xs fv-text-paper-200 fv-mt-1 fv-clamp-2">
                  {cat.tagline}
                </p>
                <div className="d-flex align-items-center fv-gap-1 fv-mt-2 fv-text-10px fv-sm-text-xs fv-heading-font fv-text-paper-200 fv-group-hover-text-paper-50 fv-transition-colors">
                  <span>Explore</span>
                  <ArrowUpRight className="fv-w-3-5 fv-h-3-5 fv-group-hover-translate-x-1 fv-group-hover-translate-y-1 fv-transition-transform"/>
                </div>
              </div>
            </Link>))}
        </div>
      </div>
    </section>);
}
