import { Avatar, Column, Flex, Heading, Text } from "@once-ui-system/core";

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
  return (
    <Column fillWidth gap="m">
      <Heading
        as="h2"
        id="Mối quan hệ"
        variant="display-strong-s"
        marginBottom="m"
      >
        Mối quan hệ
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
