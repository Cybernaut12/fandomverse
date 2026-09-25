import { Link } from 'react-router-dom';
import { Twitter, Instagram, Youtube, Github } from 'lucide-react';
import { categories } from '@/data/categories';
import { useVisitorCounter, formatVisitors } from '@/hooks/useVisitorCounter';
import { useClock, formatDateTime } from '@/hooks/useClock';
export function Footer() {
    const visitors = useVisitorCounter();
    const now = useClock();
    return (<footer className="fv-bg-ink-800 border-top fv-border-ink-600">
      <div className="container-wide fv-py-5">
        <div className="row g-4 g-lg-5">
          {/* Brand */}
          <div className="col-12 col-md-6 col-lg-3">
            <Link to="/" className="d-flex align-items-center gap-2 fv-mb-4">
              <img src="/fandomverse-logo.svg" alt="FandomVerse" className="brand-logo footer-brand-logo" width="432" height="76" />
            </Link>
            <p className="fv-text-sm fv-text-paper-300 fv-leading-relaxed fv-max-w-xs">
              One universe, every fandom. We bring scattered entertainment content together
              into one place where fans can actually find what they love.
            </p>
            <div className="d-flex fv-gap-3 fv-mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="fv-text-paper-300 fv-hover-text-brand-400 fv-transition-colors" aria-label="Twitter">
                <Twitter className="fv-w-5 fv-h-5"/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="fv-text-paper-300 fv-hover-text-brand-400 fv-transition-colors" aria-label="Instagram">
                <Instagram className="fv-w-5 fv-h-5"/>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="fv-text-paper-300 fv-hover-text-brand-400 fv-transition-colors" aria-label="YouTube">
                <Youtube className="fv-w-5 fv-h-5"/>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="fv-text-paper-300 fv-hover-text-brand-400 fv-transition-colors" aria-label="GitHub">
                <Github className="fv-w-5 fv-h-5"/>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="col-12 col-md-6 col-lg-3">
            <h3 className="fv-heading-font small text-uppercase fv-text-paper-300-60 fv-mb-4">
              Explore
            </h3>
            <ul className="list-unstyled d-grid gap-2">
              {categories.map((cat) => (<li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="fv-text-sm fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors">
                    {cat.name}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <h3 className="fv-heading-font small text-uppercase fv-text-paper-300-60 fv-mb-4">
              Quick Links
            </h3>
            <ul className="list-unstyled d-grid gap-2">
              <li><Link to="/" className="fv-text-sm fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors">Home</Link></li>
              <li><Link to="/bookmarks" className="fv-text-sm fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors">Bookmarks</Link></li>
              <li><Link to="/#trailers" className="fv-text-sm fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors">Trailers</Link></li>
              <li><Link to="/#merchandise" className="fv-text-sm fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors">Merchandise</Link></li>
              <li><Link to="/about" className="fv-text-sm fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors">About</Link></li>
              <li><Link to="/contact" className="fv-text-sm fv-text-paper-200 fv-hover-text-brand-400 fv-transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Counter & Clock */}
          <div className="col-12 col-md-6 col-lg-3">
            <h3 className="fv-heading-font small text-uppercase fv-text-paper-300-60 fv-mb-4">
              Community
            </h3>
            <div className="fv-bg-ink-700 rounded-3 fv-p-4 border fv-border-ink-600">
              <p className="fv-text-xs fv-text-paper-300-60 fv-heading-font fv-uppercase fv-tracking-wider fv-mb-1">
                Visitor Counter
              </p>
              <p className="fv-display-font fv-text-2xl fv-text-brand-400 fv-tracking-wider">
                {formatVisitors(visitors)}
              </p>
              <p className="fv-text-10px fv-text-paper-300-40 fv-mt-1">Simulated count</p>
              <div className="fv-h-px fv-bg-ink-600 fv-my-3"/>
              <p className="fv-text-xs fv-text-paper-300-60 fv-heading-font fv-uppercase fv-tracking-wider fv-mb-1">
                Current Time
              </p>
              <p className="fv-text-sm fv-text-paper-200 fv-heading-font fv-tabular-nums">
                {formatDateTime(now)}
              </p>
            </div>
          </div>
        </div>

        <div className="fv-mt-5 fv-pt-4 border-top fv-border-ink-600 d-flex flex-column flex-sm-row align-items-center justify-content-between fv-gap-3">
          <p className="fv-text-xs fv-text-paper-300-50">
            © {now.getFullYear()} FandomVerse. A fan-made project for demonstration purposes.
          </p>
          <p className="fv-text-xs fv-text-paper-300-40">
            All images via Pexels. Content is fictional and created for this project.
          </p>
        </div>
      </div>
    </footer>);
}
