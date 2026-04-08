import { Column, Flex, Heading, Text } from "@once-ui-system/core";

interface Feature {
  title: string;
  text: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
}) => {
  return (
    <Column fillWidth gap="m">
      <Heading as="h2" variant="display-strong-s" marginBottom="m">
        Chào mừng
      </Heading>
      <Flex fillWidth wrap gap="l">
        {features.map((feature) => (
          <Column
            key={feature.title}
            border="neutral-medium"
            radius="l"
            padding="l"
            gap="s"
            style={{ flex: "1 1 200px", maxWidth: "100%", textAlign: "center" }}
          >
            <Text variant="display-strong-l">
              {feature.title.charAt(0).toUpperCase()}
            </Text>
            <Text variant="heading-strong-m">{feature.title}</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {feature.text}
            </Text>
          </Column>
        ))}
      </Flex>
    </Column>
  );
};
