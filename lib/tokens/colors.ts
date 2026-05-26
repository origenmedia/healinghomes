// Healing Homes Mexico color tokens — single source of truth.

export const colors = {
  voice: {
    primary: '#3B6378',
    deep: '#2A4A5C',
    hover: '#4F7A91',
  },
  light: {
    page: '#F5F2EB',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceInset: '#EEEAE0',
    border: '#D8D3C5',
    borderStrong: '#B5AF9D',
    textPrimary: '#1A1F2A',
    textSecondary: '#3D4452',
    textMuted: '#6B7080',
    textDim: '#9CA0AB',
  },
  dark: {
    page: '#1A1F2A',
    surface: '#242A36',
    surfaceElevated: '#2E3543',
    surfaceInset: '#141821',
    border: '#3A4150',
    borderStrong: '#4E5566',
    textPrimary: '#F5F2EB',
    textSecondary: '#C5C0B0',
    textMuted: '#8B8676',
    textDim: '#5E5A4F',
  },
  material: {
    concrete: '#9C9A95',
    canteraRose: '#B85C3E',
    lakeFog: '#A8B5C0',
    mountainShadow: '#3F4A55',
  },
  semantic: {
    success: '#4A9D5F',
    warning: '#D9883A',
    critical: '#A8413A',
    info: '#5F7AA8',
  },
} as const;

export type Colors = typeof colors;
