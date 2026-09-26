import { useEffect, useState } from 'react';
import { Headphones, Play, X } from 'lucide-react';
import './MediaPlayback.css';

const sampleAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3';

export function MediaPlayButton({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const isAudio = item.type === 'audio' || item.type === 'podcast';
  const isPlayable = Boolean(item.youtubeId || item.videoUrl || item.audioUrl || isAudio);
  if (!isPlayable) return null;

  return (
    <>
      <button type="button" className="media-play-button" onClick={(event) => { event.stopPropagation(); setIsOpen(true); }} aria-label={`${isAudio ? 'Play' : 'Watch'} ${item.title}`} title={`${isAudio ? 'Play audio' : 'Watch trailer'}`}>
        {isAudio ? <Headphones size={22}/> : <Play size={23} fill="currentColor"/>}
      </button>
      {isOpen && <MediaPlaybackDialog item={item} onClose={() => setIsOpen(false)}/>}
    </>
  );
}

function MediaPlaybackDialog({ item, onClose }) {
  const isAudio = item.type === 'audio' || item.type === 'podcast';
  const audioUrl = item.audioUrl || sampleAudioUrl;

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="media-player-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="media-player-dialog" role="dialog" aria-modal="true" aria-label={item.title}>
        <button type="button" className="media-player-close" onClick={onClose} aria-label="Close player"><X size={20}/></button>
        {isAudio ? (
          <div className="media-player-audio-stage">
            <Headphones size={42}/>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <audio controls autoPlay src={audioUrl} preload="none">Your browser does not support audio playback.</audio>
            {!item.audioUrl && <small>Demo preview track from the reference app.</small>}
          </div>
        ) : (
          <div className="media-player-video-stage">
            {item.youtubeId ? (
              <iframe src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            ) : (
              <video controls autoPlay playsInline src={item.videoUrl}>Your browser does not support video playback.</video>
            )}
          </div>
        )}
        <div className="media-player-caption">
          <h3>{item.title}</h3>
          <p>{[item.source, item.release, item.duration].filter(Boolean).join(' · ')}</p>
        </div>
      </section>
    </div>
  );
}