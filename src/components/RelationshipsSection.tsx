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

interface RelationshipsSectionProps {
  relationships: Relationship[];
}

export const RelationshipsSection: React.FC<RelationshipsSectionProps> = ({
  relationships,
}) => {
  const [selected, setSelected] = useState<Relationship | null>(null);

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

      {/* Orbiting Circles visualization */}
      <div className={styles.orbitContainer}>
        {/* Center: AresVN logo */}
        <div className={styles.centerLogo}>
          <Image
            src="/images/logo/AresVN-logo.png"
            alt="AresVN"
            width={80}
            height={80}
            className={styles.centerImage}
          />
        </div>

        {/* Orbiting relationship avatars */}
        <OrbitingCircles radius={200} duration={40} iconSize={64} speed={1}>
          {relationships.map((rel) => (
            <button
              key={rel.name}
              className={`${styles.orbitAvatar} ${selected?.name === rel.name ? styles.orbitAvatarActive : ""}`}
              onClick={() =>
                setSelected(selected?.name === rel.name ? null : rel)
              }
              aria-label={rel.name}
              type="button"
            >
              <Image
                src={rel.img}
                alt={rel.name}
                width={64}
                height={64}
                className={styles.orbitImage}
              />
              <span className={styles.orbitLabel}>{rel.name}</span>
            </button>
          ))}
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

      {/* Fallback list for all relationships */}
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
