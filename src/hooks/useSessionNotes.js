import { useState, useEffect } from 'react';
export function useSessionNotes() {
    const [notes, setNotes] = useState({});
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem('fandomverse_notes');
            if (stored)
                setNotes(JSON.parse(stored));
        }
        catch {
            // ignore
        }
    }, []);
    const saveNote = (id, text) => {
        const updated = { ...notes, [id]: text };
        setNotes(updated);
        try {
            sessionStorage.setItem('fandomverse_notes', JSON.stringify(updated));
        }
        catch {
            // ignore
        }
    };
    const getNote = (id) => notes[id] || '';
    return { notes, saveNote, getNote };
}
