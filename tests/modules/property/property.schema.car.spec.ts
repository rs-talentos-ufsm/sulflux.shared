import { describe, it, expect } from 'vitest';
import {
  carLookupQuerySchema,
  carLookupResponseSchema,
  createPropertySchema,
} from '../../../src/modules/property/property.schemas';

describe('Property CAR Schemas', () => {
  describe('carLookupQuerySchema', () => {
    it('deve validar com sucesso um número oficial de CAR com 43 caracteres', () => {
      const validCar = 'RS-4305108-8C646BEA3C084EEBA1C765BB8E09FA83';
      const result = carLookupQuerySchema.safeParse({ car: validCar });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.car).toBe(validCar);
      }
    });

    it('deve rejeitar CAR com menos de 43 caracteres', () => {
      const shortCar = 'RS-4305108-ABCD';
      const result = carLookupQuerySchema.safeParse({ car: shortCar });

      expect(result.success).toBe(false);
    });

    it('deve rejeitar CAR com caracteres inválidos fora da máscara oficial', () => {
      const invalidCar = 'RS-4305108-8C646BEA3C084EEBA1C765BB8E09FA8Z'; // Z não é hex
      const result = carLookupQuerySchema.safeParse({ car: invalidCar });

      expect(result.success).toBe(false);
    });
  });

  describe('createPropertySchema com dados do CAR', () => {
    it('deve aceitar propriedade com campos estendidos de CAR, área, módulos e coordenadas', () => {
      const propertyPayload = {
        name: 'Fazenda Santa Cecília',
        location: 'Cruz Alta, RS',
        car: 'RS-4305108-8C646BEA3C084EEBA1C765BB8E09FA83',
        area: 1250.5,
        fiscalModules: 35.7,
        ownerName: 'João da Silva',
        coordinates: [
          { lat: -28.6389, lng: -53.6064 },
          { lat: -28.64, lng: -53.6 },
          { lat: -28.65, lng: -53.61 },
          { lat: -28.6389, lng: -53.6064 },
        ],
      };

      const result = createPropertySchema.safeParse(propertyPayload);
      expect(result.success).toBe(true);
    });
  });

  describe('carLookupResponseSchema', () => {
    it('deve validar retorno completo de dados de CAR', () => {
      const responsePayload = {
        car: 'RS-4305108-8C646BEA3C084EEBA1C765BB8E09FA83',
        name: 'Fazenda Santa Cecília',
        location: 'Cruz Alta, RS',
        municipality: 'Cruz Alta',
        state: 'RS',
        ibgeCode: '4305108',
        area: 1250.5,
        fiscalModules: 35.7,
        ownerName: 'João da Silva',
        status: 'Ativo',
        coordinates: [
          { lat: -28.6389, lng: -53.6064 },
          { lat: -28.64, lng: -53.6 },
        ],
      };

      const result = carLookupResponseSchema.safeParse(responsePayload);
      expect(result.success).toBe(true);
    });
  });
});
