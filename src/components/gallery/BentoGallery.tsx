"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./Bento.module.scss";

interface GalleryImage {
  src: string;
  alt: string;
}

// Repeating span pattern that tiles a 4-column grid with no holes.
const PATTERN = ["big", "", "", "wide", "", "tall", "wide", "", "wide"];

const pad = (n: number) => String(n + 1).padStart(2, "0");

export function BentoGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = (dir: 1 | -1) =>
    setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length));

  const current = open !== null ? images[open] : null;

  return (
    <>
      <div className={styles.grid}>
        {images.map((img, i) => {
          const span = PATTERN[i % PATTERN.length];
          return (
            <button
              key={img.src}
              type="button"
              className={classNames(styles.tile, span && styles[span])}
              style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
              onClick={() => setOpen(i)}
              aria-label={`Xem ảnh: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={
                  span === "big" || span === "wide"
                    ? "(max-width: 720px) 100vw, 560px"
                    : "(max-width: 720px) 50vw, 280px"
                }
                priority={i < 3}
              />
              <span className={styles.index}>{pad(i)}</span>
              <span className={styles.caption}>{img.alt}</span>
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && open !== null && (
          <>
            <div className={styles.stage}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 1232px) 100vw, 1200px"
              />
            </div>
            <div className={styles.bar}>
              <span className={styles.counter}>
                {pad(open)} / {pad(images.length - 1)}
              </span>
              <span className={styles.lbCaption}>{current.alt}</span>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.ctrl}
                  onClick={() => step(-1)}
                  aria-label="Ảnh trước"
                >
                  ←
                </button>
                <button
                  type="button"
                  className={styles.ctrl}
                  onClick={() => step(1)}
                  aria-label="Ảnh tiếp"
                >
                  →
                </button>
                <button
                  type="button"
                  className={styles.ctrl}
                  onClick={() => setOpen(null)}
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
