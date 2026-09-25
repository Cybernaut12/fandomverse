import { useEffect, useRef } from 'react';
import { Search, X, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';
import { categories } from '@/data/categories';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
const contentTypeLabels = {
    all: 'All Types',
    article: 'Articles',
    character: 'Characters',
    event: 'Events',
    media: 'Media',
    merchandise: 'Merchandise',
    release: 'Releases',
};
const sortLabels = {
    relevance: 'Relevance',
    newest: 'Newest',
    oldest: 'Oldest',
    az: 'A–Z',
    za: 'Z–A',
};
export function SearchModal({ isOpen, onClose }) {
    const { options, setOptions, results } = useSearch();
    const inputRef = useRef(null);
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        if (isOpen)
            window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return (<div className="position-fixed fv-inset-0 fv-z-95 fv-bg-ink-900-80 fv-backdrop-blur-sm fv-animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div className="position-absolute fv-top-0 fv-left-0 fv-right-0 fv-bg-ink-800 border-bottom fv-border-ink-600 fv-max-h-90vh overflow-auto fv-animate-fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="container-wide fv-py-6">
          <div className="d-flex align-items-center fv-gap-3 fv-mb-4">
            <Search className="fv-w-6 fv-h-6 fv-text-brand-400 flex-shrink-0"/>
            <input ref={inputRef} type="text" value={options.query} onChange={(e) => setOptions({ ...options, query: e.target.value })} placeholder="Search articles, characters, events, media, merchandise..." className="flex-fill fv-bg-transparent fv-text-paper-50 fv-text-lg fv-heading-font fv-placeholder-text-paper-300-40 fv-outline-none" aria-label="Search query"/>
            <button onClick={onClose} className="fv-text-paper-300 fv-hover-text-paper-50 fv-transition-colors fv-p-1" aria-label="Close search">
              <X className="fv-w-5 fv-h-5"/>
            </button>
          </div>

          {/* Filters */}
          <div className="d-flex flex-wrap align-items-center gap-2 fv-mb-6 fv-pb-4 border-bottom fv-border-ink-600">
            <div className="d-flex align-items-center fv-gap-1-5 fv-text-paper-300-60 fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider">
              <Filter className="fv-w-3-5 fv-h-3-5"/>
              <span>Category</span>
            </div>
            <button onClick={() => setOptions({ ...options, category: 'all' })} className={`fv-px-3 fv-py-1 rounded-pill fv-text-xs fv-font-medium fv-transition-colors ${options.category === 'all'
            ? 'fv-bg-brand-500 fv-text-ink-900'
            : 'fv-bg-ink-700 fv-text-paper-300 fv-hover-bg-ink-600'}`}>
              All
            </button>
            {categories.map((cat) => (<button key={cat.slug} onClick={() => setOptions({ ...options, category: cat.slug })} className={`fv-px-3 fv-py-1 rounded-pill fv-text-xs fv-font-medium fv-transition-colors ${options.category === cat.slug ? 'fv-text-ink-900' : 'fv-bg-ink-700 fv-text-paper-300 fv-hover-bg-ink-600'}`} style={options.category === cat.slug ? { backgroundColor: cat.accentColor } : {}}>
                {cat.name}
              </button>))}

            <div className="fv-w-px fv-h-5 fv-bg-ink-600 fv-mx-1"/>

            <select value={options.contentType} onChange={(e) => setOptions({ ...options, contentType: e.target.value })} className="fv-bg-ink-700 fv-text-paper-200 fv-text-xs rounded-pill fv-px-3 fv-py-1-5 border fv-border-ink-600 fv-outline-none fv-cursor-pointer" aria-label="Filter by content type">
              {Object.entries(contentTypeLabels).map(([value, label]) => (<option key={value} value={value}>{label}</option>))}
            </select>

            <select value={options.sort} onChange={(e) => setOptions({ ...options, sort: e.target.value })} className="fv-bg-ink-700 fv-text-paper-200 fv-text-xs rounded-pill fv-px-3 fv-py-1-5 border fv-border-ink-600 fv-outline-none fv-cursor-pointer" aria-label="Sort results">
              {Object.entries(sortLabels).map(([value, label]) => (<option key={value} value={value}>{label}</option>))}
            </select>
          </div>

          {/* Results */}
          {options.query.trim() === '' ? (<div className="fv-py-12 text-center">
              <p className="fv-text-paper-300-60 fv-text-sm">
                Search across all fandom content — try "anime", "trailer", "figure", or "concert".
              </p>
            </div>) : results.length === 0 ? (<div className="fv-py-12 text-center">
              <p className="fv-text-paper-300 fv-text-sm">
                No results for "{options.query}". Try a different search term or adjust filters.
              </p>
            </div>) : (<>
              <p className="fv-text-paper-300-60 fv-text-xs fv-mb-4 fv-heading-font">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              <div className="fv-grid fv-gap-3 fv-sm-grid-cols-2 fv-lg-grid-cols-3 fv-mb-6">
                {results.map((result) => (<Link key={`${result.type}-${result.id}`} to={result.url} onClick={onClose} className="fv-group d-flex fv-gap-3 fv-bg-ink-700 fv-hover-bg-ink-600 rounded-3 fv-p-3 border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all fv-duration-200">
                    <img src={result.image} alt={result.title} className="fv-w-16 fv-h-16 rounded-2 object-fit-cover flex-shrink-0" loading="lazy"/>
                    <div className="flex-fill ">
                      <div className="d-flex align-items-center gap-2 fv-mb-1">
                        <span className="fv-text-10px fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-50">
                          {result.type}
                        </span>
                        <CategoryBadge category={result.category} size="sm"/>
                      </div>
                      <h3 className="fv-text-sm fv-heading-font fv-font-medium fv-text-paper-50 fv-clamp-2 fv-group-hover-text-brand-400 fv-transition-colors">
                        {result.title}
                      </h3>
                      <p className="fv-text-xs fv-text-paper-300-60 fv-clamp-1 fv-mt-0-5">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight className="fv-w-4 fv-h-4 fv-text-paper-300-30 fv-group-hover-text-brand-400 fv-group-hover-translate-x-1 fv-transition-all flex-shrink-0 fv-self-center"/>
                  </Link>))}
              </div>
            </>)}
        </div>
      </div>
    </div>);
}
