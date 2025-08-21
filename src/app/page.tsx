import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Meta,
  Schema,
  GlitchFx,
  LetterFx,
  Media,
  Mask,
  HoloFx,
  Fade,
} from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export default function Home() {
  const isFirstTime = true;
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
      {/* <video
        src="/videos/bg.mp4"
        autoPlay
        muted // ✅ bắt buộc để autoplay
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      /> */}

      <GlitchFx fillWidth speed="medium">
        <Column center fillWidth gap="8">
          <Media
            enlarge
            radius="m"
            //@ts-ignore
            // sizes={1600}
            //@ts-ignore
            // alt={image.alt}
            //@ts-ignore
            src={"/images/logo/Fantastic_Four_Logo.png"}
          />
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
      <Row fillWidth fitHeight gap="16" s={{ direction: "column" }}>
        <Mask fill width={48} cursor radius={25}>
          <Media
            radius="full"
            aspectRatio="1/1"
            src={"/images/logo/Fantastic_Four_Logo.png"}
          />
        </Mask>
        <Heading as="h2" align="center" variant="display-default-xs">
          AresVN AresVN AresVN AresVN AresVN AresVN AresVN AresVN AresVN AresVN
        </Heading>
      </Row>
      {/* <GlitchFx fillWidth speed="medium">
        <Media aspectRatio="1/1" src={"/images/logo/AresVN-logo.png"} />
      </GlitchFx> */}
      <Mask
        width="m"
        height="m"
        // fill
        // aspectRatio="2216/2305"
        border="neutral-alpha-medium"
        // x={50}
        // y={50}
        // radius={80}
        // cursor
      >
        <HoloFx
          // fill
          // fillWidth
          // maxWidth={24}
          fillWidth
          shine={{
            opacity: 30,
            blending: "color-dodge",
          }}
          burn={{
            opacity: 30,
            blending: "revert",
          }}
          texture={{
            opacity: 10,
            image: "/images/textures/foil.jpg",
            blending: "color-dodge",
          }}
        >
          <Media src={"/images/logo/AresVN-logo.png"} />
        </HoloFx>
      </Mask>
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="start"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
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
          <RevealFx
            paddingTop="12"
            delay={0.4}
            horizontal="start"
            paddingLeft="12"
          >
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
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex
          fillWidth
          gap="24"
          // mobileDirection="column"
        >
          <Flex flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
      <Projects range={[2]} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
