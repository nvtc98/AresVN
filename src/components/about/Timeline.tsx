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

// Mỗi giai đoạn một màu, đi vòng theo palette sẵn có của site.
const PHASE_COLORS = ["#38bdf8", "#a78bfa", "#f43f5e", "#f59e0b"];

/**
 * Timeline ngang: 4 giai đoạn là 4 cột, mỗi cột một màu. Sự kiện nằm trên
 * trục dưới dạng chấm của giai đoạn chứa nó; rê chuột (hoặc chạm/focus) vào
 * chấm mới hiện thông tin.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const phases: { phase: TimelineItem; events: TimelineItem[] }[] = [];
  for (const it of items) {
    if (it.kind === "phase") phases.push({ phase: it, events: [] });
    else phases[phases.length - 1]?.events.push(it);
  }
  // Sự kiện xảy ra trước khi giai đoạn kế tiếp bắt đầu nên thuộc giai đoạn
  // đứng ngay trước nó trong dữ liệu.

  return (
    <ol className={styles.tl}>
      {phases.map(({ phase, events }, pi) => (
        <li
          key={phase.title}
          className={styles.tlCol}
          style={{ "--c": PHASE_COLORS[pi % PHASE_COLORS.length] } as React.CSSProperties}
        >
          <SpotlightCard className={styles.phaseCard} tabIndex={0}>
            {phase.img && (
              <div className={styles.phaseImg}>
                <Image
                  src={phase.img}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 300px"
                />
              </div>
            )}
            <div className={styles.phaseBody}>
              {phase.era && <span className={styles.phaseNo}>{phase.era}</span>}
              <h3 className={styles.phaseTitle}>{phase.title}</h3>
              <div className={styles.phaseMore}>
                <div>
                  <p className={styles.phaseText}>{phase.text}</p>
                </div>
              </div>
            </div>
          </SpotlightCard>

          <div className={styles.axis}>
            <span className={styles.axisNode} aria-hidden />
            {events.map((e, i) => (
              <span
                key={e.title}
                className={styles.evDot}
                tabIndex={0}
                aria-label={`${e.title} — ${e.date}`}
                style={{ left: `${((i + 1) / (events.length + 1)) * 100}%` }}
              >
                <span className={styles.evTip} role="tooltip">
                  <span className={styles.evDate}>{e.date}</span>
                  <span className={styles.evTitle}>{e.title}</span>
                  {e.text && <span className={styles.evText}>{e.text}</span>}
                </span>
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
