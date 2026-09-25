import { createContext, useContext, useState, useCallback, useEffect } from 'react';
const BookmarkContext = createContext(undefined);
const STORAGE_KEY = 'fandomverse_bookmarks';
export function BookmarkProvider({ children }) {
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored)
                setBookmarks(JSON.parse(stored));
        }
        catch {
            // ignore
        }
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
        }
        catch {
            // ignore
        }
    }, [bookmarks]);
    const isBookmarked = useCallback((id) => bookmarks.some((b) => b.id === id), [bookmarks]);
    const toggleBookmark = useCallback((item) => {
        setBookmarks((prev) => {
            const existing = prev.find((b) => b.id === item.id);
            if (existing) {
                return prev.filter((b) => b.id !== item.id);
            }
            return [...prev, { ...item, savedAt: Date.now() }];
        });
    }, []);
    const removeBookmark = useCallback((id) => {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
    }, []);
    const clearBookmarks = useCallback(() => setBookmarks([]), []);
    return (<BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, removeBookmark, clearBookmarks }}>
      {children}
    </BookmarkContext.Provider>);
}
export function useBookmarks() {
    const ctx = useContext(BookmarkContext);
    if (!ctx)
        throw new Error('useBookmarks must be used within BookmarkProvider');
    return ctx;
}
