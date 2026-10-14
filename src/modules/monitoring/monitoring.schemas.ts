import { z, registry } from '../../lib/registry';
import { MonitoringEventType } from './monitoring.enums';

// Série de fluxos de carbono Eddy Covariance
export const carbonFluxPointSchema = z.object({
  mes: z.string(),
  gpp: z.number(), // Gross Primary Production (gCO2 m-2 d-1)
  reco: z.number(), // Ecosystem Respiration
  nee: z.number(), // Net Ecosystem Exchange
});

export const carbonInsightSchema = z.object({
  title: z.string(),
  tone: z.enum(['warn', 'info', 'good']),
  text: z.string(),
});

export const carbonAnalysisResponseSchema = registry.register(
  'CarbonAnalysisResponse',
  z.object({
    safra: z.string(),
    fieldId: z.string().uuid(),
    fieldName: z.string(),
    propertyName: z.string(),
    series: z.array(carbonFluxPointSchema),
    kpis: z.object({
      gppTotal: z.number(),
      recoTotal: z.number(),
      neeTotal: z.number(), // Balanço líquido (sumidouro se negativo)
      sequestroLiquido: z.string(), // ex: "-18,4 t CO2e"
    }),
    gridHeatmap: z.array(z.array(z.number())), // Matriz Sentinel-2A
    insights: z.array(carbonInsightSchema),
  }),
);

// Análise Hídrica
export const waterPointSchema = z.object({
  mes: z.string(),
  precipitacao: z.number(), // mm
  agua: z.number(), // umidade do solo %
  limiar: z.number(), // ponto de murcha crítico %
});

export const waterAnomalySchema = z.object({
  level: z.enum(['alto', 'medio', 'baixo']),
  period: z.string(),
  title: z.string(),
  detail: z.string(),
});

export const waterAnalysisResponseSchema = registry.register(
  'WaterAnalysisResponse',
  z.object({
    safra: z.string(),
    fieldId: z.string().uuid(),
    fieldName: z.string(),
    propertyName: z.string(),
    series: z.array(waterPointSchema),
    kpis: z.object({
      chuvaAcumulada: z.number(), // mm
      umidadeMedia: z.number(), // %
      diasAbaixoLimiar: z.number(),
      statusHidrico: z.string(),
    }),
    anomalias: z.array(waterAnomalySchema),
  }),
);

// Eventos de Monitoramento
export const monitoringEventResponseSchema = registry.register(
  'MonitoringEventResponse',
  z.object({
    id: z.string().uuid(),
    type: z.nativeEnum(MonitoringEventType),
    title: z.string(),
    detail: z.string().nullable().optional(),
    date: z.date(),
    propertyId: z.string().uuid(),
    fieldId: z.string().uuid().nullable().optional(),
    fieldName: z.string().optional(),
  }),
);

export const propertyMonitoringHistorySchema = registry.register(
  'PropertyMonitoringHistoryResponse',
  z.object({
    propertyId: z.string().uuid(),
    propertyName: z.string(),
    balancoPorSafra: z.array(
      z.object({
        safra: z.string(),
        balanco: z.number(), // toneladas
      }),
    ),
    events: z.array(monitoringEventResponseSchema),
  }),
);

// Resultados de Talhão
export const talhaoResultsResponseSchema = registry.register(
  'TalhaoResultsResponse',
  z.object({
    fieldId: z.string().uuid(),
    propertyId: z.string().uuid(),
    name: z.string(),
    code: z.string(),
    area: z.number().nullable(),
    soilType: z.string().nullable(),
    kpis: z.object({
      balancoCarbono: z.string(),
      estoqueSolo: z.string(),
      eficienciaHidrica: z.string(),
    }),
    carbonSeries: z.array(
      z.object({
        mes: z.string(),
        estoque: z.number(),
        emissao: z.number(),
      }),
    ),
    waterSeries: z.array(
      z.object({
        mes: z.string(),
        ndvi: z.number(),
        chuva: z.number(),
      }),
    ),
  }),
);

// Mapa de Talhões
export const mapTalhaoItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  code: z.string(),
  area: z.number().nullable(),
  status: z.string(),
  soilType: z.string().nullable(),
  coordinates: z.any().nullable(),
  propertyId: z.string().uuid(),
  propertyName: z.string(),
  location: z.string(),
  carbonBalance: z.string().optional(),
});

export const mapExplorerResponseSchema = registry.register(
  'MapExplorerResponse',
  z.object({
    talhoes: z.array(mapTalhaoItemSchema),
    availableLayers: z.array(z.string()),
  }),
);
