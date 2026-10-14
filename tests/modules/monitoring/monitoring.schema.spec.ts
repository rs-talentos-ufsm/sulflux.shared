import { describe, it, expect } from 'vitest';
import {
  carbonAnalysisResponseSchema,
  waterAnalysisResponseSchema,
  createCropCycleSchema,
  createDocumentSchema,
  assistantChatRequestSchema,
  CycleType,
  DocumentType,
} from '../../../src';

describe('Shared Schemas — Sulflux Domain', () => {
  it('deve validar um payload de CarbonAnalysisResponse com sucesso', () => {
    const validCarbon = {
      safra: '2023 / 2024',
      fieldId: 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
      fieldName: 'Talhão Sede',
      propertyName: 'Fazenda Santa Cecília',
      series: [
        { mes: 'Set', gpp: 4.2, reco: 3.1, nee: -1.1 },
        { mes: 'Out', gpp: 6.8, reco: 3.6, nee: -3.2 },
      ],
      kpis: {
        gppTotal: 11.0,
        recoTotal: 6.7,
        neeTotal: -4.3,
        sequestroLiquido: '+12 t CO2e',
      },
      gridHeatmap: [
        [0.4, 0.8],
        [0.6, 0.9],
      ],
      insights: [
        {
          title: 'Pastejo e biomassa',
          tone: 'warn' as const,
          text: 'Redução temporária de GPP.',
        },
      ],
    };

    const result = carbonAnalysisResponseSchema.safeParse(validCarbon);
    expect(result.success).toBe(true);
  });

  it('deve validar um payload de WaterAnalysisResponse com sucesso', () => {
    const validWater = {
      safra: '2023 / 2024',
      fieldId: 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
      fieldName: 'Talhão Sede',
      propertyName: 'Fazenda Santa Cecília',
      series: [{ mes: 'Set', precipitacao: 122, agua: 78, limiar: 45 }],
      kpis: {
        chuvaAcumulada: 122,
        umidadeMedia: 78,
        diasAbaixoLimiar: 0,
        statusHidrico: 'Favorável',
      },
      anomalias: [
        {
          level: 'alto' as const,
          period: 'Jan – Fev 2024',
          title: 'Déficit hídrico',
          detail: 'Precipitação abaixo da média.',
        },
      ],
    };

    const result = waterAnalysisResponseSchema.safeParse(validWater);
    expect(result.success).toBe(true);
  });

  it('deve validar criação de CropCycle', () => {
    const validCycle = {
      fieldId: 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
      tipo: CycleType.Commercial,
      titulo: 'Soja Safra Verão',
      safra: '2023 / 2024',
      cultura: 'Soja',
      inicio: new Date('2023-10-15'),
      fim: new Date('2024-03-20'),
      inputs: [
        {
          category: 'Fertilizante',
          product: 'NPK 04-14-08',
          quantity: '300 kg/ha',
          date: new Date('2023-10-15'),
        },
      ],
    };

    const result = createCropCycleSchema.safeParse(validCycle);
    expect(result.success).toBe(true);
  });

  it('deve validar criação de Documento', () => {
    const validDoc = {
      name: 'Certificacao-Carbono.pdf',
      type: DocumentType.Pdf,
      size: '2.4 MB',
      folder: 'Certificações',
    };

    const result = createDocumentSchema.safeParse(validDoc);
    expect(result.success).toBe(true);
  });

  it('deve validar mensagem de chat do Assistente', () => {
    const validMsg = { message: 'Como está o balanço de carbono?' };
    const result = assistantChatRequestSchema.safeParse(validMsg);
    expect(result.success).toBe(true);
  });
});
