import { z } from '../../lib/registry';
import {
  gisCoordinateSchema,
  gisFeatureSummarySchema,
  shapefileImportResponseSchema,
  confirmShapefileImportSchema,
} from './gis.schemas';

export type GisCoordinateDTO = z.infer<typeof gisCoordinateSchema>;
export type GisFeatureSummaryDTO = z.infer<typeof gisFeatureSummarySchema>;
export type ShapefileImportResponseDTO = z.infer<
  typeof shapefileImportResponseSchema
>;
export type ConfirmShapefileImportDTO = z.infer<
  typeof confirmShapefileImportSchema
>;
