import { z, registry } from '../../lib/registry';

export const gisCoordinateSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const gisFeatureSummarySchema = z.object({
  index: z.number(),
  name: z.string(),
  code: z.string().optional(),
  areaHa: z.number(),
  perimeterMeters: z.number(),
  coordinates: z.array(gisCoordinateSchema),
  properties: z.record(z.string(), z.any()).optional().default({}),
});

export const shapefileImportResponseSchema = registry.register(
  'ShapefileImportResponse',
  z.object({
    totalFeatures: z.number(),
    boundingBox: z.array(z.number()).length(4),
    features: z.array(gisFeatureSummarySchema),
  }),
);

export const confirmShapefileImportSchema = registry.register(
  'ConfirmShapefileImportRequest',
  z.object({
    propertyId: z.string().uuid(),
    fields: z.array(
      z.object({
        name: z.string().min(1).max(100),
        code: z.string().min(1).max(50),
        soilType: z.string().optional(),
        coordinates: z.array(gisCoordinateSchema),
        area: z.number().optional(),
        perimeter: z.number().optional(),
      }),
    ),
  }),
);
