import { Button, Column, Meta, Schema, Text } from "@once-ui-system/core";
import {
  baseURL,
  testimonialsPage,
  testimonials,
  person,
  social,
} from "@/resources";
import { PageHero, SectionTitle } from "@/components/fx/PageHero";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import {
  FeaturedTestimonial,
  TestimonialWall,
} from "@/components/testimonials/TestimonialWall";
import { JumpscareOverlay } from "@/components/testimonials/Jumpscare";
import styles from "@/components/testimonials/Testimonials.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: testimonialsPage.title,
    description: testimonialsPage.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(testimonialsPage.title)}`,
    path: testimonialsPage.path,
  });
}

export default function TestimonialsPage() {
  const discord = social.find((s) => s.icon === "discord");

  return (
    <Column fillWidth gap="56" style={{ maxWidth: 1080, paddingBottom: 96 }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={testimonialsPage.title}
        description={testimonialsPage.description}
        path={testimonialsPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(testimonialsPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${testimonialsPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <PageHero
        kicker="Tiếng nói cộng đồng"
        title={testimonialsPage.label}
        subtitle="Khen có, chê có, xin vào đội cũng có. Chúng tôi trân trọng tất cả."
      />

      <FeaturedTestimonial items={testimonials} />
      <JumpscareOverlay />

      <section>
        <SectionTitle index="01" title="Bức tường danh vọng" id="buc-tuong" />
        <TestimonialWall items={testimonials} />
      </section>

      {discord && (
        <SpotlightCard className={styles.cta}>
          <Text variant="heading-strong-l">Muốn để lại vài lời?</Text>
          <Text onBackground="neutral-weak">
            Ghé Discord và nói thẳng với cả rạp xiếc.
          </Text>
          <Button
            href={discord.link}
            prefixIcon="discord"
            label="Vào Discord"
            size="m"
            variant="primary"
          />
        </SpotlightCard>
      )}
    </Column>
  );
}
