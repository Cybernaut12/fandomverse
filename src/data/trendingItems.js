import items from './trendingItems.json';

const shuffle = (values) => {
  const shuffled = [...values];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
};

const spiderMan = items.find((item) => item.id === 'spider-man-brand-new-day');
const otherTrendingItems = items.filter((item) => item.id !== spiderMan?.id);

// Keep the requested Spider-Man movie in the first visible card; mix the rest across fandoms.
export const trendingItems = spiderMan
  ? [spiderMan, ...shuffle(otherTrendingItems)]
  : shuffle(items);

export function getTrendingItemBySlug(slug) {
  return items.find((item) => item.slug === slug);
}
