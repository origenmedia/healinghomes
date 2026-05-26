export const brand = {
  name: 'Healing Homes',
  fullName: 'Healing Homes Mexico',
  domain: 'healinghomes.mx',
  conceptualFrame: 'The home is the medicine. The craft is how we make it.',
  positioning: 'Architectural practice rooted in Lake Chapala. We build on Vitruvian principles: durability, utility, beauty.',

  voiceCharacteristics: [
    'confident',
    'declarative',
    'grounded',
    'architecture-literate',
    'never academic',
    'spiritual undertone',
    'no new age vocabulary',
  ],

  references: [
    'Tadao Ando (Casa Wabi)',
    'Luis Barragán',
    'Geoffrey Bawa',
    'John Pawson',
    'Phaidon and Taschen architectural monographs',
  ],

  vitruvianPrinciples: {
    firmitas: 'Durability. The structure stands robustly and remains in good condition.',
    utilitas: 'Utility. The home is useful and functions well for the people using it.',
    venustas: 'Beauty. The home delights and raises the spirit.',
  },

  founder: {
    name: 'Nathaniel Bunger',
    role: 'Builder, life coach, founder',
    base: 'Lake Chapala, Mexico',
  },
} as const;

export type Brand = typeof brand;
