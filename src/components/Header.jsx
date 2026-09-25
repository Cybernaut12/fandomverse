import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bookmark, ShoppingBag, Menu, X, UserCircle, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
export function Header({ onSearchOpen }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [exploreOpen, setExploreOpen] = useState(false);
    const location = useLocation();
    const { totalItems, openCart } = useCart();
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    useEffect(() => {
        setMobileOpen(false);
        setExploreOpen(false);
    }, [location.pathname]);
    const exploreLinks = [
      { label: 'Movies', path: '/category/movies' },
      { label: 'Anime', path: '/category/anime' },
      { label: 'TV Shows', path: '/category/tv-shows' },
      { label: 'Manga', path: '/category/manga' },
      { label: 'Games', path: '/category/gaming' },
      { label: 'K-Pop', path: '/category/k-pop' },
      { label: 'Comics', path: '/category/comics' },
    ];
    const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    const isExploreActive = exploreLinks.some((link) => location.pathname.startsWith(link.path));
    const navLinkClass = (active) => `position-relative fv-px-2 fv-py-2 fv-heading-font fw-medium fv-transition-colors fv-rounded fv-text-nowrap nav-link-compact ${active
      ? 'fv-text-brand-400'
      : 'fv-text-paper-200 fv-hover-text-paper-50'}`;
    return (<>
      <header className={`position-fixed fv-top-0 fv-start-0 fv-end-0 fv-z-50 fv-transition-all fv-duration-300 ${scrolled
            ? 'fv-bg-ink-900-95 fv-backdrop-blur-md border-bottom fv-border-ink-600'
            : 'fv-bg-ink-900-20 fv-backdrop-blur-sm'}`}>
        <div className="container-wide">
          <div className="d-flex align-items-center justify-content-between header-height">
            {/* Logo */}
            <Link to="/" className="d-flex align-items-center fv-flex-shrink-0 fv-group">
              <img src="/fandomverse-logo.svg" alt="FandomVerse" className="brand-logo" width="432" height="76" />
            </Link>

            {/* Desktop nav */}
            <nav className="d-none d-lg-flex align-items-center fv-gap-1 fv-overflow-visible" aria-label="Main navigation">
              <Link to="/" className={navLinkClass(isActive('/'))}>Home<span className={`position-absolute fv-bottom-0 fv-start-0 fv-end-0 fv-bg-brand-400 fv-transition-transform fv-duration-200 nav-link-indicator ${isActive('/') ? 'fv-scale-x-100' : 'fv-scale-x-0'}`}/></Link>
              <div className="position-relative" onMouseEnter={() => setExploreOpen(true)} onMouseLeave={() => setExploreOpen(false)}>
                <button type="button" onClick={() => setExploreOpen(!exploreOpen)} className={`${navLinkClass(isExploreActive)} d-inline-flex align-items-center border-0 fv-bg-transparent`} aria-expanded={exploreOpen}>
                  Explore <ChevronDown size={14} className={`fv-ms-1 fv-transition-transform ${exploreOpen ? 'fv-rotate-180' : ''}`} />
                  <span className={`position-absolute fv-bottom-0 fv-start-0 fv-end-0 fv-bg-brand-400 fv-transition-transform fv-duration-200 nav-link-indicator ${isExploreActive ? 'fv-scale-x-100' : 'fv-scale-x-0'}`}/>
                </button>
                {exploreOpen && (<div className="position-absolute top-100 fv-start-0 fv-py-2 fv-bg-ink-800 border fv-border-ink-600 fv-rounded fv-shadow-lg explore-menu">
                  {exploreLinks.map((link) => (<Link key={link.path} to={link.path} className={`d-block fv-px-3 fv-py-2 small fv-text-nowrap ${isActive(link.path) ? 'fv-text-brand-400' : 'fv-text-paper-200 fv-hover-text-paper-50'}`}>
                    {link.label}
                  </Link>))}
                </div>)}
              </div>
              <Link to="/articles" className={navLinkClass(isActive('/articles'))}>Articles<span className={`position-absolute fv-bottom-0 fv-start-0 fv-end-0 fv-bg-brand-400 fv-transition-transform fv-duration-200 nav-link-indicator ${isActive('/articles') ? 'fv-scale-x-100' : 'fv-scale-x-0'}`}/></Link>
              <Link to="/#events" className={navLinkClass(location.hash === '#events')}>Events<span className={`position-absolute fv-bottom-0 fv-start-0 fv-end-0 fv-bg-brand-400 fv-transition-transform fv-duration-200 nav-link-indicator ${location.hash === '#events' ? 'fv-scale-x-100' : 'fv-scale-x-0'}`}/></Link>
              <Link to="/about" className={navLinkClass(isActive('/about'))}>Community<span className={`position-absolute fv-bottom-0 fv-start-0 fv-end-0 fv-bg-brand-400 fv-transition-transform fv-duration-200 nav-link-indicator ${isActive('/about') ? 'fv-scale-x-100' : 'fv-scale-x-0'}`}/></Link>
            </nav>

            {/* Right actions */}
            <div className="d-flex align-items-center gap-2 fv-flex-shrink-0">
              <button onClick={onSearchOpen} className="fv-p-2 fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors rounded-2 fv-hover-bg-ink-700" aria-label="Open search">
                <Search className="fv-w-5 fv-h-5"/>
              </button>
              <Link to="/bookmarks" className="fv-p-2 fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors fv-rounded d-none d-xl-block" aria-label="View bookmarks">
                <Bookmark className="fv-w-5 fv-h-5"/>
              </Link>
              <button onClick={openCart} className="position-relative fv-p-2 fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors fv-rounded d-none d-xl-block" aria-label={`Open cart (${totalItems} items)`}>
                <ShoppingBag className="fv-w-5 fv-h-5"/>
                {totalItems > 0 && (<span className="position-absolute fv-top-0-5 fv-right-0-5 fv-bg-brand-500 fv-text-ink-900 fv-text-10px fv-font-bold rounded-pill fv-w-4 fv-h-4 d-flex align-items-center justify-content-center">
                    {totalItems}
                  </span>)}
              </button>
              <Link to="/login" className="d-none d-sm-block fv-px-3 fv-py-2 small fv-heading-font fw-medium fv-text-ink-900 fv-bg-brand-500 fv-hover-bg-brand-400 fv-rounded fv-transition-colors">
                Login
              </Link>
              <UserCircle className="d-sm-none fv-text-paper-200" size={16} aria-hidden="true" />
              <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="d-inline-flex d-lg-none fv-p-2 fv-text-paper-200 fv-hover-text-paper-50 fv-transition-colors" aria-label="Toggle menu" aria-expanded={mobileOpen}>
                {mobileOpen ? <X className="fv-w-5 fv-h-5"/> : <Menu className="fv-w-5 fv-h-5"/>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (<div className="position-fixed fv-inset-0 fv-z-40 fv-lg-hidden fv-bg-ink-900-95 fv-backdrop-blur-md fv-pt-16 fv-animate-fade-in" onClick={() => setMobileOpen(false)}>
          <nav className="container-wide fv-py-6 d-flex flex-column fv-gap-1" aria-label="Mobile navigation" onClick={(e) => e.stopPropagation()}>
            <Link to="/" className={`fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium rounded-3 fv-transition-colors ${isActive('/') ? 'fv-text-brand-400 fv-bg-ink-700' : 'fv-text-paper-200 fv-hover-text-paper-50 fv-hover-bg-ink-800'}`}>Home</Link>
            <button type="button" onClick={() => setExploreOpen(!exploreOpen)} className="d-flex align-items-center justify-content-between fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium rounded-3 border-0 fv-bg-transparent fv-text-paper-200 fv-hover-text-paper-50">
              Explore <ChevronDown size={18} className={exploreOpen ? 'fv-rotate-180' : ''} />
            </button>
            {exploreOpen && (<div className="d-flex flex-column fv-gap-1 fv-ps-4">
              {exploreLinks.map((link) => (<Link key={link.path} to={link.path} className="fv-px-4 fv-py-2 fv-heading-font fv-text-paper-200 fv-hover-text-brand-400">{link.label}</Link>))}
            </div>)}
            <Link to="/articles" className={`fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium rounded-3 fv-transition-colors ${isActive('/articles') ? 'fv-text-brand-400 fv-bg-ink-700' : 'fv-text-paper-200 fv-hover-text-paper-50 fv-hover-bg-ink-800'}`}>Articles</Link>
            <Link to="/#events" className="fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium rounded-3 fv-text-paper-200 fv-hover-text-paper-50">Events</Link>
            <Link to="/about" className="fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium rounded-3 fv-text-paper-200 fv-hover-text-paper-50">Community</Link>
            <div className="fv-h-px fv-bg-ink-600 fv-my-2"/>
            <button type="button" onClick={() => { setMobileOpen(false); openCart(); }} className="w-100 text-start border-0 fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium rounded-3 fv-bg-transparent fv-text-paper-200 fv-hover-text-paper-50">
              Shopping cart {totalItems > 0 && `(${totalItems})`}
            </button>
            <Link to="/bookmarks" className="fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium fv-text-paper-200 fv-hover-text-paper-50 rounded-3">
              Bookmarks
            </Link>
            <Link to="/about" className="fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium fv-text-paper-200 fv-hover-text-paper-50 rounded-3">
              About
            </Link>
            <Link to="/contact" className="fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium fv-text-paper-200 fv-hover-text-paper-50 rounded-3">
              Contact
            </Link>
            <Link to="/login" className="fv-mt-2 fv-px-4 fv-py-3 fv-text-lg fv-heading-font fv-font-medium fv-text-ink-900 fv-bg-brand-500 fv-hover-bg-brand-400 rounded-3 text-center fv-transition-colors">
              Login / Sign Up
            </Link>
          </nav>
        </div>)}
    </>);
}
