import { z, registry } from '../../lib/registry';
import { CycleType } from './cycle.enums';

export const createFieldInputSchema = z.object({
  product: z
    .string()
    .min(1, 'O nome do produto ou insumo é obrigatório.')
    .max(150),
  category: z.string().min(1).max(100).default('Fertilizante'),
  date: z.coerce.date(),
  quantity: z.union([z.number(), z.string()]).transform((val, ctx) => {
    if (typeof val === 'number') {
      if (val <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A quantidade da aplicação deve ser maior que zero.',
        });
        return 0;
      }
      return val;
    }
    const numMatch = val.replace(',', '.').match(/[0-9]+(\.[0-9]+)?/);
    if (!numMatch) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Quantidade numérica inválida.',
      });
      return 0;
    }
    const parsed = parseFloat(numMatch[0]);
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A quantidade da aplicação deve ser maior que zero.',
      });
      return 0;
    }
    return parsed;
  }),
  unit: z.string().min(1).max(30).default('kg/ha'),
  notes: z.string().max(500).optional().nullable(),
});

export const fieldInputResponseSchema = z.object({
  id: z.string().uuid(),
  product: z.string(),
  category: z.string(),
  quantity: z.number(),
  unit: z.string(),
  date: z.date(),
  notes: z.string().nullable().optional(),
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
    sequencia: z.number().int().optional(),
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
    sequencia: z.number().int().nullable().optional(),
    inicio: z.date(),
    fim: z.date(),
    fieldId: z.string().uuid(),
    inputs: z.array(fieldInputResponseSchema).optional().default([]),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const cycleInputItemSchema = z.object({
  tipo: z.nativeEnum(CycleType),
  titulo: z.string(),
  cultura: z.string().optional(),
  produtividade: z.string().optional(),
  sequencia: z.number().int().optional(),
  inicio: z.coerce.date(),
  fim: z.coerce.date(),
  inputs: z.array(createFieldInputSchema).optional().default([]),
});

export const saveSeasonCyclesSchema = registry.register(
  'SaveSeasonCyclesRequest',
  z.object({
    safra: z.string().min(2, 'O nome da safra é obrigatório.'),
    permiteSobreposicao: z.boolean().default(true).optional(),
    cycles: z
      .array(cycleInputItemSchema)
      .min(1, 'Pelo menos um ciclo de safra deve ser informado.'),
  }),
);
