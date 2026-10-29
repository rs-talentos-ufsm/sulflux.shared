// src/lib/registry.ts
import { z } from "zod";
import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3
} from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
var registry = new OpenAPIRegistry();

// src/modules/auth/auth.schemas.ts
var loginSchema = registry.register(
  "LoginRequest",
  z.object({
    email: z.email({
      error: ({ input }) => input === void 0 ? "O e-mail \xE9 obrigat\xF3rio." : "Formato de e-mail inv\xE1lido."
    }).min(1, { message: "O e-mail \xE9 obrigat\xF3rio." }).transform((value) => value.toLowerCase()).openapi({
      description: "E-mail do usu\xE1rio",
      example: "teste@teste.com.br"
    }),
    password: z.string({
      error: ({ input }) => input === void 0 ? "A senha \xE9 obrigat\xF3ria." : "A senha deve ser um texto."
    }).min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).openapi({
      description: "Senha do usu\xE1rio com crit\xE9rios de seguran\xE7a",
      example: "Senha@123"
    })
  })
);
var refreshTokenSchema = registry.register(
  "RefreshTokenRequest",
  z.object({
    refreshToken: z.string({
      error: ({ input }) => input === void 0 ? "O token de atualiza\xE7\xE3o \xE9 obrigat\xF3rio." : "O token de atualiza\xE7\xE3o deve ser um texto."
    }).openapi({
      description: "Token de atualiza\xE7\xE3o obtido no login",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    })
  })
);

// src/modules/auth/auth.enums.ts
var AuthEnums = {
  LoginStatus: {
    Pending: "PENDING",
    Authenticated: "AUTHENTICATED",
    Unauthenticated: "UNAUTHENTICATED"
  }
};

// src/modules/users/users.enums.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "ADMIN";
  UserRole2["PRODUCER"] = "PRODUCER";
  UserRole2["INTERMEDIARY"] = "INTERMEDIARY";
  UserRole2["VIEWER"] = "VIEWER";
  return UserRole2;
})(UserRole || {});

// src/modules/users/users.schemas.ts
var createUserSchema = registry.register(
  "CreateUserRequest",
  z.object({
    name: z.string({
      error: ({ input }) => input === void 0 ? "O nome \xE9 obrigat\xF3rio." : "O nome deve ser um texto."
    }).min(2, { message: "Nome muito curto." }).max(120, { message: "Nome muito longo." }).trim().openapi({
      description: "Nome completo do usu\xE1rio",
      example: "Usu\xE1rio de Teste"
    }),
    email: z.email({
      error: ({ input }) => input === void 0 ? "O e-mail \xE9 obrigat\xF3rio." : "Formato de e-mail inv\xE1lido."
    }).transform((v) => v.toLowerCase()).openapi({
      description: "E-mail exclusivo do usu\xE1rio para login",
      example: "test@example.com"
    }),
    password: z.string({
      error: ({ input }) => input === void 0 ? "A senha \xE9 obrigat\xF3ria." : "A senha deve ser um texto."
    }).min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).openapi({
      description: "Senha do usu\xE1rio com crit\xE9rios de seguran\xE7a",
      example: "Senha@123"
    }),
    role: z.nativeEnum(UserRole).optional().openapi({
      description: "Papel/perfil de acesso do usu\xE1rio no sistema",
      example: "PRODUCER" /* PRODUCER */
    }),
    // cellphone: z.string().trim().optional().openapi({
    //   description: 'Número de celular do usuário',
    //   example: '(55) 99999-9999',
    // }),
    // birth_date: z.coerce
    //   .date({
    //     message: 'A data de nascimento deve ser válida.',
    //   })
    //   .optional()
    //   .openapi({
    //     description: 'Data de nascimento do usuário (YYYY-MM-DD)',
    //     example: '1990-01-01',
    //   }),
    // address: z.string().trim().optional().openapi({
    //   description: 'Endereço do usuário',
    //   example: 'Rua Exemplo, 123 - Cidade/UF',
    // }),
    isActive: z.boolean().default(true).optional()
  })
);
var updateUserSchema = createUserSchema.partial().omit({ password: true }).extend({
  password: z.string().min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).optional().openapi({
    description: "Nova senha do usu\xE1rio (opcional, com crit\xE9rios de seguran\xE7a)",
    example: "NovaSenha@123"
  }),
  isActive: z.boolean().optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
});
var updateUserRoleSchema = registry.register(
  "UpdateUserRoleRequest",
  z.object({
    role: z.nativeEnum(UserRole).openapi({
      description: "Novo papel atribu\xEDdo ao usu\xE1rio",
      example: "ADMIN" /* ADMIN */
    })
  })
);
var userResponseSchema = registry.register(
  "UserResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole).default("PRODUCER" /* PRODUCER */),
    // cellphone: z.string().nullable(),
    // birth_date: z.coerce.date().nullable(),
    // address: z.string().nullable(),
    isActive: z.boolean(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date()
    // deletedAt: z.coerce.date().nullable(),
  })
);
var userIdSchema = z.object({
  id: z.uuid({
    error: ({ input }) => input === void 0 ? "O Id \xE9 obrigat\xF3rio." : "O ID do usu\xE1rio deve ser um UUID v\xE1lido."
  }).openapi({
    param: {
      name: "id",
      in: "path"
    },
    description: "UUID Identificador exclusivo do usu\xE1rio",
    example: "d3b07384-d113-49cd-a5d6-80d00d542fba"
  })
});

// src/modules/property/property.enums.ts
var PropertyStatus = {
  Active: "ACTIVE",
  Configure: "CONFIGURE"
};

// src/modules/property/property.schemas.ts
var propertyCoordinateSchema = z.object({
  lat: z.number().openapi({ description: "Latitude", example: -29.7125 }),
  lng: z.number().openapi({ description: "Longitude", example: -53.7156 })
});
var carLookupQuerySchema = z.object({
  car: z.string().trim().regex(
    /^[A-Za-z]{2}-\d{7}-[A-Fa-f0-9]{32}$/,
    "O n\xFAmero do CAR deve seguir o padr\xE3o oficial nacional: UF-XXXXXXX-32HEX (ex: RS-4305108-8C646BEA3C084EEBA1C765BB8E09FA83)."
  ).openapi({
    description: "N\xFAmero oficial do CAR no SICAR (43 caracteres)",
    example: "RS-4305108-8C646BEA3C084EEBA1C765BB8E09FA83"
  })
});
var carLookupResponseSchema = registry.register(
  "CarLookupResponse",
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
    coordinates: z.array(propertyCoordinateSchema)
  })
);
var createPropertySchema = registry.register(
  "CreatePropertyRequest",
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: "Nome da propriedade",
      example: "Fazenda Rio Grande"
    }),
    location: z.string().min(2).max(120).trim().openapi({
      description: "Localiza\xE7\xE3o/Cidade da propriedade",
      example: "Santa Maria, RS"
    }),
    car: z.string().trim().regex(
      /^[A-Za-z]{2}-\d{7}-[A-Fa-f0-9]{32}$/,
      "O n\xFAmero do CAR deve seguir o padr\xE3o oficial nacional: UF-XXXXXXX-32HEX."
    ).optional().openapi({
      description: "Cadastro Ambiental Rural (CAR)",
      example: "RS-4316907-8821B0912A314B5C8D7E9F0A1B2C3D4E"
    }),
    area: z.number().positive().optional().openapi({
      description: "\xC1rea total da propriedade em hectares",
      example: 1250.5
    }),
    fiscalModules: z.number().positive().optional().openapi({
      description: "M\xF3dulos fiscais calculados para a propriedade",
      example: 35.7
    }),
    ownerName: z.string().min(2).max(120).trim().optional().openapi({
      description: "Nome do propriet\xE1rio/possuidor declarado",
      example: "Jo\xE3o da Silva"
    }),
    coordinates: z.array(propertyCoordinateSchema).optional().openapi({
      description: "V\xE9rtices do pol\xEDgono do per\xEDmetro da propriedade"
    })
  })
);
var updatePropertySchema = registry.register(
  "UpdatePropertyRequest",
  createPropertySchema.extend({
    status: z.nativeEnum(PropertyStatus).openapi({
      description: "Status de configura\xE7\xE3o da propriedade",
      example: PropertyStatus.Active
    })
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var propertyResponseSchema = registry.register(
  "PropertyResponse",
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
    updatedAt: z.date()
  })
);
var propertyIdSchema = z.object({
  id: z.string().uuid({ message: "O ID da propriedade deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var propertyQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: "Busca por nome, cidade ou CAR",
    example: "Fazenda"
  }),
  status: z.nativeEnum(PropertyStatus).optional().openapi({
    description: "Filtra pelo status da propriedade",
    example: PropertyStatus.Active
  })
});

// src/modules/field/field.enums.ts
var FieldStatus = {
  Ready: "READY",
  Processing: "PROCESSING",
  Waiting: "WAITING"
};

// src/modules/field/field.schemas.ts
var coordinateSchema = z.object({
  x: z.number(),
  y: z.number()
});
var createFieldSchema = registry.register(
  "CreateFieldRequest",
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: "Nome do talh\xE3o",
      example: "Talh\xE3o da Sede"
    }),
    soilType: z.string().optional().openapi({
      description: "Tipo de solo",
      example: "Latossolo Vermelho"
    }),
    coordinates: z.array(coordinateSchema).min(3).openapi({
      description: "V\xE9rtices do pol\xEDgono desenhado"
    }),
    propertyId: z.string().uuid().openapi({
      description: "ID da propriedade a qual este talh\xE3o pertence"
    })
  })
);
var updateFieldSchema = registry.register(
  "UpdateFieldRequest",
  createFieldSchema.omit({ propertyId: true }).extend({
    status: z.nativeEnum(FieldStatus).openapi({
      description: "Status de processamento do talh\xE3o",
      example: FieldStatus.Ready
    })
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var fieldResponseSchema = registry.register(
  "FieldResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
    soilType: z.string().nullable(),
    area: z.number().nullable(),
    perimeter: z.number().nullable(),
    coordinates: z.any().nullable(),
    status: z.nativeEnum(FieldStatus),
    propertyId: z.string().uuid(),
    property: propertyResponseSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var fieldIdSchema = z.object({
  id: z.string().uuid({ message: "O ID do talh\xE3o deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var fieldQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  propertyId: z.string().uuid().optional().openapi({
    description: "Filtra os talh\xF5es por uma propriedade espec\xEDfica"
  }),
  query: z.string().optional().openapi({
    description: "Busca por nome ou c\xF3digo do talh\xE3o",
    example: "TAL-001"
  }),
  status: z.nativeEnum(FieldStatus).optional().openapi({
    description: "Filtra pelo status do talh\xE3o",
    example: FieldStatus.Ready
  })
});

// src/modules/cycle/cycle.enums.ts
var CycleType = {
  Commercial: "COMMERCIAL",
  Cover: "COVER",
  Fallow: "FALLOW"
};
var ApplicationCategory = {
  Fertilizer: "Fertilizante",
  Defensive: "Defensivo",
  Seed: "Semente",
  Inoculant: "Inoculante",
  Corrective: "Corretivo",
  Biological: "Biol\xF3gico",
  Other: "Outro"
};
var ApplicationUnit = {
  KgHa: "kg/ha",
  LHa: "l/ha",
  GHa: "g/ha",
  DoseHa: "dose/ha",
  TonHa: "ton/ha",
  ScHa: "sc/ha",
  MlHa: "ml/ha"
};

// src/modules/cycle/cycle.schemas.ts
var createFieldInputSchema = z.object({
  product: z.string().min(1, "O nome do produto ou insumo \xE9 obrigat\xF3rio.").max(150),
  category: z.string().min(1).max(100).default("Fertilizante"),
  date: z.coerce.date(),
  quantity: z.union([z.number(), z.string()]).transform((val, ctx) => {
    if (typeof val === "number") {
      if (val <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "A quantidade da aplica\xE7\xE3o deve ser maior que zero."
        });
        return 0;
      }
      return val;
    }
    const numMatch = val.replace(",", ".").match(/[0-9]+(\.[0-9]+)?/);
    if (!numMatch) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Quantidade num\xE9rica inv\xE1lida."
      });
      return 0;
    }
    const parsed = parseFloat(numMatch[0]);
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A quantidade da aplica\xE7\xE3o deve ser maior que zero."
      });
      return 0;
    }
    return parsed;
  }),
  unit: z.string().min(1).max(30).default("kg/ha"),
  notes: z.string().max(500).optional().nullable()
});
var fieldInputResponseSchema = z.object({
  id: z.string().uuid(),
  product: z.string(),
  category: z.string(),
  quantity: z.number(),
  unit: z.string(),
  date: z.date(),
  notes: z.string().nullable().optional(),
  cycleId: z.string().uuid(),
  createdAt: z.date()
});
var createCropCycleSchema = registry.register(
  "CreateCropCycleRequest",
  z.object({
    fieldId: z.string().uuid(),
    tipo: z.nativeEnum(CycleType).default(CycleType.Commercial),
    titulo: z.string().min(2).max(150),
    safra: z.string().min(2).max(50),
    cultura: z.string().max(100).optional(),
    produtividade: z.string().max(100).optional(),
    sequencia: z.number().int().optional(),
    inicio: z.coerce.date(),
    fim: z.coerce.date(),
    inputs: z.array(createFieldInputSchema).optional().default([])
  })
);
var cropCycleResponseSchema = registry.register(
  "CropCycleResponse",
  z.object({
    id: z.string().uuid(),
    tipo: z.nativeEnum(CycleType),
    titulo: z.string(),
    safra: z.string(),
    cultura: z.string().nullable().optional(),
    produtividade: z.string().nullable().optional(),
    sequencia: z.number().int().nullable().optional(),
    inicio: z.date(),
    fim: z.date(),
    fieldId: z.string().uuid(),
    inputs: z.array(fieldInputResponseSchema).optional().default([]),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var cycleInputItemSchema = z.object({
  tipo: z.nativeEnum(CycleType),
  titulo: z.string(),
  cultura: z.string().optional(),
  produtividade: z.string().optional(),
  sequencia: z.number().int().optional(),
  inicio: z.coerce.date(),
  fim: z.coerce.date(),
  inputs: z.array(createFieldInputSchema).optional().default([])
});
var saveSeasonCyclesSchema = registry.register(
  "SaveSeasonCyclesRequest",
  z.object({
    safra: z.string().min(2, "O nome da safra \xE9 obrigat\xF3rio."),
    permiteSobreposicao: z.boolean().default(true).optional(),
    cycles: z.array(cycleInputItemSchema).min(1, "Pelo menos um ciclo de safra deve ser informado.")
  })
);

// src/modules/cycle/cycle.types.ts
import "zod";

// src/modules/monitoring/monitoring.enums.ts
var MonitoringEventType = {
  Ready: "READY",
  Processing: "PROCESSING",
  Sent: "SENT",
  Season: "SEASON"
};

// src/modules/monitoring/monitoring.schemas.ts
var carbonFluxPointSchema = z.object({
  mes: z.string(),
  gpp: z.number(),
  // Gross Primary Production (gCO2 m-2 d-1)
  reco: z.number(),
  // Ecosystem Respiration
  nee: z.number()
  // Net Ecosystem Exchange
});
var carbonInsightSchema = z.object({
  title: z.string(),
  tone: z.enum(["warn", "info", "good"]),
  text: z.string()
});
var carbonAnalysisResponseSchema = registry.register(
  "CarbonAnalysisResponse",
  z.object({
    safra: z.string(),
    fieldId: z.string().uuid(),
    fieldName: z.string(),
    propertyName: z.string(),
    series: z.array(carbonFluxPointSchema),
    kpis: z.object({
      gppTotal: z.number(),
      recoTotal: z.number(),
      neeTotal: z.number(),
      // Balanço líquido (sumidouro se negativo)
      sequestroLiquido: z.string()
      // ex: "-18,4 t CO2e"
    }),
    gridHeatmap: z.array(z.array(z.number())),
    // Matriz Sentinel-2A
    insights: z.array(carbonInsightSchema)
  })
);
var waterPointSchema = z.object({
  mes: z.string(),
  precipitacao: z.number(),
  // mm
  agua: z.number(),
  // umidade do solo %
  limiar: z.number()
  // ponto de murcha crítico %
});
var waterAnomalySchema = z.object({
  level: z.enum(["alto", "medio", "baixo"]),
  period: z.string(),
  title: z.string(),
  detail: z.string()
});
var waterAnalysisResponseSchema = registry.register(
  "WaterAnalysisResponse",
  z.object({
    safra: z.string(),
    fieldId: z.string().uuid(),
    fieldName: z.string(),
    propertyName: z.string(),
    series: z.array(waterPointSchema),
    kpis: z.object({
      chuvaAcumulada: z.number(),
      // mm
      umidadeMedia: z.number(),
      // %
      diasAbaixoLimiar: z.number(),
      statusHidrico: z.string()
    }),
    anomalias: z.array(waterAnomalySchema)
  })
);
var monitoringEventResponseSchema = registry.register(
  "MonitoringEventResponse",
  z.object({
    id: z.string().uuid(),
    type: z.nativeEnum(MonitoringEventType),
    title: z.string(),
    detail: z.string().nullable().optional(),
    date: z.date(),
    propertyId: z.string().uuid(),
    fieldId: z.string().uuid().nullable().optional(),
    fieldName: z.string().optional()
  })
);
var propertyMonitoringHistorySchema = registry.register(
  "PropertyMonitoringHistoryResponse",
  z.object({
    propertyId: z.string().uuid(),
    propertyName: z.string(),
    balancoPorSafra: z.array(
      z.object({
        safra: z.string(),
        balanco: z.number()
        // toneladas
      })
    ),
    events: z.array(monitoringEventResponseSchema)
  })
);
var talhaoResultsResponseSchema = registry.register(
  "TalhaoResultsResponse",
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
      eficienciaHidrica: z.string()
    }),
    carbonSeries: z.array(
      z.object({
        mes: z.string(),
        estoque: z.number(),
        emissao: z.number()
      })
    ),
    waterSeries: z.array(
      z.object({
        mes: z.string(),
        ndvi: z.number(),
        chuva: z.number()
      })
    )
  })
);
var mapTalhaoItemSchema = z.object({
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
  carbonBalance: z.string().optional()
});
var mapExplorerResponseSchema = registry.register(
  "MapExplorerResponse",
  z.object({
    talhoes: z.array(mapTalhaoItemSchema),
    availableLayers: z.array(z.string())
  })
);

// src/modules/monitoring/monitoring.types.ts
import "zod";

// src/modules/documents/document.enums.ts
var DocumentType = {
  Pdf: "pdf",
  Doc: "doc",
  Spreadsheet: "spreadsheet",
  Image: "image",
  Design: "design"
};

// src/modules/documents/document.schemas.ts
var createDocumentSchema = registry.register(
  "CreateDocumentRequest",
  z.object({
    name: z.string().min(2).max(200).trim(),
    type: z.nativeEnum(DocumentType).default(DocumentType.Pdf),
    size: z.string().min(1).max(50),
    folder: z.string().min(1).max(100).default("Geral"),
    fileUrl: z.string().url().optional(),
    propertyId: z.string().uuid().optional()
  })
);
var documentResponseSchema = registry.register(
  "DocumentResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    type: z.nativeEnum(DocumentType),
    size: z.string(),
    folder: z.string(),
    fileUrl: z.string().nullable().optional(),
    propertyId: z.string().uuid().nullable().optional(),
    userId: z.string().uuid(),
    userName: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var documentFolderSchema = z.object({
  name: z.string(),
  files: z.number(),
  theme: z.string()
});

// src/modules/documents/document.types.ts
import "zod";

// src/modules/assistant/assistant.schemas.ts
var citationSchema = z.object({
  label: z.string(),
  category: z.string()
});
var chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  text: z.string(),
  citations: z.array(citationSchema).optional(),
  createdAt: z.union([z.string(), z.date()]).optional()
});
var assistantChatRequestSchema = registry.register(
  "AssistantChatRequest",
  z.object({
    message: z.string().min(1).max(2e3).trim()
  })
);
var assistantChatResponseSchema = registry.register(
  "AssistantChatResponse",
  z.object({
    id: z.string(),
    role: z.literal("assistant"),
    text: z.string(),
    citations: z.array(citationSchema).optional()
  })
);
var assistantHistoryResponseSchema = registry.register(
  "AssistantHistoryResponse",
  z.array(chatMessageSchema)
);
var assistantClearResponseSchema = registry.register(
  "AssistantClearResponse",
  z.object({
    success: z.boolean(),
    message: z.string()
  })
);
var suggestedPromptSchema = z.object({
  label: z.string(),
  query: z.string(),
  group: z.enum(["Carbono", "H\xEDdrico", "Talh\xF5es", "Manejo"])
});
var assistantContextResponseSchema = registry.register(
  "AssistantContextResponse",
  z.object({
    producerName: z.string(),
    organization: z.string(),
    totalProperties: z.number(),
    activeSeason: z.string(),
    totalCarbonBalance: z.string(),
    readyFieldsCount: z.number(),
    suggestedPrompts: z.array(suggestedPromptSchema)
  })
);

// src/modules/assistant/assistant.types.ts
import "zod";

// src/modules/gis/gis.schemas.ts
var gisCoordinateSchema = z.object({
  lat: z.number(),
  lng: z.number()
});
var gisFeatureSummarySchema = z.object({
  index: z.number(),
  name: z.string(),
  code: z.string().optional(),
  areaHa: z.number(),
  perimeterMeters: z.number(),
  coordinates: z.array(gisCoordinateSchema),
  properties: z.record(z.string(), z.any()).optional().default({})
});
var shapefileImportResponseSchema = registry.register(
  "ShapefileImportResponse",
  z.object({
    totalFeatures: z.number(),
    boundingBox: z.array(z.number()).length(4),
    features: z.array(gisFeatureSummarySchema)
  })
);
var confirmShapefileImportSchema = registry.register(
  "ConfirmShapefileImportRequest",
  z.object({
    propertyId: z.string().uuid(),
    fields: z.array(
      z.object({
        name: z.string().min(1).max(100),
        code: z.string().min(1).max(50),
        soilType: z.string().optional(),
        coordinates: z.array(gisCoordinateSchema),
        area: z.number().optional(),
        perimeter: z.number().optional()
      })
    )
  })
);

// src/modules/admin/admin.schemas.ts
var adminMetricsResponseSchema = registry.register(
  "AdminMetricsResponse",
  z.object({
    totalUsers: z.number(),
    totalProperties: z.number(),
    totalFields: z.number(),
    totalMonitoredAreaHa: z.number(),
    totalCropCycles: z.number(),
    usersByRole: z.record(z.nativeEnum(UserRole), z.number()),
    propertiesByStatus: z.record(z.string(), z.number())
  })
);
var adminUserFilterSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  isActive: z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    return val;
  }, z.boolean()).optional()
});

// src/common/common.schemas.ts
var rfc7807ErrorSchema = registry.register(
  "ProblemDetails",
  z.object({
    type: z.string().url().optional().openapi({
      description: "URI que identifica o tipo do erro",
      example: "https://api.dorneles.dev/errors/validation-error"
    }),
    title: z.string().openapi({
      description: "Um resumo curto e leg\xEDvel para humanos do problema",
      example: "Erro de valida\xE7\xE3o nos dados enviados."
    }),
    status: z.number().openapi({
      description: "O c\xF3digo de status HTTP correspondente",
      example: 400
    }),
    detail: z.string().optional().openapi({
      description: "Uma explica\xE7\xE3o espec\xEDfica para esta ocorr\xEAncia do problema",
      example: "O campo email n\xE3o possui um formato v\xE1lido."
    }),
    instance: z.string().optional().openapi({
      description: "URI que identifica a ocorr\xEAncia espec\xEDfica deste problema",
      example: "/tasks/123e4567-e89b-12d3-a456-426614174000"
    }),
    errors: z.record(z.string(), z.array(z.string())).optional().openapi({
      description: "Detalhes de valida\xE7\xE3o campo a campo (opcional)",
      example: {
        dueDate: ["A data de vencimento deve estar no futuro."]
      }
    })
  })
);
var paginationMetaSchema = registry.register(
  "PaginationMeta",
  z.object({
    totalItems: z.number().openapi({ example: 150 }),
    totalPages: z.number().openapi({ example: 15 }),
    currentPage: z.number().openapi({ example: 1 }),
    itemsPerPage: z.number().openapi({ example: 10 })
  })
);
var paginationSchema = registry.register(
  "PaginationQuery",
  z.object({
    page: z.coerce.number({ message: "A p\xE1gina deve ser um n\xFAmero." }).int("A p\xE1gina deve ser um n\xFAmero inteiro.").min(1, "A p\xE1gina deve ser no m\xEDnimo 1.").optional().default(1),
    limit: z.coerce.number({ message: "O limite deve ser um n\xFAmero." }).int("O limite deve ser um n\xFAmero inteiro.").min(1, "O limite deve ser no m\xEDnimo 1.").optional().default(10)
  })
);
function createPaginatedResponseSchema(schema, schemaName) {
  return registry.register(
    schemaName,
    z.object({
      data: z.array(schema),
      meta: paginationMetaSchema
    })
  );
}

// src/utils/date-time.ts
function timeStringToMinutes(timeString) {
  const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
  if (!timeRegex.test(timeString)) return null;
  const [hours, minutes] = timeString.split(":").map(Number);
  return (hours ? hours * 60 : 0) + (minutes ? minutes : 0);
}
function minutesToDecimalHours(minutes) {
  if (minutes < 0) return 0;
  return Math.round(minutes / 60 * 100) / 100;
}
function formatMinutesToReadable(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ""}` : `${m}m`;
}
export {
  ApplicationCategory,
  ApplicationUnit,
  AuthEnums,
  CycleType,
  DocumentType,
  FieldStatus,
  MonitoringEventType,
  OpenApiGeneratorV3,
  PropertyStatus,
  UserRole,
  adminMetricsResponseSchema,
  adminUserFilterSchema,
  assistantChatRequestSchema,
  assistantChatResponseSchema,
  assistantClearResponseSchema,
  assistantContextResponseSchema,
  assistantHistoryResponseSchema,
  carLookupQuerySchema,
  carLookupResponseSchema,
  carbonAnalysisResponseSchema,
  carbonFluxPointSchema,
  carbonInsightSchema,
  chatMessageSchema,
  citationSchema,
  confirmShapefileImportSchema,
  coordinateSchema,
  createCropCycleSchema,
  createDocumentSchema,
  createFieldInputSchema,
  createFieldSchema,
  createPaginatedResponseSchema,
  createPropertySchema,
  createUserSchema,
  cropCycleResponseSchema,
  cycleInputItemSchema,
  documentFolderSchema,
  documentResponseSchema,
  fieldIdSchema,
  fieldInputResponseSchema,
  fieldQuerySchema,
  fieldResponseSchema,
  formatMinutesToReadable,
  gisCoordinateSchema,
  gisFeatureSummarySchema,
  loginSchema,
  mapExplorerResponseSchema,
  mapTalhaoItemSchema,
  minutesToDecimalHours,
  monitoringEventResponseSchema,
  paginationMetaSchema,
  paginationSchema,
  propertyCoordinateSchema,
  propertyIdSchema,
  propertyMonitoringHistorySchema,
  propertyQuerySchema,
  propertyResponseSchema,
  refreshTokenSchema,
  registry,
  rfc7807ErrorSchema,
  saveSeasonCyclesSchema,
  shapefileImportResponseSchema,
  suggestedPromptSchema,
  talhaoResultsResponseSchema,
  timeStringToMinutes,
  updateFieldSchema,
  updatePropertySchema,
  updateUserRoleSchema,
  updateUserSchema,
  userIdSchema,
  userResponseSchema,
  waterAnalysisResponseSchema,
  waterAnomalySchema,
  waterPointSchema,
  z
};
