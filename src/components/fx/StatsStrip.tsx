"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./fx.module.scss";

export interface Stat {
  value: number;
  label: string;
  from?: number;
  suffix?: string;
}

function CountUp({ value, from = 0, suffix = "" }: Omit<Stat, "label">) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(Math.round(from + (value - from) * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(from);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, from]);

  return (
    <span ref={ref} className={styles.statValue}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className={styles.stats}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <CountUp value={s.value} from={s.from} suffix={s.suffix} />
          <span className={styles.statLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
