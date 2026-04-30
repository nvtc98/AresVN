import React from "react";

import {
  Heading,
  Flex,
  Text,
  RevealFx,
  Column,
  Schema,
  LetterFx,
  GlitchFx,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";

const glitchCharset = [
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
];

export default function Home() {
  return (
    <Column
      fillWidth
      horizontal="center"
      vertical="center"
      style={{ minHeight: "80vh" }}
    >
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

      {/* Hero section — test-granim style with logo overlay + centered text */}
      <Flex
        fillWidth
        horizontal="center"
        vertical="center"
        style={{
          position: "relative",
          minHeight: "70vh",
          overflow: "hidden",
        }}
      >
        {/* Logo overlay — full viewport width */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/Fantastic_Four_Logo_Remastered_Large.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.7,
            }}
          />
        </div>

        {/* Text content */}
        <Column
          horizontal="center"
          vertical="center"
          gap="m"
          fillWidth
          style={{ position: "relative", zIndex: 1 }}
        >
          <GlitchFx fillWidth speed="medium">
            <Heading
              as="h1"
              variant="display-strong-xl"
              style={{
                letterSpacing: "0.1em",
                textShadow: "0 0 30px rgba(130, 80, 255, 0.6)",
                textAlign: "center",
                width: "100%",
              }}
            >
              <LetterFx
                speed="medium"
                trigger="instant"
                charset={glitchCharset}
              >
                AresVN
              </LetterFx>
            </Heading>
          </GlitchFx>

          <RevealFx translateY="8" delay={0.2} style={{ width: "100%" }}>
            <Text
              variant="heading-default-l"
              onBackground="neutral-weak"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                textAlign: "center",
                width: "100%",
                color: "#e5e5e5ff",
              }}
            >
              <LetterFx
                speed="medium"
                trigger="instant"
                charset={glitchCharset}
              >
                Việt Chiến Thần · Est. 2019
              </LetterFx>
            </Text>
          </RevealFx>
        </Column>
      </Flex>
    </Column>
  );
}
