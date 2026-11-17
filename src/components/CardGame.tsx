"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CardGame.module.scss";

// Mặt bài — dùng emoji để không phụ thuộc asset ngoài.
const EMOJIS = ["🐉", "⚔️", "🛡️", "🔥", "⭐", "🎯", "👑", "🎮"] as const;

type Card = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const pairs = EMOJIS.flatMap((emoji) => [emoji, emoji]);
  return shuffle(pairs).map((emoji, index) => ({
    id: index,
    emoji,
    flipped: false,
    matched: false,
  }));
}

export function CardGame() {
  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);

  const matchedCount = useMemo(
    () => cards.filter((c) => c.matched).length,
    [cards],
  );
  const won = matchedCount === cards.length;

  // Bộ đếm thời gian
  useEffect(() => {
    if (!started || won) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [started, won]);

  // Xử lý khi chọn đủ 2 lá
  useEffect(() => {
    if (selected.length !== 2) return;
    setLocked(true);
    const [a, b] = selected;
    const cardA = cards.find((c) => c.id === a);
    const cardB = cards.find((c) => c.id === b);

    if (cardA && cardB && cardA.emoji === cardB.emoji) {
      // Trùng
      setCards((prev) =>
        prev.map((c) =>
          c.id === a || c.id === b ? { ...c, matched: true } : c,
        ),
      );
      setSelected([]);
      setLocked(false);
    } else {
      // Không trùng — úp lại sau 800ms
      const t = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a || c.id === b ? { ...c, flipped: false } : c,
          ),
        );
        setSelected([]);
        setLocked(false);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [selected, cards]);

  const handleFlip = useCallback(
    (id: number) => {
      if (locked) return;
      if (!started) setStarted(true);

      setCards((prev) => {
        const target = prev.find((c) => c.id === id);
        if (!target || target.flipped || target.matched) return prev;
        return prev.map((c) => (c.id === id ? { ...c, flipped: true } : c));
      });

      setSelected((prev) => {
        const target = cards.find((c) => c.id === id);
        if (!target || target.flipped || target.matched || prev.length === 2) {
          return prev;
        }
        const next = [...prev, id];
        if (next.length === 2) setMoves((m) => m + 1);
        return next;
      });
    },
    [locked, started, cards],
  );

  const reset = useCallback(() => {
    setCards(buildDeck());
    setSelected([]);
    setMoves(0);
    setSeconds(0);
    setLocked(false);
    setStarted(false);
  }, []);

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className={styles.game}>
      <div className={styles.hud}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Lượt</span>
          <span className={styles.statValue}>{moves}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Thời gian</span>
          <span className={styles.statValue}>{formatTime(seconds)}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Cặp</span>
          <span className={styles.statValue}>
            {matchedCount / 2}/{cards.length / 2}
          </span>
        </div>
        <button className={styles.resetBtn} onClick={reset} type="button">
          Chơi lại
        </button>
      </div>

      {won && (
        <motion.div
          className={styles.winBanner}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎉 Hoàn thành trong {moves} lượt · {formatTime(seconds)}
        </motion.div>
      )}

      <div className={styles.board}>
        {cards.map((card) => {
          const isUp = card.flipped || card.matched;
          return (
            <button
              key={card.id}
              className={styles.cardSlot}
              onClick={() => handleFlip(card.id)}
              aria-label={isUp ? card.emoji : "Lá bài úp"}
              type="button"
            >
              <motion.div
                className={styles.card}
                animate={{ rotateY: isUp ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`${styles.face} ${styles.back}`}>
                  <span className={styles.backMark}>⬢</span>
                </div>
                <div
                  className={`${styles.face} ${styles.front} ${
                    card.matched ? styles.matched : ""
                  }`}
                >
                  {card.emoji}
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
