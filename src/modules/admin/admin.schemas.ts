import { z, registry } from '../../lib/registry';
import { UserRole } from '../users/users.enums';

export const adminMetricsResponseSchema = registry.register(
  'AdminMetricsResponse',
  z.object({
    totalUsers: z.number(),
    totalProperties: z.number(),
    totalFields: z.number(),
    totalMonitoredAreaHa: z.number(),
    totalCropCycles: z.number(),
    usersByRole: z.record(z.nativeEnum(UserRole), z.number()),
    propertiesByStatus: z.record(z.string(), z.number()),
  }),
);

export const adminUserFilterSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  isActive: z
    .preprocess((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;
    }, z.boolean())
    .optional(),
});
