# Requirements Document

## Introduction

Dự án AresVN là một trang landing page cho đội esports Việt Nam, được xây dựng bằng React 17 với Create React App. Source code hiện tại có nhiều vấn đề cần refactor: code commented-out rải rác, inline styles quá nhiều, component Team quá lớn và phức tạp, thiếu PropTypes/TypeScript, không có tổ chức thư mục rõ ràng, hardcoded values, và thiếu tách biệt logic/UI. Mục tiêu refactor là cải thiện chất lượng code, khả năng bảo trì, và cấu trúc dự án mà không thay đổi chức năng hiện có.

## Glossary

- **Landing_Page**: Trang web chính của AresVN hiển thị thông tin đội, thành viên, bộ sưu tập ảnh, và liên hệ
- **Component**: Một đơn vị React UI có thể tái sử dụng, nhận props và render giao diện
- **Inline_Style**: CSS được viết trực tiếp trong thuộc tính `style` của JSX element thay vì trong file CSS riêng
- **Dead_Code**: Code bị comment-out hoặc không được sử dụng trong ứng dụng
- **Data_Layer**: Tầng quản lý dữ liệu JSON tĩnh cung cấp nội dung cho Landing_Page
- **CSS_Module**: File CSS có phạm vi cục bộ cho từng Component, tránh xung đột tên class
- **PropTypes**: Thư viện kiểm tra kiểu dữ liệu props tại runtime cho React Component
- **Custom_Hook**: Hàm React tái sử dụng bắt đầu bằng "use" để tách logic khỏi Component
- **Chart_Config**: Đối tượng cấu hình cho thư viện ApexCharts dùng để hiển thị biểu đồ thống kê người chơi
- **Player_Data**: Dữ liệu JSON chứa thông tin thành viên đội bao gồm tên, ảnh, vai trò, và thống kê game

## Requirements

### Requirement 1

**User Story:** Là một developer, tôi muốn loại bỏ tất cả dead code khỏi dự án, để codebase sạch sẽ và dễ đọc hơn.

#### Acceptance Criteria

1. WHEN the Landing_Page source code is reviewed, THE Landing_Page SHALL contain zero commented-out JSX blocks, commented-out imports, or commented-out CSS rules
2. WHEN the Landing_Page source code is reviewed, THE Landing_Page SHALL contain zero unused Component files that are not rendered in the application
3. WHEN dead code is removed from a Component, THE Component SHALL preserve identical visual output and behavior as before the removal

### Requirement 2

**User Story:** Là một developer, tôi muốn chuyển inline styles sang CSS modules, để styles được tổ chức tốt hơn và tránh xung đột.

#### Acceptance Criteria

1. WHEN a Component renders, THE Component SHALL load styles from a co-located CSS_Module file instead of using Inline_Style objects
2. WHEN CSS_Module files are created, THE Landing_Page SHALL maintain identical visual appearance compared to the Inline_Style version
3. WHEN a Component uses Inline_Style for dynamic values that depend on props or state, THE Component SHALL keep those specific styles inline and move all static styles to the CSS_Module

### Requirement 3

**User Story:** Là một developer, tôi muốn tách component Team thành các sub-component nhỏ hơn, để code dễ đọc và bảo trì hơn.

#### Acceptance Criteria

1. WHEN the Team section renders, THE Landing_Page SHALL compose the Team view from separate sub-components for player list, player detail card, CS game view, and R6 game view
2. WHEN a sub-component of Team receives Player_Data, THE sub-component SHALL render the correct player information matching the input data
3. WHEN Chart_Config is used, THE Landing_Page SHALL isolate all chart configuration logic into a dedicated utility module separate from Component rendering code
4. WHEN the Team section renders with the refactored sub-components, THE Landing_Page SHALL produce identical visual output and interaction behavior as the original monolithic Team Component

### Requirement 4

**User Story:** Là một developer, tôi muốn tách business logic ra khỏi component UI bằng custom hooks, để logic có thể test và tái sử dụng được.

#### Acceptance Criteria

1. WHEN a Component contains state management and side-effect logic, THE Component SHALL delegate that logic to a dedicated Custom_Hook
2. WHEN a Custom_Hook is extracted, THE Custom_Hook SHALL expose a well-defined return interface containing state values and handler functions
3. WHEN the Custom_Hook return interface is serialized to JSON and then parsed back, THE parsed result SHALL be equivalent to the original return values for all serializable fields

### Requirement 5

**User Story:** Là một developer, tôi muốn thêm PropTypes cho tất cả components, để phát hiện lỗi kiểu dữ liệu sớm trong quá trình phát triển.

#### Acceptance Criteria

1. WHEN a Component receives props, THE Component SHALL validate all props using PropTypes definitions
2. WHEN a Component receives props that do not match the PropTypes definition, THE Component SHALL emit a console warning at runtime
3. WHEN PropTypes are defined, THE PropTypes SHALL specify whether each prop is required or optional with a default value

### Requirement 6

**User Story:** Là một developer, tôi muốn tổ chức lại cấu trúc thư mục dự án, để dễ tìm kiếm và quản lý file hơn.

#### Acceptance Criteria

1. WHEN the project directory is reviewed, THE Landing_Page SHALL organize Component files into feature-based subdirectories under `src/components/`
2. WHEN a Component has associated CSS_Module, Custom_Hook, and PropTypes files, THE Landing_Page SHALL co-locate those files in the same feature directory as the Component
3. WHEN the project directory is reorganized, THE Landing_Page SHALL maintain all existing import paths as valid or update them to reflect the new structure

### Requirement 7

**User Story:** Là một developer, tôi muốn loại bỏ hardcoded values và magic numbers, để code dễ hiểu và dễ thay đổi cấu hình hơn.

#### Acceptance Criteria

1. WHEN a Component uses a numeric or string literal that represents a configurable value, THE Component SHALL reference that value from a named constant defined in a shared constants module
2. WHEN constants are extracted, THE Landing_Page SHALL produce identical behavior using the named constants as with the original literal values
3. WHEN a constant value is serialized to a string representation and parsed back, THE parsed value SHALL equal the original constant value

### Requirement 8

**User Story:** Là một developer, tôi muốn cải thiện Data_Layer bằng cách tạo các hàm tiện ích để truy cập dữ liệu, để giảm optional chaining lặp lại trong components.

#### Acceptance Criteria

1. WHEN a Component accesses Data_Layer content, THE Component SHALL use data accessor utility functions instead of direct optional chaining on raw JSON objects
2. WHEN a data accessor function receives valid Data_Layer input, THE data accessor function SHALL return the requested field value
3. WHEN a data accessor function receives null or undefined input, THE data accessor function SHALL return a defined fallback value instead of undefined
4. WHEN a data accessor function serializes its output to JSON and parses it back, THE parsed result SHALL equal the original output for all serializable return values
