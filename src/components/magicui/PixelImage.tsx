"use client";

import { useMemo } from "react";
import styles from "./PixelImage.module.scss";

type GridPreset = "6x4" | "8x8" | "8x3" | "4x6" | "3x8";

const GRID_MAP: Record<GridPreset, { rows: number; cols: number }> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

export interface PixelImageProps {
  src: string;
  alt?: string;
  grid?: GridPreset;
  customGrid?: { rows: number; cols: number };
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number;
  maxAnimationDelay?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function PixelImage({
  src,
  alt = "",
  grid = "8x8",
  customGrid,
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  width,
  height,
  className,
}: PixelImageProps) {
  const { rows, cols } = customGrid ?? GRID_MAP[grid];

  const delays = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < rows * cols; i++) {
      arr.push(Math.random() * maxAnimationDelay);
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, maxAnimationDelay, src]);

  return (
    <div
      className={`${styles.container} ${className ?? ""}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: typeof width === "number" ? `${width}px` : (width ?? "100%"),
        height: typeof height === "number" ? `${height}px` : (height ?? "auto"),
      }}
      role="img"
      aria-label={alt}
    >
      {Array.from({ length: rows * cols }, (_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;

        return (
          <div
            key={`${src}-${i}`}
            className={`${styles.piece} ${!grayscaleAnimation ? styles.noGrayscale : ""}`}
            style={
              {
                "--delay": `${delays[i]}ms`,
                "--fade-duration": `${pixelFadeInDuration}ms`,
              } as React.CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className={styles.pieceImg}
              style={{
                width: `${cols * 100}%`,
                height: `${rows * 100}%`,
                maxWidth: "none",
                objectFit: "cover",
                objectPosition: "center",
                marginLeft: `${-col * 100}%`,
                marginTop: `${-row * 100}%`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
