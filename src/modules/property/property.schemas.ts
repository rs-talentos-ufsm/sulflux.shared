import { z, registry } from '../../lib/registry';
import { userResponseSchema } from '../users';
import { PropertyStatus } from './property.enums';

export const propertyCoordinateSchema = z.object({
  lat: z.number().openapi({ description: 'Latitude', example: -29.7125 }),
  lng: z.number().openapi({ description: 'Longitude', example: -53.7156 }),
});

export const carLookupQuerySchema = z.object({
  car: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z]{2}-\d{7}-[A-Fa-f0-9]{32}$/,
      'O número do CAR deve seguir o padrão oficial nacional: UF-XXXXXXX-32HEX (ex: RS-4305108-8C646BEA3C084EEBA1C765BB8E09FA83).',
    )
    .openapi({
      description: 'Número oficial do CAR no SICAR (43 caracteres)',
      example: 'RS-4305108-8C646BEA3C084EEBA1C765BB8E09FA83',
    }),
});

export const carLookupResponseSchema = registry.register(
  'CarLookupResponse',
  z.object({
    car: z.string(),
    name: z.string(),
    location: z.string(),
    municipality: z.string(),
    state: z.string(),
    ibgeCode: z.string(),
    area: z.number().positive(),
    fiscalModules: z.number().positive(),
    ownerName: z.string().nullable().optional(),
    status: z.string(),
    coordinates: z.array(propertyCoordinateSchema),
  }),
);

export const createPropertySchema = registry.register(
  'CreatePropertyRequest',
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: 'Nome da propriedade',
      example: 'Fazenda Rio Grande',
    }),
    location: z.string().min(2).max(120).trim().openapi({
      description: 'Localização/Cidade da propriedade',
      example: 'Santa Maria, RS',
    }),
    car: z
      .string()
      .trim()
      .regex(
        /^[A-Za-z]{2}-\d{7}-[A-Fa-f0-9]{32}$/,
        'O número do CAR deve seguir o padrão oficial nacional: UF-XXXXXXX-32HEX.',
      )
      .optional()
      .openapi({
        description: 'Cadastro Ambiental Rural (CAR)',
        example: 'RS-4316907-8821B0912A314B5C8D7E9F0A1B2C3D4E',
      }),
    area: z.number().positive().optional().openapi({
      description: 'Área total da propriedade em hectares',
      example: 1250.5,
    }),
    fiscalModules: z.number().positive().optional().openapi({
      description: 'Módulos fiscais calculados para a propriedade',
      example: 35.7,
    }),
    ownerName: z.string().min(2).max(120).trim().optional().openapi({
      description: 'Nome do proprietário/possuidor declarado',
      example: 'João da Silva',
    }),
    coordinates: z.array(propertyCoordinateSchema).optional().openapi({
      description: 'Vértices do polígono do perímetro da propriedade',
    }),
  }),
);

export const updatePropertySchema = registry.register(
  'UpdatePropertyRequest',
  createPropertySchema
    .extend({
      status: z.nativeEnum(PropertyStatus).openapi({
        description: 'Status de configuração da propriedade',
        example: PropertyStatus.Active,
      }),
    })
    .partial()
    .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const propertyResponseSchema = registry.register(
  'PropertyResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    location: z.string(),
    car: z.string().nullable(),
    area: z.number().nullable().optional(),
    fiscalModules: z.number().nullable().optional(),
    ownerName: z.string().nullable().optional(),
    coordinates: z.array(propertyCoordinateSchema).nullable().optional(),
    status: z.nativeEnum(PropertyStatus),
    ownerId: z.string().uuid(),
    owner: userResponseSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const propertyIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID da propriedade deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const propertyQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: 'Busca por nome, cidade ou CAR',
    example: 'Fazenda',
  }),
  status: z.nativeEnum(PropertyStatus).optional().openapi({
    description: 'Filtra pelo status da propriedade',
    example: PropertyStatus.Active,
  }),
});
