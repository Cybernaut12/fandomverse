import { useState, useEffect } from 'react';
const STORAGE_KEY = 'fandomverse_visitors';
export function useVisitorCounter() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            let current = stored ? parseInt(stored, 10) : 12847;
            current += 1;
            localStorage.setItem(STORAGE_KEY, String(current));
            setCount(current);
        }
        catch {
            setCount(12848);
        }
    }, []);
    return count;
}
export function formatVisitors(n) {
    return n.toLocaleString('en-US');
}
