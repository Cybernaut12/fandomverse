# 🌌 FandomVerse 2.0 — Portal for Fandom World
> **Aptech Limited — TechWiz 7: The World Tech Championship**  
> **Theme:** Fandom Universe  
> **Category:** Web Innovation Unleashed  
> **Software Requirements Specification (SRS):** Version 1.0

---

## 📌 Executive Summary
**FandomVerse** is a next-generation, responsive Single Page Application (SPA) that unifies seven major fandom pillars:
1. ⛩️ **Anime** (Shonen legends, sakuga masterworks, fantasy epics)
2. 🎮 **Gaming** (Open-world RPGs, tactical stealth, roguelikes)
3. 🎬 **Movies & Cinema** (Sci-fi sagas, auteur neo-noir, superhero blockbusters)
4. 📺 **TV Shows & Prestige Series** (Dystopian wasteland, feudal politics, character drama)
5. 💖 **K-Pop Universe** (Global icons, stadium world tours, meta-universe lore)
6. 💥 **Comics & Graphic Novels** (Multiverses, detective noir, literary graphic novels)
7. 📖 **Manga Archives** (Weekly serialized shonen, dark fantasy seinen, inkcraft)

FandomVerse resolves the fragmented fan experience by centralizing content discovery, user progress tracking, community reviews, calendar releases, merchandise showcases, high-resolution image galleries, video/audio media clips, and an interactive AI virtual guide into a single, unified interface.

---

## 🚀 Key Features Implemented

### 1. 🧭 Navigation & Core UI Features
- **Real-Time Clock:** Live date and ticking time simulator (SRS page 14).
- **Simulated Visitor Counter:** Persistent live visitor tally stored in `localStorage` (SRS page 14).
- **Breadcrumb Navigation:** Contextual breadcrumbs across category and detail views (SRS page 14).
- **Global Search (`Ctrl+K`):** Client-side instant fuzzy search across titles, characters, merchandise, articles, and events (SRS page 9).
- **Dummy Authentication:** Simulated Login / Sign Up modal with profile switching (SRS page 14).

### 2. 🏠 Home Page Experience
- **Cinematic Hero Carousel:** Bold spotlight banner with rotating titles (*Alita: Battle Angel*, *Dune: Part Two*, *Solo Leveling*, *One Piece*, *Elden Ring*) with "Explore Now" and "Watch Trailer" triggers.
- **Trending This Week:** High-impact media cards with rating tags, genres, and quick-bookmark controls.
- **7 Category Universe Portals:** Direct access to each fandom pillar with live catalog counters.
- **Media Hub Preview:** Trailers, podcasts, and symphonic OST preview cards.
- **Long-Form Featured News:** Editorial articles with read times, author avatars, and related titles.
- **Live Community Stats:** Real-time metrics on titles, characters, events, and active fans.

### 3. 🔍 Discover Hub & Advanced Multi-Filter
- Comprehensive multi-faceted filtering:
  - **Category / Pillar:** All, Movies, TV Shows, Anime, Manga, Gaming, Comics, K-Pop
  - **Genre:** Action, Sci-Fi, Fantasy, Cyberpunk, Drama, Mystery, Shonen, RPG
  - **Release Year:** 2024, 2023, Classic
  - **Minimum Rating:** 9.0+ Masterpiece, 8.5+ Great, 8.0+ Good
  - **Sort Order:** Popularity, Highest Rated, Newest First, Alphabetical (A-Z)
- **Top Highlights & Hidden Gems:** Curated showcases for critically acclaimed underground classics (*Pluto*, *Vinland Saga*, *Erased*, *Cyberpunk: Edgerunners*, *Monster*).

### 4. 🧩 Category Hubs (7 Dedicated Universes)
- Filterable by content format: Titles, Character Profiles, Galleries, Audio/Video, Events, Articles, Merchandise.
- Sub-tag classification and multiple sorting algorithms.
- **Dedicated Image Galleries:** Full-screen responsive lightbox viewer with previous/next controls, artist credits, and download triggers (SRS page 9).
- **Character Rosters:** 5+ rich profiles per category (35+ total characters) with biographies, traits, powers, and quotes (SRS page 11).
- **Event Highlights:** 3+ major conventions and summits per category (21+ events) with dates, locations, and attendee projections (SRS page 11).

### 5. 📖 Franchise & Title Detail Pages
- Interactive detail views matching *One Piece* and *The Batman* designs:
  - Original native typography and synopsis
  - Rating, ranking (#42 Top 250), and member stats
  - Multi-tab layout:
    - **Overview:** Synopsis, crew, studios, embedded HD trailer
    - **Top Arcs / Sagas:** Milestone story arcs with chapter ranges and acclaim tags
    - **Cast & Characters:** Interactive profile cards
    - **Reviews:** User ratings, quotes, and review submission trigger
    - **Discussions:** Fan lore theories and threads
    - **Similar Titles:** Related franchise recommendations

### 6. 📊 Collection & Progress Tracker
- **My Collection View:** Filter by medium (Movies 120, TV 86, Anime 97, Manga 54, Games 70), live search, and progress meters.
- **My Progress Tracker:** Granular tracking by status (Watching, Reading, Playing, Completed, On Hold, Dropped). Includes interactive `[+1 Chapter]`, `[+1 Episode]`, `[+5 Hours]` buttons and percentage bars.

### 7. 💬 Community Reviews Hub
- Filter reviews by fandom category.
- "Write a Review" modal with 5-star rating picker, title, review body, and verified reviewer badges.
- Upvote / Helpful counters and discussion comment counts.

### 8. 📅 Release Calendar (September 2026)
- **Month Grid View:** Interactive calendar dates highlighting major releases (*Ahsoka S2*, *Kaiju No. 8*, *Hades II*, *The Penguin*, *Dune: Prophecy*, *Spy x Family S3*, *Metal Gear Solid Delta*, *Chainsaw Man: Reze Arc*).
- **List View & Today View:** Chronological schedule with notification reminder toggles.

### 9. 🤖 AI-Powered Virtual Guide (FandomBot)
- Built-in rule-based knowledge engine loaded from structured JSON (SRS pages 12-13).
- Suggested quick-reply chips for instant navigation.
- Deep links that trigger category pages, detail modals, calendar, or store views.
- Typing animations and chat history reset.

### 10. 🛍️ Merchandise Showcase & JavaScript Cart
- Catalog of officially licensed apparel, collector statues, plushies, and art prints.
- Slide-over shopping cart drawer computing subtotal, promo code discounts (e.g., `TECHWIZ7`, `FANDOM20`), and total billing amounts via JavaScript (SRS page 12).

### 11. 🔖 Bookmarks & Session Notes System
- Favorites saved persistently in `localStorage`.
- Personal annotations preserved in `sessionStorage` (SRS page 13).
- **Export Bookmarks:** Export as formatted Markdown list or download as `.txt` file!

### 12. 📍 Contact Us & Interactive GPS Map
- Responsive team directory and inquiry form with validation.
- Interactive custom dark-mode GPS map simulator with coordinate tracking and zoom controls (SRS page 13).

---

## 🛠️ Technology Stack
- **Framework:** React 19 (SPA Architecture)
- **Language:** TypeScript 5.8 (Strict Type Safety)
- **Styling:** Tailwind CSS v4 + Glassmorphism Backdrop Blur
- **Icons:** Lucide React
- **Build Tool:** Vite 8.3
- **Data Store:** Client-Side JSON Datastore (`media.json`, `characters.json`, `events.json`, `merchandise.json`, `articles.json`, `reviews.json`, `releases.json`, `galleries.json`, `audioClips.json`, `chatbotKnowledge.json`)
- **Persistence:** Browser `localStorage` (bookmarks, progress, visitor count) & `sessionStorage` (personal notes).

---

## 💻 Installation & Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- npm v9.0.0 or higher

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open your browser to `http://localhost:5173` (or the port displayed in your terminal).

### Step 3: Production Build
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory ready for deployment.

---

## 📄 License & Attribution
- Developed for **Aptech Limited — TechWiz 7**.
- Non-copyrighted / royalty-free visual assets sourced from Unsplash.
- Designed as a zero-backend Single Page Application adhering strictly to SRS v1.0 specifications.
