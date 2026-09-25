import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

const slides = [
  {
    title: 'Alita: Battle Angel',
    category: 'Featured movie',
    excerpt: 'A restored cyborg awakens in Iron City and discovers a destiny built for battle.',
    image: 'https://image.tmdb.org/t/p/original/8RKBHHRqOMOLh5qW3sS6TSFTd8h.jpg',
    link: '/category/movies',
  },
  {
    title: 'Batman',
    category: 'Featured movie',
    excerpt: 'Gotham gets a symbol in Tim Burton\'s dark, electric take on the legendary vigilante.',
    image: 'https://image.tmdb.org/t/p/original/rhc7OF7tC9HPu0X8DBKQJzaGRbu.jpg',
    link: '/category/movies',
  },
  {
    title: 'Demon Slayer: Mugen Train',
    category: 'Featured anime',
    excerpt: 'Tanjiro and the Demon Slayer Corps board a train for a mission that tests every promise they made.',
    image: 'https://image.tmdb.org/t/p/original/ddPXPozK5AieIJB4Igw2RK0YwTO.jpg',
    link: '/category/anime',
  },
  {
    title: 'Star Wars: The Rise of Skywalker',
    category: 'Featured movie',
    excerpt: 'The final chapter of the Skywalker saga brings an old darkness back into the light.',
    image: 'https://image.tmdb.org/t/p/original/auJKGst3vXpJozHZh4nMFs0xWIU.jpg',
    link: '/category/movies',
  },
  {
    title: 'Cyberpunk 2077',
    category: 'Featured game',
    excerpt: 'Enter Night City, a neon-soaked open world where every choice rewrites the legend you become.',
    image: 'https://images.pexels.com/photos/7862455/pexels-photo-7862455.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    link: '/category/gaming',
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const featured = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % slides.length);

    return (<section className="position-relative fv-min-h-90vh d-flex align-items-end overflow-hidden">
      <div className="position-absolute fv-inset-0" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <img src={featured.image} alt={featured.title} className="w-100 h-100 object-fit-cover fv-object-center-top" fetchPriority="high"/>
        <div className="position-absolute fv-inset-0 fv-bg-gradient-to-r fv-from-050609-95 fv-via-050609-55 fv-to-050609-10"/>
        <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-050609 fv-via-transparent fv-to-050609-35"/>
      </div>
      <div className="hero-content-shell position-relative w-100 fv-max-w-1440px mx-auto fv-px-5 fv-sm-px-8 fv-lg-px-12 fv-pb-6 fv-md-pb-12 fv-pt-16 fv-md-pt-28 fv-z-10">
        <div className="hero-layout fv-grid fv-grid-cols-1 fv-lg-grid-cols-minmax-0-1fr-minmax-260px-360px fv-gap-8">
          <div className="fv-max-w-xl fv-animate-fade-up">
            <p className="fv-heading-font fv-text-10px fv-uppercase fv-tracking-0-3em fv-text-brand-300 fv-mb-4">{featured.category}</p>
            <h1 className="fv-display-font fv-text-4xl fv-sm-text-7xl fv-md-text-8xl fv-text-paper-50 fv-leading-0-88 fv-tracking-wide fv-text-shadow-lg">
              Stories<br />for Every<br /><span className="fv-text-brand-300">World.</span>
            </h1>
            <p className="fv-mt-3 fv-md-mt-5 fv-max-w-sm fv-text-11px fv-md-text-base fv-leading-relaxed fv-text-paper-200-85">
              Movies. Series. Anime. Manga. Games. Discover, track, collect, belong.
            </p>
            <div className="hero-cta-row fv-mt-4 fv-md-mt-7 d-flex align-items-center fv-gap-3">
              <Link to="/#featured" className="d-inline-flex align-items-center gap-2 fv-bg-brand-300 fv-text-ink-900 fv-px-3 fv-py-1-5 fv-md-px-4 fv-md-py-2-5 fv-text-10px fv-md-text-xs fv-heading-font fv-font-semibold fv-rounded-sm fv-hover-bg-brand-200 fv-transition-colors">
                Explore Now <ArrowRight className="fv-w-3-5 fv-h-3-5" />
              </Link>
              <Link to={featured.link} className="d-inline-flex align-items-center gap-2 fv-text-paper-100 fv-text-xs fv-heading-font fv-hover-text-brand-300 fv-transition-colors">
                <span className="fv-w-7 fv-h-7 rounded-pill border fv-border-paper-100-70 d-flex align-items-center justify-content-center"><Play className="fv-w-3 fv-h-3 fv-fill-current" /></span>
                Watch Trailer
              </Link>
            </div>
          </div>
          <div className="hero-featured-meta fv-group fv-border-l fv-border-paper-50-20 fv-pl-7 fv-pb-2 fv-animate-fade-in">
            <p className="fv-text-10px fv-uppercase fv-tracking-0-25em fv-text-brand-300 fv-mb-3">{featured.category}</p>
            <Link to={featured.link} className="d-block">
              <h2 className="fv-display-font fv-text-4xl fv-text-paper-50 fv-leading-none fv-tracking-wide fv-group-hover-text-brand-300 fv-transition-colors">{featured.title}</h2>
            </Link>
            <p className="fv-text-xs fv-text-paper-200-70 fv-mt-3 fv-clamp-2">{featured.excerpt}</p>
            <div className="d-flex align-items-center justify-content-between fv-mt-6 fv-text-paper-200-60">
              <span className="fv-text-10px fv-uppercase fv-tracking-widest">0{activeIndex + 1} / 05</span>
              <span className="d-flex fv-gap-4">
                <button type="button" onClick={showPrevious} className="hero-slide-arrow fv-text-paper-300-60 fv-hover-text-brand-300 fv-transition-colors" aria-label="Previous hero slide"><ArrowLeft className="fv-w-4 fv-h-4" /></button>
                <button type="button" onClick={showNext} className="hero-slide-arrow fv-text-paper-300-60 fv-hover-text-brand-300 fv-transition-colors" aria-label="Next hero slide"><ArrowRight className="fv-w-4 fv-h-4" /></button>
              </span>
            </div>
          </div>
        </div>
        <div className="position-absolute fv-bottom-5 fv-left-5 fv-sm-left-8 fv-lg-left-12 d-flex align-items-center fv-gap-1-5" role="tablist" aria-label="Hero slides">
          {slides.map((slide, index) => (<button key={slide.title} type="button" onClick={() => setActiveIndex(index)} className={`fv-h-1 fv-transition-all fv-duration-300 ${index === activeIndex ? 'fv-w-8 fv-bg-brand-300' : 'fv-w-3 fv-bg-paper-50-45 fv-hover-bg-paper-50-80'}`} aria-label={`Show ${slide.title}`} aria-selected={index === activeIndex} role="tab" />))}
        </div>
      </div>
    </section>);
}
