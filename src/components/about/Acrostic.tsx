"use client";

import { useState } from "react";
import classNames from "classnames";
import styles from "./AboutPage.module.scss";

/**
 * A R E S V N on one line. Hovering (or tapping/focusing) a letter slides the
 * rest of its phrase out right next to it. On narrow screens the phrase shows
 * on a caption line instead, since there is no room to extend inline.
 */
export function Acrostic({ lines }: { lines: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={styles.acrostic} onMouseLeave={() => setActive(null)}>
      <ol className={styles.acroRow} aria-label="Tuyên ngôn AresVN">
        {lines.map((line, i) => (
          <li
            key={line}
            tabIndex={0}
            className={classNames(styles.acroItem, active === i && styles.acroOpen)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(i)}
            aria-label={line}
          >
            <span className={styles.acroLetter} data-letter={line[0]} aria-hidden>
              {line[0]}
            </span>
            <span className={styles.acroRest} aria-hidden>
              <span>{line.slice(1)}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className={styles.acroCaption} aria-live="polite">
        {active === null ? (
          <span className={styles.acroHint}>Rê chuột hoặc chạm vào từng chữ</span>
        ) : (
          <span className={styles.acroFull}>
            <b>{lines[active][0]}</b>
            {lines[active].slice(1)}
          </span>
        )}
      </p>
    </div>
  );
}
