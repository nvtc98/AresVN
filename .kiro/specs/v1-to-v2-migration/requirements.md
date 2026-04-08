# Requirements Document

## Introduction

Dự án này nhằm chuyển đổi nội dung từ website AresVN v1 (React + Bootstrap) sang codebase v2 (Next.js + Once UI design system). Website v1 là trang giới thiệu đội esports AresVN với các section: Header, Features (chào mừng), About (giới thiệu), Team (thành viên với player card chi tiết), Gallery, Relationships (mối quan hệ với đội khác), Testimonials, và Contact. Codebase v2 sử dụng Once UI design system với phong cách hiện đại, hỗ trợ dark/light theme, và cấu trúc Next.js App Router. Mục tiêu là giữ nguyên toàn bộ nội dung tiếng Việt từ v1 nhưng trình bày theo phong cách thiết kế mới của v2.

## Glossary

- **V1**: Phiên bản cũ của website AresVN, sử dụng React + Bootstrap, nằm trong thư mục `v1/`
- **V2**: Phiên bản mới của website AresVN, sử dụng Next.js App Router + Once UI design system, nằm ở thư mục gốc
- **Once UI**: Design system được sử dụng trong v2, cung cấp các component như Column, Flex, Heading, Text, Media, Avatar, Card, v.v.
- **Content Config**: File `src/resources/content.js` chứa cấu hình nội dung cho v2
- **Vi Data**: File `v1/src/data/vi.json` chứa nội dung tiếng Việt của v1
- **Player Data**: File `v1/src/data/player.json` chứa dữ liệu chi tiết về các thành viên đội
- **Section**: Một phần nội dung riêng biệt trên trang web (ví dụ: About, Team, Gallery)
- **Home Page**: Trang chủ của website tại route `/`
- **About Page**: Trang giới thiệu chi tiết tại route `/about`

## Requirements

### Requirement 1

**User Story:** Là một người truy cập website, tôi muốn thấy trang chủ hiển thị thông tin giới thiệu AresVN với phong cách thiết kế mới, để tôi có ấn tượng tốt về đội.

#### Acceptance Criteria

1. WHEN a visitor loads the Home Page, THE Content Config SHALL contain AresVN-specific information including team name, description, and social links sourced from Vi Data.
2. WHEN the Home Page renders, THE Home Page SHALL display the AresVN logo, team name, and a welcome message using Once UI components.
3. WHEN the Home Page renders, THE Home Page SHALL display a brief introduction paragraph about AresVN sourced from the Vi Data About section.
4. WHEN the Home Page renders, THE Home Page SHALL display social links (Steam, Discord, YouTube) sourced from Vi Data Contact section.

### Requirement 2

**User Story:** Là một người truy cập website, tôi muốn xem trang About với thông tin chi tiết về AresVN, để tôi hiểu rõ hơn về đội.

#### Acceptance Criteria

1. WHEN a visitor navigates to the About Page, THE About Page SHALL display the full introduction paragraph about AresVN sourced from Vi Data.
2. WHEN the About Page renders, THE About Page SHALL display team details (founding date, alternative names, popular games) sourced from Vi Data About details.
3. WHEN the About Page renders, THE About Page SHALL embed the YouTube introduction video from Vi Data.

### Requirement 3

**User Story:** Là một người truy cập website, tôi muốn xem danh sách thành viên đội AresVN, để tôi biết được các tuyển thủ và vai trò của họ.

#### Acceptance Criteria

1. WHEN a visitor views the Team section, THE Team section SHALL display each active player's avatar image, name, and role sourced from Player Data.
2. WHEN a visitor selects a player, THE Team section SHALL display that player's detailed description sourced from Player Data.
3. WHEN the Team section renders, THE Team section SHALL distinguish between active players and hidden (former) players based on the `isHidden` field in Player Data.

### Requirement 4

**User Story:** Là một người truy cập website, tôi muốn xem gallery ảnh của đội, để tôi thấy được những khoảnh khắc đáng nhớ.

#### Acceptance Criteria

1. WHEN a visitor navigates to the Gallery page, THE Gallery page SHALL display all gallery images with their titles sourced from Vi Data Gallery section.
2. WHEN a visitor clicks on a gallery image, THE Gallery page SHALL display an enlarged view of that image.

### Requirement 5

**User Story:** Là một người truy cập website, tôi muốn xem thông tin về mối quan hệ của AresVN với các đội khác, để tôi hiểu được hệ sinh thái esports xung quanh đội.

#### Acceptance Criteria

1. WHEN a visitor views the Relationships section, THE Relationships section SHALL display each partner/rival team's logo, name, and relationship type sourced from Vi Data.
2. WHEN a visitor views a relationship entry, THE Relationships section SHALL display the full description paragraphs for that relationship sourced from Vi Data.

### Requirement 6

**User Story:** Là một người truy cập website, tôi muốn xem các nhận xét (testimonials) về đội, để tôi thấy được đánh giá từ cộng đồng.

#### Acceptance Criteria

1. WHEN a visitor views the Testimonials section, THE Testimonials section SHALL display each testimonial's author image, name, and quote sourced from Vi Data.

### Requirement 7

**User Story:** Là một người truy cập website, tôi muốn xem phần "Chào mừng" (Features) với các thông tin vui nhộn về đội, để tôi cảm nhận được tính cách của AresVN.

#### Acceptance Criteria

1. WHEN a visitor views the Features section, THE Features section SHALL display each feature item's title and text sourced from Vi Data Features section.

### Requirement 8

**User Story:** Là một developer, tôi muốn dữ liệu nội dung được tổ chức trong Content Config theo cấu trúc của v2, để dễ bảo trì và mở rộng.

#### Acceptance Criteria

1. WHEN the Content Config is loaded, THE Content Config SHALL export all AresVN content data (person, social, home, about, gallery) following the existing v2 export structure.
2. WHEN the Content Config is serialized then deserialized, THE Content Config SHALL produce equivalent data objects.
3. WHEN the navigation renders, THE navigation SHALL display route labels matching the AresVN section names (Home, About, Gallery).
