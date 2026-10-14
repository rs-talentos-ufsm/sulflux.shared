export const CycleType = {
  Commercial: 'COMMERCIAL',
  Cover: 'COVER',
  Fallow: 'FALLOW',
} as const;

export type EnumCycleType = (typeof CycleType)[keyof typeof CycleType];
