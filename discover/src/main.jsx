// import React, { useMemo, useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
// import './styles.css';

// // placeholders, swap later
// const imgs = {
//   arcane: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85',
//   spider: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=85',
//   frieren: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85',
//   pluto: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
//   vinland: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
//   erased: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=85',
//   cyberpunk: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85',
//   lastOfUs: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85',
//   dune: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
//   shogun: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=85',
//   solo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
//   fallout: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=85'
// };

// const featured = [
//   {id:'arcane',title:'Arcane',type:'TV Series',year:'2021',meta:'2 Seasons',rating:9.4,genre:'Fantasy',image:imgs.arcane,platform:'Netflix'},
//   {id:'spider',title:'Across the Spider-Verse',type:'Movie',year:'2023',meta:'2h 20m',rating:8.9,genre:'Action',image:imgs.spider,platform:'Sony'},
//   {id:'frieren',title:'Frieren',type:'Anime',year:'2023',meta:'28 Episodes',rating:8.3,genre:'Fantasy',image:imgs.frieren,platform:'Crunchyroll'},
//   {id:'last-of-us',title:'The Last of Us',type:'TV Series',year:'2023',meta:'1 Season',rating:9.2,genre:'Drama',image:imgs.lastOfUs,platform:'HBO'},
//   {id:'dune',title:'Dune: Part Two',type:'Movie',year:'2024',meta:'2h 46m',rating:8.8,genre:'Sci-Fi',image:imgs.dune,platform:'Max'}
// ];

// const hiddenGems = [
//   ['pluto','Pluto','Anime','2023','8.6','Sci-Fi',imgs.pluto],
//   ['vinland','Vinland Saga','TV Series','2019','8.5','Action',imgs.vinland],
//   ['erased','Erased','Anime','2016','8.7','Mystery',imgs.erased],
//   ['cyberpunk','Cyberpunk: Edgerunners','Anime','2022','8.3','Sci-Fi',imgs.cyberpunk],
//   ['the-platform','The Platform','Movie','2019','7.6','Drama',imgs.lastOfUs],
//   ['shutter-island','Shutter Island','Movie','2010','8.1','Mystery',imgs.dune]
// ];

// const trending = [
//   ['attack','Attack on Titan','Anime','2013','9.1','Action',imgs.vinland],
//   ['mandalorian','The Mandalorian','TV Series','2019','8.6','Sci-Fi',imgs.dune],
//   ['interstellar','Interstellar','Movie','2014','8.6','Sci-Fi',imgs.lastOfUs],
//   ['blade','Blade Runner 2049','Movie','2017','8.0','Sci-Fi',imgs.cyberpunk],
//   ['arrival','Arrival','Movie','2016','7.9','Sci-Fi',imgs.frieren]
// ];

// const duneRecs = [
//   ['foundation','Foundation','TV Series','2021','8.0','Sci-Fi',imgs.frieren],
//   ['children-men','Children of Men','Movie','2006','7.9','Sci-Fi',imgs.lastOfUs],
//   ['expanse','The Expanse','TV Series','2015','8.5','Sci-Fi',imgs.pluto],
//   ['blade-runner','Blade Runner','Movie','1982','8.1','Sci-Fi',imgs.cyberpunk],
//   ['snowpiercer','Snowpiercer','TV Series','2020','7.4','Sci-Fi',imgs.shogun]
// ];

// function toObj(item) {
//   if (!Array.isArray(item)) return item;
//   return {
//     id:item[0], title:item[1], type:item[2], year:item[3],
//     rating:Number(item[4]), genre:item[5], image:item[6], meta:''
//   };
// }

// function Card({item, featured, isSaved, onSave, onOpen}) {
//   return (
//     <article className={'media-card' + (featured ? ' featured-card' : '')}>
//       <div className="poster-wrap">
//         <button className="poster-button" onClick={()=>onOpen(item)} aria-label={item.title}>
//           <img src={item.image} alt="" loading="lazy" />
//           <span className="poster-gradient" />
//           {item.platform && <span className="platform-tag">{item.platform}</span>}
//           {featured && (
//             <span className="featured-copy">
//               <strong>{item.title}</strong>
//               <small>{item.type} • {item.year} • {item.meta}</small>
//             </span>
//           )}
//           <span className="rating">★ {item.rating.toFixed(1)}</span>
//         </button>
//         <button
//           className={'save-button' + (isSaved ? ' saved' : '')}
//           onClick={(e)=>{e.stopPropagation(); onSave(item.id);}}
//           aria-label="save"
//         >
//           {isSaved ? '♥' : '♡'}
//         </button>
//       </div>

//       {!featured && (
//         <div className="card-info">
//           <strong>{item.title}</strong>
//           <span>{item.type} • {item.year}</span>
//         </div>
//       )}
//     </article>
//   );
// }

// function Section({title, text, items, featured, saved, onSave, onOpen}) {
//   const [showAll, setShowAll] = useState(false);
//   const list = items.map(toObj);
//   const shown = showAll ? list : list.slice(0, 5);

//   if (!list.length) return null;

//   return (
//     <section className={'section' + (featured ? ' featured-section' : '')}>
//       <div className="section-intro">
//         <div className="section-copy">
//           <h2>{title}</h2>
//           <p>{text}</p>
//         </div>
//         {list.length > 5 && (
//           <button className="view-all" onClick={()=>setShowAll(!showAll)}>
//             {showAll ? 'Less' : 'All'} <span>{showAll ? '↑' : '→'}</span>
//           </button>
//         )}
//       </div>

//       <div className={featured ? 'featured-row' : 'media-row'}>
//         {shown.map(item=>(
//           <Card
//             key={item.id}
//             item={item}
//             featured={featured}
//             isSaved={saved.has(item.id)}
//             onSave={onSave}
//             onOpen={onOpen}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// function About() {
//   return (
//     <section className="about">
//       <h2>Everything Fandom, In One Place</h2>
//       <p className="about-sub">A unified home for every story you love.</p>
//       <p className="about-body">
//         Fandomverse is a single, unified home for fans of anime, games, movies, TV,
//         and manga. Instead of juggling wikis, streaming apps, news sites, and store
//         pages across a dozen tabs, you get one clean space where lore, trailers,
//         merchandise, events, and community discussion all live together. Discover
//         new worlds, track what you're watching, and never lose the thread of the
//         stories you care about most.
//       </p>
//     </section>
//   );
// }

// function Spotlight({item, onOpen, isSaved, onSave}) {
//   if (!item) return null;
//   return (
//     <section className="spotlight">
//       <div className="spotlight-img">
//         <img src={item.image} alt={item.title} />
//         <div className="spotlight-fade" />
//       </div>
//       <div className="spotlight-body">
//         <span className="eyebrow">Spotlight</span>
//         <h2>{item.title}</h2>
//         <p className="spotlight-lede">
//           A deep dive into the world, the characters, and the moments that made {item.title} unforgettable.
//           Wiki entries, fan art, official stills, and community discussion — gathered in one place.
//         </p>
//         <div className="spotlight-meta">
//           <span>★ {item.rating.toFixed(1)}</span>
//           <span>{item.year}</span>
//           <span>{item.genre}</span>
//           {item.meta && <span>{item.meta}</span>}
//         </div>
//         <div className="spotlight-actions">
//           <button className="btn-solid" onClick={()=>onOpen(item)}>Open Spotlight</button>
//           <button className="btn-ghost" onClick={()=>onSave(item.id)}>
//             {isSaved ? '♥ Saved' : '♡ Save'}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// function MyProgress() {
//   const [activeFilter, setActiveFilter] = useState('All');

//   const items = [
//     {id:'one-piece', title:'One Piece', type:'Manga', img:imgs.vinland, current:1080, total:1100, unit:'chapters', status:'Reading', percent:98},
//     {id:'tlou', title:'The Last of Us', type:'TV Show', img:imgs.lastOfUs, current:6, total:9, unit:'episodes', status:'Watching', percent:67},
//     {id:'ghibli', title:'Studio Ghibli Collection', type:'Anime', img:imgs.frieren, current:12, total:22, unit:'films', status:'Watching', percent:55},
//     {id:'elden', title:'Elden Ring', type:'Game', img:imgs.pluto, current:45, total:100, unit:'hours', status:'Playing', percent:45},
//     {id:'monster', title:'Monster', type:'Manga', img:imgs.erased, current:18, total:162, unit:'chapters', status:'On Hold', percent:11},
//     {id:'dune2', title:'Dune: Part Two', type:'Movie', img:imgs.dune, current:1, total:1, unit:'film', status:'Completed', percent:100},
//     {id:'arcane', title:'Arcane', type:'TV Show', img:imgs.arcane, current:12, total:18, unit:'episodes', status:'Watching', percent:67}
//   ];

//   const filters = ['All','Watching','Reading','Playing','Completed','On Hold'];

//   const visible = activeFilter === 'All'
//     ? items
//     : items.filter(i => i.status === activeFilter);

//   const statusClass = (s) => {
//     if (s === 'Watching') return 'st-watching';
//     if (s === 'Reading') return 'st-reading';
//     if (s === 'Playing') return 'st-playing';
//     if (s === 'Completed') return 'st-completed';
//     if (s === 'On Hold') return 'st-hold';
//     return '';
//   };

//   return (
//     <section className="progress">
//       <div className="section-intro">
//         <div className="section-copy">
//           <h2>My Progress</h2>
//           <p>Track what you watch, read, play, and explore across all your worlds.</p>
//         </div>
//       </div>

//       <div className="progress-filters">
//         {filters.map(f => {
//           const count = f === 'All' ? items.length : items.filter(i => i.status === f).length;
//           return (
//             <button
//               key={f}
//               className={'progress-filter' + (activeFilter === f ? ' active' : '')}
//               onClick={() => setActiveFilter(f)}
//             >
//               {f} <span>{count}</span>
//             </button>
//           );
//         })}
//       </div>

//       <div className="progress-list">
//         {visible.map(item => (
//           <div key={item.id} className="progress-row">
//             <div className="progress-thumb">
//               <img src={item.img} alt={item.title} />
//             </div>
//             <div className="progress-info">
//               <strong>{item.title}</strong>
//               <span>{item.type}</span>
//             </div>
//             <div className="progress-bar-wrap">
//               <div className="progress-bar-head">
//                 <span>{item.current} / {item.total} {item.unit}</span>
//                 <em>{item.percent}%</em>
//               </div>
//               <div className="progress-bar">
//                 <div className="progress-fill" style={{width: item.percent + '%'}} />
//               </div>
//             </div>
//             <button className={'progress-status ' + statusClass(item.status)}>
//               <span className="status-dot" />
//               {item.status}
//               <span className="status-caret">▾</span>
//             </button>
//           </div>
//         ))}

//         {!visible.length && (
//           <div className="progress-empty">
//             Nothing in this category yet.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// function Characters() {
//   const cast = [
//     {name:'Jinx', from:'Arcane', img:imgs.cyberpunk},
//     {name:'Miles Morales', from:'Spider-Verse', img:imgs.spider},
//     {name:'Frieren', from:'Frieren', img:imgs.frieren},
//     {name:'Joel Miller', from:'The Last of Us', img:imgs.lastOfUs},
//     {name:'Paul Atreides', from:'Dune', img:imgs.dune},
//     {name:'Thorfinn', from:'Vinland Saga', img:imgs.vinland},
//     {name:'Atom', from:'Pluto', img:imgs.pluto}
//   ];
//   return (
//     <section className="characters">
//       <div className="section-intro">
//         <div className="section-copy">
//           <h2>Characters We Love</h2>
//           <p>The faces behind the stories. Explore their arcs, quotes, and fan-favorite moments.</p>
//         </div>
//       </div>
//       <div className="cast-strip">
//         {cast.map((c,i)=>(
//           <button key={i} className="cast-card">
//             <div className="cast-img">
//               <img src={c.img} alt={c.name} />
//             </div>
//             <strong>{c.name}</strong>
//             <span>{c.from}</span>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

// function Community() {
//   const quotes = [
//     {user:'mira.k', text:'Frieren broke me in the best way. I have not recovered.', tag:'#frieren'},
//     {user:'dunehead', text:'The sound design in Dune 2 belongs in a museum.', tag:'#dune'},
//     {user:'spiderfan99', text:'Across the Spider-Verse is animation as an art form. Period.', tag:'#spiderverse'},
//     {user:'kenji_w', text:'Vinland Saga S2 is the most human thing I have watched all year.', tag:'#vinland'},
//     {user:'nova', text:'Arcane episode 3 lives in my head rent free.', tag:'#arcane'}
//   ];
//   return (
//     <section className="community">
//       <div className="section-intro">
//         <div className="section-copy">
//           <h2>From the Community</h2>
//           <p>What fans are saying right now. Add your voice to the conversation.</p>
//         </div>
//       </div>
//       <div className="quote-wall">
//         {quotes.map((q,i)=>(
//           <figure key={i} className={'quote-card q'+(i%3)}>
//             <blockquote>{q.text}</blockquote>
//             <figcaption>
//               <span className="quote-user">@{q.user}</span>
//               <span className="quote-tag">{q.tag}</span>
//             </figcaption>
//           </figure>
//         ))}
//       </div>
//     </section>
//   );
// }

// function DetailView({item, onClose, isSaved, onSave}) {
//   const [tab, setTab] = useState('Story');

//   useEffect(()=>{
//     document.body.style.overflow = 'hidden';
//     return ()=>{ document.body.style.overflow = 'auto'; };
//   }, []);

//   if (!item) return null;

//   const tabs = ['Story','Watch','Collect','Events'];

//   return (
//     <div className="detail-overlay" onClick={onClose}>
//       <div className="detail-view" onClick={e=>e.stopPropagation()}>
//         <button className="detail-close" onClick={onClose}>Close</button>

//         <div className="detail-hero">
//           <img src={item.image} alt={item.title} className="detail-bg" />
//           <div className="detail-hero-content">
//             <span className="detail-eyebrow">{item.type} — {item.year}</span>
//             <h1>{item.title}</h1>
//             <div className="detail-meta">
//               <span>★ {item.rating.toFixed(1)}</span>
//               <span>{item.genre}</span>
//               {item.meta && <span>{item.meta}</span>}
//             </div>
//           </div>
//         </div>

//         <div className="detail-body">
//           <div className="detail-nav">
//             {tabs.map(t=>(
//               <button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>
//             ))}
//           </div>

//           <div className="detail-panel">
//             {tab==='Story' && (
//               <div className="panel-story">
//                 <p className="lede">Explore the lore, character arcs, and hidden details of {item.title}. A centralized hub bringing together wiki entries, fan theories, and official summaries.</p>
//                 <div className="story-stats">
//                   <div><span>Wiki Entries</span><strong>1,240</strong></div>
//                   <div><span>Fan Theories</span><strong>89</strong></div>
//                   <div><span>Community Rating</span><strong>9.2/10</strong></div>
//                 </div>
//               </div>
//             )}
//             {tab==='Watch' && (
//               <div className="panel-watch">
//                 <div className="watch-poster"><span className="play">▶</span></div>
//                 <div className="watch-info">
//                   <h3>Latest Trailer</h3>
//                   <p>Official Season 2 Announcement</p>
//                   <button className="btn-outline">Watch on YouTube</button>
//                 </div>
//               </div>
//             )}
//             {tab==='Collect' && (
//               <div className="panel-collect">
//                 <div className="collect-item"><span>Figurine</span><strong>$45</strong></div>
//                 <div className="collect-item"><span>Art Book</span><strong>$30</strong></div>
//                 <div className="collect-item"><span>Apparel</span><strong>$25</strong></div>
//               </div>
//             )}
//             {tab==='Events' && (
//               <div className="panel-events">
//                 <div className="event-row">
//                   <div><strong>Comic-Con Panel</strong><span>July 22, 2024 • San Diego</span></div>
//                   <button className="btn-outline">RSVP</button>
//                 </div>
//                 <div className="event-row">
//                   <div><strong>Fan Meetup</strong><span>Aug 5, 2024 • Online</span></div>
//                   <button className="btn-outline">RSVP</button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="detail-footer">
//             <button className="btn-save" onClick={()=>onSave(item.id)}>
//               {isSaved ? '♥ Saved' : '♡ Save to Watchlist'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [tab, setTab] = useState('All');
//   const [search, setSearch] = useState('');
//   const [genre, setGenre] = useState('All Genres');
//   const [saved, setSaved] = useState(new Set());
//   const [selected, setSelected] = useState(null);

//   const allData = useMemo(()=>[
//     ...featured,
//     ...hiddenGems.map(toObj),
//     ...trending.map(toObj),
//     ...duneRecs.map(toObj)
//   ], []);

//   const searchMatch = (item) => {
//     const q = search.trim().toLowerCase();
//     if (!q) return true;
//     return `${item.title} ${item.type} ${item.genre}`.toLowerCase().includes(q);
//   };

//   const featFiltered = featured.filter(searchMatch);
//   const gemFiltered = hiddenGems.map(toObj).filter(searchMatch);
//   const trendFiltered = trending.map(toObj).filter(searchMatch);
//   const duneFiltered = duneRecs.map(toObj).filter(searchMatch);

//   const savedList = allData.filter(i => saved.has(i.id));

//   const toggleSave = (id) => {
//     setSaved(prev => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   const reset = () => {
//     setTab('All');
//     setSearch('');
//     setGenre('All Genres');
//   };

//   return (
//     <div className="app">
//       <header className="topbar">
//         <a className="logo" href="#" onClick={e=>{e.preventDefault();reset();}}>FANDOM</a>
//         <nav className="top-nav">
//           {['Home','Discover','Movies','TV','Anime','Manga','Games','Community'].map(i=>(
//             <button key={i} className={i==='Discover'?'active':''}>{i}</button>
//           ))}
//         </nav>
//         <div className="top-search">
//           <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search the archive..." />
//         </div>
//         <button className="top-icon" aria-label="notifications">♧</button>
//         <button className="top-icon" aria-label="saved" onClick={()=>savedList[0] && setSelected(savedList[0])}>♡</button>
//         <div className="avatar">N</div>
//       </header>

//       <main>
//         <section className="hero">
//           <div className="hero-bg" />
//           <div className="hero-content">
//             <span className="eyebrow">The Central Archive</span>
//             <h1>Every story.<br/>One place.</h1>
//             <p>News, lore, trailers, merchandise, and events — unified for the first time.</p>

//             <div className="hero-search">
//               <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for movies, shows, anime..." />
//               <button aria-label="search">→</button>
//             </div>

//             {/* <div className="filter-row">
//               {['All Genres','Action','Fantasy','Sci-Fi','Drama','Mystery'].map(g=>(
//                 <button key={g} className={'filter-pill'+(genre===g?' active':'')} onClick={()=>setGenre(g)}>{g}</button>
//               ))}
//             </div> */}
//           </div>
//         </section>

//         {/* <div className="tabs">
//           {['All','Movies','TV Shows','Anime','Manga','Games'].map(i=>(
//             <button key={i} className={tab===i?'selected':''} onClick={()=>setTab(i)}>{i}</button>
//           ))}
//         </div> */}

//         <Section
//           title="Featured This Week"
//           text="The hottest releases, trending titles, and community favorites."
//           items={featFiltered}
//           featured
//           saved={saved}
//           onSave={toggleSave}
//           onOpen={setSelected}
//         />

//         <Spotlight
//           item={featured[0]}
//           onOpen={setSelected}
//           isSaved={saved.has(featured[0].id)}
//           onSave={toggleSave}
//         />

//         <About />

//         <Characters />

//         <Section
//           title="Hidden Gems"
//           text="Underrated, unforgettable. These picks might not be on everyone's radar."
//           items={gemFiltered}
//           saved={saved}
//           onSave={toggleSave}
//           onOpen={setSelected}
//         />

//         <Community />

//         <Section
//           title="Trending Now"
//           text="What's hot right now? The most talked-about titles in our community."
//           items={trendFiltered}
//           saved={saved}
//           onSave={toggleSave}
//           onOpen={setSelected}
//         />

//         <Section
//           title="Because You Watched Dune"
//           text="Similar vibes, same universe, new adventures."
//           items={duneFiltered}
//           saved={saved}
//           onSave={toggleSave}
//           onOpen={setSelected}
//         />

//         <MyProgress />

//         <section className="saved-section">
//           <div className="saved-banner">
//             <div>
//               <span className="eyebrow">Your Watchlist</span>
//               <h2>Saved for later</h2>
//               <p>Keep track of what you love and never lose sight of your next adventure.</p>
//             </div>
//             <button onClick={()=>savedList[0] && setSelected(savedList[0])}>
//               {savedList.length ? `View Saved (${savedList.length})` : 'Start Exploring'}
//             </button>
//           </div>
//         </section>
//       </main>

//       {selected && (
//         <DetailView item={selected} onClose={()=>setSelected(null)} isSaved={saved.has(selected.id)} onSave={toggleSave} />
//       )}
//     </div>
//   );
// }

// createRoot(document.getElementById('root')).render(<App />);
import React, { useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// placeholders, swap later
const imgs = {
  arcane: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85',
  spider: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=85',
  frieren: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85',
  pluto: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
  vinland: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
  erased: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=85',
  cyberpunk: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85',
  lastOfUs: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85',
  dune: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
  shogun: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=85',
  solo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
  fallout: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=85'
};

const featured = [
  {id:'arcane',title:'Arcane',type:'TV Series',year:'2021',meta:'2 Seasons',rating:9.4,genre:'Fantasy',image:imgs.arcane,platform:'Netflix'},
  {id:'spider',title:'Across the Spider-Verse',type:'Movie',year:'2023',meta:'2h 20m',rating:8.9,genre:'Action',image:imgs.spider,platform:'Sony'},
  {id:'frieren',title:'Frieren',type:'Anime',year:'2023',meta:'28 Episodes',rating:8.3,genre:'Fantasy',image:imgs.frieren,platform:'Crunchyroll'},
  {id:'last-of-us',title:'The Last of Us',type:'TV Series',year:'2023',meta:'1 Season',rating:9.2,genre:'Drama',image:imgs.lastOfUs,platform:'HBO'},
  {id:'dune',title:'Dune: Part Two',type:'Movie',year:'2024',meta:'2h 46m',rating:8.8,genre:'Sci-Fi',image:imgs.dune,platform:'Max'}
];

const hiddenGems = [
  ['pluto','Pluto','Anime','2023','8.6','Sci-Fi',imgs.pluto],
  ['vinland','Vinland Saga','TV Series','2019','8.5','Action',imgs.vinland],
  ['erased','Erased','Anime','2016','8.7','Mystery',imgs.erased],
  ['cyberpunk','Cyberpunk: Edgerunners','Anime','2022','8.3','Sci-Fi',imgs.cyberpunk],
  ['the-platform','The Platform','Movie','2019','7.6','Drama',imgs.lastOfUs],
  ['shutter-island','Shutter Island','Movie','2010','8.1','Mystery',imgs.dune]
];

const trending = [
  ['attack','Attack on Titan','Anime','2013','9.1','Action',imgs.vinland],
  ['mandalorian','The Mandalorian','TV Series','2019','8.6','Sci-Fi',imgs.dune],
  ['interstellar','Interstellar','Movie','2014','8.6','Sci-Fi',imgs.lastOfUs],
  ['blade','Blade Runner 2049','Movie','2017','8.0','Sci-Fi',imgs.cyberpunk],
  ['arrival','Arrival','Movie','2016','7.9','Sci-Fi',imgs.frieren]
];

const duneRecs = [
  ['foundation','Foundation','TV Series','2021','8.0','Sci-Fi',imgs.frieren],
  ['children-men','Children of Men','Movie','2006','7.9','Sci-Fi',imgs.lastOfUs],
  ['expanse','The Expanse','TV Series','2015','8.5','Sci-Fi',imgs.pluto],
  ['blade-runner','Blade Runner','Movie','1982','8.1','Sci-Fi',imgs.cyberpunk],
  ['snowpiercer','Snowpiercer','TV Series','2020','7.4','Sci-Fi',imgs.shogun]
];

function toObj(item) {
  if (!Array.isArray(item)) return item;
  return {
    id:item[0], title:item[1], type:item[2], year:item[3],
    rating:Number(item[4]), genre:item[5], image:item[6], meta:''
  };
}

function Card({item, featured, isSaved, onSave, onOpen}) {
  return (
    <article className={'media-card' + (featured ? ' featured-card' : '')}>
      <div className="poster-wrap">
        <button className="poster-button" onClick={()=>onOpen(item)} aria-label={item.title}>
          <img src={item.image} alt="" loading="lazy" />
          <span className="poster-gradient" />
          {item.platform && <span className="platform-tag">{item.platform}</span>}
          {featured && (
            <span className="featured-copy">
              <strong>{item.title}</strong>
              <small>{item.type} • {item.year} • {item.meta}</small>
            </span>
          )}
          <span className="rating">★ {item.rating.toFixed(1)}</span>
        </button>
        <button
          className={'save-button' + (isSaved ? ' saved' : '')}
          onClick={(e)=>{e.stopPropagation(); onSave(item.id);}}
          aria-label="save"
        >
          {isSaved ? '♥' : '♡'}
        </button>
      </div>

      {!featured && (
        <div className="card-info">
          <strong>{item.title}</strong>
          <span>{item.type} • {item.year}</span>
        </div>
      )}
    </article>
  );
}

function Section({title, text, items, featured, saved, onSave, onOpen}) {
  const [showAll, setShowAll] = useState(false);
  const list = items.map(toObj);
  const shown = showAll ? list : list.slice(0, 5);

  if (!list.length) return null;

  return (
    <section className={'section' + (featured ? ' featured-section' : '')}>
      <div className="section-intro">
        <div className="section-copy">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        {list.length > 5 && (
          <button className="view-all" onClick={()=>setShowAll(!showAll)}>
            {showAll ? 'Less' : 'All'} <span>{showAll ? '↑' : '→'}</span>
          </button>
        )}
      </div>

      <div className={featured ? 'featured-row' : 'media-row'}>
        {shown.map(item=>(
          <Card
            key={item.id}
            item={item}
            featured={featured}
            isSaved={saved.has(item.id)}
            onSave={onSave}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about">
      <div className="about-inner">
        <h2 className="about-title">Everything Fandom, In One Place</h2>
        <p className="about-sub">A unified home for every story you love.</p>
        <p className="about-body">
          Fandomverse is a single, unified home for fans of anime, games, movies, TV,
          and manga. Instead of juggling wikis, streaming apps, news sites, and store
          pages across a dozen tabs, you get one clean space where lore, trailers,
          merchandise, events, and community discussion all live together. Discover
          new worlds, track what you're watching, and never lose the thread of the
          stories you care about most.
        </p>
      </div>
    </section>
  );
}

function Spotlight({item, onOpen, isSaved, onSave}) {
  if (!item) return null;
  return (
    <section className="spotlight">
      <div className="spotlight-img">
        <img src={item.image} alt={item.title} />
        <div className="spotlight-fade" />
      </div>
      <div className="spotlight-body">
        <span className="eyebrow">Spotlight</span>
        <h2>{item.title}</h2>
        <p className="spotlight-lede">
          A deep dive into the world, the characters, and the moments that made {item.title} unforgettable.
          Wiki entries, fan art, official stills, and community discussion — gathered in one place.
        </p>
        <div className="spotlight-meta">
          <span>★ {item.rating.toFixed(1)}</span>
          <span>{item.year}</span>
          <span>{item.genre}</span>
          {item.meta && <span>{item.meta}</span>}
        </div>
        <div className="spotlight-actions">
          <button className="btn-solid" onClick={()=>onOpen(item)}>Open Spotlight</button>
          <button className="btn-ghost" onClick={()=>onSave(item.id)}>
            {isSaved ? '♥ Saved' : '♡ Save'}
          </button>
        </div>
      </div>
    </section>
  );
}

function MyProgress() {
  const [activeFilter, setActiveFilter] = useState('All');

  const items = [
    {id:'one-piece', title:'One Piece', type:'Manga', img:imgs.vinland, current:1080, total:1100, unit:'chapters', status:'Reading', percent:98},
    {id:'tlou', title:'The Last of Us', type:'TV Show', img:imgs.lastOfUs, current:6, total:9, unit:'episodes', status:'Watching', percent:67},
    {id:'ghibli', title:'Studio Ghibli Collection', type:'Anime', img:imgs.frieren, current:12, total:22, unit:'films', status:'Watching', percent:55},
    {id:'elden', title:'Elden Ring', type:'Game', img:imgs.pluto, current:45, total:100, unit:'hours', status:'Playing', percent:45},
    {id:'monster', title:'Monster', type:'Manga', img:imgs.erased, current:18, total:162, unit:'chapters', status:'On Hold', percent:11},
    {id:'dune2', title:'Dune: Part Two', type:'Movie', img:imgs.dune, current:1, total:1, unit:'film', status:'Completed', percent:100},
    {id:'arcane', title:'Arcane', type:'TV Show', img:imgs.arcane, current:12, total:18, unit:'episodes', status:'Watching', percent:67}
  ];

  const filters = ['All','Watching','Reading','Playing','Completed','On Hold'];

  const visible = activeFilter === 'All'
    ? items
    : items.filter(i => i.status === activeFilter);

  const statusClass = (s) => {
    if (s === 'Watching') return 'st-watching';
    if (s === 'Reading') return 'st-reading';
    if (s === 'Playing') return 'st-playing';
    if (s === 'Completed') return 'st-completed';
    if (s === 'On Hold') return 'st-hold';
    return '';
  };

  return (
    <section className="progress">
      <div className="section-intro">
        <div className="section-copy">
          <h2>My Progress</h2>
          <p>Track what you watch, read, play, and explore across all your worlds.</p>
        </div>
      </div>

      <div className="progress-filters">
        {filters.map(f => {
          const count = f === 'All' ? items.length : items.filter(i => i.status === f).length;
          return (
            <button
              key={f}
              className={'progress-filter' + (activeFilter === f ? ' active' : '')}
              onClick={() => setActiveFilter(f)}
            >
              {f} <span>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="progress-list">
        {visible.map(item => (
          <div key={item.id} className="progress-row">
            <div className="progress-thumb">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="progress-info">
              <strong>{item.title}</strong>
              <span>{item.type}</span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-head">
                <span>{item.current} / {item.total} {item.unit}</span>
                <em>{item.percent}%</em>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: item.percent + '%'}} />
              </div>
            </div>
            <button className={'progress-status ' + statusClass(item.status)}>
              <span className="status-dot" />
              {item.status}
              <span className="status-caret">▾</span>
            </button>
          </div>
        ))}

        {!visible.length && (
          <div className="progress-empty">
            Nothing in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}

function Characters() {
  const cast = [
    {name:'Jinx', from:'Arcane', img:imgs.cyberpunk},
    {name:'Miles Morales', from:'Spider-Verse', img:imgs.spider},
    {name:'Frieren', from:'Frieren', img:imgs.frieren},
    {name:'Joel Miller', from:'The Last of Us', img:imgs.lastOfUs},
    {name:'Paul Atreides', from:'Dune', img:imgs.dune},
    {name:'Thorfinn', from:'Vinland Saga', img:imgs.vinland},
    {name:'Atom', from:'Pluto', img:imgs.pluto}
  ];
  return (
    <section className="characters">
      <div className="section-intro">
        <div className="section-copy">
          <h2>Characters We Love</h2>
          <p>The faces behind the stories. Explore their arcs, quotes, and fan-favorite moments.</p>
        </div>
      </div>
      <div className="cast-strip">
        {cast.map((c,i)=>(
          <button key={i} className="cast-card">
            <div className="cast-img">
              <img src={c.img} alt={c.name} />
            </div>
            <strong>{c.name}</strong>
            <span>{c.from}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Community() {
  const quotes = [
    {user:'mira.k', text:'Frieren broke me in the best way. I have not recovered.', tag:'#frieren'},
    {user:'dunehead', text:'The sound design in Dune 2 belongs in a museum.', tag:'#dune'},
    {user:'spiderfan99', text:'Across the Spider-Verse is animation as an art form. Period.', tag:'#spiderverse'},
    {user:'kenji_w', text:'Vinland Saga S2 is the most human thing I have watched all year.', tag:'#vinland'},
    {user:'nova', text:'Arcane episode 3 lives in my head rent free.', tag:'#arcane'}
  ];
  return (
    <section className="community">
      <div className="section-intro">
        <div className="section-copy">
          <h2>From the Community</h2>
          <p>What fans are saying right now. Add your voice to the conversation.</p>
        </div>
      </div>
      <div className="quote-wall">
        {quotes.map((q,i)=>(
          <figure key={i} className={'quote-card q'+(i%3)}>
            <blockquote>{q.text}</blockquote>
            <figcaption>
              <span className="quote-user">@{q.user}</span>
              <span className="quote-tag">{q.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function DetailView({item, onClose, isSaved, onSave}) {
  const [tab, setTab] = useState('Story');

  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return ()=>{ document.body.style.overflow = 'auto'; };
  }, []);

  if (!item) return null;

  const tabs = ['Story','Watch','Collect','Events'];

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-view" onClick={e=>e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>Close</button>

        <div className="detail-hero">
          <img src={item.image} alt={item.title} className="detail-bg" />
          <div className="detail-hero-content">
            <span className="detail-eyebrow">{item.type} — {item.year}</span>
            <h1>{item.title}</h1>
            <div className="detail-meta">
              <span>★ {item.rating.toFixed(1)}</span>
              <span>{item.genre}</span>
              {item.meta && <span>{item.meta}</span>}
            </div>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-nav">
            {tabs.map(t=>(
              <button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>
            ))}
          </div>

          <div className="detail-panel">
            {tab==='Story' && (
              <div className="panel-story">
                <p className="lede">Explore the lore, character arcs, and hidden details of {item.title}. A centralized hub bringing together wiki entries, fan theories, and official summaries.</p>
                <div className="story-stats">
                  <div><span>Wiki Entries</span><strong>1,240</strong></div>
                  <div><span>Fan Theories</span><strong>89</strong></div>
                  <div><span>Community Rating</span><strong>9.2/10</strong></div>
                </div>
              </div>
            )}
            {tab==='Watch' && (
              <div className="panel-watch">
                <div className="watch-poster"><span className="play">▶</span></div>
                <div className="watch-info">
                  <h3>Latest Trailer</h3>
                  <p>Official Season 2 Announcement</p>
                  <button className="btn-outline">Watch on YouTube</button>
                </div>
              </div>
            )}
            {tab==='Collect' && (
              <div className="panel-collect">
                <div className="collect-item"><span>Figurine</span><strong>$45</strong></div>
                <div className="collect-item"><span>Art Book</span><strong>$30</strong></div>
                <div className="collect-item"><span>Apparel</span><strong>$25</strong></div>
              </div>
            )}
            {tab==='Events' && (
              <div className="panel-events">
                <div className="event-row">
                  <div><strong>Comic-Con Panel</strong><span>July 22, 2024 • San Diego</span></div>
                  <button className="btn-outline">RSVP</button>
                </div>
                <div className="event-row">
                  <div><strong>Fan Meetup</strong><span>Aug 5, 2024 • Online</span></div>
                  <button className="btn-outline">RSVP</button>
                </div>
              </div>
            )}
          </div>

          <div className="detail-footer">
            <button className="btn-save" onClick={()=>onSave(item.id)}>
              {isSaved ? '♥ Saved' : '♡ Save to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All Genres');
  const [saved, setSaved] = useState(new Set());
  const [selected, setSelected] = useState(null);

  const allData = useMemo(()=>[
    ...featured,
    ...hiddenGems.map(toObj),
    ...trending.map(toObj),
    ...duneRecs.map(toObj)
  ], []);

  const searchMatch = (item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return `${item.title} ${item.type} ${item.genre}`.toLowerCase().includes(q);
  };

  const featFiltered = featured.filter(searchMatch);
  const gemFiltered = hiddenGems.map(toObj).filter(searchMatch);
  const trendFiltered = trending.map(toObj).filter(searchMatch);
  const duneFiltered = duneRecs.map(toObj).filter(searchMatch);

  const savedList = allData.filter(i => saved.has(i.id));

  const toggleSave = (id) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const reset = () => {
    setTab('All');
    setSearch('');
    setGenre('All Genres');
  };

  return (
    <div className="app">
      <header className="topbar">
        <a className="logo" href="#" onClick={e=>{e.preventDefault();reset();}} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <span>FANDOM<span style={{ color: '#e8a87c' }}>VERSE</span></span>
        </a>
        <nav className="top-nav">
          {['Home','Discover','Movies','TV','Anime','Manga','Games','Community'].map(i=>(
            <button key={i} className={i==='Discover'?'active':''}>{i}</button>
          ))}
        </nav>
        <div className="top-search">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search the archive..." />
        </div>
        <button className="top-icon" aria-label="notifications">♧</button>
        <button className="top-icon" aria-label="saved" onClick={()=>savedList[0] && setSelected(savedList[0])}>♡</button>
        <div className="avatar">N</div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <span className="eyebrow">The Central Archive</span>
            <h1>DISCOVER</h1>
            <p>Explore our vast collection of movies, shows, anime, and more.</p>

            <div className="hero-search">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for movies, shows, anime..." />
              <button aria-label="search">→</button>
            </div>

            {/* <div className="filter-row">
              {['All Genres','Action','Fantasy','Sci-Fi','Drama','Mystery'].map(g=>(
                <button key={g} className={'filter-pill'+(genre===g?' active':'')} onClick={()=>setGenre(g)}>{g}</button>
              ))}
            </div> */}
          </div>
        </section>
{/* 
        <div className="tabs">
          {['All','Movies','TV Shows','Anime','Manga','Games'].map(i=>(
            <button key={i} className={tab===i?'selected':''} onClick={()=>setTab(i)}>{i}</button>
          ))}
        </div> */}

        <Section
          title="Featured This Week"
          text="The hottest releases, trending titles, and community favorites."
          items={featFiltered}
          featured
          saved={saved}
          onSave={toggleSave}
          onOpen={setSelected}
        />

        <Spotlight
          item={featured[0]}
          onOpen={setSelected}
          isSaved={saved.has(featured[0].id)}
          onSave={toggleSave}
        />

        <About />

        <Characters />

        <Section
          title="Hidden Gems"
          text="Underrated, unforgettable. These picks might not be on everyone's radar."
          items={gemFiltered}
          saved={saved}
          onSave={toggleSave}
          onOpen={setSelected}
        />

        <Community />

        <Section
          title="Trending Now"
          text="What's hot right now? The most talked-about titles in our community."
          items={trendFiltered}
          saved={saved}
          onSave={toggleSave}
          onOpen={setSelected}
        />

        <Section
          title="Because You Watched Dune"
          text="Similar vibes, same universe, new adventures."
          items={duneFiltered}
          saved={saved}
          onSave={toggleSave}
          onOpen={setSelected}
        />

        <MyProgress />

        <section className="saved-section">
          <div className="saved-banner">
            <div>
              <span className="eyebrow">Your Watchlist</span>
              <h2>Saved for later</h2>
              <p>Keep track of what you love and never lose sight of your next adventure.</p>
            </div>
            <button onClick={()=>savedList[0] && setSelected(savedList[0])}>
              {savedList.length ? `View Saved (${savedList.length})` : 'Start Exploring'}
            </button>
          </div>
        </section>
      </main>

      {selected && (
        <DetailView item={selected} onClose={()=>setSelected(null)} isSaved={saved.has(selected.id)} onSave={toggleSave} />
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);