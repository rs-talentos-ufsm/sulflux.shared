import { z } from 'zod';
import {
  createCropCycleSchema,
  cropCycleResponseSchema,
  createFieldInputSchema,
  fieldInputResponseSchema,
  saveSeasonCyclesSchema,
} from './cycle.schemas';

export type CreateCropCycleDTO = z.infer<typeof createCropCycleSchema>;
export type CropCycleResponseDTO = z.infer<typeof cropCycleResponseSchema>;
export type CreateFieldInputDTO = z.infer<typeof createFieldInputSchema>;
export type FieldInputResponseDTO = z.infer<typeof fieldInputResponseSchema>;
export type SaveSeasonCyclesDTO = z.infer<typeof saveSeasonCyclesSchema>;
