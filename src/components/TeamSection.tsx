"use client";

import { useState } from "react";
import { Avatar, Column, Flex, Heading, Text } from "@once-ui-system/core";
import type { PlayerProfile } from "@/data/players";

interface TeamSectionProps {
  players: PlayerProfile[];
  showHidden?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  players,
  showHidden = false,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const visiblePlayers = showHidden
    ? players
    : players.filter((p) => !p.isHidden);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Column fillWidth gap="m">
      <Heading
        as="h2"
        id="Thành viên"
        variant="display-strong-s"
        marginBottom="m"
      >
        Thành viên
      </Heading>
      <Flex fillWidth wrap gap="l">
        {visiblePlayers.map((player, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <Column
              key={player.name}
              border="neutral-medium"
              radius="l"
              padding="l"
              gap="m"
              style={{
                cursor: "pointer",
                flex: "1 1 280px",
                maxWidth: "100%",
                backgroundColor:
                  isExpanded && player.game.cs.color
                    ? player.game.cs.color
                    : undefined,
                transition: "background-color 0.3s ease",
              }}
              onClick={() => handleToggle(index)}
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
              {isExpanded && (
                <Text
                  variant="body-default-m"
                  style={{ marginTop: "var(--static-space-8)" }}
                >
                  {player.game.cs.description}
                </Text>
              )}
            </Column>
          );
        })}
      </Flex>
    </Column>
  );
};
