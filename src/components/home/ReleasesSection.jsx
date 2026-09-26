import { releases } from '@/data/releases';
import { categories } from '@/data/categories';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
const statusStyles = {
    confirmed: { label: 'Confirmed', color: '#00d97e', bg: '#00d97e20' },
    upcoming: { label: 'Upcoming', color: '#c9a227', bg: '#c9a22720' },
    rumored: { label: 'Rumored', color: '#e76f51', bg: '#e76f5120' },
};
export function ReleasesSection() {
    const sorted = [...releases].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 10);
    return (<section id="releases" className="section-padding fv-bg-ink-800">
      <div className="container-wide">
        <SectionHeader title="Release Calendar" subtitle="What's coming next — across anime, games, movies, TV, K-Pop, comics, and manga."/>

        <div className="fv-grid fv-grid-cols-2 fv-sm-grid-cols-3 fv-md-grid-cols-5 fv-gap-3 fv-md-gap-4">
          {sorted.map((release) => {
            const cat = categories.find((c) => c.slug === release.category);
            const status = statusStyles[release.status];
            const d = new Date(release.date);
            return (<div key={release.id} className="fv-group position-relative rounded-3 overflow-hidden fv-bg-ink-700 border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                <div className="position-relative fv-aspect-3-4 overflow-hidden">
                  <img src={release.image} alt={release.title} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/anime/jjk-banner.jpg'; }}/>
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-30 fv-to-transparent"/>

                  {/* Date badge */}
                  <div className="position-absolute fv-top-2 fv-left-2 fv-bg-ink-900-80 fv-backdrop-blur-sm rounded-2 fv-px-2 fv-py-1 text-center">
                    <p className="fv-display-font fv-text-lg fv-leading-none" style={{ color: cat?.accentColor }}>
                      {d.getDate().toString().padStart(2, '0')}
                    </p>
                    <p className="fv-text-9px fv-text-paper-300 fv-uppercase fv-heading-font">
                      {d.toLocaleString('en-US', { month: 'short' })}
                    </p>
                  </div>

                  {/* Status badge */}
                  {status && (<span className="position-absolute fv-top-2 fv-right-2 fv-text-10px fv-px-2 fv-py-0-5 rounded-pill fv-heading-font fv-font-medium" style={{ color: status.color, backgroundColor: status.bg }}>
                      {status.label}
                    </span>)}

                  {/* Info */}
                  <div className="position-absolute fv-bottom-0 fv-left-0 fv-right-0 fv-p-3">
                    <CategoryBadge category={release.category}/>
                    <h3 className="fv-heading-font fv-text-sm fv-font-semibold fv-text-paper-50 fv-mt-1-5 fv-clamp-2 fv-leading-tight">
                      {release.title}
                    </h3>
                    <p className="fv-text-10px fv-text-paper-300-60 fv-mt-0-5">{release.type}</p>
                  </div>
                </div>
              </div>);
        })}
        </div>
      </div>
    </section>);
}
