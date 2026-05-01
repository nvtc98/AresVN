"use client";

import { useState } from "react";
import {
  Avatar,
  Column,
  Flex,
  Heading,
  Text,
  RevealFx,
} from "@once-ui-system/core";
import type { PlayerProfile } from "@/data/players";
import { Marquee } from "./magicui/Marquee";
import styles from "./TeamSection.module.css";
import classNames from "classnames";

interface TeamSectionProps {
  players: PlayerProfile[];
  showHidden?: boolean;
}

function MemberCard({ player }: { player: PlayerProfile }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <figure
      className={classNames(styles.card, expanded && styles.expanded)}
      style={{
        backgroundColor:
          expanded && player.game.cs.color ? player.game.cs.color : undefined,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Flex gap="m" vertical="center">
        <Avatar src={`/${player.img}`} size="l" />
        <Column gap="4">
          <Text variant="heading-strong-l">{player.name}</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {player.game.cs.role}
          </Text>
        </Column>
      </Flex>
      {expanded && (
        <Text
          variant="body-default-s"
          style={{ marginTop: "var(--static-space-8)" }}
        >
          {player.game.cs.description}
        </Text>
      )}
    </figure>
  );
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  players,
  showHidden = false,
}) => {
  const visiblePlayers = showHidden
    ? players
    : players.filter((p) => !p.isHidden);

  const half = Math.ceil(visiblePlayers.length / 2);
  const row1 = visiblePlayers.slice(0, half);
  const row2 = visiblePlayers.slice(half);

  return (
    <Column fillWidth gap="xl">
      <RevealFx translateY="4">
        <Heading
          as="h2"
          id="Thành viên"
          variant="display-strong-s"
          align="center"
        >
          Thành viên
        </Heading>
      </RevealFx>

      <div className={styles.marqueeContainer}>
        <Marquee pauseOnHover duration="30s">
          {row1.map((player) => (
            <MemberCard key={player.name} player={player} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover duration="30s">
          {row2.map((player) => (
            <MemberCard key={player.name} player={player} />
          ))}
        </Marquee>

        <div className={classNames(styles.fade, styles.fadeLeft)} />
        <div className={classNames(styles.fade, styles.fadeRight)} />
      </div>
    </Column>
  );
};
