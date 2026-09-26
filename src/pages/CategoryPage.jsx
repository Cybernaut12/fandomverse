import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategory, categories } from '@/data/categories';
import { getArticlesByCategory } from '@/data/articles';
import { getCharactersByCategory } from '@/data/characters';
import { getEventsByCategory } from '@/data/events';
import { getMediaByCategory } from '@/data/media';
import { getMerchByCategory } from '@/data/merchandise';
import { getReleasesByCategory } from '@/data/releases';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Lightbox } from '@/components/Lightbox';
import { Plus, Check, Play, Headphones, Mic, Users, Video, ArrowUpRight, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState as useStateReact } from 'react';
import { MerchandiseDetailsDialog } from '@/components/MerchandiseDetailsDialog';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { MediaPlayButton } from '@/components/media/MediaPlayback';
import './CategoryPage.css';
const typeIcons = {
    trailer: <Play className="fv-w-4 fv-h-4"/>,
    interview: <Users className="fv-w-4 fv-h-4"/>,
    podcast: <Mic className="fv-w-4 fv-h-4"/>,
    'fan-content': <Video className="fv-w-4 fv-h-4"/>,
    audio: <Headphones className="fv-w-4 fv-h-4"/>,
};
export function CategoryPage() {
    const { slug } = useParams();
    const cat = slug ? getCategory(slug) : undefined;
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [contentTagFilter, setContentTagFilter] = useState('all');
  const [contentSort, setContentSort] = useState('featured');
  const sourceArticles = cat ? getArticlesByCategory(cat.slug) : [];
  const sourceChars = cat ? getCharactersByCategory(cat.slug) : [];
  const sourceEvents = cat ? getEventsByCategory(cat.slug) : [];
  const sourceMedia = cat ? getMediaByCategory(cat.slug) : [];
  const sourceMerch = cat ? getMerchByCategory(cat.slug) : [];
  const sourceReleases = cat ? getReleasesByCategory(cat.slug) : [];
  const allContent = [
    ...sourceArticles.map((item) => ({ item, kind: 'articles' })),
    ...sourceChars.map((item) => ({ item, kind: 'characters' })),
    ...sourceMedia.map((item) => ({ item, kind: 'media' })),
    ...sourceEvents.map((item) => ({ item, kind: 'events' })),
    ...sourceReleases.map((item) => ({ item, kind: 'releases' })),
    ...sourceMerch.map((item) => ({ item, kind: 'merchandise' })),
  ];
  const availableTags = [...new Set(allContent.flatMap(({ item }) => [
    ...(Array.isArray(item.tags) ? item.tags : []),
    ...(Array.isArray(item.traits) ? item.traits : []),
    item.type,
    item.status,
  ]).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const filterContent = (items, kind) => filterAndSortCategoryItems(items, kind, contentTagFilter, contentSort);
  const articles = filterContent(sourceArticles, 'articles');
  const chars = filterContent(sourceChars, 'characters');
  const evts = filterContent(sourceEvents, 'events');
  const media = filterContent(sourceMedia, 'media');
  const merch = filterContent(sourceMerch, 'merchandise');
  const rels = filterContent(sourceReleases, 'releases');
  const showContentType = (kind) => contentTypeFilter === 'all' || contentTypeFilter === kind;
  const galleryImages = useMemo(() => {
    const imgs = [];
    articles.forEach((a) => imgs.push({ url: a.image, alt: a.title }));
    chars.forEach((c) => imgs.push({ url: c.image, alt: c.altText }));
    evts.forEach((e) => imgs.push({ url: e.image, alt: e.title }));
    media.forEach((m) => imgs.push({ url: m.thumbnail, alt: m.title }));
    return imgs.slice(0, 10);
  }, [articles, chars, evts, media]);
    if (!cat) {
        return (<div className="min-vh-100 d-flex align-items-center justify-content-center fv-bg-ink-900 fv-pt-20">
        <div className="text-center">
          <p className="fv-text-paper-300 fv-mb-4">Category not found.</p>
          <Link to="/" className="fv-text-brand-400 fv-hover-text-brand-300">Back home</Link>
        </div>
      </div>);
    }
    // Other categories for nav
    const otherCats = categories.filter((c) => c.slug !== cat.slug);
    return (<div className="min-vh-100 fv-bg-ink-900 fv-pt-16">
      {/* Category Hero */}
      <section className="position-relative fv-h-50vh fv-min-h-400px d-flex align-items-end overflow-hidden">
        <img src={cat.image} alt={cat.name} className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover" fetchPriority="high"/>
        <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-60 fv-to-ink-900-20"/>
        <div className="position-absolute fv-inset-0 fv-opacity-30" style={{ background: `linear-gradient(to bottom, ${cat.accentColor}20, transparent 50%)` }}/>
        <div className="position-relative container-wide fv-pb-12 fv-z-10">
          <div className="d-flex align-items-center gap-2 fv-mb-3">
            <span className="fv-w-3 fv-h-3 rounded-pill" style={{ backgroundColor: cat.accentColor }}/>
            <span className="fv-text-sm fv-heading-font fv-uppercase fv-tracking-widest fv-text-paper-300">
              {cat.tagline}
            </span>
          </div>
          <h1 className="fv-display-font fv-text-6xl fv-md-text-7xl fv-lg-text-8xl fv-text-paper-50 fv-tracking-wide fv-leading-none fv-text-shadow-lg">
            {cat.name}
          </h1>
          <p className="fv-mt-4 fv-text-lg fv-text-paper-200 fv-max-w-2xl">{cat.description}</p>

          {/* Quick nav to other categories */}
          <div className="fv-mt-6 d-flex flex-wrap gap-2">
            {otherCats.map((oc) => (<Link key={oc.slug} to={`/category/${oc.slug}`} className="fv-text-xs fv-heading-font fv-text-paper-300 fv-hover-text-paper-50 fv-transition-colors fv-px-3 fv-py-1 rounded-pill fv-bg-ink-800-60 fv-backdrop-blur-sm border fv-border-ink-600">
                {oc.name}
              </Link>))}
          </div>
        </div>
      </section>

      {/* Latest Articles heading and category-wide content filters */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="category-latest-toolbar">
            <h2 className="fv-display-font fv-text-4xl fv-md-text-5xl fv-lg-text-6xl fv-text-paper-50 fv-tracking-wide fv-leading-none">
              Latest Articles
            </h2>
            <div className="category-content-controls" role="group" aria-label="Filter category content">
              <div className="category-content-control-group">
                <label htmlFor="category-content-type" className="form-label fv-text-xs fv-heading-font fv-text-paper-300">Content type</label>
                <select id="category-content-type" className="form-select form-select-sm bg-dark text-light border-secondary category-content-control" value={contentTypeFilter} onChange={(event) => setContentTypeFilter(event.target.value)}>
                  <option value="all">All content</option>
                  <option value="articles">Articles</option>
                  <option value="characters">Characters</option>
                  <option value="media">Videos &amp; audio</option>
                  <option value="gallery">Image gallery</option>
                  <option value="events">Events</option>
                  <option value="releases">Upcoming releases</option>
                  <option value="merchandise">Merchandise</option>
                </select>
              </div>
              <div className="category-content-control-group">
                <label htmlFor="category-content-tag" className="form-label fv-text-xs fv-heading-font fv-text-paper-300">Topic or tag</label>
                <select id="category-content-tag" className="form-select form-select-sm bg-dark text-light border-secondary category-content-control" value={contentTagFilter} onChange={(event) => setContentTagFilter(event.target.value)}>
                  <option value="all">All topics</option>
                  {availableTags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
                </select>
              </div>
              <div className="category-content-control-group">
                <label htmlFor="category-content-sort" className="form-label fv-text-xs fv-heading-font fv-text-paper-300">Sort by</label>
                <select id="category-content-sort" className="form-select form-select-sm bg-dark text-light border-secondary category-content-control" value={contentSort} onChange={(event) => setContentSort(event.target.value)}>
                  <option value="featured">Featured first</option>
                  <option value="newest">Newest</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
              {(contentTypeFilter !== 'all' || contentTagFilter !== 'all' || contentSort !== 'featured') && (
                <button type="button" className="btn btn-sm btn-outline-light" onClick={() => { setContentTypeFilter('all'); setContentTagFilter('all'); setContentSort('featured'); }}>Reset</button>
              )}
            </div>
          </div>
          {showContentType('articles') && articles.length > 0 && (
            <div className="fv-grid fv-grid-cols-1 fv-md-grid-cols-3 fv-gap-4">
              {articles.map((article, i) => (<Link key={article.id} to={`/article/${article.slug}`} className={`fv-group position-relative rounded-4 overflow-hidden ${i === 0 ? 'fv-md-col-span-2 fv-aspect-16-10' : 'fv-aspect-16-10'}`}>
                  <img src={article.image} alt={article.title} className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-105" loading="lazy"/>
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-40 fv-to-transparent"/>
                  <div className="position-absolute fv-bottom-0 fv-p-5">
                    <span className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-mb-2 d-block" style={{ color: cat.accentColor }}>
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 className={`fv-display-font fv-text-paper-50 fv-tracking-wide fv-leading-tight fv-clamp-2 fv-group-hover-text-brand-400 fv-transition-colors ${i === 0 ? 'fv-text-2xl fv-md-text-3xl' : 'fv-text-xl'}`}>
                      {article.title}
                    </h3>
                    <p className="fv-text-sm fv-text-paper-200 fv-mt-2 fv-clamp-2 d-none fv-md-block">{article.excerpt}</p>
                  </div>
                </Link>))}
            </div>
          )}
        </div>
      </section>
      {/* Characters */}
      {showContentType('characters') && chars.length > 0 && (<section className="section-padding fv-bg-ink-800">
          <div className="container-wide">
            <SectionHeader title="Characters" subtitle={`Faces from the world of ${cat.name}`}/>
            <div className="fv-grid fv-grid-cols-2 fv-md-grid-cols-3 fv-lg-grid-cols-5 fv-gap-3 fv-md-gap-4">
              {chars.map((char) => (<Link key={char.id} to={`/character/${char.id}`} className="fv-group position-relative rounded-4 overflow-hidden fv-aspect-3-4">
                  <img src={char.image} alt={char.altText} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-20 fv-to-transparent"/>
                  <div className="position-absolute fv-bottom-0 fv-p-3">
                    <h3 className="fv-display-font fv-text-lg fv-text-paper-50 fv-tracking-wide fv-leading-tight">{char.name}</h3>
                    <p className="fv-text-xs fv-text-paper-300 fv-mt-0-5 fv-clamp-1">{char.series}</p>
                  </div>
                </Link>))}
            </div>
          </div>
        </section>)}

      {/* Media */}
      {showContentType('media') && media.length > 0 && (<MediaCategorySection media={media} cat={cat}/>)}

      {/* Gallery */}
      {(contentTypeFilter === 'all' || contentTypeFilter === 'gallery') && galleryImages.length > 0 && (<GalleryCategorySection images={galleryImages} cat={cat}/>)}

      {/* Events */}
      {showContentType('events') && evts.length > 0 && (<section className="section-padding">
          <div className="container-wide">
            <SectionHeader title="Events" subtitle={`Gatherings and happenings in ${cat.name}`}/>
            <div className="fv-space-y-3">
              {evts.map((event) => {
                const d = new Date(event.date);
                return (<Link key={event.id} to={`/event/${event.id}`} className="fv-group d-flex flex-column fv-sm-flex-row fv-gap-4 fv-bg-ink-800 fv-hover-bg-ink-700 rounded-3 fv-p-4 border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                    <img src={event.image} alt={event.title} className="w-100 fv-sm-w-32 fv-h-32 fv-sm-h-24 rounded-2 object-fit-cover flex-shrink-0" loading="lazy"/>
                    <div className="flex-fill ">
                      <div className="d-flex align-items-center gap-2 fv-mb-1">
                        <span className="fv-text-xs fv-heading-font" style={{ color: cat.accentColor }}>
                          {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="fv-heading-font fv-text-lg fv-font-semibold fv-text-paper-50 fv-group-hover-text-brand-400 fv-transition-colors fv-clamp-1">
                        {event.title}
                      </h3>
                      <p className="fv-text-sm fv-text-paper-300 fv-mt-1 d-flex align-items-center fv-gap-1-5">
                        <MapPin className="fv-w-3-5 fv-h-3-5 flex-shrink-0"/>
                        <span className="fv-clamp-1">{event.location}</span>
                      </p>
                      <p className="fv-text-xs fv-text-paper-300-60 fv-mt-1 fv-clamp-2">{event.description}</p>
                    </div>
                    <ArrowUpRight className="fv-w-5 fv-h-5 fv-text-paper-300-30 fv-group-hover-text-brand-400 fv-transition-all flex-shrink-0 fv-self-center"/>
                  </Link>);
            })}
            </div>
          </div>
        </section>)}

      {/* Releases */}
      {showContentType('releases') && rels.length > 0 && (<section className="section-padding fv-bg-ink-800">
          <div className="container-wide">
            <SectionHeader title="Upcoming Releases" subtitle={`What's next in ${cat.name}`}/>
            <div className="fv-grid fv-grid-cols-2 fv-sm-grid-cols-3 fv-lg-grid-cols-5 fv-gap-3">
              {rels.map((rel) => {
                const d = new Date(rel.date);
                return (<div key={rel.id} className="fv-group position-relative rounded-3 overflow-hidden fv-bg-ink-700 border fv-border-ink-600">
                    <div className="position-relative fv-aspect-3-4 overflow-hidden">
                      <img src={rel.image} alt={rel.title} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
                      <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-30 fv-to-transparent"/>
                      <div className="position-absolute fv-top-2 fv-left-2 fv-bg-ink-900-80 fv-backdrop-blur-sm rounded-2 fv-px-2 fv-py-1 text-center">
                        <p className="fv-display-font fv-text-lg fv-leading-none" style={{ color: cat.accentColor }}>{d.getDate().toString().padStart(2, '0')}</p>
                        <p className="fv-text-9px fv-text-paper-300 fv-uppercase fv-heading-font">{d.toLocaleString('en-US', { month: 'short' })}</p>
                      </div>
                      <span className={`position-absolute fv-top-2 fv-right-2 fv-text-10px fv-px-2 fv-py-0-5 rounded-pill fv-heading-font fv-font-medium ${rel.status === 'confirmed' ? 'fv-text-gaming fv-bg-gaming-20' : rel.status === 'rumored' ? 'fv-text-tv fv-bg-tv-20' : 'fv-text-movies fv-bg-movies-20'}`}>
                        {rel.status}
                      </span>
                      <div className="position-absolute fv-bottom-0 fv-p-3">
                        <h3 className="fv-heading-font fv-text-sm fv-font-semibold fv-text-paper-50 fv-clamp-2 fv-leading-tight">{rel.title}</h3>
                        <p className="fv-text-10px fv-text-paper-300-60 fv-mt-0-5">{rel.type}</p>
                      </div>
                    </div>
                  </div>);
            })}
            </div>
          </div>
        </section>)}

      {/* Merchandise */}
      {showContentType('merchandise') && merch.length > 0 && (<MerchCategorySection merch={merch} cat={cat}/>)}
    </div>);
}
function filterAndSortCategoryItems(items, kind, tag, sort) {
  const tagged = tag === 'all' ? items : items.filter((item) => {
    const facets = [
      ...(Array.isArray(item.tags) ? item.tags : []),
      ...(Array.isArray(item.traits) ? item.traits : []),
      item.type,
      item.status,
    ].filter(Boolean).map((value) => String(value).toLowerCase());
    return facets.includes(tag.toLowerCase());
  });
  return [...tagged].sort((a, b) => {
    if (sort === 'alphabetical') return (a.title || a.name || '').localeCompare(b.title || b.name || '');
    if (sort === 'newest') return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
    if (kind === 'articles' && a.featured !== b.featured) return a.featured ? -1 : 1;
    return (a.title || a.name || '').localeCompare(b.title || b.name || '');
  });
}
// Sub-components for media and gallery sections
function MediaCategorySection({ media, cat }) {
    const [activeType, setActiveType] = useState('all');
    const filtered = activeType === 'all' ? media : media.filter((m) => m.type === activeType);
    const types = ['all', ...new Set(media.map((m) => m.type))];
    return (<section className="section-padding">
      <div className="container-wide">
        <SectionHeader title="Watch & Listen" subtitle={`Videos and audio from ${cat.name}`}/>
        <div className="d-flex flex-wrap gap-2 fv-mb-6">
          {types.map((type) => (<button key={type} onClick={() => setActiveType(type)} className={`fv-px-3 fv-py-1 rounded-pill fv-text-xs fv-heading-font text-capitalize fv-transition-colors ${activeType === type ? 'fv-text-ink-900' : 'fv-bg-ink-700 fv-text-paper-300 fv-hover-bg-ink-600'}`} style={activeType === type ? { backgroundColor: cat.accentColor } : {}}>
              {type === 'all' ? 'All' : type.replace('-', ' ')}
            </button>))}
        </div>
        <div className="fv-grid fv-grid-cols-1 fv-md-grid-cols-2 fv-lg-grid-cols-3 fv-gap-4">
          {filtered.map((item) => (<div key={item.id} className="fv-group position-relative rounded-4 overflow-hidden fv-aspect-video fv-cursor-pointer">
              <img src={item.thumbnail} alt={item.title} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-105" loading="lazy"/>
              <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-30 fv-to-transparent"/>
              <MediaPlayButton item={item}/>

              <span className="position-absolute fv-top-3 fv-right-3 fv-bg-ink-900-80 fv-text-paper-100 fv-text-xs fv-px-2 fv-py-0-5 fv-rounded fv-heading-font" style={{ top: '3.25rem' }}>{item.duration}</span>
              <BookmarkButton id={item.id} type="media" title={item.title} category={item.category} image={item.thumbnail} url="/#trailers" compact />
              <span className="position-absolute fv-top-3 fv-left-3 fv-bg-ink-900-80 fv-text-paper-100 fv-text-xs fv-px-2 fv-py-0-5 fv-rounded fv-heading-font text-capitalize d-flex align-items-center fv-gap-1">
                {typeIcons[item.type]}
                <span>{item.type.replace('-', ' ')}</span>
              </span>
              <div className="position-absolute fv-bottom-0 fv-p-4">
                <h3 className="fv-display-font fv-text-lg fv-text-paper-50 fv-tracking-wide fv-leading-tight fv-clamp-2">{item.title}</h3>
                <p className="fv-text-xs fv-text-paper-200 fv-mt-1 fv-clamp-1">{item.description}</p>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
function GalleryCategorySection({ images, cat }) {
    const [lightboxIndex, setLightboxIndex] = useStateReact(null);
    return (<section className="section-padding fv-bg-ink-800">
      <div className="container-wide">
        <SectionHeader title="Gallery" subtitle={`A visual tour of ${cat.name}`}/>
        <div className="fv-grid fv-grid-cols-2 fv-md-grid-cols-4 gap-2 fv-md-gap-3">
          {images.map((img, i) => (<button key={i} onClick={() => setLightboxIndex(i)} className={`fv-group position-relative rounded-3 overflow-hidden ${i === 0 ? 'fv-col-span-2 fv-row-span-2 fv-aspect-square' : i === 3 ? 'fv-col-span-2 fv-aspect-2-1' : 'fv-aspect-square'}`} aria-label={`Open image: ${img.alt}`}>
              <img src={img.url} alt={img.alt} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
              <div className="position-absolute fv-inset-0 fv-bg-ink-900-0 fv-group-hover-bg-ink-900-30 fv-transition-colors"/>
            </button>))}
        </div>
      </div>
      {lightboxIndex !== null && (<Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex}/>)}
    </section>);
}
function MerchCategorySection({ merch, cat }) {
    const { addItem } = useCart();
    const [addedIds, setAddedIds] = useStateReact(new Set());
    const [selectedProduct, setSelectedProduct] = useStateReact(null);
    const handleAdd = (id) => {
        const item = merch.find((m) => m.id === id);
        if (item) {
            addItem(item);
            setAddedIds((prev) => new Set(prev).add(id));
            setTimeout(() => {
                setAddedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
            }, 1500);
        }
    };
    return (<section id="merchandise" className="section-padding">
      <div className="container-wide">
        <SectionHeader title="Merchandise" subtitle={`Gear and collectibles from ${cat.name}`}/>
        <div className="fv-grid fv-grid-cols-2 fv-md-grid-cols-3 fv-lg-grid-cols-4 fv-gap-4">
          {merch.map((item) => {
            const isAdded = addedIds.has(item.id);
            return (<div key={item.id} className="fv-group fv-bg-ink-800 rounded-3 overflow-hidden border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                <div className="position-relative fv-aspect-square overflow-hidden fv-bg-ink-700">
                  <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
                  <span className="position-absolute fv-top-2 fv-left-2 fv-text-10px fv-px-2 fv-py-0-5 rounded-pill fv-heading-font fv-uppercase fv-tracking-wider fv-bg-ink-900-70 fv-backdrop-blur-sm" style={{ color: cat.accentColor }}>{item.type}</span>
                </div>
                <div className="fv-p-4">
                  <h3 className="fv-text-sm fv-heading-font fv-font-medium fv-text-paper-50 fv-clamp-2 fv-leading-tight">{item.name}</h3>
                  <p className="fv-text-xs fv-text-paper-300-60 fv-mt-1 fv-clamp-2">{item.description}</p>
                  <button type="button" onClick={() => setSelectedProduct(item)} className="fv-mt-2 fv-text-xs fv-heading-font fv-text-brand-300 fv-hover-text-brand-200 text-decoration-underline">
                    View product details
                  </button>
                  <div className="d-flex align-items-center justify-content-between fv-mt-3">
                    <span className="fv-text-lg fv-display-font fv-text-brand-400">${item.price}</span>
                    <button onClick={() => handleAdd(item.id)} disabled={isAdded} className={`fv-p-2 rounded-3 fv-transition-all fv-active-scale-90 ${isAdded ? 'fv-bg-gaming fv-text-ink-900' : 'fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900'}`} aria-label={`Add ${item.name} to cart`}>
                      {isAdded ? <Check className="fv-w-4 fv-h-4"/> : <Plus className="fv-w-4 fv-h-4"/>}
                    </button>
                  </div>
                </div>
              </div>);
        })}
        </div>
      </div>
      <MerchandiseDetailsDialog
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(item) => handleAdd(item.id)}
      />
    </section>);
}

