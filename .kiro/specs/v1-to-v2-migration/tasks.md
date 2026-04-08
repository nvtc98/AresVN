# Implementation Plan

- [x] 1. Set up data layer and content config
  - [x] 1.1 Create player data file (`src/data/players.ts`)
    - Convert player data from `v1/src/data/player.json` to TypeScript
    - Export typed player array with `PlayerProfile` interface
    - Include `getActivePlayers()` and `getHiddenPlayers()` partition functions
    - _Requirements: 3.1, 3.3_
  - [x] 1.2 Write property test: Player partition correctness
    - **Property 1: Player partition correctness**
    - **Validates: Requirements 3.1, 3.3**
    - Use fast-check to generate random player lists with mixed `isHidden` values
    - Assert active + hidden count equals total, and each list contains correct players
  - [x] 1.3 Write property test: Player data lookup consistency
    - **Property 2: Player data lookup consistency**
    - **Validates: Requirements 3.2**
    - Use fast-check to generate random valid indices, assert lookup returns matching name and description
  - [x] 1.4 Update content config (`src/resources/content.js`)
    - Replace placeholder person data with AresVN team info from `v1/src/data/vi.json`
    - Update social links to Steam, Discord, YouTube from Vi Data Contact
    - Update home config with AresVN headline, subline, and description
    - Update about config with AresVN intro paragraph, team details, and YouTube embed
    - Add relationships, testimonials, and features data to content exports
    - Update gallery images array with Vi Data Gallery entries
    - _Requirements: 1.1, 1.4, 2.1, 2.2, 8.1_
  - [x] 1.5 Write property test: Content data serialization round-trip
    - **Property 3: Content data serialization round-trip**
    - **Validates: Requirements 8.2**
    - Use fast-check to generate JSON-serializable objects, assert `JSON.parse(JSON.stringify(x))` deep equals `x`
  - [x] 1.6 Write unit tests for content config structure
    - Verify content config exports all required keys (person, social, home, about, gallery)
    - Verify player data contains expected players from v1
    - _Requirements: 8.1_

- [ ] 2. Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.

- [-] 3. Update Home Page
  - [x] 3.1 Rewrite Home Page (`src/app/page.tsx`)
    - Display AresVN logo with GlitchFx/HoloFx effects
    - Show welcome headline and team introduction paragraph
    - Display social links (Steam, Discord, YouTube)
    - Remove placeholder blog/projects sections
    - _Requirements: 1.2, 1.3, 1.4_
  - [ ] 3.2 Update navigation config (`src/resources/once-ui.config.js`)
    - Update routes to match AresVN sections (Home, About, Gallery)
    - Disable blog and work routes if not needed
    - Update schema and sameAs with AresVN info
    - _Requirements: 8.3_

- [-] 4. Update About Page
  - [x] 4.1 Rewrite About Page (`src/app/about/page.tsx`)
    - Display AresVN logo as avatar
    - Show full introduction paragraph from Vi Data
    - Display team details (founding date, alternative names, popular games)
    - Embed YouTube introduction video
    - Remove placeholder work experience and studies sections
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 5. Build Team Section
  - [x] 5.1 Create TeamSection component (`src/components/TeamSection.tsx`)
    - Build player card grid using Once UI Card/Flex/Avatar components
    - Each card shows player avatar, name, and role
    - Clicking a card expands to show detailed description
    - Filter out hidden players by default
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 5.2 Integrate TeamSection into About Page
    - Import and render TeamSection with player data on the About Page
    - _Requirements: 3.1_

- [-] 6. Build Features Section
  - [x] 6.1 Create FeaturesSection component (`src/components/FeaturesSection.tsx`)
    - Build grid of feature items using Once UI components
    - Each item displays title and text from Vi Data Features
    - _Requirements: 7.1_
  - [x] 6.2 Integrate FeaturesSection into Home Page
    - Import and render FeaturesSection on the Home Page
    - _Requirements: 7.1_

- [x] 7. Build Relationships Section
  - [x] 7.1 Create RelationshipsSection component (`src/components/RelationshipsSection.tsx`)
    - Build horizontal cards with team logo, name, relationship type
    - Display description paragraphs for each relationship
    - Use Once UI Flex/Media/Text components
    - _Requirements: 5.1, 5.2_
  - [x] 7.2 Integrate RelationshipsSection into About Page
    - Import and render RelationshipsSection with data on the About Page
    - _Requirements: 5.1_

- [x] 8. Build Testimonials Section
  - [x] 8.1 Create TestimonialsSection component (`src/components/TestimonialsSection.tsx`)
    - Build quote cards with author avatar, name, and quote text
    - Use Once UI Avatar/Text/Card components
    - _Requirements: 6.1_
  - [x] 8.2 Integrate TestimonialsSection into Home Page or About Page
    - Import and render TestimonialsSection with data
    - _Requirements: 6.1_

- [x] 9. Update Gallery Page
  - [x] 9.1 Update gallery data in content config
    - Replace placeholder gallery images with Vi Data Gallery entries
    - Map v1 gallery image paths to v2 public directory paths
    - _Requirements: 4.1_
  - [x] 9.2 Verify gallery page renders with new images
    - Ensure gallery page displays all images with titles
    - Ensure image enlarge/lightbox functionality works
    - _Requirements: 4.1, 4.2_

- [x] 10. Final Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.
