"use client";

import { useEffect, useRef } from "react";

export function GranimBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let granimInstance: any = null;

    const loadGranim = async () => {
      if (!canvasRef.current) return;

      const Granim = (await import("granim")).default;
      granimInstance = new Granim({
        element: canvasRef.current,
        direction: "top-bottom",
        isPausedWhenNotInView: true,
        states: {
          "default-state": {
            gradients: [
              ["#0a0015", "#1a0a2e"],
              ["#4fc3f7", "#b0bec5"],
              ["#0f0c29", "#302b63"],
              ["#00e5ff", "#cfd8dc"],
              ["#120024", "#09012a"],
              ["#40c4ff", "#90a4ae"],
              ["#1a002a", "#0d0221"],
              ["#80d8ff", "#eceff1"],
            ],
            transitionSpeed: 5000,
          },
        },
      });
    };

    loadGranim();

    return () => {
      if (granimInstance) {
        granimInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      {/* Logo watermark overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
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
          src="/images/logo/Fantastic_Four_Logo_Remastered.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: 0.08,
            scale: 2,
          }}
        />
      </div>
    </>
  );
}
