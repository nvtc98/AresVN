declare module "granim" {
  interface GranimGradientState {
    gradients: string[][];
    transitionSpeed?: number;
    loop?: boolean;
  }

  interface GranimOptions {
    element: string | HTMLCanvasElement;
    direction?: "diagonal" | "left-right" | "top-bottom" | "radial" | "custom";
    customDirection?: { x0: string; y0: string; x1: string; y1: string };
    isPausedWhenNotInView?: boolean;
    scrollDebounceThreshold?: number;
    stateTransitionSpeed?: number;
    defaultStateName?: string;
    image?: {
      source: string;
      position?: string[];
      stretchMode?: string[];
      blendingMode?: string;
    };
    states: Record<string, GranimGradientState>;
    onStart?: () => void;
    onGradientChange?: (colorDetails: any) => void;
    onEnd?: () => void;
  }

  class Granim {
    constructor(options: GranimOptions);
    play(): void;
    pause(): void;
    clear(): void;
    changeState(stateName: string): void;
    changeDirection(direction: string): void;
    changeBlendingMode(blendingMode: string): void;
    destroy(): void;
  }

  export default Granim;
}
