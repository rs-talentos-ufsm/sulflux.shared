import { z, registry } from '../../lib/registry';
import { CycleType } from './cycle.enums';

export const createFieldInputSchema = z.object({
  category: z.string().min(1).max(100),
  product: z.string().min(1).max(150),
  quantity: z.string().min(1).max(100),
  date: z.coerce.date(),
});

export const fieldInputResponseSchema = z.object({
  id: z.string().uuid(),
  category: z.string(),
  product: z.string(),
  quantity: z.string(),
  date: z.date(),
  cycleId: z.string().uuid(),
  createdAt: z.date(),
});

export const createCropCycleSchema = registry.register(
  'CreateCropCycleRequest',
  z.object({
    fieldId: z.string().uuid(),
    tipo: z.nativeEnum(CycleType).default(CycleType.Commercial),
    titulo: z.string().min(2).max(150),
    safra: z.string().min(2).max(50),
    cultura: z.string().max(100).optional(),
    produtividade: z.string().max(100).optional(),
    inicio: z.coerce.date(),
    fim: z.coerce.date(),
    inputs: z.array(createFieldInputSchema).optional().default([]),
  }),
);

export const cropCycleResponseSchema = registry.register(
  'CropCycleResponse',
  z.object({
    id: z.string().uuid(),
    tipo: z.nativeEnum(CycleType),
    titulo: z.string(),
    safra: z.string(),
    cultura: z.string().nullable().optional(),
    produtividade: z.string().nullable().optional(),
    inicio: z.date(),
    fim: z.date(),
    fieldId: z.string().uuid(),
    inputs: z.array(fieldInputResponseSchema).optional().default([]),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const saveSeasonCyclesSchema = registry.register(
  'SaveSeasonCyclesRequest',
  z.object({
    safra: z.string(),
    cycles: z.array(
      z.object({
        tipo: z.nativeEnum(CycleType),
        titulo: z.string(),
        cultura: z.string().optional(),
        produtividade: z.string().optional(),
        inicio: z.coerce.date(),
        fim: z.coerce.date(),
        inputs: z.array(createFieldInputSchema).optional().default([]),
      }),
    ),
  }),
);
