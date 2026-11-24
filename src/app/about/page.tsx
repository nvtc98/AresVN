import React from "react";
import { Button, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, social, relationships } from "@/resources";
import { getActivePlayers } from "@/data/players";
import { PageHero, SectionTitle } from "@/components/fx/PageHero";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { StatsStrip } from "@/components/fx/StatsStrip";
import { Acrostic } from "@/components/about/Acrostic";
import { Timeline } from "@/components/about/Timeline";
import { GamesGrid } from "@/components/about/GamesGrid";
import { Disband } from "@/components/about/Disband";
import styles from "@/components/about/AboutPage.module.scss";

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
  const aliases =
    about.teamDetails.find((d) => d.name.startsWith("Tên khác"))?.text ?? [];

  const stats = [
    { value: 2019, from: 2000, label: "Thành lập" },
    { value: 50, suffix: "+", label: "Tựa game" },
    { value: getActivePlayers().length, label: "Thành viên" },
    { value: relationships.length, label: "Đồng minh" },
  ];

  return (
    <div className={styles.page} data-snap-root>
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

      <PageHero
        kicker="Việt Chiến Thần · 越戰神"
        title={person.name}
        subtitle={person.role}
      >
        <div className={styles.socials} data-border="rounded">
          {social.map((item) => (
            <Button
              key={item.name}
              href={item.link}
              prefixIcon={item.icon}
              label={item.name}
              size="s"
              weight="default"
              variant="secondary"
            />
          ))}
        </div>
      </PageHero>

      <StatsStrip stats={stats} />

      <section>
        <SectionTitle index="01" title={about.intro.title} id="gioi-thieu" />
        <div className={styles.introGrid}>
          <SpotlightCard className={styles.introCard}>
            <Text variant="body-default-l">{about.intro.description}</Text>
          </SpotlightCard>
          <SpotlightCard className={styles.mottoCard}>
            <span className={styles.quoteMark} aria-hidden>
              &ldquo;
            </span>
            <p className={styles.motto}>{about.motto}</p>
            <span className={styles.mottoFoot}>— AresVN</span>
          </SpotlightCard>
        </div>
      </section>

      <section>
        <SectionTitle index="02" title="Tuyên ngôn" id="tuyen-ngon" />
        <Acrostic lines={about.acrostic} />
      </section>

      <section>
        <SectionTitle index="03" title="Hành trình" id="hanh-trinh" />
        <Timeline items={about.timeline} />
      </section>

      <section>
        <SectionTitle index="04" title="Đấu trường" id="dau-truong" />
        <GamesGrid games={about.games} />
        <div className={styles.aliases}>
          {aliases.map((a) => (
            <span key={a} className={styles.alias}>
              {a}
            </span>
          ))}
        </div>
      </section>

      {about.youtubeVideoId && (
        <section>
          <SectionTitle index="05" title="Video giới thiệu" id="video" />
          <SpotlightCard className={styles.video}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${about.youtubeVideoId}`}
              title="AresVN Introduction Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </SpotlightCard>
        </section>
      )}

      <section>
        <SectionTitle
          index={about.youtubeVideoId ? "06" : "05"}
          title="Không hài lòng?"
          id="disband"
        />
        <Disband />
      </section>
    </div>
  );
}
