import { Link } from 'react-router-dom';
import { Bookmark, Trash2, FileText, User, Calendar, Play, Download } from 'lucide-react';
import { useBookmarks } from '@/context/BookmarkContext';
import { useSessionNotes } from '@/hooks/useSessionNotes';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { categories } from '@/data/categories';
import { useState } from 'react';
const typeIcons = {
    article: <FileText className="fv-w-4 fv-h-4"/>,
    character: <User className="fv-w-4 fv-h-4"/>,
    event: <Calendar className="fv-w-4 fv-h-4"/>,
    media: <Play className="fv-w-4 fv-h-4"/>,
};
export function BookmarksPage() {
    const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
    const { getNote, saveNote } = useSessionNotes();
    const [activeFilter, setActiveFilter] = useState('all');
    const filtered = activeFilter === 'all' ? bookmarks : bookmarks.filter((b) => b.type === activeFilter);
    const types = ['all', 'article', 'character', 'event', 'media'];
    const exportBookmarks = () => {
        const lines = bookmarks.map((bookmark, index) => {
            const category = categories.find((item) => item.slug === bookmark.category)?.name ?? bookmark.category;
            const savedDate = new Date(bookmark.savedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            return `${index + 1}. **${bookmark.title}**\n   - Type: ${bookmark.type}\n   - Category: ${category}\n   - Saved: ${savedDate}\n   - Link: ${window.location.origin}${bookmark.url}`;
        });
        const content = `# FandomVerse Bookmarks\n\n${lines.join('\n\n')}\n`;
        const file = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        const fileUrl = URL.createObjectURL(file);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = 'fandomverse-bookmarks.md';
        downloadLink.click();
        URL.revokeObjectURL(fileUrl);
    };
    return (<div className="min-vh-100 fv-bg-ink-900 fv-pt-20">
      <div className="container-wide fv-py-12">
        <div className="fv-mb-8">
          <div className="d-flex align-items-center gap-2 fv-mb-2">
            <Bookmark className="fv-w-6 fv-h-6 fv-text-brand-400"/>
            <h1 className="fv-display-font fv-text-4xl fv-md-text-5xl fv-text-paper-50 fv-tracking-wide">Your Collection</h1>
          </div>
          <p className="fv-text-paper-300 fv-max-w-xl">
            Everything you've saved, in one place. Bookmarks are stored in your browser — they'll be here next time you visit.
          </p>
        </div>

        {/* Storage info */}
        <div className="fv-bg-ink-800 rounded-3 fv-p-4 border fv-border-ink-600 fv-mb-8 fv-text-sm">
          <p className="fv-text-paper-300">
            <span className="fv-text-brand-400 fv-heading-font">Bookmarks</span> are saved in localStorage and persist across sessions.
            <span className="fv-text-movies fv-heading-font"> Personal notes</span> use sessionStorage and are cleared when you close the browser.
          </p>
        </div>

        {bookmarks.length === 0 ? (<div className="text-center fv-py-20">
            <Bookmark className="fv-w-16 fv-h-16 fv-text-ink-500 mx-auto fv-mb-4"/>
            <h2 className="fv-heading-font fv-text-xl fv-text-paper-200 fv-mb-2">No bookmarks yet</h2>
            <p className="fv-text-paper-300-60 fv-mb-6">Start exploring and save things you love.</p>
            <Link to="/" className="d-inline-block fv-px-6 fv-py-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-heading-font fv-font-semibold rounded-3 fv-transition-colors">
              Explore FandomVerse
            </Link>
          </div>) : (<>
            {/* Filters */}
            <div className="d-flex align-items-center justify-content-between fv-gap-4 fv-mb-6 flex-wrap">
              <div className="d-flex flex-wrap gap-2">
                {types.map((type) => (<button key={type} onClick={() => setActiveFilter(type)} className={`fv-px-3 fv-py-1 rounded-pill fv-text-xs fv-heading-font text-capitalize fv-transition-colors ${activeFilter === type ? 'fv-bg-brand-500 fv-text-ink-900' : 'fv-bg-ink-700 fv-text-paper-300 fv-hover-bg-ink-600'}`}>
                    {type === 'all' ? 'All' : `${type}s`}
                    {type !== 'all' && (<span className="fv-ml-1 fv-opacity-50">({bookmarks.filter((b) => b.type === type).length})</span>)}
                  </button>))}
              </div>
              <div className="d-flex align-items-center fv-gap-3">
                <button type="button" onClick={exportBookmarks} disabled={bookmarks.length === 0} className="export-bookmarks-button d-inline-flex align-items-center fv-gap-1 fv-text-sm fv-text-brand-300 fv-hover-text-brand-200 fv-transition-colors fv-heading-font" aria-label="Export bookmarks as a Markdown list">
                  <Download className="fv-w-4 fv-h-4" /> Export list
                </button>
                <button onClick={clearBookmarks} className="fv-text-sm fv-text-paper-300-60 fv-hover-text-red-400 fv-transition-colors fv-heading-font">
                  Clear all
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="fv-grid fv-grid-cols-1 fv-sm-grid-cols-2 fv-lg-grid-cols-3 fv-gap-4">
              {filtered.map((bookmark) => {
                const cat = categories.find((c) => c.slug === bookmark.category);
                return (<div key={bookmark.id} className="fv-group fv-bg-ink-800 rounded-3 overflow-hidden border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                    <Link to={bookmark.url} className="d-block position-relative fv-aspect-16-10 overflow-hidden">
                      <img src={bookmark.image} alt={bookmark.title} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-105" loading="lazy"/>
                      <span className="position-absolute fv-top-2 fv-left-2 fv-bg-ink-900-80 fv-backdrop-blur-sm fv-text-paper-100 fv-text-xs fv-px-2 fv-py-0-5 fv-rounded fv-heading-font text-capitalize d-flex align-items-center fv-gap-1">
                        {typeIcons[bookmark.type]}
                        <span>{bookmark.type}</span>
                      </span>
                    </Link>
                    <div className="fv-p-4">
                      <CategoryBadge category={bookmark.category}/>
                      <Link to={bookmark.url}>
                        <h3 className="fv-text-sm fv-heading-font fv-font-medium fv-text-paper-50 fv-mt-2 fv-clamp-2 fv-hover-text-brand-400 fv-transition-colors">
                          {bookmark.title}
                        </h3>
                      </Link>
                      <p className="fv-text-xs fv-text-paper-300-40 fv-mt-1">
                        Saved {new Date(bookmark.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>

                      {/* Session note */}
                      <div className="fv-mt-3">
                        <input type="text" defaultValue={getNote(bookmark.id)} onBlur={(e) => saveNote(bookmark.id, e.target.value)} placeholder="Add a note (this session only)..." className="w-100 fv-bg-ink-700 fv-text-paper-200 fv-text-xs fv-rounded fv-px-2 fv-py-1-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400-50 fv-placeholder-text-paper-300-30" aria-label={`Personal note for ${bookmark.title}`}/>
                      </div>

                      <button onClick={() => removeBookmark(bookmark.id)} className="fv-mt-3 d-inline-flex align-items-center fv-gap-1 fv-text-xs fv-text-paper-300-60 fv-hover-text-red-400 fv-transition-colors">
                        <Trash2 className="fv-w-3 fv-h-3"/>
                        Remove
                      </button>
                    </div>
                  </div>);
            })}
            </div>
          </>)}
      </div>
    </div>);
}
