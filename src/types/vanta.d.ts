declare module "vanta/dist/vanta.rings.min" {
  interface VantaRingsOptions {
    el: HTMLElement;
    THREE: typeof import("three");
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color?: number;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  function RINGS(options: VantaRingsOptions): VantaEffect;
  export default RINGS;
}
