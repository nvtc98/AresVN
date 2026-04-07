# Implementation Plan

- [x] 1. Set up shared infrastructure (constants, utilities, testing)
  - [x] 1.1 Create constants module at `src/constants/index.js` with all extracted magic numbers and hardcoded values (GAME_TYPES, ANIMATION_DURATION, PLAYER_THUMBNAIL_SIZE, PLAYER_CARD_HEIGHT, UNKNOWN_OPERATOR_IMG, SECTION_PADDING, VIDEO_RATIOS)
    - _Requirements: 7.1, 7.2_
  - [x] 1.2 Create data accessor utilities at `src/utils/dataAccessors.js` with `getField()`, `getSocialLinks()`, and `partitionPlayers()` functions
    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 1.3 Install fast-check as dev dependency
    - _Requirements: Testing Strategy_
  - [x] 1.4 Write property test: Constants round-trip serialization
    - **Property 4: Constants round-trip serialization**
    - **Validates: Requirements 7.3**
  - [x] 1.5 Write property test: Data accessor correctness
    - **Property 5: Data accessor correctness**
    - **Validates: Requirements 8.2, 8.3**
  - [x] 1.6 Write property test: Data accessor output round-trip serialization
    - **Property 6: Data accessor output round-trip serialization**
    - **Validates: Requirements 8.4**

- [x] 2. Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Clean up dead code across all components
  - [x] 3.1 Remove all commented-out JSX, imports, and CSS from `App.jsx`, `navigation.jsx`, `features.jsx`, `about.jsx`, `contact.jsx`, `testimonials.jsx`, and `public/css/style.css`
    - Remove commented-out Services component import and render in App.jsx
    - Remove commented-out nav items in navigation.jsx
    - Remove commented-out image/icon code in features.jsx
    - Remove commented-out img tag and contact info in about.jsx and contact.jsx
    - Remove unused jumpscare logic in testimonials.jsx (the `onJumpScare` function and `isJumpingScareRef` that are never called)
    - Remove commented-out form in contact.jsx
    - Remove commented-out CSS rules in style.css
    - Remove unused `services.jsx` component file
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 4. Refactor Team component into sub-components
  - [x] 4.1 Create `src/components/Team/` directory structure with `useTeam.js` custom hook extracting all state management and side-effect logic from team.jsx
    - Extract selectedIndex, isAnimating, showExtraPlayers, game state
    - Extract onChangePlayer, onExpand, onChangeGame handlers
    - Extract chart rendering useEffect logic
    - _Requirements: 4.1, 4.2_
  - [x] 4.2 Create `src/components/Team/chartConfig.js` utility with `getCSChartConfig()` and `getR6ChartConfig()` functions
    - Move getChartCS function and R6 chart config object to this utility
    - _Requirements: 3.3_
  - [x] 4.3 Create `PlayerList.jsx` sub-component for the player thumbnail list and expand button
    - _Requirements: 3.1, 3.2_
  - [x] 4.4 Create `CSGameView.jsx` sub-component for CS:GO game mode display (player image, charts, description)
    - _Requirements: 3.1_
  - [x] 4.5 Create `R6GameView.jsx` sub-component for Rainbow Six game mode display (operator images, charts, roles)
    - _Requirements: 3.1_
  - [x] 4.6 Rewrite `Team.jsx` as orchestrator composing PlayerList, CSGameView, R6GameView, and using useTeam hook
    - _Requirements: 3.1, 3.4_
  - [x] 4.7 Write property test: Sub-component renders correct player information
    - **Property 1: Sub-component renders correct player information**
    - **Validates: Requirements 3.2**
  - [x] 4.8 Write property test: Custom hook interface contract
    - **Property 2: Custom hook interface contract**
    - **Validates: Requirements 4.2**
  - [x] 4.9 Write property test: Custom hook return value round-trip serialization
    - **Property 3: Custom hook return value round-trip serialization**
    - **Validates: Requirements 4.3**

- [x] 5. Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Convert inline styles to CSS modules
  - [x] 6.1 Create CSS modules and refactor `Header`, `Features`, `About` components
    - Create `Header.module.css`, `Features.module.css`, `About.module.css`
    - Move all static inline styles to CSS module classes
    - Keep dynamic styles (dependent on props/state) inline
    - _Requirements: 2.1, 2.2, 2.3_
  - [x] 6.2 Create CSS modules and refactor `Gallery`, `GalleryImage`, `Relationships`, `Testimonials` components
    - Create corresponding `.module.css` files
    - Move static inline styles to CSS module classes
    - _Requirements: 2.1, 2.2, 2.3_
  - [x] 6.3 Create CSS modules and refactor `Contact`, `Popup`, `Navigation` components
    - Create corresponding `.module.css` files
    - Move static inline styles to CSS module classes
    - _Requirements: 2.1, 2.2, 2.3_
  - [x] 6.4 Create CSS modules for Team sub-components (`Team.module.css`, `PlayerList.module.css`, `CSGameView.module.css`, `R6GameView.module.css`)
    - Move static inline styles from Team sub-components to CSS modules
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 7. Add PropTypes to all components
  - [x] 7.1 Add PropTypes definitions to `Navigation`, `Header`, `Features`, `About`, `Gallery`, `GalleryImage`
    - Define shape of data props, required vs optional, default values
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 7.2 Add PropTypes definitions to `Team` sub-components (`PlayerList`, `CSGameView`, `R6GameView`), `Relationships`, `Testimonials`, `Contact`, `Popup`
    - Define shape of data props, required vs optional, default values
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 8. Integrate data accessor utilities into components
  - [x] 8.1 Replace direct optional chaining in `Header`, `About`, `Features`, `Gallery`, `Contact` with `getField()` and other data accessor calls
    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 8.2 Replace direct optional chaining in `Testimonials`, `Relationships` with data accessor calls, and use `partitionPlayers()` in Team
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 9. Reorganize directory structure
  - [x] 9.1 Move each component into its own feature directory under `src/components/` with co-located files (Component.jsx, Component.module.css, index.js re-export)
    - Move and update all import paths in App.jsx and cross-component imports
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 10. Final Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.
