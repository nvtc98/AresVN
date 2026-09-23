import { Column, Flex, IconButton, Text } from "@once-ui-system/core";
import { social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Column as="footer" fillWidth horizontal="center" padding="8" gap="24">
      <Flex
        className={styles.mobile}
        maxWidth="m"
        fillWidth
        paddingY="8"
        paddingX="16"
        gap="16"
        vertical="center"
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">
            © {currentYear} AresVN. All rights reserved.
          </Text>
        </Text>
        <Flex gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Flex>
      </Flex>
      <Flex height="80" />
    </Column>
  );
};
