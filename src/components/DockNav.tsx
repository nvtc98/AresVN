"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HouseIcon,
  GridFourIcon,
  BookOpenIcon,
  HandshakeIcon,
  ChatCircleTextIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  ImageIcon,
  SignpostIcon,
} from "@phosphor-icons/react";
import { useTheme } from "@once-ui-system/core";

import { Dock, DockIcon } from "@/components/magicui/Dock";
import {
  routes,
  display,
  about,
  blog,
  work,
  members,
  relationshipsPage,
  testimonialsPage,
  gallery,
} from "@/resources";
import styles from "./DockNav.module.scss";

function DockThemeToggle() {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setCurrentTheme(
      document.documentElement.getAttribute("data-theme") || "light",
    );
  }, []);

  const toggleTheme = () => {
    const next = currentTheme === "light" ? "dark" : "light";
    setTheme(next);
    setCurrentTheme(next);
  };

  const label = currentTheme === "dark" ? "Chế độ sáng" : "Chế độ tối";

  return (
    <button
      className={styles.dockItemBtn}
      onClick={toggleTheme}
      aria-label={label}
      type="button"
    >
      {currentTheme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
      <span className={styles.tooltip}>{label}</span>
    </button>
  );
}

export const DockNav = () => {
  const pathname = usePathname() ?? "";

  const navItems: {
    href: string;
    icon: React.ReactNode;
    label: string;
    routeKey: string;
    matchPrefix?: boolean;
  }[] = [
    {
      href: "/",
      icon: <HouseIcon className={styles.icon} />,
      label: "Trang chủ",
      routeKey: "/",
    },
    {
      href: "/about",
      icon: <SignpostIcon className={styles.icon} />,
      label: about.label,
      routeKey: "/about",
    },
    {
      href: "/work",
      icon: <GridFourIcon className={styles.icon} />,
      label: work.label,
      routeKey: "/work",
      matchPrefix: true,
    },
    {
      href: "/blog",
      icon: <BookOpenIcon className={styles.icon} />,
      label: blog.label,
      routeKey: "/blog",
      matchPrefix: true,
    },
    {
      href: "/members",
      icon: <UserIcon className={styles.icon} />,
      label: members.label,
      routeKey: "/members",
      matchPrefix: true,
    },
    {
      href: "/gallery",
      icon: <ImageIcon className={styles.icon} />,
      label: gallery.label,
      routeKey: "/gallery",
      matchPrefix: true,
    },
    {
      href: "/relationships",
      icon: <HandshakeIcon className={styles.icon} />,
      label: relationshipsPage.label,
      routeKey: "/relationships",
      matchPrefix: true,
    },
    {
      href: "/testimonials",
      icon: <ChatCircleTextIcon className={styles.icon} />,
      label: testimonialsPage.label,
      routeKey: "/testimonials",
      matchPrefix: true,
    },
  ];

  const activeItems = navItems.filter(
    (item) => routes[item.routeKey as keyof typeof routes],
  );

  return (
    <div
      className={styles.dockWrapper}
      role="navigation"
      aria-label="Main navigation"
    >
      <Dock
        direction="middle"
        iconSize={40}
        iconMagnification={60}
        iconDistance={140}
      >
        {activeItems.map((item) => {
          const isActive = item.matchPrefix
            ? pathname.startsWith(item.href)
            : pathname === item.href;

          return (
            <DockIcon key={item.href}>
              <Link
                href={item.href}
                className={`${styles.dockItemLink} ${isActive ? styles.active : ""}`}
                aria-label={item.label}
              >
                {item.icon}
                <span className={styles.tooltip}>{item.label}</span>
              </Link>
            </DockIcon>
          );
        })}

        {display.themeSwitcher && (
          <>
            <div className={styles.separator} />
            <DockIcon>
              <DockThemeToggle />
            </DockIcon>
          </>
        )}
      </Dock>
    </div>
  );
};
