import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Tag,
  Text,
  Meta,
  Schema,
} from "@once-ui-system/core";
import {
  baseURL,
  about,
  person,
  social,
  relationships,
  testimonials,
} from "@/resources";
import { getActivePlayers } from "@/data/players";
import TableOfContents from "@/components/about/TableOfContents";
import { TeamSection } from "@/components/TeamSection";
import { RelationshipsSection } from "@/components/RelationshipsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: "Thông tin đội",
      display: about.teamDetails.length > 0,
      items: about.teamDetails.map((detail) => detail.name),
    },
    {
      title: "Video giới thiệu",
      display: !!about.youtubeVideoId,
      items: [],
    },
    {
      title: "Thành viên",
      display: true,
      items: [],
    },
    {
      title: "Mối quan hệ",
      display: relationships.length > 0,
      items: relationships.map((r) => r.name),
    },
    {
      title: "Nhận xét",
      display: testimonials.length > 0,
      items: [],
    },
  ];

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          {/* Intro section */}
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Button
                          className="s-flex-hide"
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="s"
                          weight="default"
                          variant="secondary"
                        />
                        <IconButton
                          className="s-flex-show"
                          size="l"
                          href={item.link}
                          icon={item.icon}
                          variant="secondary"
                        />
                      </React.Fragment>
                    ),
                )}
              </Flex>
            )}
          </Column>

          {/* Full introduction paragraph */}
          {about.intro.display && (
            <Column
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="xl"
            >
              {about.intro.description}
            </Column>
          )}

          {/* Team details section */}
          {about.teamDetails.length > 0 && (
            <>
              <Heading
                as="h2"
                id="Thông tin đội"
                variant="display-strong-s"
                marginBottom="m"
              >
                Thông tin đội
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.teamDetails.map((detail, index) => (
                  <Column key={`${detail.name}-${index}`} fillWidth gap="4">
                    <Text id={detail.name} variant="heading-strong-l">
                      {detail.name}
                    </Text>
                    <Flex wrap gap="8" paddingTop="4">
                      {detail.text.map((item, i) => (
                        <Tag key={`${detail.name}-${i}`} size="l">
                          {item}
                        </Tag>
                      ))}
                    </Flex>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {/* YouTube introduction video */}
          {about.youtubeVideoId && (
            <>
              <Heading
                as="h2"
                id="Video giới thiệu"
                variant="display-strong-s"
                marginBottom="m"
              >
                Video giới thiệu
              </Heading>
              <Column fillWidth marginBottom="40">
                <Flex
                  fillWidth
                  border="neutral-medium"
                  radius="l"
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: "inherit",
                    }}
                    src={`https://www.youtube.com/embed/${about.youtubeVideoId}`}
                    title="AresVN Introduction Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Flex>
              </Column>
            </>
          )}

          {/* Team section */}
          <TeamSection players={getActivePlayers()} />

          {/* Relationships section */}
          {relationships.length > 0 && (
            <RelationshipsSection relationships={relationships} />
          )}

          {/* Testimonials section */}
          {testimonials.length > 0 && (
            <TestimonialsSection testimonials={testimonials} />
          )}
        </Column>
      </Flex>
    </Column>
  );
}
