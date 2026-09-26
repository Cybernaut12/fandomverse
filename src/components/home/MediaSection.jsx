import { useState } from 'react';
import { Play, Headphones, Mic, Users, Video } from 'lucide-react';
import { mediaItems } from '@/data/media';
import { categories } from '@/data/categories';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { MediaPlayButton } from '@/components/media/MediaPlayback';
const typeIcons = {
    trailer: <Play className="fv-w-4 fv-h-4"/>,
    interview: <Users className="fv-w-4 fv-h-4"/>,
    podcast: <Mic className="fv-w-4 fv-h-4"/>,
    'fan-content': <Video className="fv-w-4 fv-h-4"/>,
    audio: <Headphones className="fv-w-4 fv-h-4"/>,
};
const typeFilters = ['all', 'trailer', 'interview', 'podcast', 'fan-content', 'audio'];
export function MediaSection() {
    const [activeType, setActiveType] = useState('all');
    const [activeCategory, setActiveCategory] = useState('all');
    const filtered = mediaItems.filter((m) => {
        if (activeType !== 'all' && m.type !== activeType)
            return false;
        if (activeCategory !== 'all' && m.category !== activeCategory)
            return false;
        return true;
    });
    const main = filtered[0];
    const rest = filtered.slice(1, 7);
    return (<section id="trailers" className="section-padding fv-bg-ink-900">
      <div className="container-wide">
        <SectionHeader title="Watch & Listen" subtitle="Trailers, interviews, podcasts, and fan content from across the fandoms."/>

        {/* Filters */}
        <div className="d-flex flex-column fv-sm-flex-row fv-gap-4 fv-mb-8">
          <div className="d-flex flex-wrap gap-2">
            <span className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-50 fv-self-center fv-mr-1">Type:</span>
            {typeFilters.map((type) => (<button key={type} onClick={() => setActiveType(type)} className={`fv-px-3 fv-py-1 rounded-pill fv-text-xs fv-heading-font text-capitalize fv-transition-colors ${activeType === type
                ? 'fv-bg-brand-500 fv-text-ink-900'
                : 'fv-bg-ink-700 fv-text-paper-300 fv-hover-bg-ink-600'}`}>
                {type === 'all' ? 'All' : type.replace('-', ' ')}
              </button>))}
          </div>
          <div className="d-flex flex-wrap gap-2">
            <span className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-50 fv-self-center fv-mr-1">Category:</span>
            <button onClick={() => setActiveCategory('all')} className={`fv-px-3 fv-py-1 rounded-pill fv-text-xs fv-heading-font fv-transition-colors ${activeCategory === 'all' ? 'fv-bg-brand-500 fv-text-ink-900' : 'fv-bg-ink-700 fv-text-paper-300 fv-hover-bg-ink-600'}`}>
              All
            </button>
            {categories.map((cat) => (<button key={cat.slug} onClick={() => setActiveCategory(cat.slug)} className={`fv-px-3 fv-py-1 rounded-pill fv-text-xs fv-heading-font fv-transition-colors ${activeCategory === cat.slug ? 'fv-text-ink-900' : 'fv-bg-ink-700 fv-text-paper-300 fv-hover-bg-ink-600'}`} style={activeCategory === cat.slug ? { backgroundColor: cat.accentColor } : {}}>
                {cat.name}
              </button>))}
          </div>
        </div>

        {filtered.length === 0 ? (<p className="fv-text-paper-300-60 text-center fv-py-12">No media found for these filters.</p>) : (<div className="fv-grid fv-grid-cols-1 fv-lg-grid-cols-3 fv-gap-4">
            {/* Main media */}
            {main && <MediaCard item={main} large/>}
            {/* Rest */}
            {rest.map((item) => (<MediaCard key={item.id} item={item}/>))}
          </div>)}
      </div>
    </section>);
}
function MediaCard({ item, large }) {
    return (<div className={`fv-group position-relative rounded-4 overflow-hidden fv-cursor-pointer ${large ? 'fv-lg-col-span-2 fv-lg-row-span-2 fv-aspect-video fv-lg-aspect-16-10' : 'fv-aspect-video'}`}>
      <img src={item.thumbnail} alt={item.title} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-105" loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/anime/jjk-banner.jpg'; }}/>
      <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-30 fv-to-transparent"/>

      <MediaPlayButton item={item}/>


      {/* Duration badge */}
      <span className="position-absolute fv-top-3 fv-right-3 fv-bg-ink-900-80 fv-backdrop-blur-sm fv-text-paper-100 fv-text-xs fv-px-2 fv-py-0-5 fv-rounded fv-heading-font" style={{ top: '3.25rem' }}>
        {item.duration}
      </span>

      <BookmarkButton
        id={item.id}
        type="media"
        title={item.title}
        category={item.category}
        image={item.thumbnail}
        url="/#trailers"
        compact
      />

      {/* Type badge */}
      <span className="position-absolute fv-top-3 fv-left-3 fv-bg-ink-900-80 fv-backdrop-blur-sm fv-text-paper-100 fv-text-xs fv-px-2 fv-py-0-5 fv-rounded fv-heading-font text-capitalize d-flex align-items-center fv-gap-1">
        {typeIcons[item.type]}
        <span>{item.type.replace('-', ' ')}</span>
      </span>

      {/* Info */}
      <div className="position-absolute fv-bottom-0 fv-left-0 fv-right-0 fv-p-4 fv-md-p-5">
        <div className="fv-mb-2">
          <CategoryBadge category={item.category}/>
        </div>
        <h3 className={`fv-display-font fv-text-paper-50 fv-tracking-wide fv-leading-tight fv-clamp-2 ${large ? 'fv-text-2xl fv-md-text-3xl' : 'fv-text-lg'}`}>
          {item.title}
        </h3>
        {large && (<p className="fv-text-sm fv-text-paper-200 fv-mt-2 fv-clamp-2 fv-max-w-lg">{item.description}</p>)}
      </div>
    </div>);
}
