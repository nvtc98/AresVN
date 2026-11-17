import { Column, GlitchFx, Heading, LetterFx, Text } from "@once-ui-system/core";
import styles from "./fx.module.scss";

const glitchCharset = ["X", "$", "@", "#", "?", "*", "0", "1", "+", "z", "H"];

interface PageHeroProps {
  kicker: string;
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

/** Glitch title header shared by every inner page. */
export function PageHero({ kicker, title, subtitle, children }: PageHeroProps) {
  return (
    <header className={styles.hero}>
      <span className={styles.kicker}>{kicker}</span>
      <GlitchFx speed="medium">
        <Heading as="h1" variant="display-strong-l" className={styles.title}>
          <LetterFx speed="medium" trigger="instant" charset={glitchCharset}>
            {title}
          </LetterFx>
        </Heading>
      </GlitchFx>
      {subtitle && (
        <Text variant="body-default-l" className={styles.subtitle}>
          {subtitle}
        </Text>
      )}
      {children && <Column horizontal="center">{children}</Column>}
    </header>
  );
}

/** "01 / Title" heading used to separate page sections. */
export function SectionTitle({
  index,
  title,
  id,
}: {
  index: string;
  title: string;
  id?: string;
}) {
  return (
    <div className={styles.sectionTitle}>
      <span className={styles.sectionIndex}>{index}</span>
      <Heading as="h2" variant="heading-strong-xl" id={id}>
        {title}
      </Heading>
    </div>
  );
}

export function Stars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className={styles.stars} aria-label={`${value}/${max} sao`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? styles.starOn : styles.starOff}>
          ★
        </span>
      ))}
    </span>
  );
}
