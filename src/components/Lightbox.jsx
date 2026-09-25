import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
export function Lightbox({ images, index, onClose, onNavigate }) {
    const next = useCallback(() => {
        onNavigate((index + 1) % images.length);
    }, [index, images.length, onNavigate]);
    const prev = useCallback(() => {
        onNavigate((index - 1 + images.length) % images.length);
    }, [index, images.length, onNavigate]);
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape')
                onClose();
            if (e.key === 'ArrowRight')
                next();
            if (e.key === 'ArrowLeft')
                prev();
        };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose, next, prev]);
    if (!images[index])
        return null;
    return (<div className="position-fixed fv-inset-0 fv-z-100 fv-bg-ink-900-95 fv-backdrop-blur-sm d-flex align-items-center justify-content-center fv-animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button onClick={onClose} className="position-absolute fv-top-4 fv-right-4 fv-text-paper-300 fv-hover-text-paper-50 fv-transition-colors fv-p-2" aria-label="Close image viewer">
        <X className="fv-w-7 fv-h-7"/>
      </button>

      {images.length > 1 && (<>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="position-absolute fv-left-4 fv-md-left-8 fv-text-paper-300 fv-hover-text-paper-50 fv-transition-colors fv-p-2" aria-label="Previous image">
            <ChevronLeft className="fv-w-8 fv-h-8"/>
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="position-absolute fv-right-4 fv-md-right-8 fv-text-paper-300 fv-hover-text-paper-50 fv-transition-colors fv-p-2" aria-label="Next image">
            <ChevronRight className="fv-w-8 fv-h-8"/>
          </button>
        </>)}

      <div className="fv-max-w-5xl fv-max-h-85vh fv-px-16" onClick={(e) => e.stopPropagation()}>
        <img src={images[index].url} alt={images[index].alt} className="fv-max-w-full fv-max-h-85vh fv-object-contain rounded-3 fv-animate-scale-in"/>
        <p className="text-center fv-text-paper-300 fv-text-sm fv-mt-4">{images[index].alt}</p>
        {images.length > 1 && (<p className="text-center fv-text-paper-300-60 fv-text-xs fv-mt-2">
            {index + 1} of {images.length}
          </p>)}
      </div>
    </div>);
}
