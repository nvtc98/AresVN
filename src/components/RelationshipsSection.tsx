"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { PixelImage } from "@/components/magicui/PixelImage";
import { Backlight } from "@/components/magicui/Backlight";
import {
  Column,
  Flex,
  GlitchFx,
  Heading,
  LetterFx,
  Text,
} from "@once-ui-system/core";
import styles from "./RelationshipsSection.module.scss";

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

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export const RelationshipsSection: React.FC<RelationshipsSectionProps> = ({
  relationships,
}) => {
  const [selected, setSelected] = useState<Relationship | null>(null);

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

  const handleClickTeam = useCallback((team: OrbitTeam) => {
    if (team.data) {
      setSelected((prev) => (prev?.name === team.name ? null : team.data));
    }
  }, []);

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
                className={`${styles.orbitAvatar} ${
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
    <Column fillWidth gap="xl">
      <Heading
        as="h2"
        id="Mối quan hệ"
        variant="display-strong-s"
        marginBottom="m"
      >
        Mối quan hệ
      </Heading>

      {/* Two-column layout: orbit (left) + detail (right) */}
      <div
        className={`${styles.splitLayout} ${hasSelected ? styles.splitLayoutOpen : ""}`}
      >
        {/* Left: orbit */}
        <div
          className={`${styles.orbitSide} ${hasSelected ? styles.orbitSideShifted : ""}`}
        >
          <div className={styles.orbitContainer}>
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
          {selected && (
            <Backlight key={`bl-${selected.name}`} blur={28}>
              <div className={styles.detailCard}>
                {/* Blurred background logo */}
                <div className={styles.detailBg} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selected.img} alt="" />
                </div>

                {/* Close button */}
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
                  <Column gap="4">
                    <GlitchFx key={selected.name} speed="medium">
                      <Text variant="heading-strong-l">
                        <LetterFx speed="medium" trigger="instant">
                          {selected.name}
                        </LetterFx>
                      </Text>
                    </GlitchFx>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {selected.relationship}
                    </Text>
                  </Column>
                </Flex>
                <Column gap="s" style={{ marginTop: "var(--static-space-16)" }}>
                  {selected.descriptions.map((desc, i) => (
                    <Text
                      key={`${selected.name}-desc-${i}`}
                      variant="body-default-m"
                    >
                      {desc}
                    </Text>
                  ))}
                </Column>
              </div>
            </Backlight>
          )}
        </div>
      </div>
    </Column>
  );
};
