import { useState } from 'react';

export function TrendingArtwork({ item, className = '', loading = 'lazy' }) {
  const sources = [item.image, ...(item.imageFallbacks ?? [])];
  const [sourceIndex, setSourceIndex] = useState(0);
  const [allSourcesFailed, setAllSourcesFailed] = useState(false);

  if (allSourcesFailed) {
    return (
      <div role="img" aria-label={`${item.title} artwork unavailable`} className={`${className} d-flex align-items-center justify-content-center fv-bg-gradient-to-br fv-from-ink-700 fv-via-ink-900 fv-to-brand-900 fv-p-4 text-center`}>
        <span className="fv-display-font fv-text-sm fv-text-paper-100">{item.title}</span>
      </div>
    );
  }

  return (
    <img
      src={sources[sourceIndex]}
      alt={item.title}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => {
        if (sourceIndex < sources.length - 1) setSourceIndex((index) => index + 1);
        else setAllSourcesFailed(true);
      }}
    />
  );
}
