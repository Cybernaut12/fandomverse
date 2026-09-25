import { categories } from '@/data/categories';

const categoryAliases = {
  anime: ['anime'],
  gaming: ['gaming', 'game', 'games', 'video game', 'video games'],
  movies: ['movie', 'movies', 'film', 'films', 'cinema'],
  'tv-shows': ['tv', 'tv show', 'tv shows', 'television', 'series'],
  'k-pop': ['k-pop', 'kpop', 'k pop'],
  comics: ['comic', 'comics', 'graphic novel', 'graphic novels'],
  manga: ['manga'],
};

const categoryLinks = categories.map((category) => ({
  label: `Explore ${category.name}`,
  to: `/category/${category.slug}`,
}));

const normalize = (value) => value
  .toLowerCase()
  .replace(/[’']/g, '')
  .replace(/[^a-z0-9-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const includesPhrase = (text, phrase) => ` ${text} `.includes(` ${normalize(phrase)} `);
const matchesAny = (text, phrases) => phrases.some((phrase) => includesPhrase(text, phrase));

function findCategory(text) {
  const matches = Object.entries(categoryAliases)
    .flatMap(([slug, aliases]) => aliases
      .filter((alias) => includesPhrase(text, alias))
      .map((alias) => ({ slug, alias })))
    .sort((a, b) => b.alias.length - a.alias.length);

  return matches[0] ? categories.find((category) => category.slug === matches[0].slug) : null;
}

const answer = (response, links = [], suggestions = []) => ({ response, links, suggestions });

export function getChatbotResponse(input) {
  const text = normalize(input);
  const category = findCategory(text);

  if (!text) {
    return answer('Type a question or choose one of these common topics to get started.', [], [
      'What can I explore here?',
      'How do bookmarks work?',
      'Where are the upcoming events?',
    ]);
  }

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)$/.test(text)
    || matchesAny(text, ['what can you do', 'how can you help', 'help me'])) {
    return answer(
      'Hi! I can help you find a fandom hub, browse trending stories, and locate events, trailers, releases, articles, merchandise, bookmarks, and search.',
      [
        { label: 'Browse all fandoms', to: '/#categories' },
        { label: 'Open search', action: 'search' },
      ],
      ['What can I find in Anime?', 'How do bookmarks work?', 'Where can I find trailers?'],
    );
  }

  if (matchesAny(text, ['are you ai', 'is this ai', 'artificial intelligence', 'how do your answers work', 'how does this chatbot work'])) {
    return answer(
      'I use a prewritten set of FandomVerse FAQs and navigation suggestions. I do not connect to an external AI service or backend.',
      [],
      ['What can I find in Anime?', 'How do bookmarks work?', 'Where can I search?'],
    );
  }

  if (matchesAny(text, ['what categories', 'all categories', 'all fandoms', 'seven fandoms', 'browse categories'])) {
    return answer('FandomVerse has seven fandom hubs. Choose one to open its page.', categoryLinks,
      ['What is trending this week?', 'Where can I find articles?', 'What events are coming up?']);
  }

  if (matchesAny(text, ['bookmark', 'bookmarks', 'save for later', 'saved items', 'saved stories'])) {
    return answer(
      'Use the bookmark button on a story or detail page to save it. Your saved stories stay in this browser and appear together on your Bookmarks page.',
      [{ label: 'Open bookmarks', to: '/bookmarks' }],
      ['How do I save a story?', 'What is trending this week?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['open search', 'use search', 'how do i search', 'how can i search', 'where can i search', 'where is search', 'search button', 'search icon', 'search for', 'search content', 'search the site'])) {
    return answer(
      'Search covers articles, characters, events, media, merchandise, and releases. You can narrow results by category and content type.',
      [{ label: 'Open search', action: 'search' }],
      ['How do bookmarks work?', 'Where can I find articles?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['cart', 'checkout', 'payment', 'pay for', 'purchase'])) {
    return answer(
      'The cart is a local list for keeping track of merchandise you like. This site does not take payments or offer checkout.',
      [{ label: 'Open cart', action: 'cart' }, { label: 'Browse merchandise', to: '/#merchandise' }],
      ['Where can I find merchandise?', 'How do bookmarks work?'],
    );
  }

  if (matchesAny(text, ['merch', 'merchandise', 'shop', 'store', 'products', 'figures', 'collectibles'])) {
    return answer(
      'Browse figures, apparel, collectibles, plushies, and accessories in the Merchandise section. Add items to the cart to keep track of them.',
      [{ label: 'Browse merchandise', to: '/#merchandise' }, { label: 'Open cart', action: 'cart' }],
      ['Does the site take payments?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['event', 'events', 'convention', 'conventions', 'festival', 'festivals', 'meetup'])) {
    const links = [{ label: 'See upcoming events', to: '/#events' }];
    if (category) links.push({ label: `Explore ${category.name}`, to: `/category/${category.slug}` });
    return answer(
      'Upcoming conventions, screenings, competitions, and fan events are collected in the Events section. Category pages also include events related to that fandom.',
      links,
      ['What releases are coming up?', 'Where can I find trailers?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['upcoming release', 'upcoming releases', 'release calendar', 'release schedule', 'new releases', 'coming out'])) {
    return answer(
      'The Upcoming Releases section tracks new films, series, games, albums, comics, and manga across the fandoms.',
      [{ label: 'See upcoming releases', to: '/#releases' }],
      ['What events are coming up?', 'What is trending this week?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['trailer', 'trailers', 'podcast', 'podcasts', 'interview', 'interviews', 'watch', 'listen', 'video'])) {
    const links = [{ label: 'Browse trailers and media', to: '/#trailers' }];
    if (category) links.push({ label: `Explore ${category.name}`, to: `/category/${category.slug}` });
    return answer(
      'Trailers, interviews, podcasts, audio, and fan videos are in the Watch & Listen section. You can filter the collection by media type and category.',
      links,
      ['What events are coming up?', 'Where can I find galleries?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['trending', 'popular this week', 'this week'])) {
    return answer(
      'Trending This Week brings together current picks from across movies, anime, comics, games, TV, manga, and music.',
      [{ label: 'View all trending', to: '/trending' }],
      ['Where can I find articles?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['gallery', 'galleries', 'images', 'photos', 'pictures'])) {
    return answer(
      'The gallery collects images from across the fandoms. Select an image to view it larger, or open a category hub for galleries related to that category.',
      [{ label: 'View the gallery', to: '/#gallery' }, ...(category ? [{ label: `Explore ${category.name}`, to: `/category/${category.slug}` }] : [])],
      ['Where can I find trailers?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['article', 'articles', 'blog', 'read'])) {
    return answer(
      'Articles cover news, fandom culture, creators, and trends. Open the Articles page to browse the full collection.',
      [{ label: 'Browse articles', to: '/articles' }],
      ['What is trending this week?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['about', 'what is fandomverse', 'about fandomverse', 'who made this site'])) {
    return answer(
      'FandomVerse brings entertainment fandoms together in one place, with category hubs, articles, trending stories, events, media, releases, galleries, and merchandise.',
      [{ label: 'About FandomVerse', to: '/about' }],
      ['What can I explore here?', 'Browse all fandoms'],
    );
  }

  if (matchesAny(text, ['contact', 'contact us', 'email you', 'get in touch', 'support'])) {
    return answer(
      'You can reach the FandomVerse team through the Contact page.',
      [{ label: 'Open contact page', to: '/contact' }],
      ['What can I explore here?', 'Browse all fandoms'],
    );
  }

  if (category) {
    return answer(
      `The ${category.name} hub brings together stories and features for that fandom. Open it to browse its articles, characters, media, gallery, events, releases, and merchandise.`,
      [{ label: `Explore ${category.name}`, to: `/category/${category.slug}` }],
      ['What is trending this week?', 'Where can I find trailers?', 'How do bookmarks work?'],
    );
  }

  if (matchesAny(text, ['home', 'homepage', 'home page', 'start page', 'main page'])) {
    return answer(
      'The home page is the starting point for featured stories and the seven fandom hubs, with trending picks, events, media, releases, galleries, and merchandise further down.',
      [{ label: 'Go to home page', to: '/' }],
      ['Browse all fandoms', 'What is trending this week?'],
    );
  }

  return answer(
    'I can answer common questions about FandomVerse and point you to its pages. Try asking about a fandom, trending stories, events, trailers, releases, articles, merchandise, search, or bookmarks.',
    [
      { label: 'Browse all fandoms', to: '/#categories' },
      { label: 'Open search', action: 'search' },
    ],
    ['What can I find in Anime?', 'How do bookmarks work?', 'Where can I find articles?'],
  );
}
