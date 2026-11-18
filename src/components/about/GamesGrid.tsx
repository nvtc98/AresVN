"use client";

import { useState } from "react";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import styles from "./AboutPage.module.scss";

export function GamesGrid({
  games,
}: {
  games: { code: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`${styles.games} ${open ? "" : styles.gamesCollapsed}`}>
        {games.map((g) => (
          <SpotlightCard key={g.code} className={styles.game}>
            <span className={styles.gameCode}>{g.code}</span>
            <span className={styles.gameName}>{g.name}</span>
          </SpotlightCard>
        ))}
      </div>
      <button
        type="button"
        className={styles.gamesToggle}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Thu gọn" : `Xem tất cả ${games.length} tựa game`}
      </button>
    </>
  );
}
