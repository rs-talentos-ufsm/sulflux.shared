import { z } from '../../lib/registry';
import {
  adminMetricsResponseSchema,
  adminUserFilterSchema,
} from './admin.schemas';

export type AdminMetricsResponseDTO = z.infer<
  typeof adminMetricsResponseSchema
>;
export type AdminUserFilterDTO = z.infer<typeof adminUserFilterSchema>;
