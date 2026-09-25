import { useMemo, useState } from 'react';
import { articles } from '@/data/articles';
import { characters } from '@/data/characters';
import { events } from '@/data/events';
import { mediaItems } from '@/data/media';
import { merchandise } from '@/data/merchandise';
import { releases } from '@/data/releases';
export function useSearch() {
    const [options, setOptions] = useState({
        query: '',
        category: 'all',
        contentType: 'all',
        sort: 'relevance',
    });
    const results = useMemo(() => {
        const { query, category, contentType, sort } = options;
        if (!query.trim())
            return [];
        const q = query.toLowerCase();
        const allResults = [];
        if (contentType === 'all' || contentType === 'article') {
            articles.forEach((a) => {
                if (a.title.toLowerCase().includes(q) ||
                    a.excerpt.toLowerCase().includes(q) ||
                    a.tags.some((t) => t.includes(q))) {
                    if (category === 'all' || a.category === category) {
                        allResults.push({
                            id: a.id,
                            title: a.title,
                            type: 'article',
                            category: a.category,
                            image: a.image,
                            url: `/article/${a.slug}`,
                            description: a.excerpt,
                            date: a.date,
                        });
                    }
                }
            });
        }
        if (contentType === 'all' || contentType === 'character') {
            characters.forEach((c) => {
                if (c.name.toLowerCase().includes(q) ||
                    c.series.toLowerCase().includes(q) ||
                    c.bio.toLowerCase().includes(q)) {
                    if (category === 'all' || c.category === category) {
                        allResults.push({
                            id: c.id,
                            title: c.name,
                            type: 'character',
                            category: c.category,
                            image: c.image,
                            url: `/character/${c.id}`,
                            description: `${c.series} — ${c.bio.slice(0, 100)}...`,
                        });
                    }
                }
            });
        }
        if (contentType === 'all' || contentType === 'event') {
            events.forEach((e) => {
                if (e.title.toLowerCase().includes(q) ||
                    e.description.toLowerCase().includes(q) ||
                    e.location.toLowerCase().includes(q)) {
                    if (category === 'all' || e.category === category) {
                        allResults.push({
                            id: e.id,
                            title: e.title,
                            type: 'event',
                            category: e.category,
                            image: e.image,
                            url: `/event/${e.id}`,
                            description: e.description,
                            date: e.date,
                        });
                    }
                }
            });
        }
        if (contentType === 'all' || contentType === 'media') {
            mediaItems.forEach((m) => {
                if (m.title.toLowerCase().includes(q) ||
                    m.description.toLowerCase().includes(q)) {
                    if (category === 'all' || m.category === category) {
                        allResults.push({
                            id: m.id,
                            title: m.title,
                            type: 'media',
                            category: m.category,
                            image: m.thumbnail,
                            url: `/media/${m.id}`,
                            description: `${m.type} — ${m.description}`,
                        });
                    }
                }
            });
        }
        if (contentType === 'all' || contentType === 'merchandise') {
            merchandise.forEach((m) => {
                if (m.name.toLowerCase().includes(q) ||
                    m.description.toLowerCase().includes(q)) {
                    if (category === 'all' || m.category === category) {
                        allResults.push({
                            id: m.id,
                            title: m.name,
                            type: 'merchandise',
                            category: m.category,
                            image: m.image,
                            url: `/category/${m.category}`,
                            description: `${m.type} — $${m.price}`,
                        });
                    }
                }
            });
        }
        if (contentType === 'all' || contentType === 'release') {
            releases.forEach((r) => {
                if (r.title.toLowerCase().includes(q) ||
                    r.type.toLowerCase().includes(q)) {
                    if (category === 'all' || r.category === category) {
                        allResults.push({
                            id: r.id,
                            title: r.title,
                            type: 'release',
                            category: r.category,
                            image: r.image,
                            url: `/category/${r.category}`,
                            description: `${r.type} — ${r.date}`,
                            date: r.date,
                        });
                    }
                }
            });
        }
        // Sort
        switch (sort) {
            case 'newest':
                allResults.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                break;
            case 'oldest':
                allResults.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
                break;
            case 'az':
                allResults.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'za':
                allResults.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }
        return allResults;
    }, [options]);
    return { options, setOptions, results };
}
