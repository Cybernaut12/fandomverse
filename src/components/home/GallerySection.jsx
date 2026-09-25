import { useState } from 'react';
import { categories } from '@/data/categories';
import { characters } from '@/data/characters';
import { articles } from '@/data/articles';
import { events } from '@/data/events';
import { mediaItems } from '@/data/media';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Lightbox } from '@/components/Lightbox';

function buildGalleryImages() {
    const imgs = [];
    categories.forEach((cat) => imgs.push({ url: cat.image, alt: `${cat.name} category image` }));
    articles.slice(0, 6).forEach((a) => imgs.push({ url: a.image, alt: a.title }));
    characters.slice(0, 6).forEach((c) => imgs.push({ url: c.image, alt: c.altText }));
    events.slice(0, 4).forEach((e) => imgs.push({ url: e.image, alt: e.title }));
    mediaItems.slice(0, 4).forEach((m) => imgs.push({ url: m.thumbnail, alt: m.title }));
    return imgs;
}
export function GallerySection() {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const images = buildGalleryImages();
    // Layout classes for editorial gallery
    const layoutClasses = [
        'fv-col-span-2 fv-row-span-2 fv-aspect-square',
        'fv-col-span-1 fv-aspect-square',
        'fv-col-span-1 fv-aspect-square',
        'fv-col-span-2 fv-aspect-2-1',
        'fv-col-span-1 fv-aspect-square',
        'fv-col-span-1 fv-aspect-square',
        'fv-col-span-1 fv-row-span-2 fv-aspect-1-2',
        'fv-col-span-1 fv-aspect-square',
        'fv-col-span-2 fv-aspect-2-1',
        'fv-col-span-1 fv-aspect-square',
        'fv-col-span-1 fv-aspect-square',
        'fv-col-span-2 fv-aspect-2-1',
    ];
    return (<section id="gallery" className="section-padding fv-bg-ink-800">
      <div className="container-wide">
        <SectionHeader title="The Gallery" subtitle="A visual tour through every corner of the fandom universe. Click any image to open the full view."/>

        <div className="fv-grid fv-grid-cols-2 fv-md-grid-cols-4 gap-2 fv-md-gap-3 fv-auto-rows-1fr">
          {images.slice(0, 12).map((img, i) => (<button key={i} onClick={() => setLightboxIndex(i)} className={`fv-group position-relative rounded-3 overflow-hidden ${layoutClasses[i] || 'fv-col-span-1 fv-aspect-square'}`} aria-label={`Open image: ${img.alt}`}>
              <img src={img.url} alt={img.alt} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
              <div className="position-absolute fv-inset-0 fv-bg-ink-900-0 fv-group-hover-bg-ink-900-30 fv-transition-colors fv-duration-300"/>
              <div className="position-absolute fv-bottom-0 fv-left-0 fv-right-0 fv-p-3 fv-bg-gradient-to-t fv-from-ink-900-80 fv-to-transparent fv-opacity-0 fv-group-hover-opacity-100 fv-transition-opacity">
                <p className="fv-text-xs fv-text-paper-200 fv-clamp-1">{img.alt}</p>
              </div>
            </button>))}
        </div>
      </div>

      {lightboxIndex !== null && (<Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex}/>)}
    </section>);
}
