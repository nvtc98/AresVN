"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./Friends.module.scss";

export type RelKind = "ally" | "rival" | "secret";

export interface Friend {
  name: string;
  team: string;
  teamImg: string;
  kind: RelKind;
  relationship: string;
  bio?: string;
  img?: string;
  /** also on the AresVN roster */
  isAres: boolean;
}

const isRedacted = (name: string) => /[█?]/.test(name);

function initials(name: string) {
  const clean = name.replace(/[^\p{L}\p{N}\s]/gu, "").trim();
  if (!clean) return "?";
  const words = clean.split(/\s+/);
  return (
    words.length > 1 ? words[0][0] + words[1][0] : clean.slice(0, 2)
  ).toUpperCase();
}

interface FriendsProps {
  friends: Friend[];
  teams: { name: string; kind: RelKind }[];
  selected: string | null;
  onSelect: (name: string | null) => void;
}

export function Friends({ friends, teams, selected, onSelect }: FriendsProps) {
  const [team, setTeam] = useState<string | null>(null);
  const cardRefs = useRef(new Map<string, HTMLElement>());

  // When a friend is picked from elsewhere (detail panel chips), make sure it
  // is visible and bring it into view.
  useEffect(() => {
    if (!selected) return;
    const f = friends.find((x) => x.name === selected);
    if (f && team && f.team !== team) setTeam(null);
    requestAnimationFrame(() =>
      cardRefs.current
        .get(selected)
        ?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const visible = team ? friends.filter((f) => f.team === team) : friends;

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="tablist" aria-label="Lọc theo team">
        <button
          type="button"
          role="tab"
          aria-selected={team === null}
          className={classNames(
            styles.chip,
            team === null && styles.chipActive,
          )}
          onClick={() => setTeam(null)}
        >
          Tất cả <span className={styles.count}>{friends.length}</span>
        </button>
        {teams.map((t) => (
          <button
            key={t.name}
            type="button"
            role="tab"
            aria-selected={team === t.name}
            className={classNames(
              styles.chip,
              styles[t.kind],
              team === t.name && styles.chipActive,
            )}
            onClick={() => setTeam(t.name)}
          >
            <span className={styles.dot} />
            {t.name}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((f, i) => {
          const open = selected === f.name;
          const secret = isRedacted(f.name);
          return (
            <article
              key={`${f.team}-${f.name}`}
              ref={(el) => {
                if (el) cardRefs.current.set(f.name, el);
                else cardRefs.current.delete(f.name);
              }}
              className={classNames(
                styles.card,
                styles[f.kind],
                open && styles.open,
                secret && styles.classified,
              )}
              style={
                {
                  "--delay": `${Math.min(i, 12) * 35}ms`,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                className={styles.head}
                aria-expanded={open}
                onClick={() => onSelect(open ? null : f.name)}
              >
                <span className={styles.avatar}>
                  {f.img ? (
                    <Image src={f.img} alt="" fill sizes="48px" />
                  ) : (
                    initials(f.name)
                  )}
                </span>
                <span className={styles.who}>
                  <span className={styles.name}>{f.name}</span>
                  <span className={styles.team}>{f.team}</span>
                </span>
                {f.isAres && <span className={styles.aresBadge}>AresVN</span>}
              </button>

              {open && (
                <div className={styles.body}>
                  <div className={styles.teamRow}>
                    <span className={styles.teamLogo}>
                      <Image src={f.teamImg} alt="" fill sizes="28px" />
                    </span>
                    <span className={styles.kindBadge}>{f.relationship}</span>
                  </div>
                  <p
                    className={classNames(styles.bio, !f.bio && styles.pending)}
                  >
                    {secret
                      ? "Hồ sơ mật. Danh tính đã bị xoá khỏi mọi ghi chép."
                      : (f.bio ?? "Hồ sơ đang được cập nhật.")}
                  </p>
                  {f.isAres && (
                    <p className={styles.note}>
                      Mang hai dòng máu: vừa là bạn của {f.team}, vừa là chiến
                      binh AresVN.
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
