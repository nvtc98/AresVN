import { Column, Flex, IconButton, Text } from "@once-ui-system/core";
import { social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Column as="footer" fillWidth horizontal="center" padding="8" gap="24">
      <Column maxWidth="m" fillWidth paddingX="16" gap="12">
        <Text variant="heading-default-s" onBackground="neutral-strong">
          Trụ sở
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Phường Phú Thọ Hòa, thành phố Hồ Chí Minh
        </Text>
        <Flex
          fillWidth
          radius="m"
          overflow="hidden"
          style={{ aspectRatio: "16 / 9", maxHeight: 300 }}
        >
          <iframe
            title="AresVN Headquarters"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15677.993611814948!2d106.62636!3d10.78694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea10f98696d%3A0x2beb3e0f41d29a12!2zUGjDuiBUaOG7jSBIw7JhLCBUw6JuIFBow7osIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Flex>
      </Column>

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
