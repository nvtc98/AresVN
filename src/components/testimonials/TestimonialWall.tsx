"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { Stars } from "@/components/fx/PageHero";
import { triggerJumpscare } from "./Jumpscare";
import styles from "./Testimonials.module.scss";

const SCARE_SRC = "/images/testimonials/thien-scare.webp";

export interface Testimonial {
  img?: string;
  text: string;
  name: string;
  tag?: string;
  rating?: number;
  /** Easter egg: hovering/tapping the avatar triggers the jumpscare. */
  jumpscare?: boolean;
}

/** Hover/tap handlers that fire the jumpscare for flagged testimonials. */
function scareProps(t: Testimonial) {
  return t.jumpscare
    ? {
        onMouseEnter: () => triggerJumpscare(SCARE_SRC),
        onClick: () => triggerJumpscare(SCARE_SRC),
      }
    : {};
}

function Avatar({ t, scare = false }: { t: Testimonial; scare?: boolean }) {
  if (t.img) {
    return (
      <span className={styles.avatar} {...(scare ? scareProps(t) : {})}>
        <Image src={t.img} alt="" fill sizes="40px" />
      </span>
    );
  }
  const initials = t.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className={classNames(styles.avatar, styles.initials)}>{initials}</span>
  );
}

export function FeaturedTestimonial({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % items.length), 5000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const t = items[i];
  const rated = items.filter((x) => x.rating);
  const avg = rated.reduce((s, x) => s + (x.rating ?? 0), 0) / (rated.length || 1);

  return (
    <SpotlightCard
      className={styles.featured}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.featuredQuote} aria-live="polite">
        <span className={styles.bigMark} aria-hidden>
          &ldquo;
        </span>
        <p key={`q-${i}`} className={styles.bigText}>
          {t.text}
        </p>
        <div key={`w-${i}`} className={styles.who}>
          <Avatar t={t} scare />
          <span className={styles.name}>{t.name}</span>
          {t.tag && <span className={styles.tag}>{t.tag}</span>}
        </div>
        <div className={styles.dots}>
          {items.map((x, n) => (
            <button
              key={x.name}
              type="button"
              className={classNames(styles.dot, n === i && styles.dotActive)}
              onClick={() => setI(n)}
              aria-label={`Nhận xét ${n + 1}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.score}>
        <span className={styles.scoreValue}>{avg.toFixed(1)}</span>
        <Stars value={Math.round(avg)} />
        <span className={styles.scoreNote}>
          Dựa trên {rated.length} đánh giá hoàn toàn khách quan
        </span>
      </div>
    </SpotlightCard>
  );
}

export function TestimonialWall({ items }: { items: Testimonial[] }) {
  return (
    <div className={styles.wall}>
      {items.map((t) => (
        <SpotlightCard key={t.name} className={styles.card} {...scareProps(t)}>
          <div className={styles.cardHead}>
            {t.rating ? <Stars value={t.rating} /> : <span />}
            {t.tag && <span className={styles.tag}>{t.tag}</span>}
          </div>
          <p className={styles.quote}>&ldquo;{t.text}&rdquo;</p>
          <div className={styles.who}>
            <Avatar t={t} />
            <span className={styles.name}>{t.name}</span>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}
