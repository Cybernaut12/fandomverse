import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  ExternalLink, 
  Headphones, 
  Sparkles, 
  Disc3, 
  X,
  Volume2,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AudioPlayerBar: React.FC = () => {
  const { 
    currentPlayingTrack, 
    isPlaying, 
    togglePlayPause, 
    playTrack, 
    musicTracks, 
    isFavoriteTrack, 
    toggleFavoriteTrack,
    setCurrentView 
  } = useApp();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentPlayingTrack) {
    return null;
  }

  const currentIndex = musicTracks.findIndex(t => t.track_id === currentPlayingTrack.track_id);

  const handleNext = () => {
    if (musicTracks.length === 0) return;
    const nextIdx = (currentIndex + 1) % musicTracks.length;
    playTrack(musicTracks[nextIdx]);
  };

  const handlePrev = () => {
    if (musicTracks.length === 0) return;
    const prevIdx = (currentIndex - 1 + musicTracks.length) % musicTracks.length;
    playTrack(musicTracks[prevIdx]);
  };

  const isFav = isFavoriteTrack(currentPlayingTrack.track_id);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center space-x-3 px-4 py-2.5 rounded-full bg-[#12141e]/95 border border-purple-500/40 shadow-2xl backdrop-blur-xl text-white hover:border-purple-400 transition-all group"
        >
          <div className="relative">
            <img 
              src={currentPlayingTrack.album_cover} 
              alt={currentPlayingTrack.track_name}
              className={`w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/60 ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '6s' }}
            />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>
          <div className="text-left max-w-[130px] truncate">
            <p className="text-xs font-semibold truncate group-hover:text-purple-300">{currentPlayingTrack.track_name}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentPlayingTrack.artists}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className="w-7 h-7 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white shadow-md shadow-purple-600/30 ml-1"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          </button>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e101a]/95 backdrop-blur-2xl border-t border-purple-500/30 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Track Info & Thumbnail */}
        <div className="flex items-center space-x-3.5 min-w-0 max-w-xs sm:max-w-sm">
          <div className="relative shrink-0 group cursor-pointer" onClick={() => setCurrentView('music')}>
            <img 
              src={currentPlayingTrack.album_cover} 
              alt={currentPlayingTrack.track_name}
              className={`w-12 h-12 rounded-xl object-cover ring-1 ring-white/10 shadow-lg ${isPlaying ? 'ring-purple-500/50' : ''}`}
            />
            <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            {isPlaying && (
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-bold text-white truncate hover:text-purple-300 cursor-pointer" onClick={() => setCurrentView('music')}>
                {currentPlayingTrack.track_name}
              </span>
              {currentPlayingTrack.explicit && (
                <span className="px-1 py-0.2 bg-white/10 rounded text-[9px] font-bold text-slate-400 shrink-0">E</span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 truncate">
              <span className="truncate">{currentPlayingTrack.artists}</span>
              <span>•</span>
              <span className="text-purple-400 truncate shrink-0">{currentPlayingTrack.fandom_franchise}</span>
            </div>
          </div>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavoriteTrack(currentPlayingTrack.track_id)}
            className={`p-1.5 rounded-lg transition-colors shrink-0 ${isFav ? 'text-pink-500 hover:text-pink-400' : 'text-slate-400 hover:text-white'}`}
            title={isFav ? "Remove from favorite tracks" : "Favorite this track"}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-pink-500' : ''}`} />
          </button>
        </div>

        {/* Center: Playback Controls & Animated Equalizer */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-md">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 transition-transform active:scale-95"
              title={isPlaying ? "Pause Preview" : "Play Preview"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Equalizer animation & Audio Feature Quick Tag */}
          <div className="flex items-center space-x-3 mt-1.5">
            {isPlaying ? (
              <div className="flex items-center space-x-1 h-3">
                <span className="w-0.5 h-full bg-purple-400 animate-pulse" style={{ animationDuration: '0.6s' }} />
                <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" style={{ animationDuration: '0.4s' }} />
                <span className="w-0.5 h-3 bg-pink-400 animate-pulse" style={{ animationDuration: '0.8s' }} />
                <span className="w-0.5 h-1.5 bg-indigo-400 animate-pulse" style={{ animationDuration: '0.5s' }} />
                <span className="w-0.5 h-2.5 bg-emerald-400 animate-pulse" style={{ animationDuration: '0.7s' }} />
              </div>
            ) : (
              <Disc3 className="w-3.5 h-3.5 text-slate-400" />
            )}

            <span className="text-[10px] text-slate-400 font-mono">
              {Math.round(currentPlayingTrack.tempo)} BPM • {Math.round(currentPlayingTrack.energy * 100)}% Energy • {currentPlayingTrack.duration}
            </span>
          </div>
        </div>

        {/* Right: Spotify Link, Full Hub & Minimize */}
        <div className="flex items-center space-x-2 shrink-0">
          {currentPlayingTrack.spotify_url && (
            <a
              href={currentPlayingTrack.spotify_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open on Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          <button
            onClick={() => setCurrentView('music')}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>Music Explorer</span>
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Minimize audio bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
