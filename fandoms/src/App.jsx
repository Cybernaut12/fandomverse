import { useState, useMemo, useEffect, useRef } from 'react';
import './App.css';

/* ============================================================
   ICONS
   ============================================================ */
const IconCal = () => (
  <svg className="ic" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
);
const IconPin = () => (
  <svg className="ic" viewBox="0 0 24 24"><path d="M12 22s-8-8-8-13a8 8 0 1116 0c0 5-8 13-8 13z"/><circle cx="12" cy="9" r="3"/></svg>
);
const IconTag = () => (
  <svg className="ic" viewBox="0 0 24 24"><path d="M20.6 13.4L13.4 20.6a2 2 0 01-2.8 0l-7.2-7.2A2 2 0 013 12V5a2 2 0 012-2h7a2 2 0 011.4.6l7.2 7.2a2 2 0 010 2.6z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>
);
const IconArrow = () => (
  <svg className="ic" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
);
const IconChevL = () => (
  <svg className="ic" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
);
const IconChevR = () => (
  <svg className="ic" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
);
const IconStar = () => (
  <svg className="ic" viewBox="0 0 24 24" style={{ fill: 'currentColor', stroke: 'none' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const IconPlay = () => (
  <svg className="ic" viewBox="0 0 24 24" style={{ fill: 'currentColor', stroke: 'none' }}><path d="M8 5v14l11-7z"/></svg>
);
const IconPause = () => (
  <svg className="ic" viewBox="0 0 24 24" style={{ fill: 'currentColor', stroke: 'none' }}><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
);
const IconVol = () => (
  <svg className="ic" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/></svg>
);

/* ============================================================
   AUDIO BEDS â€” free ambient loops (SoundHelix demos)
   ============================================================ */
const AUDIO_BEDS = {
  convention:   'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  premiere:     'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  watchparty:   'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  meetup:       'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  concert:      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  hero:         'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  trailer:      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  live:         'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  editorial:    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
  podcast:      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
};

const categoryAudio = (cat) => {
  const map = {
    Convention: AUDIO_BEDS.convention,
    Premiere: AUDIO_BEDS.premiere,
    'Watch Party': AUDIO_BEDS.watchparty,
    Meetup: AUDIO_BEDS.meetup,
    Concert: AUDIO_BEDS.concert
  };
  return map[cat] || AUDIO_BEDS.convention;
};

/* ============================================================
   DATA
   ============================================================ */
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;
const yt = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const EVENTS = [
  { id:'sdcc-2024', category:'Convention', title:'Comic-Con International 2024', date:'July 22 â€“ 25, 2024', status:'past', location:'San Diego Convention Center, CA', description:'The biggest pop-culture gathering on the West Coast â€” panels, cosplay, exclusives, and surprise announcements from every major studio.', image: u('photo-1540575467063-178a50c2df87') },
  { id:'ax-2024', category:'Convention', title:'Anime Expo 2024', date:'July 4 â€“ 7, 2024', status:'past', location:'Los Angeles Convention Center, CA', description:"North America's largest anime convention â€” premieres, industry panels, concerts, and a sprawling exhibit hall.", image: u('photo-1607604276583-eef5d076aa5f') },
  { id:'gamescom-2024', category:'Convention', title:'Gamescom 2024', date:'August 21 â€“ 25, 2024', status:'past', location:'Koelnmesse, Cologne, Germany', description:'The worldâ€™s largest gaming event â€” hands-on demos, esports, and reveals from every major studio.', image: u('photo-1511512578047-dfb367046420') },
  { id:'tgs-2024', category:'Convention', title:'Tokyo Game Show 2024', date:'September 26 â€“ 29, 2024', status:'upcoming', location:'Makuhari Messe, Chiba, Japan', description:'Japanâ€™s flagship gaming expo â€” world premieres, developer talks, and stage events.', image: u('photo-1493711662062-fa541adb3fc8') },
  { id:'arcane-s2', category:'Premiere', title:'Arcane â€” Season 2 Premiere', date:'November 2, 2024', status:'upcoming', location:'Netflix (Global Streaming)', description:'The long-awaited return of the animated series set in the League of Legends universe.', image: u('photo-1611162617474-5b21e879e113') },
  { id:'dune-prophecy', category:'Premiere', title:'Dune: Prophecy â€” Series Debut', date:'November 17, 2024', status:'upcoming', location:'Max (Global Streaming)', description:'A prequel series set 10,000 years before the rise of Paul Atreides.', image: u('photo-1500530855697-b586d89ba3ee') },
  { id:'frieren-s2', category:'Premiere', title:'Frieren: Beyond Journeyâ€™s End â€” S2', date:'January 2025', status:'upcoming', location:'Crunchyroll (Global Streaming)', description:'The acclaimed fantasy anime continues its quiet, devastating journey.', image: u('photo-1578632767115-351597cf2477') },
  { id:'spider-verse-party', category:'Watch Party', title:'Spider-Verse Community Rewatch', date:'Every Friday, 8PM ET', status:'live', location:'Fandomverse Discord + Sync Stream', description:'Join thousands of fans for a synced rewatch of Across the Spider-Verse with live commentary.', image: u('photo-1635805737707-575885ab0820') },
  { id:'vinland-party', category:'Watch Party', title:'Vinland Saga S2 Watch Party', date:'October 20, 2024', status:'upcoming', location:'Online (Community Hub)', description:'Two episodes a week, spoiler-safe zones, and weekly discussion threads.', image: u('photo-1518709268805-4e9042af9f23') },
  { id:'aot-finale', category:'Watch Party', title:'Attack on Titan Finale Marathon', date:'December 1, 2024', status:'upcoming', location:'Online (Community Hub)', description:'The complete final season, back-to-back, with a live fan Q&A after the credits roll.', image: u('photo-1541562232579-512a21360020') },
  { id:'la-anime-meetup', category:'Meetup', title:'LA Anime Fans Monthly Meetup', date:'Last Saturday of every month', status:'upcoming', location:'Little Tokyo, Los Angeles, CA', description:'Casual monthly gathering â€” bring a friend, trade merch, and talk seasonal anime over boba.', image: u('photo-1517457373958-b7bdd4587205') },
  { id:'nyc-fandom', category:'Meetup', title:'NYC Fandom Trivia Night', date:'November 8, 2024', status:'upcoming', location:'Brooklyn Game Lab, NY', description:'Teams of four, five rounds, and questions spanning anime, games, and sci-fi cinema.', image: u('photo-1511578314322-379afb476865') },
  { id:'london-cosplay', category:'Meetup', title:'London Cosplay Picnic', date:'September 14, 2024', status:'past', location:'Hyde Park, London, UK', description:'A relaxed afternoon of cosplay photography, snacks, and new friendships.', image: u('photo-1533174072545-7a4b6ad7a6c3') },
  { id:'joe-hisaishi', category:'Concert', title:'Joe Hisaishi â€” Symphonic Ghibli', date:'October 4, 2024', status:'past', location:'Royal Albert Hall, London', description:'The legendary composer performs his Studio Ghibli scores with a full orchestra.', image: u('photo-1501386761578-eac5c94b800a') },
  { id:'hiroyuki-sawano', category:'Concert', title:'Hiroyuki Sawano Live', date:'December 12, 2024', status:'upcoming', location:'Tokyo International Forum, Japan', description:'A live performance of scores from Attack on Titan, 86, and more.', image: u('photo-1470229722913-7c0e2dbbafd3') },
  { id:'anime-symphony-nyc', category:'Concert', title:'Anime Symphony â€” NYC', date:'November 22, 2024', status:'upcoming', location:'Carnegie Hall, New York', description:'A night of orchestral anime themes spanning four decades.', image: u('photo-1519677100203-a0e668c92439') }
];

const TRAILERS = [
  { id:'spider-man-bnd-trailer', title:'Spider-Man: Brand New Day — Official Trailer', category:'Movies', status:'recent', release:'July 31, 2026', duration:'2:34', youtubeId:'tLeBDumanoc', source:'Marvel Entertainment', thumb:yt('tLeBDumanoc'), description:'Peter Parker fights crime in a world that has forgotten him. As old friends move on, a change in Peter may become the only way to stop a new threat to the city.' },
  { id:'dune-prophecy-trailer', title:'Dune: Prophecy â€” Official Teaser', category:'Sci-Fi', status:'upcoming', release:'November 17, 2024', duration:'1:58', youtubeId:'FyK0B6RZo0Q', source:'Max', thumb: yt('FyK0B6RZo0Q') },
  { id:'frieren-s2-trailer', title:'Frieren S2 â€” Announcement Trailer', category:'Anime', status:'upcoming', release:'January 2025', duration:'1:22', youtubeId:'W0mVCx7XkY4', source:'Crunchyroll', thumb: yt('W0mVCx7XkY4') },
  { id:'dune-2-trailer', title:'Dune: Part Two â€” Official Trailer', category:'Sci-Fi', status:'recent', release:'March 1, 2024', duration:'3:12', youtubeId:'Way9Dexny3w', source:'Warner Bros.', thumb: yt('Way9Dexny3w') },
  { id:'spider-verse-trailer', title:'Across the Spider-Verse â€” Trailer', category:'Animation', status:'recent', release:'June 2, 2023', duration:'2:46', youtubeId:'cqGjhVJWtEg', source:'Sony Pictures', thumb: yt('cqGjhVJWtEg') },
  { id:'aot-final-trailer', title:'Attack on Titan â€” Final Chapters Trailer', category:'Anime', status:'recent', release:'November 4, 2023', duration:'2:05', youtubeId:'SlNpRThS9t8', source:'Crunchyroll', thumb: yt('SlNpRThS9t8') },
  { id:'vinland-s2-trailer', title:'Vinland Saga S2 â€” Official Trailer', category:'Anime', status:'recent', release:'January 9, 2023', duration:'2:18', youtubeId:'i0m2aO0nYPg', source:'Netflix', thumb: yt('i0m2aO0nYPg') },
  { id:'gta-6-trailer', title:'Grand Theft Auto VI â€” Trailer 1', category:'Games', status:'upcoming', release:'2025', duration:'1:31', youtubeId:'QdBZY2fkU-0', source:'Rockstar Games', thumb: yt('QdBZY2fkU-0') },
  { id:'elden-dlc-trailer', title:'Elden Ring: Shadow of the Erdtree', category:'Games', status:'recent', release:'June 21, 2024', duration:'3:05', youtubeId:'qLZenOn7WUo', source:'FromSoftware', thumb: yt('qLZenOn7WUo') }
];

const HERO_SLIDES = [
  { id:'sdcc', tag:'Featured Event', title:'Comic-Con International returns this July', sub:'Four days of panels, cosplay, and exclusives at the San Diego Convention Center.', image: u('photo-1540575467063-178a50c2df87'), cta:'Get Tickets', ghost:'Listen to theme' },
  { id:'arcane', tag:'Premiere â€” Nov 2', title:'Arcane returns for its final season', sub:'The League of Legends story concludes on Netflix.', image: u('photo-1611162617474-5b21e879e113'), cta:'Set Reminder', ghost:'Play trailer audio' },
  { id:'hisaishi', tag:'Concert â€” Oct 4', title:'Joe Hisaishi performs at the Royal Albert Hall', sub:'A full orchestral night of Studio Ghibli scores.', image: u('photo-1501386761578-eac5c94b800a'), cta:'Book Seats', ghost:'Preview the score' }
];

const LIVE_NOW = [
  { id:'l1', title:'Spider-Verse Rewatch', host:'Fandomverse Discord', viewers:'2.4K watching', image: u('photo-1635805737707-575885ab0820') },
  { id:'l2', title:'AOT Finale Watchalong', host:'Hajime Hub', viewers:'1.8K watching', image: u('photo-1541562232579-512a21360020') },
  { id:'l3', title:'Ghibli Marathon', host:'Studio Circle', viewers:'940 watching', image: u('photo-1501386761578-eac5c94b800a') },
  { id:'l4', title:'Late Night Dune Chat', host:'Arrakis Fans', viewers:'620 watching', image: u('photo-1500530855697-b586d89ba3ee') }
];

const TRENDING = [
  { id:'t1', rank:1, title:'Arcane S2 Premiere', sub:'Netflix Â· Nov 2', image: u('photo-1611162617474-5b21e879e113') },
  { id:'t2', rank:2, title:'Comic-Con 2024', sub:'San Diego Â· Jul 22', image: u('photo-1540575467063-178a50c2df87') },
  { id:'t3', rank:3, title:'Dune: Prophecy', sub:'Max Â· Nov 17', image: u('photo-1500530855697-b586d89ba3ee') },
  { id:'t4', rank:4, title:'Anime Symphony NYC', sub:'Carnegie Hall Â· Nov 22', image: u('photo-1519677100203-a0e668c92439') },
  { id:'t5', rank:5, title:'Sawano Live in Tokyo', sub:'Dec 12', image: u('photo-1470229722913-7c0e2dbbafd3') },
  { id:'t6', rank:6, title:'Frieren S2', sub:'Crunchyroll Â· Jan 2025', image: u('photo-1578632767115-351597cf2477') }
];

const WEEK = [
  { dow:'MON', dnum:'07', today:false, mood:'calm', items:[{ t:'Arcane S2 teaser drop', c:'purple', time:'6PM' }]},
  { dow:'TUE', dnum:'08', today:false, mood:'buzzy', items:[{ t:'NYC Trivia sign-ups close', c:'green', time:'11PM' }]},
  { dow:'WED', dnum:'09', today:false, mood:'hype', items:[{ t:'Dune: Prophecy press panel', c:'blue', time:'3PM' }]},
  { dow:'THU', dnum:'10', today:false, mood:'calm', items:[{ t:'Hiroyuki Sawano rehearsal', c:'gold', time:'7PM' }]},
  { dow:'FRI', dnum:'11', today:true, mood:'party', items:[
    { t:'Spider-Verse Rewatch', c:'purple', time:'8PM ET' },
    { t:'AOT Marathon opens', c:'purple', time:'10PM ET' }
  ]},
  { dow:'SAT', dnum:'12', today:false, mood:'party', items:[
    { t:'LA Anime Meetup', c:'green', time:'2PM' },
    { t:'Cosplay photo walk', c:'gold', time:'4PM' }
  ]},
  { dow:'SUN', dnum:'13', today:false, mood:'chill', items:[{ t:'Vinland S2 discussion thread', c:'purple', time:'All day' }]}
];

const CATEGORIES = [
  { id:'c1', icon:'âš”', label:'Conventions', sub:'120+ this year', image: u('photo-1540575467063-178a50c2df87') },
  { id:'c2', icon:'âœ¦', label:'Premieres', sub:'New every week', image: u('photo-1611162617474-5b21e879e113') },
  { id:'c3', icon:'â—‰', label:'Watch Parties', sub:'Thousands watching', image: u('photo-1635805737707-575885ab0820') },
  { id:'c4', icon:'â˜º', label:'Meetups', sub:'Local & online', image: u('photo-1517457373958-b7bdd4587205') },
  { id:'c5', icon:'â™ª', label:'Concerts', sub:'Orchestral & live', image: u('photo-1501386761578-eac5c94b800a') }
];

const VENUES = [
  { id:'v1', name:'San Diego Convention Center', loc:'San Diego, CA', events:42, image: u('photo-1540575467063-178a50c2df87') },
  { id:'v2', name:'Royal Albert Hall', loc:'London, UK', events:18, image: u('photo-1501386761578-eac5c94b800a') },
  { id:'v3', name:'Makuhari Messe', loc:'Chiba, Japan', events:27, image: u('photo-1493711662062-fa541adb3fc8') },
  { id:'v4', name:'Carnegie Hall', loc:'New York, NY', events:12, image: u('photo-1519677100203-a0e668c92439') }
];

const PODCAST_EPISODES = [
  { id:'p1', title:'Hans Zimmer: Building the Dune sound', host:'Film Score Journal', duration:'42:18', plays:'18K', tag:'Movie' },
  { id:'p2', title:'Hiroyuki Sawano: The pulse of Attack on Titan', host:'Anime Sound Lab', duration:'36:05', plays:'12K', tag:'TV Show' },
  { id:'p3', title:'Joe Hisaishi: Memory in motion', host:'Studio Ghibli Circle', duration:'28:47', plays:'9.4K', tag:'Animation' },
  { id:'p4', title:'Taylor Swift and the comic-book visual language', host:'Panels & Pop', duration:'31:22', plays:'7.1K', tag:'Comics' }
];

/* ============================================================
   HELPERS
   ============================================================ */
const categoryClass = (cat) => {
  const map = {
    Convention: 'cat-convention',
    Premiere: 'cat-premiere',
    'Watch Party': 'cat-watchparty',
    Meetup: 'cat-meetup',
    Concert: 'cat-concert'
  };
  return map[cat] || 'cat-convention';
};
const statusLabel = (s) => s === 'past' ? 'Past' : s === 'live' ? 'Live Now' : 'Upcoming';

/* ============================================================
   AUDIO HOOK â€” single instance playback
   ============================================================ */
function useAudio() {
  const audioRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }
  }, []);

  const toggle = (id, src) => {
    const a = audioRef.current;
    if (!a) return;
    if (playingId === id) {
      a.pause();
      setPlayingId(null);
    } else {
      a.src = src;
      a.play().catch(() => {});
      setPlayingId(id);
    }
  };

  const isPlaying = (id) => playingId === id;

  return { toggle, isPlaying };
}

/* ============================================================
   AUDIO BUTTON â€” small reusable
   ============================================================ */
const AudioButton = ({ id, src, label, playing, onToggle, size = 'md' }) => (
  <button
    className={'audio-btn ' + size + (playing ? ' playing' : '')}
    onClick={(e) => { e.stopPropagation(); onToggle(id, src); }}
    aria-label={playing ? 'Pause audio' : 'Play audio'}
    title={label || 'Play ambient audio'}
  >
    <span className="audio-icon">{playing ? <IconPause /> : <IconPlay />}</span>
    <span className="wave">
      <span /><span /><span /><span />
    </span>
  </button>
);

/* ============================================================
   EQUALIZER STRIP
   ============================================================ */
const Equalizer = ({ active }) => (
  <div className={'eq-strip' + (active ? ' active' : '')}>
    {Array.from({ length: 24 }).map((_, i) => (
      <span key={i} style={{ animationDelay: (i * 40) + 'ms' }} />
    ))}
  </div>
);

/* ============================================================
   TOPBAR
   ============================================================ */
const TopBar = () => {
  const [active, setActive] = useState('Events');
  const nav = ['Home', 'Explore', 'Events', 'Trailers', 'Library', 'Community'];
  return (
    <header className="topbar">
      <div className="topbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/logo.png" alt="FandomVerse Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
        <span className="logo-text">FANDOM<span style={{ color: '#e8a87c' }}>VERSE</span></span>
      </div>
      <nav className="topbar-nav">
        {nav.map(n => (
          <button key={n} className={active === n ? 'active' : ''} onClick={() => setActive(n)}>{n}</button>
        ))}
      </nav>
      <div className="topbar-user">
        <span className="user-name">William</span>
        <div className="user-avatar">W</div>
      </div>
    </header>
  );
};

/* ============================================================
   HERO CAROUSEL â€” with ambient audio
   ============================================================ */
const HeroCarousel = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 8000);
    return () => clearInterval(id);
  }, []);
  const s = HERO_SLIDES[idx];
  return (
    <section className="hero-carousel">
      {HERO_SLIDES.map((slide, i) => (
        <div key={slide.id} className={'hero-slide' + (i === idx ? ' active' : '')}
          style={{ backgroundImage: `url(${slide.image})` }} />
      ))}
      <div className="hero-body">
        <div className="topline">
          <span className="live-badge"><span className="live-dot" />{s.tag}</span>
        </div>
        <h2>{s.title}</h2>
        <p>{s.sub}</p>
        <div className="actions">
          <button className="btn-solid">{s.cta} â†’</button>
          <button className="btn-ghost">{s.ghost}</button>
        </div>
      </div>
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} className={'hero-dot' + (i === idx ? ' active' : '')}
            onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   LIVE NOW â€” audio + visual
   ============================================================ */
const LiveNowStrip = () => (
  <div className="live-strip">
    {LIVE_NOW.map(l => (
      <div key={l.id} className="live-chip">
        <div className="thumb"><img src={l.image} alt={l.title} /></div>
        <div className="meta">
          <strong>{l.title}</strong>
          <span>{l.host} Â· {l.viewers}</span>
        </div>
        <span className="live-badge small"><span className="live-dot" />Live</span>
      </div>
    ))}
  </div>
);

/* ============================================================
   TRENDING â€” editorial rows with audio
   ============================================================ */
const TrendingRow = () => (
  <div className="trend-list">
    {TRENDING.map(t => (
      <div key={t.id} className="trend-row-item">
        <span className="trend-rank-num">{String(t.rank).padStart(2, '0')}</span>
        <div className="trend-thumb">
          <img src={t.image} alt={t.title} loading="lazy" />
        </div>
        <div className="trend-info">
          <strong>{t.title}</strong>
          <span>{t.sub}</span>
        </div>
      </div>
    ))}
  </div>
);

/* ============================================================
   FUN CALENDAR â€” with per-day ambience
   ============================================================ */
const FunCalendar = () => {
  const [month, setMonth] = useState('October 2024');
  return (
    <div className="fun-calendar">
      <div className="cal-toolbar">
        <button className="cal-nav" aria-label="Previous month"><IconChevL /></button>
        <h3 className="cal-month">{month}</h3>
        <button className="cal-nav" aria-label="Next month"><IconChevR /></button>
        <span className="cal-today-pill">
          <span className="cal-today-dot" />Today Â· Fri, Oct 11
        </span>
      </div>

      <div className="cal-grid">
        {WEEK.map((d, i) => (
          <div key={i} className={'cal-day' + (d.today ? ' today' : '') + ' mood-' + d.mood}>
            <div className="cal-day-head">
              <span className="cal-dow">{d.dow}</span>
              <span className="cal-dnum">{d.dnum}</span>
            </div>

            <div className="cal-day-body">
              {d.items.map((it, j) => (
                <div key={j} className="cal-item">
                  <span className={'cal-tick ' + (it.c || 'purple')} />
                  <div className="cal-item-text">
                    <span className="cal-item-title">{it.t}</span>
                    <span className="cal-item-time">{it.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <span className="cal-glow" />
          </div>
        ))}
      </div>

      <div className="cal-legend">
        <span className="legend-pill"><span className="legend-dot purple" />Watch party</span>
        <span className="legend-pill"><span className="legend-dot green" />Meetup</span>
        <span className="legend-pill"><span className="legend-dot blue" />Panel</span>
        <span className="legend-pill"><span className="legend-dot gold" />Concert</span>
      </div>
    </div>
  );
};

/* ============================================================
   BENTO FEATURE â€” hero has audio
   ============================================================ */
const BentoFeature = () => {
  const [hero, ...rest] = EVENTS.filter(e => e.status === 'upcoming').slice(0, 5);
  return (
    <div className="bento-grid">
      <article className="bento-hero" style={{ backgroundImage: `url(${hero.image})` }}>
        <div className="bento-overlay" />
        <div className="bento-content">
          <span className={'cat-tag ' + categoryClass(hero.category)}>
            <span className="cat-dot" />{hero.category}
          </span>
          <h3>{hero.title}</h3>
          <p>{hero.description}</p>
          <div className="bento-meta">
            <span><IconCal />{hero.date}</span>
            <span><IconPin />{hero.location}</span>
          </div>
          <div className="bento-actions">
            <button className="btn-solid small">View details â†’</button>
          </div>
        </div>
      </article>

      {rest.map((e, i) => (
        <article key={e.id} className={'bento-tile bt-' + (i + 1)} style={{ backgroundImage: `url(${e.image})` }}>
          <div className="bento-overlay" />
          <div className="bento-tile-content">
            <span className={'cat-tag small ' + categoryClass(e.category)}>{e.category}</span>
            <h4>{e.title}</h4>
            <span className="bt-date">{e.date}</span>
          </div>
        </article>
      ))}
    </div>
  );
};

/* ============================================================
   EDITORIAL SPOTLIGHT â€” with podcast-style player
   ============================================================ */
const EditorialSpotlight = ({ audio }) => (
  <div className="editorial-split">
    <div className="editorial-image">
      <img src={u('photo-1541562232579-512a21360020')} alt="Spotlight" />
      <div className="editorial-badge">
        <IconStar />
        <span>Editor's Pick</span>
      </div>
    </div>
    <div className="editorial-body">
      <span className="eyebrow">Artist spotlight Â· Audio feature</span>
      <h2>Hiroyuki Sawano and the sound of Attack on Titan</h2>
      <p>
        Revisit the emotional beats, colossal percussion, and unforgettable themes that made the series feel larger than life. Listen to the full artist feature below.
      </p>

      <div className="editorial-player">
        <AudioButton
          id="editorial"
          src={AUDIO_BEDS.editorial}
          playing={audio.isPlaying('editorial')}
          onToggle={audio.toggle}
          size="lg"
        />
        <div className="player-info">
          <span className="player-label">Artist feature Â· 45 min</span>
          <Equalizer active={audio.isPlaying('editorial')} />
        </div>
      </div>

      <ul className="editorial-list">
        <li><span className="dot" />Sawano's score, dissected</li>
        <li><span className="dot" />The music behind the final season</li>
      </ul>
      <button className="btn-solid">Read the full feature â†’</button>
    </div>
  </div>
);

/* ============================================================
   EVENT LIST â€” rows with audio previews
   ============================================================ */
const EventList = ({ onOpen }) => {
  const upcoming = EVENTS.filter(e => e.status === 'upcoming').slice(0, 6);
  return (
    <div className="event-list">
      {upcoming.map((e, i) => (
        <div key={e.id} className="event-list-row">
          <span className="row-num">{String(i + 1).padStart(2, '0')}</span>
          <button className="row-main" onClick={() => onOpen(e)}>
            <h4>{e.title}</h4>
            <p>{e.description}</p>
          </button>
          <div className="row-meta">
            <span className={'cat-tag small ' + categoryClass(e.category)}>{e.category}</span>
            <span className="row-date"><IconCal />{e.date}</span>
            <span className="row-loc"><IconPin />{e.location}</span>
          </div>
          <button className="row-arrow" onClick={() => onOpen(e)} aria-label="Open event">
            <IconArrow />
          </button>
        </div>
      ))}
    </div>
  );
};

/* ============================================================
   EVENT CARD â€” small, with mini audio
   ============================================================ */
const EventCard = ({ e, onOpen }) => (
  <div className="event-card" onClick={() => onOpen(e)}>
    <div className="event-card-top">
      <img src={e.image} alt={e.title} loading="lazy" />
      <span className={'event-card-cat ' + categoryClass(e.category)}>
        <span className="cat-dot" />{e.category}
      </span>
      <span className={'event-card-status ' + e.status}>{statusLabel(e.status)}</span>
    </div>
    <div className="event-card-body">
      <h3>{e.title}</h3>
      <div className="event-card-meta">
        <div className="row"><IconCal />{e.date}</div>
        <div className="row"><IconPin />{e.location}</div>
      </div>
    </div>
  </div>
);

/* ============================================================
   TRAILERS â€” audio previews
   ============================================================ */
const TrailerFeature = ({ t, onOpen }) => (
  <div className="trailer-feature">
    <div className="trailer-feature-thumb" onClick={() => onOpen(t)}>
      <img src={t.thumb} alt={t.title} />
      <div className="trailer-feature-overlay" />
      <div className="play-btn big"><span className="circle">â–¶</span></div>
      <span className="trailer-duration big">{t.duration}</span>
      <span className={'trailer-status ' + t.status}>
        {t.status === 'upcoming' ? 'Upcoming' : 'Recently Released'}
      </span>
    </div>
    <div className="trailer-feature-body">
      <span className="eyebrow">{t.source} Â· {t.release}</span>
      <h3>{t.title}</h3>
      <p>Watch the trailer and explore the latest stories from your favorite fandoms.</p>
      <div className="trailer-feature-actions">
        <button className="btn-solid small" onClick={() => onOpen(t)}>â–¶ Watch trailer</button>
      </div>
    </div>
  </div>
);

const TrailerCard = ({ t, onOpen }) => (
  <div className="trailer-card" onClick={() => onOpen(t)}>
    <div className="trailer-thumb">
      <img src={t.thumb} alt={t.title} loading="lazy" />
      <span className={'trailer-cat ' + categoryClass('Premiere')}>
        <span className="cat-dot" />{t.category}
      </span>
      <span className={'trailer-status ' + t.status}>
        {t.status === 'upcoming' ? 'Upcoming' : 'Recently Released'}
      </span>
      <div className="play-btn"><span className="circle">â–¶</span></div>
      <span className="trailer-duration">{t.duration}</span>
    </div>
    <div className="trailer-body">
      <h3>{t.title}</h3>
      <span className="sub">{t.source}<span className="dot">Â·</span>{t.release}</span>
    </div>
  </div>
);

/* ============================================================
   PODCAST STRIP â€” new audio section
   ============================================================ */
const PodcastStrip = ({ audio }) => (
  <div className="podcast-list">
    {PODCAST_EPISODES.map((p, i) => (
      <div key={p.id} className="podcast-row">
        <span className="podcast-num">{String(i + 1).padStart(2, '0')}</span>
        <div className="podcast-info">
          <h4>{p.title}</h4>
          <span className="podcast-meta">{p.host} Â· {p.duration} Â· {p.plays} plays</span>
        </div>
        <span className="podcast-tag">{p.tag}</span>
        <AudioButton
          id={'pod-' + p.id}
          src={AUDIO_BEDS.podcast}
          playing={audio.isPlaying('pod-' + p.id)}
          onToggle={audio.toggle}
          size="md"
        />
      </div>
    ))}
  </div>
);

/* ============================================================
   CATEGORIES / VENUES
   ============================================================ */
const CategoriesGrid = () => (
  <div className="cat-grid">
    {CATEGORIES.map(c => (
      <div key={c.id} className="cat-tile">
        <span className="bg" style={{ backgroundImage: `url(${c.image})` }} />
        <span className="overlay" />
        <span className="body">
          <span className="icon">{c.icon}</span>
          <div className="label">{c.label}</div>
          <div className="sub">{c.sub}</div>
        </span>
      </div>
    ))}
  </div>
);

const VenuesGrid = () => (
  <div className="venue-grid">
    {VENUES.map(v => (
      <div key={v.id} className="venue-card">
        <span className="img" style={{ backgroundImage: `url(${v.image})` }} />
        <span className="shade" />
        <span className="info">
          <h4>{v.name}</h4>
          <div className="loc"><IconPin />{v.loc}</div>
          <span className="count">{v.events} events</span>
        </span>
      </div>
    ))}
  </div>
);

/* ============================================================
   MODALS
   ============================================================ */
const EventModal = ({ e, onClose }) => {
  if (!e) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(ev) => ev.stopPropagation()}>
        <div className="modal-hero" style={{ backgroundImage: `url(${e.image})` }}>
          <button className="modal-close" onClick={onClose}>Ã—</button>
        </div>
        <div className="modal-body">
          <span className={'cat ' + categoryClass(e.category)}>
            <span className="cat-dot" style={{ width:5, height:5, borderRadius:'50%', background:'currentColor' }} />
            {e.category}
          </span>
          <h2>{e.title}</h2>
          <div className="modal-meta">
            <div className="row"><IconCal />{e.date}</div>
            <div className="row"><IconPin />{e.location}</div>
            <div className="row"><IconTag />Status: {statusLabel(e.status)}</div>
          </div>
          <p className="modal-desc">{e.description}</p>
          <div className="modal-actions">
            <button className="btn-solid">Get Tickets â†’</button>
            <button className="btn-ghost">+ Add to Calendar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ t, onClose }) => {
  if (!t) return null;
  const url = `https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&rel=0`;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(ev) => ev.stopPropagation()} style={{ width: 'min(960px, 100%)' }}>
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
          <button className="modal-close" onClick={onClose}>Ã—</button>
          <iframe src={url} title={t.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        </div>
        <div className="modal-body" style={{ paddingTop: 20 }}>
          <h2>{t.title}</h2>
          <div className="modal-meta" style={{ border: 0, padding: 0, margin: 0 }}>
            <div className="row">{t.source} Â· {t.release} Â· {t.duration}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [eventCat, setEventCat] = useState('All');
  const [eventStatus, setEventStatus] = useState('All');
  const [trailerCat, setTrailerCat] = useState('All');
  const [openEvent, setOpenEvent] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(null);
  const audio = useAudio();

  const eventCats = ['All', 'Convention', 'Premiere', 'Watch Party', 'Meetup', 'Concert'];
  const eventStatuses = ['Upcoming', 'Live', 'Past'];
  const trailerCats = ['All', 'Anime', 'Sci-Fi', 'Animation', 'Games'];

  const filteredEvents = useMemo(() => {
    return EVENTS.filter(e =>
      (eventCat === 'All' || e.category === eventCat) &&
      (eventStatus === 'All' ||
        (eventStatus === 'Upcoming' && e.status === 'upcoming') ||
        (eventStatus === 'Live' && e.status === 'live') ||
        (eventStatus === 'Past' && e.status === 'past'))
    );
  }, [eventCat, eventStatus]);

  const filteredTrailers = useMemo(() => {
    return TRAILERS.filter(t => trailerCat === 'All' || t.category === trailerCat);
  }, [trailerCat]);

  const [featuredTrailer, ...restTrailers] = filteredTrailers;

  return (
    <>
      <div className="app-shell">
        <TopBar />

        <main className="app-main">
          <div className="events-page">
            <header className="events-head">
              <h1>Events &amp; Trailers</h1>
              <p>Everything happening across your fandoms â€” conventions, premieres, watch parties, meetups, and concerts. Explore the artists and sounds behind the stories you love.</p>
            </header>

            <HeroCarousel />

            <section className="events-section">
              <div className="section-head">
                <div className="section-head-left">
                  <h2>Live Right Now</h2>
                  <span className="count">{LIVE_NOW.length} streams</span>
                </div>
                <button className="see-all">See all â†’</button>
              </div>
              <LiveNowStrip />
            </section>

            <section className="events-section">
              <div className="section-head">
                <div className="section-head-left">
                  <h2>This Week at a Glance</h2>
                  <span className="count">Oct 7 â€“ 13 Â· tap â–¶ per day</span>
                </div>
                <button className="see-all">Full calendar â†’</button>
              </div>
              <FunCalendar />
            </section>

            <section className="events-section">
              <div className="section-head">
                <div className="section-head-left">
                  <h2>Featured This Season</h2>
                  <span className="count">Hand-picked</span>
                </div>
                <button className="see-all">See all â†’</button>
              </div>
              <BentoFeature />
            </section>

            <section className="events-section">
              <div className="section-head">
                <div className="section-head-left">
                  <h2>Event Highlights</h2>
                  <span className="count">{filteredEvents.length} events</span>
                </div>
                <button className="see-all">See all â†’</button>
              </div>

              <div className="filter-bar">
                <div className="filter-group">
                  <span className="filter-label">Category</span>
                  {eventCats.map(c => (
                    <button key={c} className={'pill' + (eventCat === c ? ' active' : '')}
                      onClick={() => setEventCat(c)}>{c}</button>
                  ))}
                </div>
                <div className="filter-group">
                  <span className="filter-label">Status</span>
                  {eventStatuses.map(s => (
                    <button key={s} className={'pill' + (eventStatus === s ? ' active' : '')}
                      onClick={() => setEventStatus(eventStatus === s ? 'All' : s)}>{s}</button>
                  ))}
                </div>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="empty">No events match these filters.</div>
              ) : (
                <div className="events-grid">
                  {filteredEvents.map(e => (
                    <EventCard key={e.id} e={e} onOpen={setOpenEvent} />
                  ))}
                </div>
              )}
            </section>

            <section className="events-section">
              <div className="section-head">
                <div className="section-head-left">
                  <h2>Trailers</h2>
                  <span className="count">{filteredTrailers.length} trailers</span>
                </div>
                <button className="see-all">See all â†’</button>
              </div>

              <div className="filter-bar">
                <div className="filter-group">
                  <span className="filter-label">Category</span>
                  {trailerCats.map(c => (
                    <button key={c} className={'pill' + (trailerCat === c ? ' active' : '')}
                      onClick={() => setTrailerCat(c)}>{c}</button>
                  ))}
                </div>
              </div>

              {filteredTrailers.length === 0 ? (
                <div className="empty">No trailers match these filters.</div>
              ) : (
                <>
                  {featuredTrailer && (
                    <TrailerFeature t={featuredTrailer} onOpen={setOpenTrailer} />
                  )}
                  <div className="trailers-grid">
                    {restTrailers.map(t => (
                      <TrailerCard key={t.id} t={t} onOpen={setOpenTrailer} />
                    ))}
                  </div>
                </>
              )}
            </section>

            <section className="events-section">
              <div className="section-head">
                <div className="section-head-left">
                  <h2>Artist Soundtrack Sessions</h2>
                  <span className="count">{PODCAST_EPISODES.length} episodes</span>
                </div>
                <button className="see-all">All episodes â†’</button>
              </div>
              <PodcastStrip audio={audio} />
            </section>

            <section className="events-section">
              <div className="section-head">
                <div className="section-head-left">
                  <h2>Browse by Category</h2>
                </div>
                <button className="see-all">All categories â†’</button>
              </div>
              <CategoriesGrid />
            </section>

            <section className="events-section">
              <div className="section-head">
                <div className="section-head-left">
                  <h2>Venues We Love</h2>
                  <span className="count">{VENUES.length} venues</span>
                </div>
                <button className="see-all">See all â†’</button>
              </div>
              <VenuesGrid />
            </section>
          </div>
        </main>
      </div>

      <EventModal e={openEvent} onClose={() => setOpenEvent(null)} />
      <TrailerModal t={openTrailer} onClose={() => setOpenTrailer(null)} />
    </>
  );
}
