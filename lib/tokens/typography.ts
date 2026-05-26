export const typography = {
  family: {
    serif: 'var(--font-fraunces), Georgia, "Times New Roman", serif',
    sans: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    mono: 'var(--font-jetbrains-mono), "SF Mono", Menlo, monospace',
  },
  size: {
    micro: '0.6875rem',
    xs: '0.75rem',
    sm: '0.8125rem',
    base: '0.9375rem',
    md: '1rem',
    lg: '1.0625rem',
    xl: '1.25rem',
    h3: '1.5rem',
    h2: '2rem',
    h1: '3rem',
    display: '4rem',
    wordmark: '4.5rem',
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  leading: {
    tight: 1.15,
    snug: 1.35,
    normal: 1.6,
    relaxed: 1.8,
  },
  tracking: {
    tight: '-0.025em',
    snug: '-0.01em',
    normal: '0',
    wide: '0.08em',
    wider: '0.15em',
    widest: '0.3em',
  },
} as const;

export type Typography = typeof typography;
