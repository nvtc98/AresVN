import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Row,
  Schema,
  GlitchFx,
  LetterFx,
  Media,
  HoloFx,
  IconButton,
} from "@once-ui-system/core";
import { home, about, person, social, features, baseURL } from "@/resources";
import { FeaturesSection } from "@/components/FeaturesSection";

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <GlitchFx fillWidth speed="medium">
        <Column center fillWidth gap="8">
          <HoloFx
            fillWidth
            shine={{
              opacity: 30,
              blending: "color-dodge",
            }}
            burn={{
              opacity: 30,
              blending: "revert",
            }}
          >
            <Media
              enlarge
              radius="m"
              src="/images/logo/Fantastic_Four_Logo_Remastered.png"
            />
          </HoloFx>
          <LetterFx
            speed="medium"
            trigger="instant"
            charset={[
              "X",
              "$",
              "@",
              "a",
              "H",
              "z",
              "0",
              "y",
              "#",
              "?",
              "*",
              "0",
              "1",
              "+",
            ]}
          >
            Welcome to
          </LetterFx>
          <Heading as="h2" align="center" variant="display-default-xs">
            <LetterFx
              speed="medium"
              trigger="instant"
              charset={[
                "X",
                "$",
                "@",
                "a",
                "H",
                "z",
                "0",
                "y",
                "#",
                "?",
                "*",
                "0",
                "1",
                "+",
              ]}
            >
              AresVN
            </LetterFx>
          </Heading>
        </Column>
      </GlitchFx>

      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="16"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="start">
            <Flex gap="16" vertical="center" wrap>
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Flex gap="8" vertical="center" paddingRight="4">
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                  {about.label}
                </Flex>
              </Button>
            </Flex>
          </RevealFx>
        </Column>
      </Column>

      <RevealFx translateY="8" delay={0.6} fillWidth>
        <Flex gap="16" horizontal="center" vertical="center" wrap>
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="l"
                  variant="secondary"
                />
              ),
          )}
        </Flex>
      </RevealFx>
    </Column>
  );
}
