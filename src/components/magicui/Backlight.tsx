"use client";

import React from "react";
import styles from "./Backlight.module.scss";

export interface BacklightProps {
  /** Blur intensity in px */
  blur?: number;
  /** The element to apply the backlight glow to */
  children: React.ReactElement;
  className?: string;
}

/**
 * Backlight glow effect — renders a blurred copy of the child behind it.
 * Adapted from MagicUI Backlight component.
 */
export function Backlight({ blur = 20, children, className }: BacklightProps) {
  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {/* Glow layer — blurred duplicate */}
      <div
        className={styles.glow}
        aria-hidden
        style={{ filter: `blur(${blur}px)` }}
      >
        {children}
      </div>
      {/* Foreground */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
