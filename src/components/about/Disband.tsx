"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import styles from "./Disband.module.scss";

/**
 * Nút "Disband": bấm vào là cả trang tan thành bụi như cú búng tay của Thanos,
 * im lặng một nhịp, rồi tự ráp lại và hiện lời khẳng định của team.
 *
 * Hiệu ứng không cần thư viện: mỗi khối nội dung (hero, tiêu đề mục, thẻ, dock,
 * footer...) được gắn một bộ lọc SVG riêng (nhiễu hạt cắt dần alpha + nhiễu
 * tần số thấp làm "gió" thổi vụn đi) và trôi lên phải. Các khối bắt đầu lệch
 * nhau từ trái sang phải nên trông như bụi lan dần chứ không biến mất cùng lúc.
 */

type Phase = "idle" | "snapping" | "void" | "dialog" | "returning" | "message";

const SVG_NS = "http://www.w3.org/2000/svg";
const SNAP = { spread: 1700, duration: 1500 };
const RETURN = { spread: 800, duration: 1100 };
const DIALOG_LEAD_MS = 500;
const MESSAGE_LEAD_MS = 250;

interface Piece {
  el: HTMLElement;
  /** Có nằm trong khung nhìn không; khối ngoài khung chỉ ẩn/hiện, không lọc. */
  visible: boolean;
  /** 0..1, theo vị trí ngang + chút ngẫu nhiên. */
  delay: number;
  dx: number;
  dy: number;
  rot: number;
  warp: SVGElement;
  mask: SVGElement;
  orig: { filter: string; transform: string; opacity: string };
}

function svgEl(name: string, attrs: Record<string, string>) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

/** Các khối sẽ tan: con trực tiếp của trang, tách tiếp từng mục, cộng dock và footer. */
function collectChunks(): HTMLElement[] {
  const found = new Set<HTMLElement>();
  document
    .querySelectorAll<HTMLElement>("[data-snap-root] > *")
    .forEach((el) => {
      if (el.tagName === "SECTION") {
        for (const child of Array.from(el.children)) {
          if (child instanceof HTMLElement) found.add(child);
        }
      } else {
        found.add(el);
      }
    });
  document
    .querySelectorAll<HTMLElement>("[data-snap], body > footer, footer")
    .forEach((el) => found.add(el));

  return Array.from(found).filter((el) => {
    const r = el.getBoundingClientRect();
    return (
      r.width > 0 && r.height > 0 && getComputedStyle(el).display !== "none"
    );
  });
}

function buildPieces(): { pieces: Piece[]; teardown: () => void } {
  const svg = svgEl("svg", {
    width: "0",
    height: "0",
    "aria-hidden": "true",
    focusable: "false",
  });
  svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none";
  const defs = svgEl("defs", {});
  svg.appendChild(defs);

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const pieces: Piece[] = collectChunks().map((el, i) => {
    const r = el.getBoundingClientRect();
    const visible =
      r.bottom > -80 && r.top < vh + 80 && r.right > 0 && r.left < vw;
    const id = `disband-dust-${i}`;

    const filter = svgEl("filter", {
      id,
      x: "-30%",
      y: "-30%",
      width: "160%",
      height: "160%",
      "color-interpolation-filters": "sRGB",
    });
    filter.appendChild(
      svgEl("feTurbulence", {
        type: "fractalNoise",
        baseFrequency: "0.035",
        numOctaves: "2",
        seed: String(i + 3),
        result: "warp",
      }),
    );
    const warp = svgEl("feDisplacementMap", {
      in: "SourceGraphic",
      in2: "warp",
      scale: "0",
      xChannelSelector: "R",
      yChannelSelector: "G",
      result: "moved",
    });
    filter.appendChild(warp);
    filter.appendChild(
      svgEl("feTurbulence", {
        type: "fractalNoise",
        baseFrequency: "0.85",
        numOctaves: "2",
        seed: String(i + 41),
        result: "grain",
      }),
    );
    const mask = svgEl("feColorMatrix", {
      in: "grain",
      type: "matrix",
      values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1",
      result: "mask",
    });
    filter.appendChild(mask);
    filter.appendChild(
      svgEl("feComposite", { in: "moved", in2: "mask", operator: "in" }),
    );
    defs.appendChild(filter);

    el.style.willChange = "transform, opacity, filter";
    const center = (r.left + r.width / 2) / vw;
    return {
      el,
      visible,
      // Quét từ trái sang phải, lệch ngẫu nhiên để các khối không đồng loạt.
      delay: Math.min(1, Math.max(0, center * 0.65 + Math.random() * 0.35)),
      dx: 30 + Math.random() * 90,
      dy: -(20 + Math.random() * 90),
      rot: (Math.random() - 0.5) * 9,
      warp,
      mask,
      orig: {
        filter: el.style.filter,
        transform: el.style.transform,
        opacity: el.style.opacity,
      },
    };
  });

  document.body.appendChild(svg);

  return {
    pieces,
    teardown: () => {
      for (const p of pieces) {
        p.el.style.filter = p.orig.filter;
        p.el.style.transform = p.orig.transform;
        p.el.style.opacity = p.orig.opacity;
        p.el.style.willChange = "";
      }
      svg.remove();
    },
  };
}

/** p = 0: nguyên vẹn, p = 1: đã tan hết. */
function paint(pc: Piece, index: number, p: number) {
  const s = pc.el.style;
  if (p <= 0) {
    s.filter = pc.orig.filter;
    s.transform = pc.orig.transform;
    s.opacity = pc.orig.opacity;
    return;
  }
  if (p >= 1 || !pc.visible) {
    s.filter = "none";
    s.transform = pc.orig.transform;
    s.opacity = p >= 0.5 ? "0" : pc.orig.opacity;
    return;
  }
  // Ngưỡng nhiễu tăng dần: hạt nào có nhiễu thấp hơn ngưỡng thì mất trước.
  const strength = 9;
  const threshold = -0.15 + 1.3 * p;
  pc.mask.setAttribute(
    "values",
    `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${strength} 0 0 0 ${(1 - strength * threshold).toFixed(3)}`,
  );
  pc.warp.setAttribute("scale", (p * 110).toFixed(1));
  s.filter = `url(#disband-dust-${index})`;
  s.transform = `translate3d(${(pc.dx * p).toFixed(1)}px, ${(pc.dy * p).toFixed(1)}px, 0) rotate(${(pc.rot * p).toFixed(2)}deg)`;
  s.opacity = p > 0.8 ? String(Math.max(0, 1 - (p - 0.8) / 0.2)) : "1";
}

/** Lớp canvas vẽ từng hạt bụi bay ra từ các khối đang tan. */
function createDust() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2147482999";
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const colors = [
    "#e8eefc",
    "#c4d0ea",
    "#9fb4d6",
    "#9fb4d6",
    "#fb7185",
    "#38bdf8",
  ];
  type Grain = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    decay: number;
    color: string;
    phase: number;
  };
  const grains: Grain[] = [];
  let raf = 0;
  let disposed = false;

  const frame = () => {
    if (!ctx || disposed) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = grains.length - 1; i >= 0; i--) {
      const g = grains[i];
      g.phase += 0.08;
      g.x += g.vx + Math.sin(g.phase) * 0.35;
      g.y += g.vy;
      g.vy -= 0.004;
      g.life -= g.decay;
      if (g.life <= 0) {
        grains.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = Math.min(1, g.life * 1.4);
      ctx.fillStyle = g.color;
      ctx.fillRect(g.x * dpr, g.y * dpr, g.size * dpr, g.size * dpr);
    }
    raf = grains.length ? requestAnimationFrame(frame) : 0;
  };

  return {
    emit(rect: DOMRect, amount: number) {
      const x0 = Math.max(0, rect.left);
      const x1 = Math.min(window.innerWidth, rect.right);
      const y0 = Math.max(0, rect.top);
      const y1 = Math.min(window.innerHeight, rect.bottom);
      if (x1 <= x0 || y1 <= y0) return;
      const n = Math.min(60, Math.round(amount));
      for (let i = 0; i < n && grains.length < 5000; i++) {
        grains.push({
          x: x0 + Math.random() * (x1 - x0),
          y: y0 + Math.random() * (y1 - y0),
          vx: 0.5 + Math.random() * 2.4,
          vy: -(0.2 + Math.random() * 1.8),
          size: 1 + Math.random() * 2,
          life: 1,
          decay: 0.008 + Math.random() * 0.014,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * 6.28,
        });
      }
      if (!raf) raf = requestAnimationFrame(frame);
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      canvas.remove();
    },
  };
}

type Dust = ReturnType<typeof createDust>;

function animate(
  pieces: Piece[],
  dir: 1 | -1,
  { spread, duration }: { spread: number; duration: number },
  onDone: () => void,
  dust?: Dust,
) {
  const start = performance.now();
  const prev = pieces.map(() => 0);
  let id = 0;
  const tick = (now: number) => {
    const t = now - start;
    let done = true;
    pieces.forEach((pc, i) => {
      const lead = (dir === 1 ? pc.delay : 1 - pc.delay) * spread;
      const k = Math.min(1, Math.max(0, (t - lead) / duration));
      if (k < 1) done = false;
      const eased = k * k * (3 - 2 * k);
      paint(pc, i, dir === 1 ? eased : 1 - eased);
      if (dust && pc.visible && eased > prev[i]) {
        const r = pc.el.getBoundingClientRect();
        dust.emit(r, (eased - prev[i]) * Math.sqrt(r.width * r.height) * 1.6);
      }
      prev[i] = eased;
    });
    if (done) onDone();
    else id = requestAnimationFrame(tick);
  };
  id = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(id);
}

export function Disband() {
  const [phase, setPhase] = useState<Phase>("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);
  const cancelAnim = useRef<(() => void) | null>(null);
  const teardown = useRef<(() => void) | null>(null);
  const piecesRef = useRef<Piece[]>([]);
  const dustRef = useRef<Dust | null>(null);

  const reset = useCallback(() => {
    cancelAnim.current?.();
    cancelAnim.current = null;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    teardown.current?.();
    teardown.current = null;
    dustRef.current?.dispose();
    dustRef.current = null;
  }, []);

  // Rời trang giữa chừng thì trả mọi thứ về nguyên trạng.
  useEffect(() => reset, [reset]);

  const after = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const start = () => {
    if (phase !== "idle") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const built = reduceMotion ? null : buildPieces();
    if (!built || built.pieces.length === 0) {
      built?.teardown();
      setPhase("dialog");
      return;
    }

    const { pieces } = built;
    piecesRef.current = pieces;
    teardown.current = built.teardown;
    dustRef.current = createDust();
    setPhase("snapping");

    cancelAnim.current = animate(
      pieces,
      1,
      SNAP,
      () => {
        setPhase("void");
        // Bụi còn đang bay thì chờ chút rồi mới hiện hộp thoại.
        after(DIALOG_LEAD_MS, () => setPhase("dialog"));
      },
      dustRef.current,
    );
  };

  /** Người dùng bấm OK: bây giờ mới hồi phục trang. */
  const recover = () => {
    setPhase("returning");
    cancelAnim.current = animate(piecesRef.current, -1, RETURN, () => {
      reset();
      after(MESSAGE_LEAD_MS, () => setPhase("message"));
    });
  };

  const close = useCallback(() => {
    setPhase("idle");
    buttonRef.current?.focus();
  }, []);

  const busy = phase !== "idle" && phase !== "message";
  const locked = busy && phase !== "dialog";

  // Trong lúc đang tan/ráp lại: chặn cuộn để không lộ khối ngoài khung nhìn.
  useEffect(() => {
    if (!locked) return;
    const stop = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", stop, { passive: false });
    window.addEventListener("touchmove", stop, { passive: false });
    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
  }, [locked]);

  useEffect(() => {
    if (phase !== "message") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 4200);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [phase, close]);

  return (
    <>
      <SpotlightCard className={styles.card}>
        <p className={styles.lead}>
          Chúng tôi đã disband, đang disband, sẽ disband và luôn disband.
          <br />
          Đúng vậy, bạn cũng có thể bấm vào đây để disband chúng tôi ngay.
        </p>
        <button
          ref={buttonRef}
          type="button"
          className={styles.button}
          onClick={start}
          disabled={busy}
        >
          <span className={styles.buttonGlow} aria-hidden />
          <span className={styles.buttonLabel}>Disband</span>
        </button>
      </SpotlightCard>

      {phase !== "idle" &&
        createPortal(
          <div className={styles.veil} data-phase={phase}>
            {phase === "dialog" && (
              <div
                className={styles.alert}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="disband-done-title"
                aria-describedby="disband-done-text"
              >
                <span className={styles.alertKicker}>// hệ thống</span>
                <h3 id="disband-done-title" className={styles.alertTitle}>
                  Disband thành công
                </h3>
                <p id="disband-done-text" className={styles.alertText}>
                  Rạp xiếc đã tan rã.
                </p>
                <button
                  type="button"
                  className={styles.ok}
                  onClick={recover}
                  autoFocus
                >
                  OK
                </button>
              </div>
            )}

            {phase === "message" && (
              <div
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-label="Chúng tôi luôn trở lại"
              >
                <p className={styles.turn}>
                  Đúng vậy, như bạn thấy, lần nào cũng vậy: &ldquo;xóa game
                  thôi&rdquo;, &ldquo;nay bận rồi&rdquo;, hoặc cứ để mọi thứ rơi
                  vào yên lặng như một lẽ tự nhiên.
                </p>

                <p className={styles.vow}>
                  Để rồi sau đó, chúng tôi lại vẫn{" "}
                  <strong>trở lại, cùng nhau</strong>.
                </p>

                <p className={styles.reason}>
                  Vì chữ <em>T</em> và <em>D</em> trong AresVN có nghĩa là{" "}
                  <em>Totally Disband</em>.
                </p>

                <button
                  ref={closeRef}
                  type="button"
                  className={styles.close}
                  onClick={close}
                >
                  Quay lại rạp xiếc
                </button>
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
