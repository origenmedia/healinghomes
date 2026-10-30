import type { CSSProperties } from 'react';

// Line drawings for the film. Each stroke draws itself as the scene's --p moves
// from --d to --d + --len (see .draw in film.css). Drawn to the design lock:
// 12 homes in two rows of 6 around one garden, one pool and one long table.

const d = (start: number, len = 0.12) => ({ '--d': start, '--len': len }) as CSSProperties;

function homesRow(r: number, n: number, start: number, w: number, h: number) {
  // Homes sit on an arc below the garden, facing it and the lake beyond.
  const cx = 90;
  const cy = 150;
  return Array.from({ length: n }, (_, i) => {
    const deg = 20 + (i * 140) / (n - 1);
    const a = deg * (Math.PI / 180);
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    const rot = deg + 90;
    return (
      <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})`}>
        <rect className="draw" pathLength={1} style={d(start + i * 0.025)} x={-w / 2} y={-h / 2} width={w} height={h} />
        <circle className="draw brick" pathLength={1} style={d(start + i * 0.025 + 0.02)} cx={-w / 4} cy={0} r={h / 4} />
        <line className="draw soft" pathLength={1} style={d(start + i * 0.025 + 0.03)} x1={-w / 2} y1={h / 2 + 3} x2={w / 2} y2={h / 2 + 3} />
      </g>
    );
  });
}

export function PlanDrawing() {
  return (
    <svg className="lay plan" viewBox="0 0 180 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path className="draw water" pathLength={1} style={d(0, 0.18)} d="M0 34 C 40 24, 80 44, 120 32 S 170 26, 180 30" />
      <path className="draw soft" pathLength={1} style={d(0.04, 0.2)} d="M0 64 C 50 52, 120 76, 180 60" />
      <path className="draw soft" pathLength={1} style={d(0.06, 0.2)} d="M0 270 C 50 258, 120 282, 180 266" />
      <path className="draw soft" pathLength={1} style={d(0.08, 0.2)} d="M0 300 C 60 290, 120 312, 180 296" />
      <rect className="draw water" pathLength={1} style={d(0.14)} x="66" y="138" width="48" height="12" />
      <rect className="draw" pathLength={1} style={d(0.18)} x="58" y="158" width="38" height="12" />
      <circle className="draw" pathLength={1} style={d(0.22)} cx="114" cy="166" r="7" />
      <circle className="draw soft" pathLength={1} style={d(0.24, 0.16)} cx="90" cy="152" r="34" />
      {homesRow(52, 6, 0.28, 16, 12)}
      {homesRow(80, 6, 0.42, 22, 16)}
      <g className="orchard">
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <circle key={`l${r}${c}`} className="draw soft" pathLength={1} style={d(0.48 + r * 0.01)} cx={14 + c * 8} cy={252 + r * 8} r="2.4" />
          )),
        )}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <circle key={`r${r}${c}`} className="draw soft" pathLength={1} style={d(0.5 + r * 0.01)} cx={150 + c * 8} cy={252 + r * 8} r="2.4" />
          )),
        )}
      </g>
      <g className="labels">
        <text x="8" y="22" style={d(0.05)}>LAKE CHAPALA</text>
        <text x="72" y="134" style={d(0.18)}>POOL</text>
        <text x="50" y="180" style={d(0.22)}>LONG TABLE</text>
        <text x="106" y="182" style={d(0.24)}>FIRE</text>
        <text x="8" y="246" style={d(0.5)}>ORCHARD</text>
      </g>
    </svg>
  );
}

export function WaterDrawing() {
  // Rain, roof, a filter, the tank under the home, the tap and the glass. Drawn in about two seconds of scroll.
  return (
    <svg className="lay water-cut" viewBox="0 0 180 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g className="labels">
        <text x="12" y="40" style={d(0.36)}>RAIN</text>
        <text x="118" y="84" style={d(0.4)}>ROOF</text>
        <text x="16" y="150" style={d(0.48)}>CLEANED</text>
        <text x="60" y="270" style={d(0.5)}>YOUR TANK</text>
        <text x="110" y="168" style={d(0.6)}>YOUR TAP</text>
      </g>
      {[20, 46, 72, 98, 124, 150].map((x, i) => (
        <line key={x} className="draw water" pathLength={1} style={d(0.34 + i * 0.008, 0.06)} x1={x + 10} y1={44} x2={x + 4} y2={62} />
      ))}
      <path className="draw" pathLength={1} style={d(0.38, 0.08)} d="M20 90 H 160" />
      <path className="draw" pathLength={1} style={d(0.4, 0.1)} d="M30 90 V 196 M150 90 V 196 M20 196 H 160" />
      <path className="draw water" pathLength={1} style={d(0.43, 0.1)} d="M158 92 C 172 110, 172 210, 150 222" />
      <rect className="draw" pathLength={1} style={d(0.48, 0.08)} x="40" y="154" width="16" height="12" />
      <rect className="draw" pathLength={1} style={d(0.5, 0.1)} x="48" y="214" width="104" height="44" />
      <rect className="tankfill" x="49" y="215" width="102" height="42" />
      <path className="draw water" pathLength={1} style={d(0.56, 0.08)} d="M64 214 V 140 H 98 V 154" />
      <rect className="draw" pathLength={1} style={d(0.6, 0.06)} x="92" y="160" width="14" height="22" />
      <rect className="glassfill" x="93" y="161" width="12" height="20" />
    </svg>
  );
}

export function Seats() {
  // One long table, 12 seats. They fill as you scroll.
  const seats = Array.from({ length: 12 }, (_, i) => {
    const side = i < 6 ? -1 : 1;
    const k = i % 6;
    return { x: 34 + k * 22.4, y: 104 + side * 20, i };
  });
  return (
    <svg className="lay seats" viewBox="0 0 180 320" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <rect x="24" y="94" width="132" height="20" className="tabletop" />
      {seats.map((s) => (
        <g key={s.i}>
          <circle cx={s.x} cy={s.y} r="7" className="seat" />
          <circle cx={s.x} cy={s.y} r="7" className="seatfill" style={{ '--s': s.i / 12 } as CSSProperties} />
        </g>
      ))}
    </svg>
  );
}
