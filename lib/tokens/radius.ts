// Healing Homes radius — sharp by default. Architecture has corners.
export const radius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  full: '9999px',
} as const;

export type Radius = typeof radius;
