import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft,
  Star, 
  Bookmark, 
  Play, 
  Share2, 
  Plus, 
  Check, 
  BookOpen, 
  Calendar, 
  Tv, 
  Layers, 
  Users, 
  Award, 
  ExternalLink,
  Sparkles,
  MessageSquare,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { MediaItem, UserProgressItem } from '../types';

export const MediaDetailModal: React.FC = () => {
  const { 
    selectedMedia, 
    setSelectedMedia, 
    toggleBookmark, 
    isBookmarked,
    userProgress,
    updateProgressUnits,
    setProgressStatus,
    setUserRating,
    reviews,
    setIsReviewModalOpen,
    setSelectedVideoClip,
    setSelectedCharacter,
    characters,
    mediaList
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'arcs' | 'cast' | 'reviews' | 'discussions' | 'similar'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [previewPageIndex, setPreviewPageIndex] = useState<number>(0);

  if (!selectedMedia) return null;

  const item = selectedMedia;
  const isPrintMedia = item.category === 'comics' || item.category === 'manga' || item.mediaType === 'manga' || item.mediaType === 'comic';
  const progress = userProgress[item.id];
  const itemReviews = reviews.filter(r => r.mediaId === item.id || r.mediaTitle === item.title);

  // Find related media in same category
  const relatedMedia = mediaList
    .filter(m => m.id !== item.id && (m.category === item.category || m.genres.some(g => item.genres.includes(g))))
    .slice(0, 4);

  // Find characters in this franchise
  const franchiseCharacters = characters.filter(c => 
    c.series.toLowerCase().includes(item.title.toLowerCase()) || 
    item.title.toLowerCase().includes(c.series.toLowerCase()) ||
    c.category === item.category
  ).slice(0, 5);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTrailerClick = () => {
    setSelectedVideoClip({
      id: `trailer-${item.id}`,
      title: `${item.title} Official Trailer`,
      category: item.category,
      type: 'trailer',
      duration: '2:30',
      thumbnail: item.bannerImage,
      embedUrl: item.trailerUrl || 'https://www.youtube.com/embed/S8_YwFLCh4U',
      description: item.synopsis,
      releaseStatus: 'recently-released'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSelectedMedia(null)}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl glass-panel border border-white/10 shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Bar Controls */}
        <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-none">
          <button
            onClick={() => setSelectedMedia(null)}
            className="pointer-events-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-slate-200 hover:text-white border border-white/15 backdrop-blur-md transition-all shadow-lg text-xs font-semibold group"
            title="Go back (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
            <span className="hidden sm:inline-block px-1 py-0.2 rounded bg-white/10 text-[9px] text-slate-400 font-mono ml-1">
              Esc
            </span>
          </button>

          <button
            onClick={() => setSelectedMedia(null)}
            className="pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-red-500/30 text-slate-200 hover:text-red-300 border border-white/15 hover:border-red-500/40 backdrop-blur-md transition-all shadow-lg"
            aria-label="Close modal"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="relative w-full h-72 sm:h-96 overflow-hidden">
          <img
            src={item.bannerImage}
            alt={item.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = item.coverImage;
            }}
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-[#0e1018]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1018] via-transparent to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-bold uppercase tracking-wider">
                  {item.category.replace('-', ' ')}
                </span>
                {item.genres.map((g) => (
                  <span key={g} className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 text-[11px] backdrop-blur-sm">
                    {g}
                  </span>
                ))}
              </div>

              {/* Title & Japanese subtitle */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-heading">
                  {item.title}
                </h1>
                {item.originalTitle && (
                  <p className="text-sm sm:text-base font-medium text-slate-400 font-mono">
                    {item.originalTitle}
                  </p>
                )}
              </div>

              {/* Release Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="font-semibold text-white">{item.year}</span>
                <span>•</span>
                <span>{item.runtimeOrChapters}</span>
                {item.ageRating && (
                  <>
                    <span>•</span>
                    <span className="px-1.5 py-0.2 rounded border border-white/20 text-[10px] uppercase font-mono">
                      {item.ageRating}
                    </span>
                  </>
                )}
                {item.platformOrStudio && (
                  <>
                    <span>•</span>
                    <span className="text-cyan-400 font-medium">{item.platformOrStudio}</span>
                  </>
                )}
              </div>

            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2.5">
              {isPrintMedia ? (
                <button
                  onClick={() => {
                    const el = document.getElementById('comic-manga-preview');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition-all flex items-center space-x-2 active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>Preview Pages</span>
                </button>
              ) : (
                <button
                  onClick={handleTrailerClick}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-2 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Trailer</span>
                </button>
              )}

              <button
                onClick={() => toggleBookmark(item.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isBookmarked(item.id)
                    ? 'bg-amber-500 text-black border-amber-500'
                    : 'glass-panel text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                }`}
                title="Bookmark"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked(item.id) ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white border-white/10 hover:bg-white/10 transition-all relative"
                title="Share Title"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black text-[10px] text-cyan-400 border border-cyan-400/40 whitespace-nowrap">
                    Link Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row (Screen 3 & 4 style) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white/[0.02] border-y border-white/[0.08]">
          <div className="space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Average Rating</span>
            <div className="flex items-center space-x-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xl font-bold text-white font-mono">{item.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">/ 10</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Members & Fans</span>
            <div className="flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-xl font-bold text-white font-mono">{item.membersCount || '850K'}</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Rank & Standing</span>
            <div className="flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-xs sm:text-sm font-bold text-white truncate">{item.rank || 'Top 100'}</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Status</span>
            <div className="flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full ${item.ongoing ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-xs sm:text-sm font-bold text-white">
                {item.ongoing ? 'Ongoing Release' : 'Completed'}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center space-x-2 px-6 border-b border-white/[0.08] overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview' },
            ...(item.topArcs && item.topArcs.length > 0 ? [{ id: 'arcs', label: 'Top Arcs & Sagas' }] : []),
            ...(franchiseCharacters.length > 0 ? [{ id: 'cast', label: 'Characters & Cast' }] : []),
            { id: 'reviews', label: `Reviews (${itemReviews.length})` },
            { id: 'discussions', label: 'Discussions' },
            { id: 'similar', label: 'Similar Titles' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body Content */}
        <div className="p-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Quote Banner if available */}
              {item.quote && (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs sm:text-sm font-medium italic">
                  "{item.quote}"
                </div>
              )}

              {/* Synopsis */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">Synopsis</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {item.synopsis}
                </p>
              </div>

              {/* Progress & Tracking Tracker Bar */}
              <div className="p-4 rounded-xl glass-card border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white">Your Tracking Progress</h4>
                    <p className="text-[11px] text-slate-400">
                      {progress 
                        ? `Currently ${progress.status}: ${progress.currentUnits} of ${progress.totalUnits} ${progress.unitType}`
                        : 'Not yet in your progress list'}
                    </p>
                  </div>
                  
                  {progress && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateProgressUnits(item.id, 1)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold"
                      >
                        +1 {progress.unitType.slice(0, -1)}
                      </button>
                      <button
                        onClick={() => setProgressStatus(item.id, 'completed')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium"
                      >
                        Mark Complete
                      </button>
                    </div>
                  )}
                </div>

                {progress && (
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((progress.currentUnits / progress.totalUnits) * 100))}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Conditional Section: Comic/Manga Interactive Page Preview VS Video Trailer */}
              {isPrintMedia ? (
                <div id="comic-manga-preview" className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-xs uppercase tracking-wider font-bold text-white">
                        {item.category === 'manga' ? 'Manga Sample Preview & Art Panels' : 'Comic Issue Preview & Art Panels'}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-semibold">
                        Page {previewPageIndex + 1} of 3
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                      {item.category === 'manga' 
                        ? '📖 Direction: Right ➔ Left (Japanese Manga Style)' 
                        : '📖 Direction: Left ➔ Right (Western Sequential Art)'}
                    </span>
                  </div>

                  {/* Interactive Preview Canvas */}
                  <div className="relative w-full rounded-2xl overflow-hidden glass-card border border-white/10 bg-slate-950/80 p-3 sm:p-5 flex flex-col items-center">
                    {/* Navigation Arrows */}
                    <div className="absolute inset-y-0 left-2 sm:left-4 z-10 flex items-center">
                      <button
                        onClick={() => setPreviewPageIndex(prev => (prev === 0 ? 2 : prev - 1))}
                        className="p-2.5 rounded-full bg-black/75 hover:bg-black/95 text-white/80 hover:text-white border border-white/20 backdrop-blur-md shadow-xl transition-all active:scale-95"
                        title="Previous page"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute inset-y-0 right-2 sm:right-4 z-10 flex items-center">
                      <button
                        onClick={() => setPreviewPageIndex(prev => (prev === 2 ? 0 : prev + 1))}
                        className="p-2.5 rounded-full bg-black/75 hover:bg-black/95 text-white/80 hover:text-white border border-white/20 backdrop-blur-md shadow-xl transition-all active:scale-95"
                        title="Next page"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Page Content View */}
                    <div className="w-full max-w-2xl flex flex-col items-center space-y-3">
                      <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-mono px-1">
                        <span className="font-semibold text-cyan-300">
                          {previewPageIndex === 0 
                            ? 'Page 1: Original Cover Art' 
                            : previewPageIndex === 1 
                            ? 'Page 2: Double-Page Panoramic Splash' 
                            : 'Page 3: Climax Scene & Dialogue Panel'}
                        </span>
                        <span className="text-slate-400">
                          {item.platformOrStudio || 'Premier Collector Edition'}
                        </span>
                      </div>

                      <div className="relative w-full flex justify-center items-center rounded-xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl min-h-[300px] sm:min-h-[420px] max-h-[500px]">
                        <img
                          src={previewPageIndex === 1 ? item.bannerImage : item.coverImage}
                          alt={`${item.title} Preview Page ${previewPageIndex + 1}`}
                          className={`w-full h-full ${previewPageIndex === 1 ? 'object-cover sm:object-contain' : 'object-contain'} max-h-[480px] transition-all duration-300`}
                        />
                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                          <p className="text-xs text-slate-200 truncate">
                            {previewPageIndex === 0 && `Cover illustration for ${item.title} (${item.year})`}
                            {previewPageIndex === 1 && (item.topArcs?.[0]?.description || `Double-page establishment layout: ${item.synopsis.slice(0, 80)}...`)}
                            {previewPageIndex === 2 && `Milestone panel art from ${item.title} • ${item.runtimeOrChapters}`}
                          </p>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap ml-2">
                            Sample HD
                          </span>
                        </div>
                      </div>

                      {/* Page Selector Strip */}
                      <div className="flex items-center space-x-2 pt-2">
                        {[
                          { label: 'Cover Page', idx: 0 },
                          { label: 'Double Splash Spread', idx: 1 },
                          { label: 'Action Climax Panel', idx: 2 }
                        ].map(tab => (
                          <button
                            key={tab.idx}
                            onClick={() => setPreviewPageIndex(tab.idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              previewPageIndex === tab.idx
                                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 text-cyan-200 shadow-sm'
                                : 'bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">Official Trailer</h3>
                    <button 
                      onClick={handleTrailerClick}
                      className="text-xs text-cyan-400 hover:underline flex items-center space-x-1"
                    >
                      <span>Full Screen Player</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden glass-card border border-white/10">
                    <iframe
                      src={item.trailerUrl || "https://www.youtube.com/embed/S8_YwFLCh4U"}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: TOP ARCS / SAGAS (Screen 3 style) */}
          {activeTab === 'arcs' && item.topArcs && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Chronological sagas and milestone story arcs rated by the FandomVerse community.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {item.topArcs.map((arc, idx) => (
                  <div key={idx} className="p-4 rounded-xl glass-card border border-white/10 space-y-2 hover:border-cyan-400/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{arc.title}</span>
                      {arc.status && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                          {arc.status}
                        </span>
                      )}
                    </div>
                    <span className="inline-block text-[11px] font-mono text-amber-400">{arc.range}</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {arc.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CHARACTERS & CAST */}
          {activeTab === 'cast' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Major characters, voice artists, and heroes from {item.title}.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {franchiseCharacters.map(char => (
                  <div
                    key={char.id}
                    onClick={() => setSelectedCharacter(char)}
                    className="p-3 rounded-xl glass-card border border-white/10 text-center space-y-2 cursor-pointer hover:border-cyan-400/50 hover:scale-105 transition-all"
                  >
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-16 h-16 mx-auto rounded-full object-cover ring-2 ring-purple-500/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{char.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{char.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-300">Community Reviews</h3>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium"
                >
                  Write a Review
                </button>
              </div>

              {itemReviews.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                  <p>No community reviews yet for {item.title}.</p>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="text-cyan-400 underline font-medium"
                  >
                    Be the first fan to review this title!
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {itemReviews.map(rev => (
                    <div key={rev.id} className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <img src={rev.avatar} alt={rev.author} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="text-xs font-bold text-white">{rev.author}</span>
                            <span className="text-[10px] text-slate-400 ml-2">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{rev.rating} / 5</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200">{rev.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{rev.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DISCUSSIONS */}
          {activeTab === 'discussions' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">🔥 Void Century & Ancient Weapons Theory</span>
                  <span className="text-[10px] text-cyan-400 font-mono">148 replies</span>
                </div>
                <p className="text-xs text-slate-400">
                  How the recent chapter revelations link the Iron Giant to Joyboy's original pirate alliance 800 years ago.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">🎬 Cinematography and Sound Design Breakdown</span>
                  <span className="text-[10px] text-cyan-400 font-mono">92 replies</span>
                </div>
                <p className="text-xs text-slate-400">
                  Analyzing the lens choices and Dolby Atmos soundscape that elevated the emotional intensity of the finale.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: SIMILAR TITLES */}
          {activeTab === 'similar' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedMedia.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => setSelectedMedia(rel)}
                  className="p-2.5 rounded-xl glass-card border border-white/10 cursor-pointer hover:border-cyan-400/50 hover:scale-105 transition-all space-y-2"
                >
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full aspect-[3/4] rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white truncate">{rel.title}</h4>
                    <p className="text-[10px] text-slate-400">{rel.year} • {rel.rating.toFixed(1)} ★</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
