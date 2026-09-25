import { useBookmarks } from '@/context/BookmarkContext';
import { Bookmark, BookmarkCheck } from 'lucide-react';
export function BookmarkButton({ id, type, title, category, image, url, compact = false, placement = 'top-right' }) {
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const bookmarked = isBookmarked(id);
    const placementClass = placement === 'bottom-right' ? 'fv-bottom-2' : 'fv-top-2';
    return (<button onClick={() => toggleBookmark({ id, type, title, category: category, image, url })} className={`d-inline-flex align-items-center gap-2 fv-heading-font fv-text-sm fv-font-medium fv-transition-all fv-duration-200 fv-active-scale-95 ${compact ? `position-absolute fv-right-2 ${placementClass} fv-z-10 fv-h-9 fv-w-9 justify-content-center rounded-pill fv-p-0 fv-backdrop-blur-sm` : 'rounded-3 fv-px-4 fv-py-2'}`} style={{
            color: bookmarked ? '#0a0a0f' : '#e8e2d0',
            backgroundColor: bookmarked ? '#e8a87c' : compact ? 'rgba(10,10,15,0.82)' : 'transparent',
            border: bookmarked ? '1px solid #e8a87c' : '1px solid #3a3a52',
        }} aria-pressed={bookmarked} aria-label={bookmarked ? `Remove ${title} from bookmarks` : `Add ${title} to bookmarks`} title={bookmarked ? `Remove ${title} from bookmarks` : `Save ${title}`}>
      {bookmarked ? (<BookmarkCheck className="fv-w-4 fv-h-4"/>) : (<Bookmark className="fv-w-4 fv-h-4"/>)}
      {!compact && <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>}
    </button>);
}
