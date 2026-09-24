import React from 'react';
import { X, Heart, Sparkles, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ImageGalleryModal: React.FC = () => {
  const { lightboxImage, setLightboxImage, galleries } = useApp();

  if (!lightboxImage) return null;

  const currentIdx = galleries.findIndex(g => g.id === lightboxImage.id);

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % galleries.length;
    setLightboxImage(galleries[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + galleries.length) % galleries.length;
    setLightboxImage(galleries[prevIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Close Button */}
      <button
        onClick={() => setLightboxImage(null)}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Central Image & Caption */}
      <div 
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={lightboxImage.imageUrl}
          alt={lightboxImage.title}
          className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
        />

        <div className="w-full mt-4 p-4 rounded-xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {lightboxImage.category}
              </span>
              <h3 className="text-base font-bold text-white">{lightboxImage.title}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{lightboxImage.description}</p>
            <p className="text-[11px] text-cyan-400 mt-0.5">Artist / Studio: {lightboxImage.artistOrStudio}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1 text-pink-400 font-mono">
              <Heart className="w-4 h-4 fill-pink-400" />
              <span>{lightboxImage.likes.toLocaleString()}</span>
            </span>
            <a
              href={lightboxImage.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              title="Open full resolution"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
