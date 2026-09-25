import React, { useState, useMemo } from 'react';
import { Play, Pause, Heart, Search, SlidersHorizontal, Sparkles, Flame, Disc3, Zap, BarChart3, Activity, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const MusicView = () => {
    const { musicTracks, currentPlayingTrack, isPlaying, playTrack, togglePlayPause, favoriteTrackIds, toggleFavoriteTrack, isFavoriteTrack } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    const [inspectTrack, setInspectTrack] = useState(null);
    const genres = [
        { id: 'all', label: 'All Tracks' },
        { id: 'anime', label: 'Anime OSTs' },
        { id: 'soundtrack', label: 'Cinematic Scores' },
        { id: 'gaming', label: 'Gaming Worlds' },
        { id: 'k-pop', label: 'K-Pop Anthems' },
        { id: 'synthwave', label: 'Cyberpunk Synth' },
        { id: 'rock', label: 'Alt & J-Rock' }
    ];
    // Filtering & Sorting
    const filteredTracks = useMemo(() => {
        return musicTracks.filter(track => {
            const matchSearch = track.track_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                track.artists.toLowerCase().includes(searchQuery.toLowerCase()) ||
                track.album_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                track.fandom_franchise.toLowerCase().includes(searchQuery.toLowerCase());
            const matchGenre = selectedGenre === 'all' || track.track_genre.toLowerCase() === selectedGenre.toLowerCase();
            const matchFav = !onlyFavorites || isFavoriteTrack(track.track_id);
            return matchSearch && matchGenre && matchFav;
        }).sort((a, b) => {
            if (sortBy === 'popularity')
                return b.popularity - a.popularity;
            if (sortBy === 'tempo')
                return b.tempo - a.tempo;
            if (sortBy === 'energy')
                return b.energy - a.energy;
            if (sortBy === 'duration')
                return b.duration_ms - a.duration_ms;
            return 0;
        });
    }, [musicTracks, searchQuery, selectedGenre, sortBy, onlyFavorites, favoriteTrackIds]);
    const spotlightTrack = currentPlayingTrack || musicTracks[0];
    return (<div className="space-y-8 pb-32 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-6 sm:p-10 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-cyan-950/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"/>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Disc3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }}/>
              <span>Spotify Tracks Dataset Integration • 114k+ Library</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
              Fandom Soundtracks & <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Sonic Universe</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Stream and analyze the pulse of your favorite fictional universes. Featuring acoustic characteristics, tempo (BPM), danceability, energy index, and real audio previews directly from Spotify audio features.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">Tracks Available</div>
              <div className="text-xl font-bold text-white font-mono">{musicTracks.length} Soundtracks</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">Average Popularity</div>
              <div className="text-xl font-bold text-cyan-400 font-mono">91.4 / 100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Spotlight Track Card */}
      {spotlightTrack && (<div className="glass-panel border border-white/10 rounded-3xl overflow-hidden p-6 lg:p-8 bg-gradient-to-br from-slate-900/90 via-[#0d0f17]/90 to-purple-950/20 relative">
          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            
            {/* Album Cover & Play Overlay */}
            <div className="relative group w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 flex-shrink-0">
              <img src={spotlightTrack.album_cover} alt={spotlightTrack.album_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => {
                if (currentPlayingTrack?.track_id === spotlightTrack.track_id) {
                    togglePlayPause();
                }
                else {
                    playTrack(spotlightTrack);
                }
            }} className="w-14 h-14 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  {currentPlayingTrack?.track_id === spotlightTrack.track_id && isPlaying ? (<Pause className="w-6 h-6 fill-current"/>) : (<Play className="w-6 h-6 fill-current ml-0.5"/>)}
                </button>
              </div>

              {/* Animated Equalizer Overlay if current playing */}
              {currentPlayingTrack?.track_id === spotlightTrack.track_id && isPlaying && (<div className="absolute bottom-2 left-2 right-2 flex items-end justify-center space-x-1 h-6 bg-black/60 backdrop-blur-sm rounded-lg py-1 px-2">
                  <span className="w-1 bg-cyan-400 animate-pulse h-4 rounded-full"/>
                  <span className="w-1 bg-purple-400 animate-pulse h-5 rounded-full" style={{ animationDelay: '0.15s' }}/>
                  <span className="w-1 bg-pink-400 animate-pulse h-3 rounded-full" style={{ animationDelay: '0.3s' }}/>
                  <span className="w-1 bg-cyan-400 animate-pulse h-5 rounded-full" style={{ animationDelay: '0.45s' }}/>
                  <span className="w-1 bg-indigo-400 animate-pulse h-4 rounded-full" style={{ animationDelay: '0.2s' }}/>
                </div>)}
            </div>

            {/* Track Info & Spotify Dataset Metrics */}
            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {spotlightTrack.track_genre}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {spotlightTrack.fandom_franchise}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button onClick={() => toggleFavoriteTrack(spotlightTrack.track_id)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-red-400 transition-colors" title="Add to Favorites">
                    <Heart className={`w-4 h-4 ${isFavoriteTrack(spotlightTrack.track_id) ? 'fill-red-500 text-red-500' : ''}`}/>
                  </button>
                  {spotlightTrack.spotify_url && (<a href={spotlightTrack.spotify_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center space-x-1.5 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5"/>
                      <span>Spotify</span>
                    </a>)}
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {spotlightTrack.track_name}
                </h2>
                <p className="text-base text-slate-300 font-medium mt-0.5">
                  {spotlightTrack.artists} • <span className="text-slate-400">{spotlightTrack.album_name}</span>
                </p>
              </div>

              {spotlightTrack.lyrics_snippet && (<div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 italic">
                  "{spotlightTrack.lyrics_snippet}"
                </div>)}

              {/* Spotify Track Audio Feature Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center justify-between">
                    <span>Popularity</span>
                    <Flame className="w-3 h-3 text-amber-400"/>
                  </div>
                  <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">{spotlightTrack.popularity}/100</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${spotlightTrack.popularity}%` }}/>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center justify-between">
                    <span>Energy</span>
                    <Zap className="w-3 h-3 text-cyan-400"/>
                  </div>
                  <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">{Math.round(spotlightTrack.energy * 100)}%</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${spotlightTrack.energy * 100}%` }}/>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center justify-between">
                    <span>Tempo (BPM)</span>
                    <Activity className="w-3 h-3 text-purple-400"/>
                  </div>
                  <div className="text-lg font-bold text-purple-400 font-mono mt-0.5">{Math.round(spotlightTrack.tempo)} BPM</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: `${Math.min(100, (spotlightTrack.tempo / 180) * 100)}%` }}/>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center justify-between">
                    <span>Danceability</span>
                    <Sparkles className="w-3 h-3 text-emerald-400"/>
                  </div>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{Math.round(spotlightTrack.danceability * 100)}%</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${spotlightTrack.danceability * 100}%` }}/>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-2">
                <button onClick={() => {
                if (currentPlayingTrack?.track_id === spotlightTrack.track_id) {
                    togglePlayPause();
                }
                else {
                    playTrack(spotlightTrack);
                }
            }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-opacity flex items-center space-x-2">
                  {currentPlayingTrack?.track_id === spotlightTrack.track_id && isPlaying ? (<>
                      <Pause className="w-4 h-4 fill-current"/>
                      <span>Pause Preview</span>
                    </>) : (<>
                      <Play className="w-4 h-4 fill-current"/>
                      <span>Play Track Preview</span>
                    </>)}
                </button>

                <button onClick={() => setInspectTrack(spotlightTrack)} className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium transition-colors flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400"/>
                  <span>Inspect Audio Features</span>
                </button>
              </div>

            </div>

          </div>
        </div>)}

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"/>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by track, artist, album, franchise..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"/>
          </div>

          {/* Right Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Sort Selector */}
            <div className="flex items-center space-x-2 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400"/>
              <span>Sort:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent text-white font-medium focus:outline-none cursor-pointer">
                <option value="popularity" className="bg-[#12141f]">Popularity</option>
                <option value="tempo" className="bg-[#12141f]">Tempo (BPM)</option>
                <option value="energy" className="bg-[#12141f]">Energy Level</option>
                <option value="duration" className="bg-[#12141f]">Duration</option>
              </select>
            </div>

            {/* Favorites Toggle */}
            <button onClick={() => setOnlyFavorites(!onlyFavorites)} className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center space-x-1.5 ${onlyFavorites
            ? 'bg-red-500/20 border-red-500/40 text-red-300'
            : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10'}`}>
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-red-400 text-red-400' : ''}`}/>
              <span>Favorites ({favoriteTrackIds.length})</span>
            </button>
          </div>
        </div>

        {/* Genre Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {genres.map(g => (<button key={g.id} onClick={() => setSelectedGenre(g.id)} className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${selectedGenre === g.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'}`}>
              {g.label}
            </button>))}
        </div>
      </div>

      {/* Tracks Table */}
      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div>SHOWING {filteredTracks.length} TRACKS FROM SPOTIFY DATASET</div>
          <div className="hidden sm:block">ACOUSTIC & POPULARITY METRICS</div>
        </div>

        <div className="divide-y divide-white/5">
          {filteredTracks.map((track, idx) => {
            const isThisPlaying = currentPlayingTrack?.track_id === track.track_id && isPlaying;
            const isFav = isFavoriteTrack(track.track_id);
            return (<div key={track.track_id} className={`flex items-center justify-between px-4 sm:px-6 py-3.5 hover:bg-white/[0.03] transition-colors group ${currentPlayingTrack?.track_id === track.track_id ? 'bg-cyan-500/[0.06] border-l-2 border-cyan-400' : ''}`}>
                {/* Index / Play Button */}
                <div className="flex items-center space-x-3.5 sm:space-x-4 flex-1 min-w-0 mr-4">
                  <div className="w-8 flex items-center justify-center flex-shrink-0">
                    <button onClick={() => {
                    if (isThisPlaying) {
                        togglePlayPause();
                    }
                    else {
                        playTrack(track);
                    }
                }} className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isThisPlaying
                    ? 'bg-cyan-400 text-black'
                    : 'bg-white/10 text-slate-300 group-hover:bg-cyan-400 group-hover:text-black'}`}>
                      {isThisPlaying ? (<Pause className="w-3.5 h-3.5 fill-current"/>) : (<Play className="w-3.5 h-3.5 fill-current ml-0.5"/>)}
                    </button>
                  </div>

                  {/* Album Cover */}
                  <img src={track.album_cover} alt={track.album_name} className="w-11 h-11 rounded-lg object-cover flex-shrink-0 shadow-md"/>

                  {/* Title & Artist */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold truncate ${currentPlayingTrack?.track_id === track.track_id ? 'text-cyan-400' : 'text-white'}`}>
                        {track.track_name}
                      </span>
                      {track.explicit && (<span className="px-1 py-0.2 rounded bg-slate-700 text-slate-300 text-[9px] font-mono">E</span>)}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {track.artists} • <span className="text-slate-500">{track.fandom_franchise}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics & Badges (Desktop) */}
                <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-400 font-mono mr-6">
                  <div className="w-20">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/10 text-slate-300">
                      {track.track_genre}
                    </span>
                  </div>

                  <div className="w-24 text-right">
                    <div className="text-[11px] text-slate-400">{Math.round(track.tempo)} BPM</div>
                    <div className="text-[10px] text-slate-500">Key {track.key} / {track.mode === 1 ? 'Maj' : 'Min'}</div>
                  </div>

                  {/* Energy & Popularity Bar */}
                  <div className="w-24">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-slate-500">Pop.</span>
                      <span className="text-amber-400 font-bold">{track.popularity}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${track.popularity}%` }}/>
                    </div>
                  </div>
                </div>

                {/* Actions & Duration */}
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono flex-shrink-0">
                  <button onClick={() => setInspectTrack(track)} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors" title="Audio Features">
                    <BarChart3 className="w-4 h-4"/>
                  </button>

                  <button onClick={() => toggleFavoriteTrack(track.track_id)} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors">
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`}/>
                  </button>

                  <span className="w-10 text-right text-slate-400">{track.duration}</span>
                </div>

              </div>);
        })}
        </div>
      </div>

      {/* Inspect Track Audio Features Modal */}
      {inspectTrack && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full bg-[#0d0f17] space-y-6">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <img src={inspectTrack.album_cover} alt={inspectTrack.album_name} className="w-16 h-16 rounded-xl object-cover shadow-lg"/>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{inspectTrack.track_name}</h3>
                  <p className="text-xs text-slate-400">{inspectTrack.artists} • {inspectTrack.album_name}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {inspectTrack.fandom_franchise}
                  </span>
                </div>
              </div>
              <button onClick={() => setInspectTrack(null)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">
                Spotify Audio Features Analysis
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-slate-400">Tempo / BPM</div>
                  <div className="text-lg font-bold text-white mt-1">{inspectTrack.tempo}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-slate-400">Loudness (dB)</div>
                  <div className="text-lg font-bold text-white mt-1">{inspectTrack.loudness} dB</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-slate-400">Key & Scale Mode</div>
                  <div className="text-lg font-bold text-white mt-1">Key {inspectTrack.key} ({inspectTrack.mode === 1 ? 'Major' : 'Minor'})</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-slate-400">Time Signature</div>
                  <div className="text-lg font-bold text-white mt-1">{inspectTrack.time_signature}/4</div>
                </div>
              </div>

              {/* Progress Gauges */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>Danceability</span>
                    <span className="text-emerald-400">{Math.round(inspectTrack.danceability * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${inspectTrack.danceability * 100}%` }}/>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>Energy</span>
                    <span className="text-cyan-400">{Math.round(inspectTrack.energy * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${inspectTrack.energy * 100}%` }}/>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>Acousticness</span>
                    <span className="text-purple-400">{Math.round(inspectTrack.acousticness * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: `${inspectTrack.acousticness * 100}%` }}/>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>Valence (Musical Positivity)</span>
                    <span className="text-amber-400">{Math.round(inspectTrack.valence * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${inspectTrack.valence * 100}%` }}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setInspectTrack(null)} className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors">
                Close Inspector
              </button>
            </div>

          </div>
        </div>)}

    </div>);
};
