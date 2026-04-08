# Design Document: V1 to V2 Migration

## Overview

Dự án chuyển đổi nội dung website AresVN từ v1 (React + Bootstrap) sang v2 (Next.js App Router + Once UI). Thay vì xây dựng lại từ đầu, chúng ta sẽ tận dụng cấu trúc sẵn có của v2 (layout, header, footer, theme system) và thay thế nội dung mẫu bằng nội dung thực từ v1. Các section mới (Team, Relationships, Testimonials, Features) sẽ được xây dựng dưới dạng component Once UI mới.

## Architecture

V2 sử dụng Next.js App Router với cấu trúc:

```
src/
├── app/                    # Routes (pages)
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About page
│   ├── gallery/page.tsx    # Gallery page
│   └── layout.tsx          # Root layout (giữ nguyên)
├── components/             # Reusable components
│   ├── TeamSection.tsx     # MỚI - Hiển thị thành viên đội
│   ├── RelationshipsSection.tsx  # MỚI - Mối quan hệ
│   ├── TestimonialsSection.tsx   # MỚI - Nhận xét
│   └── FeaturesSection.tsx       # MỚI - Chào mừng
├── resources/
│   ├── content.js          # CẬP NHẬT - Nội dung AresVN
│   ├── once-ui.config.js   # CẬP NHẬT - Routes, social links
│   └── index.ts            # CẬP NHẬT - Exports
└── data/
    └── players.ts          # MỚI - Dữ liệu thành viên chi tiết
```

Nguyên tắc thiết kế:

- Giữ nguyên layout, header, footer, theme system của v2
- Sử dụng Once UI components (Column, Flex, Heading, Text, Media, Avatar, Card, etc.)
- Dữ liệu tĩnh được export từ `content.js` và `players.ts`
- Không cần API hay database

## Components and Interfaces

### 1. Content Config Updates (`src/resources/content.js`)

Cập nhật các export hiện có:

```typescript
// person - thông tin đội thay vì cá nhân
const person = {
  firstName: "Ares",
  lastName: "VN",
  role: "Vietnamese Esports Team",
  avatar: "/images/logo/AresVN-logo.png",
  location: "Asia/Ho_Chi_Minh",
  languages: ["Tiếng Việt"],
};

// social - links từ v1 Contact data
const social = [
  { name: "Steam", icon: "steam", link: "https://steamcommunity.com/groups/aresvn" },
  { name: "Discord", icon: "discord", link: "https://discord.com/invite/Yvfn9wvNXq" },
  { name: "YouTube", icon: "youtube", link: "https://www.youtube.com/@aresvn" },
];

// home - trang chủ
const home = {
  headline: <>Chào mừng đến với AresVN</>,
  subline: <>Đội thể thao điện tử Việt Nam...</>,
  // ...
};

// about - trang giới thiệu với nội dung từ v1
const about = {
  intro: { description: "..." }, // paragraph từ vi.json
  // team details, relationships, testimonials, features data
};
```

### 2. TeamSection Component

```typescript
interface Player {
  img: string;
  name: string;
  role: string;
  description: string;
  isHidden?: boolean;
}

// Props
interface TeamSectionProps {
  players: Player[];
  showHidden?: boolean;
}
```

Hiển thị danh sách thành viên dưới dạng grid card. Mỗi card có avatar, tên, vai trò. Click vào card hiển thị mô tả chi tiết.

### 3. RelationshipsSection Component

```typescript
interface Relationship {
  img: string;
  name: string;
  relationship: string;
  descriptions: string[];
}

interface RelationshipsSectionProps {
  relationships: Relationship[];
}
```

Hiển thị mỗi relationship dưới dạng card ngang với logo đội, tên, loại quan hệ, và các đoạn mô tả.

### 4. TestimonialsSection Component

```typescript
interface Testimonial {
  img: string;
  text: string;
  name: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}
```

Hiển thị testimonials dưới dạng quote cards.

### 5. FeaturesSection Component

```typescript
interface Feature {
  title: string;
  text: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}
```

Hiển thị grid các feature items với title và text.

## Data Models

### Player Data (`src/data/players.ts`)

Dữ liệu thành viên được chuyển từ `v1/src/data/player.json`. Giữ lại các trường cần thiết cho hiển thị:

```typescript
interface PlayerProfile {
  img: string; // Đường dẫn ảnh avatar
  name: string; // Tên in-game
  isHidden?: boolean; // Cựu thành viên
  game: {
    cs: {
      role: string; // Vai trò trong CS
      description: string; // Mô tả chi tiết
      color?: string; // Màu nền card
    };
  };
}
```

### Content Data Structure

Nội dung từ `vi.json` được tích hợp trực tiếp vào `content.js`:

```typescript
// About details
interface AboutDetail {
  name: string;
  text: string[];
}

// Gallery image
interface GalleryImage {
  src: string;
  alt: string;
  orientation: "horizontal" | "vertical";
}

// Relationship, Testimonial, Feature - như đã định nghĩa ở trên
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do.
Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Player partition correctness

_For any_ list of player profiles with mixed `isHidden` values, partitioning the list into active and hidden players SHALL produce two lists where:

- Every player in the active list has `isHidden` either `undefined` or `false`
- Every player in the hidden list has `isHidden` equal to `true`
- The sum of active and hidden player counts equals the total player count

This combines the filtering and distinction logic: if the partition is correct, then displaying active players (3.1) and distinguishing them from hidden players (3.3) are both guaranteed.

**Validates: Requirements 3.1, 3.3**

### Property 2: Player data lookup consistency

_For any_ valid player index within the player data array, looking up the player by index SHALL return an object containing a non-empty `name` field and a non-empty `description` field in the CS game data, and these fields SHALL match the original data at that index.

**Validates: Requirements 3.2**

### Property 3: Content data serialization round-trip

_For any_ valid content data object (containing only JSON-serializable values), serializing to JSON and then deserializing SHALL produce an object deeply equal to the original.

**Validates: Requirements 8.2**

## Error Handling

- Nếu player data thiếu trường bắt buộc (name, role), component hiển thị giá trị mặc định ("Unknown Player", "Unknown Role")
- Nếu ảnh không tải được, hiển thị placeholder avatar mặc định
- Nếu gallery image path không hợp lệ, ẩn image đó khỏi grid
- Nếu content config thiếu section data, section tương ứng không render

## Testing Strategy

### Property-Based Testing

Sử dụng thư viện **fast-check** cho property-based testing trong TypeScript/JavaScript.

Mỗi property-based test:

- Chạy tối thiểu 100 iterations
- Được annotate với comment tham chiếu đến correctness property trong design document theo format: `**Feature: v1-to-v2-migration, Property {number}: {property_text}**`
- Mỗi correctness property được implement bởi đúng MỘT property-based test

### Unit Testing

Unit tests bổ sung cho property tests, tập trung vào:

- Ví dụ cụ thể kiểm tra content config có đúng cấu trúc (example cho 8.1)
- Edge cases: danh sách player rỗng, player không có game data
- Kiểm tra content config exports đúng các keys cần thiết

### Test Structure

```
src/
├── data/
│   ├── players.ts
│   └── players.test.ts          # Unit + property tests cho player data
├── resources/
│   ├── content.js
│   └── content.test.ts          # Unit + property tests cho content config
```
