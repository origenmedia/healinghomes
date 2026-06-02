// Barely-there paper grain texture overlay.
// Fixed position, behind all content, pointer-events none.
export function PaperGrain() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
      style={{ mixBlendMode: 'multiply' }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
