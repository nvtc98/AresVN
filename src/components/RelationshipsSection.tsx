"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
/*  useOrbit                                                           */
/* ------------------------------------------------------------------ */

function useOrbit(
  count: number,
  radius: number,
  duration: number,
  reverse: boolean,
) {
  const angleRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  const dps = (reverse ? -360 : 360) / duration;

  useEffect(() => {
    const step = (time: number) => {
      if (lastTimeRef.current !== null) {
        const dt = (time - lastTimeRef.current) / 1000;
        angleRef.current += dps * dt;
      }
      lastTimeRef.current = time;

      const next: { x: number; y: number }[] = [];
      for (let i = 0; i < count; i++) {
        const a = ((angleRef.current + (360 / count) * i) * Math.PI) / 180;
        next.push({ x: Math.cos(a) * radius, y: Math.sin(a) * radius });
      }
      setPositions(next);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [count, radius, dps]);

  return positions;
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export const RelationshipsSection: React.FC<RelationshipsSectionProps> = ({
  relationships,
}) => {
  const [selected, setSelected] = useState<Relationship | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const innerOrbit: OrbitTeam[] = [
    {
      img: "/images/relationships/g3esports.png",
      name: "G3 Esports",
      data: findRel(relationships, "G3 Esports"),
    },
    {
      img: "/images/relationships/theeyes.jpg",
      name: "The Eyes",
      data: findRel(relationships, "The Eyes"),
    },
    {
      img: "/images/relationships/afterschoolweatherclub.jpg",
      name: "Afterschool Weather Club",
      data: findRel(relationships, "Afterschool Weather Club"),
    },
  ];

  const outerOrbit: OrbitTeam[] = [
    {
      img: "/images/relationships/paragames.png",
      name: "Paragames Team",
      data: findRel(relationships, "Paragames Team"),
    },
    {
      img: "/images/relationships/nomadstavern.png",
      name: "Nomads' Tavern",
      data: findRel(relationships, "Nomads' Tavern"),
    },
    {
      img: "/images/relationships/rinfarm.png",
      name: "RinFarm",
      data: findRel(relationships, "RinFarm"),
    },
  ];

  const ICON = 64;
  const innerPos = useOrbit(innerOrbit.length, 140, 30, false);
  const outerPos = useOrbit(outerOrbit.length, 240, 45, true);

  const allItems = [
    ...innerOrbit.map((t, i) => ({ ...t, pos: innerPos[i] })),
    ...outerOrbit.map((t, i) => ({ ...t, pos: outerPos[i] })),
  ];

  const hoveredItem = hoveredName
    ? allItems.find((t) => t.name === hoveredName)
    : null;

  const handleClickTeam = useCallback((team: OrbitTeam) => {
    if (team.data) {
      setSelected((prev) => (prev?.name === team.name ? null : team.data));
    }
  }, []);

  const renderItems = (
    items: OrbitTeam[],
    positions: { x: number; y: number }[],
  ) =>
    items.map((team, i) => {
      const pos = positions[i];
      if (!pos) return null;
      return (
        <button
          key={team.name}
          type="button"
          aria-label={team.name}
          className={`${styles.orbitAvatar} ${
            selected?.name === team.name ? styles.orbitAvatarActive : ""
          } ${hoveredName === team.name ? styles.orbitAvatarHovered : ""}`}
          style={{
            width: ICON,
            height: ICON,
            transform: `translate(${pos.x - ICON / 2}px, ${pos.y - ICON / 2}px)`,
          }}
          onClick={() => handleClickTeam(team)}
          onMouseEnter={() => setHoveredName(team.name)}
          onMouseLeave={() => setHoveredName(null)}
        >
          <Image
            src={team.img}
            alt={team.name}
            width={ICON}
            height={ICON}
            className={styles.orbitImage}
          />
        </button>
      );
    });

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
                src="/images/logo/Fantastic_Four_Logo_Remastered.png"
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

            {renderItems(innerOrbit, innerPos)}
            {renderItems(outerOrbit, outerPos)}

            {/* Tooltip */}
            {hoveredItem?.pos && (
              <div
                className={styles.tooltip}
                style={{
                  left: `calc(50% + ${hoveredItem.pos.x}px)`,
                  top: `calc(50% + ${hoveredItem.pos.y - ICON / 2 - 10}px)`,
                }}
              >
                {hoveredItem.name}
              </div>
            )}
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
