import React, { useEffect } from 'react';
import { X, Play, Clock, Sparkles, ArrowLeft, CornerUpLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VideoPlayerModal: React.FC = () => {
  const { selectedVideoClip, setSelectedVideoClip } = useApp();

  // Handle global Escape key press to always allow leaving the trailer
  useEffect(() => {
    if (!selectedVideoClip) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedVideoClip(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideoClip, setSelectedVideoClip]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (selectedVideoClip) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideoClip]);

  if (!selectedVideoClip) return null;

  const clip = selectedVideoClip;

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-y-auto p-3 sm:p-6 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-start sm:justify-center animate-in fade-in duration-200"
      onClick={() => setSelectedVideoClip(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`Trailer: ${clip.title}`}
    >
      {/* Floating Viewport Close Button - Always visible & clickable at all times */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] flex items-center space-x-2">
        <button
          onClick={() => setSelectedVideoClip(null)}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-2xl shadow-red-600/50 transition-all hover:scale-105 active:scale-95 border border-red-400/40"
          aria-label="Close trailer"
          title="Close Trailer (Esc)"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono">
            Esc
          </span>
        </button>
      </div>

      <div 
        className="relative w-full max-w-4xl my-auto rounded-2xl glass-panel border border-white/20 shadow-2xl p-4 sm:p-6 text-slate-200 space-y-4 bg-[#0a0c13]/95 z-[105]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navigation Bar: Highly visible Back & Close controls */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <button
            onClick={() => setSelectedVideoClip(null)}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 hover:text-white border border-purple-500/40 transition-all text-xs font-semibold group shadow-sm active:scale-95"
            title="Leave video player and return to FandomVerse (Esc)"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Leave Trailer</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-300 font-mono">
              Esc
            </span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Click anywhere outside or press
            </span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-cyan-300 border border-white/10">
              Esc
            </kbd>
            <button
              onClick={() => setSelectedVideoClip(null)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all"
              aria-label="Close trailer"
              title="Close Trailer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden glass-card border border-white/15 bg-black shadow-inner">
          <iframe
            src={`${clip.embedUrl}${clip.embedUrl.includes('?') ? '&' : '?'}autoplay=1&enablejsapi=1`}
            title={clip.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Clip Details & Quick Exit Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {clip.type.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {clip.category.replace('-', ' ')}
              </span>
              {clip.duration && (
                <span className="text-[11px] font-mono text-slate-400">
                  Duration: {clip.duration}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white font-heading">{clip.title}</h3>
            {clip.description && (
              <p className="text-xs text-slate-400 line-clamp-2 max-w-xl">{clip.description}</p>
            )}
          </div>

          <button
            onClick={() => setSelectedVideoClip(null)}
            className="self-end sm:self-center shrink-0 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition-all text-xs font-semibold flex items-center space-x-2"
          >
            <CornerUpLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Return to FandomVerse</span>
          </button>
        </div>

      </div>
    </div>
  );
};
