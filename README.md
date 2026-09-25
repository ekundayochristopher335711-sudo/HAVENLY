# HAVENLY

A calm, editorial real-estate discovery experience — built to prove frontend and product-building ability, not to fake a backend.

Browse curated homes for sale and rent, filter them the way a real buyer would, open full listing pages with photo galleries, save favourites, and explore agents and an affordability calculator. Every interactive element works; nothing is a static mock-up.

> **Project 01** of a portfolio series. Authentication, databases and payment systems are deliberately out of scope — they arrive in later projects where they are actually useful.

## Live demo

Deployed on Vercel — every push to `main` triggers a fresh production build. (Add your deployment URL to the repository's *About → Website* field so it appears here and on the repo card.)

<!-- Screenshots: capture Home, Properties (filters), Property detail and Saved homes at desktop + mobile widths, save them to docs/, and paste the images below. -->

## Features

- **Search that works** — buy/rent toggle, location, property type and budget fields on the homepage that carry into shareable URL parameters (`/properties?listing=sale&city=Lekki&type=villa&min=…`)
- **Combined filters** — location, type, price range, bedrooms and sorting all compose; reset buttons and a real "no results" state with a one-click clear
- **Property details** — photo gallery with a keyboard-navigable lightbox (Esc / ← / →), price, location, bed/bath/area facts, key details, amenities, agent card, inquiry form and share-with-copy-feedback
- **Saved homes** — heart any property; favourites persist in `localStorage` and live at `/favorites` with a designed empty state
- **Agents** — directory and profiles wired to each listing
- **Affordability calculator** — live mortgage estimate with guarded inputs (no `NaN` payouts)
- **Agent workspace** — listing overview and an add-property form that completes with a draft-saved state
- **Responsive from 320px up** — mobile filter sheet, full-screen menu with scroll lock, stacked search panel, touch-friendly targets
- **Accessible** — semantic landmarks, labelled forms, alt text, `aria-pressed` toggles, visible focus states, keyboard-closeable dialogs
- **SEO-ready** — per-route titles and meta descriptions, Open Graph tags, logical heading hierarchy, SVG favicon

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 19 + TypeScript (strict) |
| Build | Vite 7 (route-level code splitting) |
| Styling | Tailwind CSS 3 (custom design tokens: `ink`, `paper`, `moss`, `clay`, `stone`) |
| Routing | React Router 7 |
| Icons | lucide-react |
| Fonts | DM Serif Display + Inter |

Data lives in `src/data/demo.ts` behind the typed models in `src/types` — swapping in a real API later means replacing one module, not rewriting pages.

## Getting started

```bash
npm install
npm run dev
```

No environment variables are required — the app runs out of the box.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # tsc -b && vite build (production)
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint .
```

`typecheck`, `lint` and `build` all run clean: 0 type errors, 0 lint problems, production build green.

## Project structure

```
src/
├── components/     # Header, Footer, Layout, PropertyCard, SearchPanel, ui (kit)
├── data/           # demo listings + agents (single data source)
├── hooks/          # useFavorites (localStorage), usePageMeta (SEO)
├── lib/            # format, image, cn helpers
├── pages/          # Home, Properties, PropertyDetail, Agents, Calculator,
│                   # Saved, Static (About/Contact/404), AgentDashboard
└── types/          # Property, Agent, PropertyFilters, …
```

## What I learned building HAVENLY

- **Make the interactive parts real.** A filter that doesn't filter is a screenshot, not a product. Driving filters through validated URL parameters taught me how shareable state changes how you design a page.
- **TypeScript should carry weight.** Replacing `as` casts with typed data structures (`PropertyFilters`, typed feature lists, validated query parsing) removed whole classes of bugs instead of decorating them.
- **Accessibility is design.** Moving the save button out of the anchor, labelling every field and adding focus states improved the code, not just the audit.
- **Performance is visible.** Route-level lazy loading cut the initial bundle by roughly half and made the Largest Contentful Paint feel instant on throttled connections.
- **Deleting is shipping.** Removing the half-built auth/backend layers made the project honest — everything left works.
