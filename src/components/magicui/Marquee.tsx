"use client";

import {
  type CSSProperties,
  type ReactNode,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import styles from "./Marquee.module.css";
import classNames from "classnames";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  duration?: string;
  gap?: string;
  className?: string;
  style?: CSSProperties;
}

export function Marquee({
  children,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  duration = "20s",
  gap = "1rem",
  className,
  style,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  const calculateCopies = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const containerSize = vertical
      ? container.offsetHeight
      : container.offsetWidth;
    const trackSize = vertical ? track.scrollHeight : track.scrollWidth;

    if (trackSize === 0) return;

    // We need enough copies so the total content width >= 2x the container
    // to create a seamless loop. Minimum 2 copies.
    const needed = Math.ceil((containerSize * 2) / trackSize) + 1;
    setCopies(Math.max(2, needed));
  }, [vertical]);

  useEffect(() => {
    calculateCopies();

    const observer = new ResizeObserver(() => {
      calculateCopies();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [calculateCopies]);

  return (
    <div
      ref={containerRef}
      className={classNames(
        styles.marquee,
        vertical && styles.vertical,
        pauseOnHover && styles.pauseOnHover,
        className,
      )}
      style={
        {
          "--marquee-duration": duration,
          "--marquee-gap": gap,
          ...style,
        } as CSSProperties
      }
    >
      {Array.from({ length: copies }).map((_, i) => (
        <div
          key={i}
          ref={i === 0 ? trackRef : undefined}
          className={classNames(styles.track, reverse && styles.reverse)}
          aria-hidden={i > 0}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
