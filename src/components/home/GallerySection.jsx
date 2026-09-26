import { useState } from 'react';
import galleryImages from '@/data/gallery.json';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Lightbox } from '@/components/Lightbox';

const categoryOrder = ['movies', 'manga', 'comics', 'tv-shows', 'anime', 'k-pop'];
const categoryLabels = { movies: 'Movies', manga: 'Manga', comics: 'Comics', 'tv-shows': 'TV Shows', anime: 'Anime', 'k-pop': 'K-Pop' };

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const groups = categoryOrder.map((category) => galleryImages
    .filter((item) => item.category === category)
    .map((item) => ({ ...item, url: item.image || item.url, alt: item.title || item.alt || categoryLabels[category], kind: categoryLabels[category] }))
    .filter((item) => item.url));
  const images = Array.from({ length: Math.max(...groups.map((group) => group.length), 0) }, (_, row) =>
    groups.flatMap((group) => group[row] ? [group[row]] : [])
  ).flat().slice(0, 12);
  const layoutClasses = [
    'fv-col-span-2 fv-row-span-2 fv-aspect-square', 'fv-col-span-1 fv-aspect-square',
    'fv-col-span-1 fv-aspect-square', 'fv-col-span-2 fv-aspect-2-1',
    'fv-col-span-1 fv-aspect-square', 'fv-col-span-1 fv-aspect-square',
    'fv-col-span-1 fv-row-span-2 fv-aspect-1-2', 'fv-col-span-1 fv-aspect-square',
    'fv-col-span-2 fv-aspect-2-1', 'fv-col-span-1 fv-aspect-square',
    'fv-col-span-1 fv-aspect-square', 'fv-col-span-2 fv-aspect-2-1',
  ];
  return (
    <section id="gallery" className="section-padding fv-bg-ink-800">
      <div className="container-wide">
        <SectionHeader title="The Gallery" subtitle="A visual tour through movies, manga, comics, TV, anime, and K-Pop." />
        <div className="fv-grid fv-grid-cols-2 fv-md-grid-cols-4 gap-2 fv-md-gap-3 fv-auto-rows-1fr">
          {images.map((img, i) => (
            <button key={img.id || img.url} onClick={() => setLightboxIndex(i)}
              className={'fv-group position-relative rounded-3 overflow-hidden ' + (layoutClasses[i] || 'fv-col-span-1 fv-aspect-square')}
              aria-label={'Open image: ' + img.alt}>
              <img src={img.url} alt={img.alt} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy" />
              <div className="position-absolute fv-inset-0 fv-bg-ink-900-0 fv-group-hover-bg-ink-900-30 fv-transition-colors fv-duration-300" />
              <div className="position-absolute fv-bottom-0 fv-left-0 fv-right-0 fv-p-3 fv-bg-gradient-to-t fv-from-ink-900-80 fv-to-transparent fv-opacity-0 fv-group-hover-opacity-100 fv-transition-opacity">
                <p className="fv-text-xs fv-text-paper-200 fv-clamp-1">{img.kind}: {img.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {lightboxIndex !== null && <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />}
    </section>
  );
}
