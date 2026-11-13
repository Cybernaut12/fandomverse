# FandomVerse

FandomVerse is a responsive fan community portal for exploring entertainment fandoms. It brings articles, events, characters, media, merchandise, and saved content together in one React application.

## Getting started

### Requirements

- Node.js and npm

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Main routes

- `/` — Home page with featured content, releases, gallery, media, events, and merchandise.
- `/category/:slug` — Category hub for a fandom.
- `/articles` and `/article/:slug` — Article listing and article details.
- `/events` and `/event/:id` — Event listing and event details.
- `/trending` and `/trending/:slug` — Trending content and details.
- `/character/:id` — Character details.
- `/bookmarks` — Saved content.
- `/about`, `/contact`, `/login`, and `/signup` — Information and account pages.

## Project structure

- `src/pages/` — Route-level pages.
- `src/components/` — Shared interface and page components.
- `src/context/` — Shared cart and bookmark state.
- `src/hooks/` — Reusable browser and UI behavior.
- `src/data/` — JSON and JavaScript content data used by the app.
- `public/` — Static images and other public assets.

## Notes

- The app uses React, React Router, Vite, Bootstrap, and Lucide icons.
- Bookmarks and cart contents are stored in the browser's local storage. Personal bookmark notes use session storage.
- The chatbot uses a local, pre-scripted response dataset; it does not connect to a live AI service.
- Merchandise cart functionality is for browsing and tracking items; it does not process checkout or payments.
