export const motion = {
  duration: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    deliberate: '800ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    photography: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type Motion = typeof motion;
