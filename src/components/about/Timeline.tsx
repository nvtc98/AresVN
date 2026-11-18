import Image from "next/image";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import styles from "./AboutPage.module.scss";

export interface TimelineItem {
  kind: string;
  date: string;
  era?: string;
  title: string;
  text: string;
  img?: string;
}

/**
 * Trục timeline ở giữa. Giai đoạn = banner rộng toàn chiều ngang với nút lớn
 * trên trục; sự kiện = một chấm nhỏ + nhãn ngắn, xen kẽ trái/phải.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  let event = 0;
  return (
    <ol className={styles.tl}>
      {items.map((e) => {
        if (e.kind === "phase") {
          return (
            <li key={e.title} className={styles.tlPhase}>
              <SpotlightCard className={styles.phaseCard}>
                {e.img && (
                  <div className={styles.phaseImg}>
                    <Image
                      src={e.img}
                      alt=""
                      fill
                      sizes="(max-width: 1200px) 100vw, 1180px"
                    />
                  </div>
                )}
                <div className={styles.phaseBody}>
                  {e.era && <span className={styles.phaseNo}>{e.era}</span>}
                  <h3 className={styles.phaseTitle}>{e.title}</h3>
                  <span className={styles.phaseDate}>{e.date}</span>
                  <p className={styles.phaseText}>{e.text}</p>
                </div>
              </SpotlightCard>
            </li>
          );
        }
        const side = event++ % 2 === 0 ? styles.evLeft : styles.evRight;
        return (
          <li
            key={e.title}
            className={`${styles.tlEvent} ${side}`}
            tabIndex={0}
          >
            <span className={styles.evDate}>{e.date}</span>
            <span className={styles.evTitle}>{e.title}</span>
            <p className={styles.evText}>{e.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
