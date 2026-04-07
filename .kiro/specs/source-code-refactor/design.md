# Design Document: Source Code Refactor

## Overview

Refactor dự án AresVN Landing Page từ codebase hiện tại (React 17, CRA) sang cấu trúc sạch hơn, dễ bảo trì hơn. Refactor tập trung vào: loại bỏ dead code, chuyển inline styles sang CSS modules, tách component lớn, tách logic vào custom hooks, thêm PropTypes, tổ chức thư mục theo feature, loại bỏ magic numbers, và tạo data accessor utilities.

Dự án giữ nguyên React 17 và CRA — không nâng cấp framework. Mục tiêu là cải thiện chất lượng code mà không thay đổi chức năng.

## Architecture

### Kiến trúc hiện tại

```
App.jsx
├── Navigation (hardcoded Vietnamese text, exports mutable global)
├── Header (YouTube embed, inline styles, optional chaining)
├── Features (inline styles, commented-out code)
├── About (inline iframe, commented-out code)
├── Team (~300 LOC, ApexCharts, framer-motion, 2 game modes)
├── Gallery → Image (popup logic in component)
├── Relationships (inline styles)
├── Testimonials (unused jumpscare logic)
├── Contact (commented-out form, hardcoded service IDs)
└── Popup (framer-motion animation)
```

### Kiến trúc sau refactor

```
App.jsx (clean, no commented code)
├── Navigation/ (CSS module, constants for nav items)
├── Header/ (CSS module, useHeader hook)
├── Features/ (CSS module, clean JSX)
├── About/ (CSS module, clean JSX)
├── Team/
│   ├── Team.jsx (orchestrator)
│   ├── PlayerList.jsx
│   ├── PlayerDetailCard.jsx
│   ├── CSGameView.jsx
│   ├── R6GameView.jsx
│   ├── useTeam.js (hook)
│   ├── chartConfig.js (utility)
│   └── Team.module.css
├── Gallery/ (CSS module)
│   ├── Gallery.jsx
│   └── GalleryImage.jsx
├── Testimonials/ (CSS module, dead code removed)
├── Relationships/ (CSS module)
├── Contact/ (CSS module, dead code removed)
└── Popup/ (CSS module)
```

### Nguyên tắc thiết kế

1. Mỗi component có thư mục riêng chứa: Component.jsx, Component.module.css, useComponent.js (nếu cần), index.js (re-export)
2. Logic phức tạp tách vào custom hooks
3. Static styles vào CSS modules, dynamic styles giữ inline
4. Constants tập trung trong `src/constants/`
5. Data utilities trong `src/utils/`

## Components and Interfaces

### 1. Constants Module (`src/constants/index.js`)

```javascript
// Layout
export const NAVIGATION_PADDING = 15;
export const SECTION_PADDING_TOP = 100;
export const SECTION_PADDING_BOTTOM = 100;

// Team
export const GAME_TYPES = { CS: "cs", R6: "r6" };
export const PLAYER_THUMBNAIL_SIZE = 80;
export const PLAYER_CARD_HEIGHT = 400;
export const ANIMATION_DURATION = 500;
export const UNKNOWN_OPERATOR_IMG = "img/team/r6op/unknown.png";

// Video
export const DEFAULT_VIDEO_WIDTH_RATIO = 1920;
export const DEFAULT_VIDEO_HEIGHT_RATIO = 1080;
```

### 2. Data Utilities (`src/utils/dataAccessors.js`)

```javascript
/**
 * @param {Object|null|undefined} data - Raw data object
 * @param {string} key - Property key to access
 * @param {*} fallback - Fallback value if data is null/undefined
 * @returns {*} The value or fallback
 */
export function getField(data, key, fallback = '') { ... }

/**
 * @param {Object|null|undefined} contactData - Contact data from JSON
 * @returns {{ steam: string, discord: string, youtube: string }}
 */
export function getSocialLinks(contactData) { ... }

/**
 * @param {Array|null|undefined} playerDataArray - Player data array
 * @returns {{ active: Array, hidden: Array }}
 */
export function partitionPlayers(playerDataArray) { ... }
```

### 3. Custom Hooks

#### `useTeam(playerData)`

```javascript
// Input: playerData object from player.json
// Returns:
{
  selectedIndex: number,
  isAnimating: boolean,
  showExtraPlayers: boolean,
  game: 'cs' | 'r6',
  activePlayers: Array,
  onChangePlayer: (index: number) => void,
  onExpand: () => void,
  onChangeGame: () => void,
  contentRef: React.RefObject
}
```

#### `useHeader(headerData, navigationHeight)`

```javascript
// Input: header data object, navigation height number
// Returns:
{
  isEnded: boolean,
  videoWidth: number,
  videoHeight: number,
  onVideoEnd: () => void
}
```

### 4. Team Sub-Components

#### `PlayerList`

```
Props:
  - players: Array<{ img: string, name: string }>
  - selectedIndex: number
  - onSelect: (index: number) => void
  - showExtra: boolean
  - onExpand: () => void
  - hiddenPlayers: Array
```

#### `PlayerDetailCard`

```
Props:
  - player: Object (current player data)
  - previousPlayer: Object (for animation)
  - isAnimating: boolean
  - game: 'cs' | 'r6'
```

#### `CSGameView`

```
Props:
  - player: Object
  - previousPlayer: Object
  - isAnimating: boolean
  - selectedIndex: number
```

#### `R6GameView`

```
Props:
  - player: Object
  - selectedIndex: number
  - isAnimating: boolean
  - previousPlayer: Object
```

### 5. Chart Config Utility (`src/components/Team/chartConfig.js`)

```javascript
/**
 * @param {Object} playerData - Full player data object
 * @returns {Object} ApexCharts config for CS donut charts
 */
export function getCSChartConfig(playerData) { ... }

/**
 * @param {Object} playerData - Full player data object
 * @returns {Object} ApexCharts config for R6 radial bar chart
 */
export function getR6ChartConfig(playerData) { ... }
```

## Data Models

### Existing Data Models (unchanged)

Dữ liệu JSON tĩnh giữ nguyên cấu trúc. Không thay đổi schema.

#### Landing Page Data (`vi.json` / `en.json`)

```
{
  Header: { videoId, videoSize: { width, height }, image }
  About: { paragraph, details: [{ icon, name, text[] }] }
  Gallery: [{ title, largeImage, smallImage }]
  Features: [{ icon, image, title, text }]
  Testimonials: [{ img, text, name }]
  Team: [{ img, name, job }]
  Contact: { steam, discord, youtube, ... }
  Relationships: [{ img, name, relationship, descriptions[] }]
}
```

#### Player Data (`player.json`)

```
{
  label: [{ name, data: [{ name, color }] }]
  chart: { chart, legend, dataLabels, stroke, plotOptions }
  level: [{ name, value }]
  labelR6: { attack: [{ name, colorPositive, colorNegative }] }
  data: [{
    img, name, isHidden?,
    game: {
      cs: { role, chart, description, color? },
      r6: { atkRole?, defRole?, atkOpImg?, defOpImg?, chart? }
    }
  }]
}
```

### PropTypes Definitions

Mỗi component sẽ có PropTypes definition. Ví dụ:

```javascript
// Gallery.propTypes
Gallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
      smallImage: PropTypes.string.isRequired,
    }),
  ),
  setShowPopup: PropTypes.func.isRequired,
};
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Sub-component renders correct player information

_For any_ Player_Data object containing name and role fields, when passed to a Team sub-component (PlayerList item, PlayerDetailCard), the rendered output SHALL contain the player's name from the input data.

**Validates: Requirements 3.2**

### Property 2: Custom hook interface contract

_For any_ valid playerData input, the useTeam hook SHALL return an object containing all expected keys: `selectedIndex` (number), `isAnimating` (boolean), `showExtraPlayers` (boolean), `game` (string), `activePlayers` (array), `onChangePlayer` (function), `onExpand` (function), `onChangeGame` (function).

**Validates: Requirements 4.2**

### Property 3: Custom hook return value round-trip serialization

_For any_ valid input to useTeam, serializing the serializable fields of the hook's return value (selectedIndex, isAnimating, showExtraPlayers, game, activePlayers) to JSON and parsing back SHALL produce values equivalent to the originals.

**Validates: Requirements 4.3**

### Property 4: Constants round-trip serialization

_For any_ numeric constant defined in the constants module, converting the constant to a string representation via `JSON.stringify` and parsing back via `JSON.parse` SHALL yield a value equal to the original constant.

**Validates: Requirements 7.3**

### Property 5: Data accessor correctness

_For any_ data object and any key, `getField(data, key, fallback)` SHALL return `data[key]` when data is a non-null object containing that key, and SHALL return `fallback` when data is null, undefined, or does not contain the key.

**Validates: Requirements 8.2, 8.3**

### Property 6: Data accessor output round-trip serialization

_For any_ valid Data_Layer input, serializing the output of a data accessor function to JSON and parsing back SHALL produce a value equal to the original output.

**Validates: Requirements 8.4**

## Error Handling

### Data Loading

- Tất cả components sử dụng data accessor utilities với fallback values thay vì optional chaining trực tiếp
- `getField()` trả về fallback value khi data là null/undefined, tránh runtime errors
- `partitionPlayers()` trả về `{ active: [], hidden: [] }` khi input là null/undefined

### Chart Rendering

- Chart config utilities kiểm tra input validity trước khi tạo config
- Nếu player không có data cho game mode hiện tại, hiển thị giá trị mặc định (ví dụ: `[0, 0, 0, 0]` cho R6 chart)

### Component Rendering

- PropTypes cảnh báo khi props không đúng kiểu trong development mode
- Components render "loading" state khi data chưa sẵn sàng (giữ nguyên behavior hiện tại)

## Testing Strategy

### Testing Framework

- Unit tests: Jest + React Testing Library (đã có sẵn trong CRA)
- Property-based tests: **fast-check** (`fc` — thư viện PBT phổ biến cho JavaScript)
- Mỗi property-based test chạy tối thiểu 100 iterations

### Unit Tests

- Test rendering cơ bản cho mỗi component sau refactor (smoke tests)
- Test data accessor functions với specific examples
- Test chart config utilities trả về valid ApexCharts config

### Property-Based Tests

- Mỗi correctness property ở trên sẽ được implement bằng một property-based test riêng biệt
- Mỗi test sẽ được annotate với comment format: `**Feature: source-code-refactor, Property {number}: {property_text}**`
- Generators sẽ tạo random player data, random data objects, và random constants
- Property tests tập trung vào data accessor utilities, custom hooks interface, và round-trip serialization

### Test Organization

```
src/
├── utils/
│   └── __tests__/
│       └── dataAccessors.test.js      (unit + property tests)
├── constants/
│   └── __tests__/
│       └── constants.test.js          (property tests)
├── components/
│   └── Team/
│       └── __tests__/
│           ├── useTeam.test.js         (property tests)
│           ├── PlayerList.test.js      (unit + property tests)
│           └── chartConfig.test.js     (unit tests)
```
