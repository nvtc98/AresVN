"use client";

import classNames from "classnames";
import styles from "./fx.module.scss";

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Card with a glow that follows the cursor. The position is written straight
 * to CSS variables, so moving the mouse never re-renders React.
 */
export function SpotlightCard({
  className,
  children,
  ...props
}: SpotlightCardProps) {
  return (
    <div
      {...props}
      className={classNames(styles.spotlight, className)}
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        props.onPointerMove?.(e);
      }}
    >
      {children}
    </div>
  );
}
