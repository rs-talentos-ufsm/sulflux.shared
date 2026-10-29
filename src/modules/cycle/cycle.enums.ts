export const CycleType = {
  Commercial: 'COMMERCIAL',
  Cover: 'COVER',
  Fallow: 'FALLOW',
} as const;

export type EnumCycleType = (typeof CycleType)[keyof typeof CycleType];

export const ApplicationCategory = {
  Fertilizer: 'Fertilizante',
  Defensive: 'Defensivo',
  Seed: 'Semente',
  Inoculant: 'Inoculante',
  Corrective: 'Corretivo',
  Biological: 'Biológico',
  Other: 'Outro',
} as const;

export type EnumApplicationCategory =
  (typeof ApplicationCategory)[keyof typeof ApplicationCategory];

export const ApplicationUnit = {
  KgHa: 'kg/ha',
  LHa: 'l/ha',
  GHa: 'g/ha',
  DoseHa: 'dose/ha',
  TonHa: 'ton/ha',
  ScHa: 'sc/ha',
  MlHa: 'ml/ha',
} as const;

export type EnumApplicationUnit =
  (typeof ApplicationUnit)[keyof typeof ApplicationUnit];
