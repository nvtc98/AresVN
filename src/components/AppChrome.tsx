"use client";

import { usePathname } from "next/navigation";
import { Flex } from "@once-ui-system/core";
import { DockNav } from "@/components/DockNav";
import { DynamicBackground } from "@/components/DynamicBackground";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { RouteGuard } from "@/components/RouteGuard";

// Các route hiển thị "trần" - không background, dock hay footer.
// Thêm route vào đây (vd: "/special") để ẩn chrome.
const FULLSCREEN_ROUTES: string[] = [];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isFullscreen = FULLSCREEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isFullscreen) {
    // Trang độc lập: chiếm toàn màn hình, vẫn giữ RouteGuard để kiểm soát truy cập.
    return (
      <Flex
        fillWidth
        style={{ minHeight: "100vh" }}
        horizontal="center"
        vertical="center"
      >
        <RouteGuard>{children}</RouteGuard>
      </Flex>
    );
  }

  return (
    <>
      <DynamicBackground />
      <Flex fillWidth minHeight="16" />
      <DockNav />
      <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
        <Flex horizontal="center" fillWidth minHeight="0">
          <RouteGuard>{children}</RouteGuard>
        </Flex>
      </Flex>
      <ConditionalFooter />
    </>
  );
}
