"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Jumpscare.module.scss";

const EVENT = "aresvn:jumpscare";
const DURATION = 1400;

/** Fire the jumpscare from anywhere on the page. */
export function triggerJumpscare(src: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: src }));
}

/**
 * Synthesized scream: a burst of noise plus a detuned sawtooth sliding down.
 * Browsers only allow audio after the visitor has interacted with the page,
 * so before the first click/tap this simply stays silent.
 */
function scream() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    if (ctx.state !== "running") {
      ctx.close();
      return;
    }
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
    master.connect(ctx.destination);

    // noise burst
    const len = ctx.sampleRate * 1.1;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 1800;
    band.Q.value = 0.8;
    noise.connect(band).connect(master);
    noise.start(now);

    // shrieking oscillators
    [0, 13, -17].forEach((detune) => {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.detune.value = detune * 10;
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 1);
      osc.connect(master);
      osc.start(now);
      osc.stop(now + 1.1);
    });

    setTimeout(() => ctx.close(), 1300);
  } catch {
    /* audio is a bonus, never block the scare */
  }
}

/**
 * Mount once per page; renders nothing until triggered.
 * Fires only once per visit: the flag lives in this component, so it resets
 * when the visitor leaves the page and comes back (the overlay remounts).
 */
export function JumpscareOverlay() {
  const [src, setSrc] = useState<string | null>(null);
  const timer = useRef<number>(0);
  const fired = useRef(false);

  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    setSrc(null);
  }, []);

  useEffect(() => {
    const onScare = (e: Event) => {
      if (fired.current) return;
      fired.current = true;
      const next = (e as CustomEvent<string>).detail;
      setSrc(next);
      scream();
      navigator.vibrate?.([120, 40, 200]);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setSrc(null), DURATION);
    };
    window.addEventListener(EVENT, onScare);
    return () => {
      window.removeEventListener(EVENT, onScare);
      window.clearTimeout(timer.current);
    };
  }, []);

  if (!src) return null;

  return (
    <div className={styles.overlay} onClick={close} aria-hidden>
      <div className={styles.flash} />
      <div className={styles.face}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className={styles.red} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className={styles.cyan} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className={styles.main} />
      </div>
      <div className={styles.noise} />
      <div className={styles.vignette} />
    </div>
  );
}
