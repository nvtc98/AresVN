"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { LetterFx } from "@once-ui-system/core";
import type { PlayerProfile } from "@/data/players";
import styles from "./Roster.module.scss";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export function Roster({ players }: { players: PlayerProfile[] }) {
  const roles = useMemo(
    () => ["Tất cả", ...Array.from(new Set(players.map((p) => p.game.cs.role)))],
    [players],
  );
  const [role, setRole] = useState(roles[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = players
    .map((p, i) => ({ player: p, index: i }))
    .filter(({ player }) => role === roles[0] || player.game.cs.role === role);

  // Sync the native <dialog> with state (gives Esc, focus trap, top layer).
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openIndex !== null && !d.open) d.showModal();
    if (openIndex === null && d.open) d.close();
  }, [openIndex]);

  const step = (dir: 1 | -1) => {
    if (openIndex === null) return;
    const pos = visible.findIndex((v) => v.index === openIndex);
    const next = visible[(pos + dir + visible.length) % visible.length];
    setOpenIndex(next.index);
  };

  const current = openIndex !== null ? players[openIndex] : null;

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="tablist" aria-label="Lọc theo vai trò">
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            role="tab"
            aria-selected={r === role}
            className={classNames(styles.chip, r === role && styles.chipActive)}
            onClick={() => setRole(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map(({ player, index }, i) => (
          <button
            key={`${role}-${player.name}`}
            type="button"
            className={styles.card}
            style={
              {
                "--tint": player.game.cs.color ?? undefined,
                "--delay": `${i * 60}ms`,
              } as React.CSSProperties
            }
            onClick={() => setOpenIndex(index)}
            aria-label={`${player.name} – ${player.game.cs.role}`}
          >
            <div className={styles.portrait}>
              <Image
                src={`/${player.img}`}
                alt=""
                fill
                sizes="(max-width: 560px) 90vw, 280px"
              />
            </div>
            <div className={styles.shade} />
            <div className={styles.scan} />
            <span className={styles.number}>{pad(index)}</span>
            <div className={styles.info}>
              <span className={styles.role}>{player.game.cs.role}</span>
              <span className={styles.name}>{player.name}</span>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        style={
          current?.game.cs.color
            ? ({ "--tint": current.game.cs.color } as React.CSSProperties)
            : undefined
        }
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          // click on the backdrop closes
          if (e.target === e.currentTarget) setOpenIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && openIndex !== null && (
          <div className={styles.dialogBody}>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpenIndex(null)}
              aria-label="Đóng"
            >
              ✕
            </button>
            <div className={styles.dialogPortrait}>
              <Image
                src={`/${current.img}`}
                alt={current.name}
                fill
                sizes="(max-width: 720px) 100vw, 420px"
                priority
              />
            </div>
            <div className={styles.dialogContent}>
              <span className={styles.dialogNumber}>
                #{pad(openIndex)} · AresVN
              </span>
              <span className={styles.role}>{current.game.cs.role}</span>
              <h2 className={styles.dialogName}>
                <LetterFx key={current.name} speed="fast" trigger="instant">
                  {current.name}
                </LetterFx>
              </h2>
              <p className={styles.dialogText}>{current.game.cs.description}</p>
              {visible.length > 1 && (
                <div className={styles.dialogNav}>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => step(-1)}
                  >
                    ← Trước
                  </button>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => step(1)}
                  >
                    Tiếp →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
