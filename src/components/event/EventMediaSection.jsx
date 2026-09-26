import { useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, Pause, Play, X } from 'lucide-react';
import './EventMediaSection.css';

const trailers = [
  { id: 'arcane-s2-trailer', title: 'Arcane — Season 2 Official Trailer', category: 'Anime', duration: '2:34', youtubeId: 'ysqiEC6bLUI', source: 'Netflix' },
  { id: 'dune-prophecy-trailer', title: 'Dune: Prophecy — Official Teaser', category: 'Sci-Fi', duration: '1:58', youtubeId: 'EEoQAoEGLhw', source: 'Max' },
  { id: 'frieren-s2-trailer', title: 'Frieren: Beyond Journey’s End — Announcement Trailer', category: 'Anime', duration: '1:22', youtubeId: 'DknvOzqQCTo', source: 'TOHO animation' },
  { id: 'dune-2-trailer', title: 'Dune: Part Two — Official Trailer', category: 'Sci-Fi', duration: '3:12', youtubeId: 'Way9Dexny3w', source: 'Warner Bros.' },
  { id: 'spider-verse-trailer', title: 'Across the Spider-Verse — Trailer', category: 'Animation', duration: '2:46', youtubeId: 'cqGjhVJWtEg', source: 'Sony Pictures' },
  { id: 'aot-final-trailer', title: 'Attack on Titan — Final Chapters Trailer', category: 'Anime', duration: '2:05', youtubeId: 'SlNpRThS9t8', source: 'Crunchyroll' },
  { id: 'vinland-s2-trailer', title: 'Vinland Saga — Season 2 Official Trailer', category: 'Anime', duration: '2:18', youtubeId: 'v1tiMdOaF7k', source: 'Twin Engine' },
  { id: 'gta-6-trailer', title: 'Grand Theft Auto VI — Trailer 1', category: 'Games', duration: '1:31', youtubeId: 'QdBZY2fkU-0', source: 'Rockstar Games' },
  { id: 'elden-dlc-trailer', title: 'Elden Ring: Shadow of the Erdtree', category: 'Games', duration: '3:05', youtubeId: 'qLZenOn7WUo', source: 'FromSoftware' },
];

const audioSessions = [
  { id: 'p1', title: 'Hans Zimmer: Building the Dune Sound', host: 'Film Score Journal', duration: '42:18', tag: 'Movies' },
  { id: 'p2', title: 'Hiroyuki Sawano: The Pulse of Attack on Titan', host: 'Anime Sound Lab', duration: '36:05', tag: 'Anime' },
  { id: 'p3', title: 'Joe Hisaishi: Memory in Motion', host: 'Studio Ghibli Circle', duration: '28:47', tag: 'Animation' },
  { id: 'p4', title: 'Taylor Swift and Comic-Book Visual Language', host: 'Panels & Pop', duration: '31:22', tag: 'Comics' },
];

const audioPreview = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3';
const trailerCategories = ['All', 'Anime', 'Sci-Fi', 'Animation', 'Games'];
const initialTrailerCategory = (eventCategory) => ({ anime: 'Anime', gaming: 'Games', movies: 'Sci-Fi' }[eventCategory] || 'All');

export function EventMediaSection({ event }) {
  const [activeTab, setActiveTab] = useState('videos');
  const [trailerCategory, setTrailerCategory] = useState(() => initialTrailerCategory(event.category));
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const audioRef = useRef(null);

  const filteredTrailers = useMemo(() => trailers.filter((trailer) => trailerCategory === 'All' || trailer.category === trailerCategory), [trailerCategory]);
  const [featuredTrailer, ...otherTrailers] = filteredTrailers;

  useEffect(() => {
    if (!activeTrailer) return undefined;
    const closeOnEscape = (keyboardEvent) => {
      if (keyboardEvent.key === 'Escape') setActiveTrailer(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeTrailer]);

  useEffect(() => () => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  const toggleAudio = async (id) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.7;
      audioRef.current.addEventListener('ended', () => setPlayingAudioId(null));
      audioRef.current.addEventListener('error', () => setPlayingAudioId(null));
    }
    const player = audioRef.current;
    if (playingAudioId === id) {
      player.pause();
      setPlayingAudioId(null);
      return;
    }
    player.pause();
    player.src = audioPreview;
    player.currentTime = 0;
    try {
      await player.play();
      setPlayingAudioId(id);
    } catch {
      setPlayingAudioId(null);
    }
  };

  return (
    <section className="event-media-section fv-py-12 fv-bg-ink-800 border-top fv-border-ink-600" aria-labelledby="event-media-title">
      <div className="container-wide">
        <div className="event-media-heading">
          <div>
            <p className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-widest fv-text-brand-400 fv-mb-2">Watch &amp; listen</p>
            <h2 id="event-media-title" className="fv-display-font fv-text-3xl fv-md-text-4xl fv-text-paper-50 fv-tracking-wide">Videos &amp; audio</h2>
            <p className="fv-text-sm fv-text-paper-300 fv-mt-2">Trailers and soundtrack sessions from across the fandoms.</p>
          </div>
          <div className="event-media-tabs" role="tablist" aria-label="Media type">
            <button type="button" role="tab" aria-selected={activeTab === 'videos'} className={activeTab === 'videos' ? 'active' : ''} onClick={() => setActiveTab('videos')}><Play size={15}/> Videos</button>
            <button type="button" role="tab" aria-selected={activeTab === 'audio'} className={activeTab === 'audio' ? 'active' : ''} onClick={() => setActiveTab('audio')}><Headphones size={15}/> Audio</button>
          </div>
        </div>

        {activeTab === 'videos' ? (
          <>
            <div className="event-media-filters" aria-label="Filter trailers by category">
              {trailerCategories.map((category) => (
                <button type="button" key={category} className={trailerCategory === category ? 'active' : ''} aria-pressed={trailerCategory === category} onClick={() => setTrailerCategory(category)}>{category}</button>
              ))}
            </div>
            {featuredTrailer ? (
              <>
                <button type="button" className="event-trailer-feature" onClick={() => setActiveTrailer(featuredTrailer)}>
                  <span className="event-trailer-feature-image">
                    <img src={`https://img.youtube.com/vi/${featuredTrailer.youtubeId}/maxresdefault.jpg`} alt="" loading="lazy" />
                    <span className="event-trailer-play"><Play size={21} fill="currentColor"/></span>
                    <span className="event-trailer-duration">{featuredTrailer.duration}</span>
                  </span>
                  <span className="event-trailer-feature-copy">
                    <span className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-brand-400">{featuredTrailer.source} · {featuredTrailer.category}</span>
                    <span className="event-trailer-title">{featuredTrailer.title}</span>
                    <span className="fv-text-sm fv-text-paper-300">Play trailer</span>
                  </span>
                </button>
                {otherTrailers.length > 0 && (
                  <div className="event-trailer-grid">
                    {otherTrailers.map((trailer) => (
                      <button type="button" className="event-trailer-card" key={trailer.id} onClick={() => setActiveTrailer(trailer)}>
                        <span className="event-trailer-card-image">
                          <img src={`https://img.youtube.com/vi/${trailer.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
                          <span className="event-trailer-play"><Play size={17} fill="currentColor"/></span>
                          <span className="event-trailer-duration">{trailer.duration}</span>
                        </span>
                        <span className="event-trailer-card-copy">
                          <span className="event-trailer-title">{trailer.title}</span>
                          <span className="fv-text-xs fv-text-paper-300">{trailer.source} · {trailer.category}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="fv-text-paper-300 fv-py-6">No trailers match this category.</p>}
          </>
        ) : (
          <div className="event-audio-list">
            {audioSessions.map((session, index) => {
              const isPlaying = playingAudioId === session.id;
              return (
                <div className="event-audio-row" key={session.id}>
                  <span className="event-audio-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="event-audio-icon"><Headphones size={18}/></span>
                  <span className="event-audio-info">
                    <span className="event-trailer-title">{session.title}</span>
                    <span className="fv-text-xs fv-text-paper-300">{session.host} · {session.duration} · {session.tag}</span>
                  </span>
                  <button type="button" className={`event-audio-play ${isPlaying ? 'playing' : ''}`} onClick={() => toggleAudio(session.id)} aria-label={`${isPlaying ? 'Pause' : 'Play'} ${session.title}`} title={`${isPlaying ? 'Pause' : 'Play'} audio preview`}>
                    {isPlaying ? <Pause size={17} fill="currentColor"/> : <Play size={17} fill="currentColor"/>}
                  </button>
                </div>
              );
            })}
            <p className="fv-text-xs fv-text-paper-300 fv-mt-3">Audio buttons play a shared demo preview track, matching the source app’s sample player.</p>
          </div>
        )}
      </div>

      {activeTrailer && (
        <div className="event-video-backdrop" role="presentation" onMouseDown={(mouseEvent) => { if (mouseEvent.target === mouseEvent.currentTarget) setActiveTrailer(null); }}>
          <div className="event-video-dialog" role="dialog" aria-modal="true" aria-label={activeTrailer.title}>
            <div className="event-video-frame">
              <button type="button" className="event-video-close" onClick={() => setActiveTrailer(null)} aria-label="Close video"><X size={20}/></button>
              <iframe src={`https://www.youtube-nocookie.com/embed/${activeTrailer.youtubeId}?autoplay=1&rel=0`} title={activeTrailer.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
            <div className="event-video-caption">
              <h3>{activeTrailer.title}</h3>
              <p>{activeTrailer.source} · {activeTrailer.category} · {activeTrailer.duration}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}