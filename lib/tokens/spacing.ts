export const spacing = {
  px: '1px',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  base: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '2.5rem',
  '4xl': '3.5rem',
  '5xl': '4.5rem',
  '6xl': '6rem',
  '7xl': '8rem',
} as const;

export type Spacing = typeof spacing;
