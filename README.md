# AresVN

🌐 **Live:** [aresvn.vercel.app](https://aresvn.vercel.app/)

A landing page for the Vietnamese esports team AresVN, built with React 17 and Create React App. The site showcases team information, player stats, image gallery, and contact details.

The codebase follows a clean, maintainable architecture with feature-based directory organization, CSS Modules for scoped styling, custom hooks for logic separation, shared constants, data accessor utilities, and PropTypes for runtime type checking. Property-based tests (via fast-check) provide formal correctness guarantees alongside traditional unit tests.

## Requirements

- Node.js 18+
- npm or yarn

## Getting Started

```bash
npm install
npm start         # Dev server at http://localhost:3000
```

## Scripts

```bash
npm start         # Run development server
npm run build     # Production build to /build
npm test          # Run test suite (Jest + React Testing Library + fast-check)
```

## Project Structure

```
src/
├── components/       # React components organized by feature
│   ├── About/
│   ├── Contact/
│   ├── Features/
│   ├── Gallery/
│   ├── Header/
│   ├── Navigation/
│   ├── Popup/
│   ├── Relationships/
│   ├── Team/         # Sub-components: PlayerList, CSGameView, R6GameView
│   └── Testimonials/
├── constants/        # Shared constants (magic numbers, config values)
├── data/             # Static JSON data (vi.json, en.json, player.json)
└── utils/            # Data accessor utilities (getField, getSocialLinks, partitionPlayers)
```

## Tech Stack

- React 17
- CSS Modules
- ApexCharts (player stat charts)
- Framer Motion (animations)
- React YouTube (video embed)
- PropTypes (runtime type checking)

## Testing

- Jest + React Testing Library for unit tests
- fast-check for property-based tests
