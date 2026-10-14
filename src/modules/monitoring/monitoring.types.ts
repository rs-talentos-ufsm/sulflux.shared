import { z } from 'zod';
import {
  carbonAnalysisResponseSchema,
  carbonFluxPointSchema,
  carbonInsightSchema,
  waterAnalysisResponseSchema,
  waterPointSchema,
  waterAnomalySchema,
  monitoringEventResponseSchema,
  propertyMonitoringHistorySchema,
  talhaoResultsResponseSchema,
  mapExplorerResponseSchema,
  mapTalhaoItemSchema,
} from './monitoring.schemas';

export type CarbonFluxPointDTO = z.infer<typeof carbonFluxPointSchema>;
export type CarbonInsightDTO = z.infer<typeof carbonInsightSchema>;
export type CarbonAnalysisResponseDTO = z.infer<
  typeof carbonAnalysisResponseSchema
>;

export type WaterPointDTO = z.infer<typeof waterPointSchema>;
export type WaterAnomalyDTO = z.infer<typeof waterAnomalySchema>;
export type WaterAnalysisResponseDTO = z.infer<
  typeof waterAnalysisResponseSchema
>;

export type MonitoringEventResponseDTO = z.infer<
  typeof monitoringEventResponseSchema
>;
export type PropertyMonitoringHistoryDTO = z.infer<
  typeof propertyMonitoringHistorySchema
>;

export type TalhaoResultsResponseDTO = z.infer<
  typeof talhaoResultsResponseSchema
>;

export type MapTalhaoItemDTO = z.infer<typeof mapTalhaoItemSchema>;
export type MapExplorerResponseDTO = z.infer<typeof mapExplorerResponseSchema>;
