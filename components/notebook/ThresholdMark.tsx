// A quiet ink section ornament — a minimal doorway/threshold mark.
// Placed only at major "this feels like an ending" transitions.
export function ThresholdMark() {
  return (
    <div aria-hidden="true" className="flex justify-center py-6 md:py-10 text-text-muted opacity-45">
      <svg
        viewBox="0 0 40 48"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-8"
      >
        <line x1="8" y1="44" x2="32" y2="44" strokeWidth="1.25"/>
        <line x1="14" y1="44" x2="14" y2="12" strokeWidth="1.25"/>
        <line x1="14" y1="12" x2="26" y2="12" strokeWidth="1.25"/>
        <line x1="26" y1="12" x2="26" y2="44" strokeWidth="1.25"/>
        <line x1="20" y1="16" x2="20" y2="44" strokeWidth="0.6" strokeDasharray="2 4"/>
      </svg>
    </div>
  );
}
