"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, Column, Flex, Heading, Text } from "@once-ui-system/core";
import { OrbitingCircles } from "@/components/magicui/OrbitingCircles";
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

// Helper to find a relationship by name
function findRel(relationships: Relationship[], name: string) {
  return relationships.find((r) => r.name === name) ?? null;
}

export const RelationshipsSection: React.FC<RelationshipsSectionProps> = ({
  relationships,
}) => {
  const [selected, setSelected] = useState<Relationship | null>(null);

  // Inner orbit: G3 Esports, The Eyes, Afterschool Weather Club
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

  // Outer orbit: Paragames Team, Nomads' Tavern, RinFarm
  const outerOrbit: OrbitTeam[] = [
    {
      img: "/images/relationships/paragames.png",
      name: "Paragames Team",
      data: findRel(relationships, "Paragames Team"),
    },
    {
      img: "/images/relationships/nomadstavern.png",
      name: "Nomads' Tavern",
      data: null,
    },
    { img: "/images/relationships/rinfarm.png", name: "RinFarm", data: null },
  ];

  const handleClick = (team: OrbitTeam) => {
    if (team.data) {
      setSelected(selected?.name === team.name ? null : team.data);
    }
  };

  const renderAvatar = (team: OrbitTeam) => (
    <button
      key={team.name}
      className={`${styles.orbitAvatar} ${selected?.name === team.name ? styles.orbitAvatarActive : ""}`}
      onClick={() => handleClick(team)}
      aria-label={team.name}
      type="button"
    >
      <Image
        src={team.img}
        alt={team.name}
        width={64}
        height={64}
        className={styles.orbitImage}
      />
      <span className={styles.orbitLabel}>{team.name}</span>
    </button>
  );

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

      {/* Orbiting Circles — 2 layers */}
      <div className={styles.orbitContainer}>
        {/* Center: AresVN logo */}
        <div className={styles.centerLogo}>
          <Image
            src="/images/logo/Fantastic_Four_Logo_Remastered.png"
            alt="AresVN"
            width={480}
            height={480}
            className={styles.centerImage}
          />
        </div>

        {/* Inner orbit */}
        <OrbitingCircles radius={140} duration={35} iconSize={64} speed={3}>
          {innerOrbit.map(renderAvatar)}
        </OrbitingCircles>

        {/* Outer orbit — reverse direction */}
        <OrbitingCircles
          radius={240}
          duration={50}
          iconSize={64}
          speed={1}
          reverse
        >
          {outerOrbit.map(renderAvatar)}
        </OrbitingCircles>
      </div>

      {/* Detail card when selected */}
      {selected && (
        <Column
          border="neutral-medium"
          radius="l"
          padding="l"
          gap="m"
          className={styles.detailCard}
        >
          <Flex gap="m" vertical="center">
            <Avatar src={selected.img} size="l" />
            <Column gap="4">
              <Text variant="heading-strong-l">{selected.name}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {selected.relationship}
              </Text>
            </Column>
          </Flex>
          <Column gap="s">
            {selected.descriptions.map((desc, i) => (
              <Text key={`${selected.name}-desc-${i}`} variant="body-default-m">
                {desc}
              </Text>
            ))}
          </Column>
        </Column>
      )}

      {/* Detail list */}
      <Heading as="h3" variant="heading-strong-m">
        Chi tiết
      </Heading>
      <Flex fillWidth direction="column" gap="l">
        {relationships.map((rel) => (
          <Column
            key={rel.name}
            border="neutral-medium"
            radius="l"
            padding="l"
            gap="m"
          >
            <Flex gap="m" vertical="center">
              <Avatar src={rel.img} size="l" />
              <Column gap="4">
                <Text variant="heading-strong-l">{rel.name}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {rel.relationship}
                </Text>
              </Column>
            </Flex>
            <Column gap="s">
              {rel.descriptions.map((desc, i) => (
                <Text key={`${rel.name}-desc-${i}`} variant="body-default-m">
                  {desc}
                </Text>
              ))}
            </Column>
          </Column>
        ))}
      </Flex>
    </Column>
  );
};
