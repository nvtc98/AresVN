"use client";

/**
 * Adapted from MagicUI Orbiting Circles component
 * @see https://magicui.design/docs/components/orbiting-circles
 * Original uses Tailwind CSS; adapted here to use inline styles + CSS keyframes
 */

import React from "react";
import styles from "./OrbitingCircles.module.scss";

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className={styles.pathSvg}
        >
          <circle
            className={styles.pathCircle}
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={`${styles.orbitItem} orbit-item ${reverse ? styles.reverse : ""} ${className ?? ""}`}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
