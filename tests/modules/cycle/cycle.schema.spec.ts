import { describe, expect, it } from 'vitest';
import {
  createFieldInputSchema,
  saveSeasonCyclesSchema,
  CycleType,
  ApplicationCategory,
  ApplicationUnit,
  UserRole,
  updateUserRoleSchema,
  shapefileImportResponseSchema,
} from '../../../src';

describe('Novos Schemas — Safras, Aplicações, Perfis e Shapefile', () => {
  it('deve validar aplicação de insumo com produto, dia, quantidade numérica e métrica/unidade', () => {
    const inputPayload = {
      product: 'Ureia Protegida 46%',
      category: ApplicationCategory.Fertilizer,
      date: new Date('2024-11-10'),
      quantity: 150.5,
      unit: ApplicationUnit.KgHa,
      notes: 'Aplicação em cobertura pré-chuva',
    };

    const parsed = createFieldInputSchema.safeParse(inputPayload);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.product).toBe('Ureia Protegida 46%');
      expect(parsed.data.quantity).toBe(150.5);
      expect(parsed.data.unit).toBe('kg/ha');
    }
  });

  it('deve permitir e validar sobreposição de safras e ciclos concomitantes', () => {
    // Duas fases/ciclos ocorrendo no mesmo intervalo de datas
    const seasonPayload = {
      safra: '2024 / 2025',
      permiteSobreposicao: true,
      cycles: [
        {
          tipo: CycleType.Commercial,
          titulo: 'Cultura Principal — Soja Safra',
          cultura: 'Soja',
          produtividade: '72 sc/ha',
          sequencia: 1,
          inicio: new Date('2024-10-15'),
          fim: new Date('2025-03-10'),
          inputs: [
            {
              product: 'NPK 04-14-08',
              category: ApplicationCategory.Fertilizer,
              date: new Date('2024-10-15'),
              quantity: 250,
              unit: 'kg/ha',
            },
          ],
        },
        {
          // Ciclo sobreposto (ex: plantio consorciado ou safrinha antecipada)
          tipo: CycleType.Cover,
          titulo: 'Consórcio Antecipado — Braquiária',
          cultura: 'Brachiaria ruziziensis',
          sequencia: 2,
          inicio: new Date('2025-02-15'), // Início ANTES do fim do ciclo 1 (sobreposição!)
          fim: new Date('2025-08-20'),
          inputs: [],
        },
      ],
    };

    const parsed = saveSeasonCyclesSchema.safeParse(seasonPayload);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.cycles.length).toBe(2);
      expect(parsed.data.permiteSobreposicao).toBe(true);
    }
  });

  it('deve validar papéis de usuários (Admin, Produtor, Intermediários, Visualizador)', () => {
    expect(UserRole.ADMIN).toBe('ADMIN');
    expect(UserRole.PRODUCER).toBe('PRODUCER');
    expect(UserRole.INTERMEDIARY).toBe('INTERMEDIARY');
    expect(UserRole.VIEWER).toBe('VIEWER');

    const updateRole = updateUserRoleSchema.safeParse({
      role: UserRole.INTERMEDIARY,
    });
    expect(updateRole.success).toBe(true);
  });

  it('deve validar resposta de importação de Shapefile com geometrias e área calculada', () => {
    const shapefileResponse = {
      totalFeatures: 1,
      boundingBox: [-53.8, -29.8, -53.6, -29.6],
      features: [
        {
          index: 0,
          name: 'Talhão Sede Norte',
          code: 'TLH-01',
          areaHa: 45.8,
          perimeterMeters: 3100,
          coordinates: [
            { lat: -29.7, lng: -53.7 },
            { lat: -29.71, lng: -53.7 },
            { lat: -29.71, lng: -53.69 },
            { lat: -29.7, lng: -53.7 },
          ],
          properties: { NOME: 'Talhão Sede Norte', CAR: 'RS-4316907-XXXX' },
        },
      ],
    };

    const parsed = shapefileImportResponseSchema.safeParse(shapefileResponse);
    expect(parsed.success).toBe(true);
  });
});
