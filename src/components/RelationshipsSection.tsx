"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import { PixelImage } from "@/components/magicui/PixelImage";
import { PageHero, SectionTitle } from "@/components/fx/PageHero";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { Column, Flex, GlitchFx, LetterFx, Text } from "@once-ui-system/core";
import { Friends, type Friend } from "@/components/relationships/Friends";
import { friendProfiles } from "@/resources";
import { players } from "@/data/players";
import styles from "./RelationshipsSection.module.scss";

const profiles = friendProfiles as Record<
  string,
  { bio?: string; img?: string }
>;
const aresNames = new Set(players.map((p) => p.name.toLowerCase()));

interface Relationship {
  img: string;
  name: string;
  relationship: string;
  descriptions: string[];
}

interface OrbitTeam {
  img: string;
  name: string;
  data: Relationship | null;
}

interface RelationshipsSectionProps {
  relationships: Relationship[];
}

function findRel(relationships: Relationship[], name: string) {
  return relationships.find((r) => r.name === name) ?? null;
}

// Thứ tự hiển thị trong lưới "Các thế lực".
const FACTION_ORDER = [
  "The Eyes",
  "G3 Esports",
  "Afterschool Weather Club",
  "Paragames Team",
  "Nomads' Tavern",
  "RinFarm",
];

type RelKind = "ally" | "rival";

function relKind(rel: Relationship | null): RelKind {
  const r = rel?.relationship.toLowerCase() ?? "";
  if (r.includes("đối thủ")) return "rival";
  return "ally";
}

const KIND_LABEL: Record<RelKind, string> = {
  ally: "Đồng minh",
  rival: "Đối thủ",
};

/** Tách đoạn "Thành viên: a, b, c." thành danh sách chip. */
function splitMembers(descriptions: string[]) {
  const idx = descriptions.findIndex((d) => d.startsWith("Thành viên:"));
  if (idx === -1) return { body: descriptions, members: [] as string[] };
  const members = descriptions[idx]
    .replace("Thành viên:", "")
    .replace(/\.\s*$/, "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  return { body: descriptions.filter((_, i) => i !== idx), members };
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export const RelationshipsSection: React.FC<RelationshipsSectionProps> = ({
  relationships,
}) => {
  const [selected, setSelected] = useState<Relationship | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  const orderedRels = useMemo(
    () =>
      FACTION_ORDER.map((name) => findRel(relationships, name)).filter(
        (rel): rel is Relationship => rel !== null,
      ),
    [relationships],
  );

  // Everyone listed under "Thành viên:" of each team, enriched by friendProfiles.
  const friends: Friend[] = useMemo(
    () =>
      orderedRels.flatMap((rel) =>
        splitMembers(rel.descriptions).members.map((name) => ({
          name,
          team: rel.name,
          teamImg: rel.img,
          kind: relKind(rel),
          relationship: rel.relationship,
          bio: profiles[name]?.bio,
          img: profiles[name]?.img,
          isAres: aresNames.has(name.toLowerCase()),
        })),
      ),
    [orderedRels],
  );

  const innerOrbit: OrbitTeam[] = [
    {
      img: "/images/relationships/g3esports.webp",
      name: "G3 Esports",
      data: findRel(relationships, "G3 Esports"),
    },
    {
      img: "/images/relationships/theeyes.webp",
      name: "The Eyes",
      data: findRel(relationships, "The Eyes"),
    },
    {
      img: "/images/relationships/afterschoolweatherclub.webp",
      name: "Afterschool Weather Club",
      data: findRel(relationships, "Afterschool Weather Club"),
    },
  ];

  const outerOrbit: OrbitTeam[] = [
    {
      img: "/images/relationships/paragames.webp",
      name: "Paragames Team",
      data: findRel(relationships, "Paragames Team"),
    },
    {
      img: "/images/relationships/nomadstavern.webp",
      name: "Nomads' Tavern",
      data: findRel(relationships, "Nomads' Tavern"),
    },
    {
      img: "/images/relationships/rinfarm.webp",
      name: "RinFarm",
      data: findRel(relationships, "RinFarm"),
    },
  ];

  const ICON = 64;

  const orbitRef = useRef<HTMLDivElement>(null);

  const handleClickTeam = useCallback((team: OrbitTeam) => {
    if (team.data) {
      setSelected((prev) => (prev?.name === team.name ? null : team.data));
    }
  }, []);

  const selectFromCard = (rel: Relationship) => {
    setSelected(rel);
    orbitRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Quỹ đạo chạy hoàn toàn bằng CSS animation (GPU) - không re-render React mỗi frame.
  const renderRing = (
    items: OrbitTeam[],
    radius: number,
    duration: number,
    reverse: boolean,
  ) => (
    <div
      className={`${styles.orbitRing} ${reverse ? styles.orbitReverse : ""}`}
      style={{ "--orbit-duration": `${duration}s` } as React.CSSProperties}
    >
      {items.map((team, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div
            key={team.name}
            className={styles.orbitSlot}
            style={{
              transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
            }}
          >
            <div className={styles.orbitUpright}>
              <button
                type="button"
                aria-label={team.name}
                className={`${styles.orbitAvatar} ${styles[relKind(team.data)]} ${
                  selected?.name === team.name ? styles.orbitAvatarActive : ""
                }`}
                style={{ width: ICON, height: ICON }}
                onClick={() => handleClickTeam(team)}
              >
                <Image
                  src={team.img}
                  alt={team.name}
                  width={ICON}
                  height={ICON}
                  className={styles.orbitImage}
                />
              </button>
              <div className={styles.tooltip}>{team.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const hasSelected = selected !== null;

  return (
    <Column fillWidth gap="48" style={{ paddingBottom: 96 }}>
      <PageHero
        kicker={`Liên minh · ${relationships.length} thế lực`}
        title="Mối quan hệ"
        subtitle="Đồng minh, đối thủ và những kẻ âm thầm đứng sau. Bấm vào một biểu tượng trên quỹ đạo để xem hồ sơ."
      >
        <div className={styles.legend}>
          {(Object.keys(KIND_LABEL) as RelKind[]).map((k) => (
            <span key={k} className={`${styles.legendItem} ${styles[k]}`}>
              <span className={styles.legendDot} />
              {KIND_LABEL[k]}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Two-column layout: orbit (left) + detail (right) */}
      <div
        className={`${styles.splitLayout} ${hasSelected ? styles.splitLayoutOpen : ""}`}
      >
        {/* Left: orbit */}
        <div className={styles.orbitSide}>
          <div className={styles.orbitContainer} ref={orbitRef}>
            {/* Center logo */}
            <div className={styles.centerLogo}>
              <Image
                src="/images/logo/Fantastic_Four_Logo_Remastered.webp"
                alt="AresVN"
                width={480}
                height={480}
                className={styles.centerImage}
              />
            </div>

            {/* Orbit paths */}
            <svg className={styles.pathSvg}>
              <circle
                cx="50%"
                cy="50%"
                r={140}
                fill="none"
                className={styles.pathCircle}
              />
            </svg>
            <svg className={styles.pathSvg}>
              <circle
                cx="50%"
                cy="50%"
                r={240}
                fill="none"
                className={styles.pathCircle}
              />
            </svg>

            {renderRing(innerOrbit, 140, 30, false)}
            {renderRing(outerOrbit, 240, 45, true)}
          </div>
        </div>

        {/* Right: detail panel */}
        <div
          className={`${styles.detailSide} ${hasSelected ? styles.detailSideOpen : ""}`}
        >
          {selected &&
            (() => {
              const kind = relKind(selected);
              const { body, members } = splitMembers(selected.descriptions);
              return (
                <SpotlightCard
                  key={selected.name}
                  className={`${styles.detailCard} ${styles[kind]}`}
                >
                  <div className={styles.detailBg} aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selected.img} alt="" />
                  </div>

                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={() => setSelected(null)}
                    aria-label="Đóng"
                  >
                    ✕
                  </button>

                  <Flex gap="m" vertical="center">
                    <PixelImage
                      key={selected.name}
                      src={selected.img}
                      alt={selected.name}
                      width={80}
                      height={80}
                      customGrid={{ rows: 4, cols: 4 }}
                      pixelFadeInDuration={800}
                      maxAnimationDelay={600}
                      className={styles.detailLogo}
                    />
                    <Column gap="8">
                      <span className={styles.kindBadge}>
                        {selected.relationship}
                      </span>
                      <GlitchFx key={selected.name} speed="medium">
                        <Text variant="heading-strong-xl">
                          <LetterFx speed="medium" trigger="instant">
                            {selected.name}
                          </LetterFx>
                        </Text>
                      </GlitchFx>
                    </Column>
                  </Flex>
                  <Column gap="s" className={styles.detailBody}>
                    {body.map((desc, i) => (
                      <Text
                        key={`${selected.name}-desc-${i}`}
                        variant="body-default-m"
                      >
                        {desc}
                      </Text>
                    ))}
                  </Column>
                  {members.length > 0 && (
                    <div className={styles.members}>
                      <span className={styles.membersLabel}>Thành viên</span>
                      <div className={styles.memberChips}>
                        {members.map((m) => (
                          <button
                            key={m}
                            type="button"
                            className={styles.memberChip}
                            onClick={() => setSelectedFriend(m)}
                            title="Xem hồ sơ"
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </SpotlightCard>
              );
            })()}
        </div>
      </div>

      <section>
        <SectionTitle index="01" title="Các thế lực" id="the-luc" />
        <div className={styles.factions}>
          {orderedRels.map((rel) => {
            const kind = relKind(rel);
            return (
              <SpotlightCard
                key={rel.name}
                className={`${styles.faction} ${styles[kind]} ${
                  selected?.name === rel.name ? styles.factionActive : ""
                }`}
              >
                <button
                  type="button"
                  className={styles.factionBtn}
                  onClick={() => selectFromCard(rel)}
                >
                  <span className={styles.factionLogo}>
                    <Image src={rel.img} alt="" fill sizes="56px" />
                  </span>
                  <span className={styles.factionText}>
                    <span className={styles.factionName}>{rel.name}</span>
                    <span className={styles.kindBadge}>{rel.relationship}</span>
                  </span>
                  <span className={styles.factionDesc}>
                    {rel.descriptions[0]}
                  </span>
                </button>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle index="02" title="Bạn bè" id="ban-be" />
        <Friends
          friends={friends}
          teams={orderedRels.map((r) => ({ name: r.name, kind: relKind(r) }))}
          selected={selectedFriend}
          onSelect={setSelectedFriend}
        />
      </section>
    </Column>
  );
};
