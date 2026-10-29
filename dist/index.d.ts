import { z } from 'zod';
export { z } from 'zod';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
export { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';

declare const registry: OpenAPIRegistry;

declare const loginSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>;
    password: z.ZodString;
}, z.core.$strip>;
declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;

/**
 * Enums global object, exports all domains used within the system.
 */
declare const AuthEnums: {
    LoginStatus: {
        readonly Pending: "PENDING";
        readonly Authenticated: "AUTHENTICATED";
        readonly Unauthenticated: "UNAUTHENTICATED";
    };
};
type EnumLoginStatus = (typeof AuthEnums.LoginStatus)[keyof typeof AuthEnums.LoginStatus];

interface TokenPayloadDTO {
    sub: string;
}
type LoginAuthDTO = z.infer<typeof loginSchema>;

declare enum UserRole {
    ADMIN = "ADMIN",
    PRODUCER = "PRODUCER",
    INTERMEDIARY = "INTERMEDIARY",
    VIEWER = "VIEWER"
}

declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>;
    password: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<typeof UserRole>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>>;
    role: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof UserRole>>>;
    password: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
declare const updateUserRoleSchema: z.ZodObject<{
    role: z.ZodEnum<typeof UserRole>;
}, z.core.$strip>;
declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<typeof UserRole>>;
    isActive: z.ZodBoolean;
    created_at: z.ZodCoercedDate<unknown>;
    updated_at: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
declare const userIdSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;

declare const rfc7807ErrorSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    status: z.ZodNumber;
    detail: z.ZodOptional<z.ZodString>;
    instance: z.ZodOptional<z.ZodString>;
    errors: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
declare const paginationMetaSchema: z.ZodObject<{
    totalItems: z.ZodNumber;
    totalPages: z.ZodNumber;
    currentPage: z.ZodNumber;
    itemsPerPage: z.ZodNumber;
}, z.core.$strip>;
declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
declare function createPaginatedResponseSchema(schema: z.ZodTypeAny, schemaName: string): z.ZodObject<{
    data: z.ZodArray<z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>>;
    meta: z.ZodObject<{
        totalItems: z.ZodNumber;
        totalPages: z.ZodNumber;
        currentPage: z.ZodNumber;
        itemsPerPage: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;

type ProblemDetailsDTO = z.infer<typeof rfc7807ErrorSchema>;
type PaginationMetaDTO = z.infer<typeof paginationMetaSchema>;
type PaginationQueryDTO = z.infer<typeof paginationSchema>;
interface PaginatedResultDTO<T> {
    data: T[];
    meta: PaginationMetaDTO;
}

type CreateUserDTO = z.infer<typeof createUserSchema>;
type UpdateUserDTO = z.infer<typeof updateUserSchema>;
type UpdateUserRoleDTO = z.infer<typeof updateUserRoleSchema>;
type UserIdDTO = z.infer<typeof userIdSchema>;
type UserResponseDTO = z.infer<typeof userResponseSchema>;
type PaginatedUsersDTO = PaginatedResultDTO<UserResponseDTO>;

declare const propertyCoordinateSchema: z.ZodObject<{
    lat: z.ZodNumber;
    lng: z.ZodNumber;
}, z.core.$strip>;
declare const carLookupQuerySchema: z.ZodObject<{
    car: z.ZodString;
}, z.core.$strip>;
declare const carLookupResponseSchema: z.ZodObject<{
    car: z.ZodString;
    name: z.ZodString;
    location: z.ZodString;
    municipality: z.ZodString;
    state: z.ZodString;
    ibgeCode: z.ZodString;
    area: z.ZodNumber;
    fiscalModules: z.ZodNumber;
    ownerName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodString;
    coordinates: z.ZodArray<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createPropertySchema: z.ZodObject<{
    name: z.ZodString;
    location: z.ZodString;
    car: z.ZodOptional<z.ZodString>;
    area: z.ZodOptional<z.ZodNumber>;
    fiscalModules: z.ZodOptional<z.ZodNumber>;
    ownerName: z.ZodOptional<z.ZodString>;
    coordinates: z.ZodOptional<z.ZodArray<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const updatePropertySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    car: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    area: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    fiscalModules: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    ownerName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    coordinates: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, z.core.$strip>>>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>>;
}, z.core.$strip>;
declare const propertyResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    location: z.ZodString;
    car: z.ZodNullable<z.ZodString>;
    area: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    fiscalModules: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    ownerName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    coordinates: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, z.core.$strip>>>>;
    status: z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>;
    ownerId: z.ZodString;
    owner: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        role: z.ZodDefault<z.ZodEnum<typeof UserRole>>;
        isActive: z.ZodBoolean;
        created_at: z.ZodCoercedDate<unknown>;
        updated_at: z.ZodCoercedDate<unknown>;
    }, z.core.$strip>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const propertyIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const propertyQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    query: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>>;
}, z.core.$strip>;

declare const PropertyStatus: {
    readonly Active: "ACTIVE";
    readonly Configure: "CONFIGURE";
};
type EnumPropertyStatus = (typeof PropertyStatus)[keyof typeof PropertyStatus];

type PropertyCoordinateDTO = z.infer<typeof propertyCoordinateSchema>;
type CarLookupQueryDTO = z.infer<typeof carLookupQuerySchema>;
type CarLookupResponseDTO = z.infer<typeof carLookupResponseSchema>;
type CreatePropertyDTO = z.infer<typeof createPropertySchema>;
type UpdatePropertyDTO = z.infer<typeof updatePropertySchema>;
type PropertyResponseDTO = z.infer<typeof propertyResponseSchema>;
type PropertyIdDTO = z.infer<typeof propertyIdSchema>;
type PropertyQueryDTO = z.infer<typeof propertyQuerySchema>;
type PaginatedPropertiesDTO = PaginatedResultDTO<PropertyResponseDTO>;

declare const coordinateSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
}, z.core.$strip>;
declare const createFieldSchema: z.ZodObject<{
    name: z.ZodString;
    soilType: z.ZodOptional<z.ZodString>;
    coordinates: z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, z.core.$strip>>;
    propertyId: z.ZodString;
}, z.core.$strip>;
declare const updateFieldSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    coordinates: z.ZodOptional<z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, z.core.$strip>>>;
    soilType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Ready: "READY";
        readonly Processing: "PROCESSING";
        readonly Waiting: "WAITING";
    }>>;
}, z.core.$strip>;
declare const fieldResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    soilType: z.ZodNullable<z.ZodString>;
    area: z.ZodNullable<z.ZodNumber>;
    perimeter: z.ZodNullable<z.ZodNumber>;
    coordinates: z.ZodNullable<z.ZodAny>;
    status: z.ZodEnum<{
        readonly Ready: "READY";
        readonly Processing: "PROCESSING";
        readonly Waiting: "WAITING";
    }>;
    propertyId: z.ZodString;
    property: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        location: z.ZodString;
        car: z.ZodNullable<z.ZodString>;
        area: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        fiscalModules: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        ownerName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        coordinates: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, z.core.$strip>>>>;
        status: z.ZodEnum<{
            readonly Active: "ACTIVE";
            readonly Configure: "CONFIGURE";
        }>;
        ownerId: z.ZodString;
        owner: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodDefault<z.ZodEnum<typeof UserRole>>;
            isActive: z.ZodBoolean;
            created_at: z.ZodCoercedDate<unknown>;
            updated_at: z.ZodCoercedDate<unknown>;
        }, z.core.$strip>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const fieldIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const fieldQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    propertyId: z.ZodOptional<z.ZodString>;
    query: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Ready: "READY";
        readonly Processing: "PROCESSING";
        readonly Waiting: "WAITING";
    }>>;
}, z.core.$strip>;

declare const FieldStatus: {
    readonly Ready: "READY";
    readonly Processing: "PROCESSING";
    readonly Waiting: "WAITING";
};
type EnumFieldStatus = (typeof FieldStatus)[keyof typeof FieldStatus];

type CreateFieldDTO = z.infer<typeof createFieldSchema>;
type UpdateFieldDTO = z.infer<typeof updateFieldSchema>;
type FieldResponseDTO = z.infer<typeof fieldResponseSchema>;
type FieldIdDTO = z.infer<typeof fieldIdSchema>;
type FieldQueryDTO = z.infer<typeof fieldQuerySchema>;
type PaginatedFieldsDTO = PaginatedResultDTO<FieldResponseDTO>;

declare const CycleType: {
    readonly Commercial: "COMMERCIAL";
    readonly Cover: "COVER";
    readonly Fallow: "FALLOW";
};
type EnumCycleType = (typeof CycleType)[keyof typeof CycleType];
declare const ApplicationCategory: {
    readonly Fertilizer: "Fertilizante";
    readonly Defensive: "Defensivo";
    readonly Seed: "Semente";
    readonly Inoculant: "Inoculante";
    readonly Corrective: "Corretivo";
    readonly Biological: "Biológico";
    readonly Other: "Outro";
};
type EnumApplicationCategory = (typeof ApplicationCategory)[keyof typeof ApplicationCategory];
declare const ApplicationUnit: {
    readonly KgHa: "kg/ha";
    readonly LHa: "l/ha";
    readonly GHa: "g/ha";
    readonly DoseHa: "dose/ha";
    readonly TonHa: "ton/ha";
    readonly ScHa: "sc/ha";
    readonly MlHa: "ml/ha";
};
type EnumApplicationUnit = (typeof ApplicationUnit)[keyof typeof ApplicationUnit];

declare const createFieldInputSchema: z.ZodObject<{
    product: z.ZodString;
    category: z.ZodDefault<z.ZodString>;
    date: z.ZodCoercedDate<unknown>;
    quantity: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    unit: z.ZodDefault<z.ZodString>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
declare const fieldInputResponseSchema: z.ZodObject<{
    id: z.ZodString;
    product: z.ZodString;
    category: z.ZodString;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    date: z.ZodDate;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cycleId: z.ZodString;
    createdAt: z.ZodDate;
}, z.core.$strip>;
declare const createCropCycleSchema: z.ZodObject<{
    fieldId: z.ZodString;
    tipo: z.ZodDefault<z.ZodEnum<{
        readonly Commercial: "COMMERCIAL";
        readonly Cover: "COVER";
        readonly Fallow: "FALLOW";
    }>>;
    titulo: z.ZodString;
    safra: z.ZodString;
    cultura: z.ZodOptional<z.ZodString>;
    produtividade: z.ZodOptional<z.ZodString>;
    sequencia: z.ZodOptional<z.ZodNumber>;
    inicio: z.ZodCoercedDate<unknown>;
    fim: z.ZodCoercedDate<unknown>;
    inputs: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        product: z.ZodString;
        category: z.ZodDefault<z.ZodString>;
        date: z.ZodCoercedDate<unknown>;
        quantity: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
        unit: z.ZodDefault<z.ZodString>;
        notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
declare const cropCycleResponseSchema: z.ZodObject<{
    id: z.ZodString;
    tipo: z.ZodEnum<{
        readonly Commercial: "COMMERCIAL";
        readonly Cover: "COVER";
        readonly Fallow: "FALLOW";
    }>;
    titulo: z.ZodString;
    safra: z.ZodString;
    cultura: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    produtividade: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sequencia: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    inicio: z.ZodDate;
    fim: z.ZodDate;
    fieldId: z.ZodString;
    inputs: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        product: z.ZodString;
        category: z.ZodString;
        quantity: z.ZodNumber;
        unit: z.ZodString;
        date: z.ZodDate;
        notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        cycleId: z.ZodString;
        createdAt: z.ZodDate;
    }, z.core.$strip>>>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const cycleInputItemSchema: z.ZodObject<{
    tipo: z.ZodEnum<{
        readonly Commercial: "COMMERCIAL";
        readonly Cover: "COVER";
        readonly Fallow: "FALLOW";
    }>;
    titulo: z.ZodString;
    cultura: z.ZodOptional<z.ZodString>;
    produtividade: z.ZodOptional<z.ZodString>;
    sequencia: z.ZodOptional<z.ZodNumber>;
    inicio: z.ZodCoercedDate<unknown>;
    fim: z.ZodCoercedDate<unknown>;
    inputs: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        product: z.ZodString;
        category: z.ZodDefault<z.ZodString>;
        date: z.ZodCoercedDate<unknown>;
        quantity: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
        unit: z.ZodDefault<z.ZodString>;
        notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
declare const saveSeasonCyclesSchema: z.ZodObject<{
    safra: z.ZodString;
    permiteSobreposicao: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    cycles: z.ZodArray<z.ZodObject<{
        tipo: z.ZodEnum<{
            readonly Commercial: "COMMERCIAL";
            readonly Cover: "COVER";
            readonly Fallow: "FALLOW";
        }>;
        titulo: z.ZodString;
        cultura: z.ZodOptional<z.ZodString>;
        produtividade: z.ZodOptional<z.ZodString>;
        sequencia: z.ZodOptional<z.ZodNumber>;
        inicio: z.ZodCoercedDate<unknown>;
        fim: z.ZodCoercedDate<unknown>;
        inputs: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            product: z.ZodString;
            category: z.ZodDefault<z.ZodString>;
            date: z.ZodCoercedDate<unknown>;
            quantity: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
            unit: z.ZodDefault<z.ZodString>;
            notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;

type CreateCropCycleDTO = z.infer<typeof createCropCycleSchema>;
type CropCycleResponseDTO = z.infer<typeof cropCycleResponseSchema>;
type CreateFieldInputDTO = z.infer<typeof createFieldInputSchema>;
type FieldInputResponseDTO = z.infer<typeof fieldInputResponseSchema>;
type CycleInputItemDTO = z.infer<typeof cycleInputItemSchema>;
type SaveSeasonCyclesDTO = z.infer<typeof saveSeasonCyclesSchema>;

declare const MonitoringEventType: {
    readonly Ready: "READY";
    readonly Processing: "PROCESSING";
    readonly Sent: "SENT";
    readonly Season: "SEASON";
};
type EnumMonitoringEventType = (typeof MonitoringEventType)[keyof typeof MonitoringEventType];

declare const carbonFluxPointSchema: z.ZodObject<{
    mes: z.ZodString;
    gpp: z.ZodNumber;
    reco: z.ZodNumber;
    nee: z.ZodNumber;
}, z.core.$strip>;
declare const carbonInsightSchema: z.ZodObject<{
    title: z.ZodString;
    tone: z.ZodEnum<{
        warn: "warn";
        info: "info";
        good: "good";
    }>;
    text: z.ZodString;
}, z.core.$strip>;
declare const carbonAnalysisResponseSchema: z.ZodObject<{
    safra: z.ZodString;
    fieldId: z.ZodString;
    fieldName: z.ZodString;
    propertyName: z.ZodString;
    series: z.ZodArray<z.ZodObject<{
        mes: z.ZodString;
        gpp: z.ZodNumber;
        reco: z.ZodNumber;
        nee: z.ZodNumber;
    }, z.core.$strip>>;
    kpis: z.ZodObject<{
        gppTotal: z.ZodNumber;
        recoTotal: z.ZodNumber;
        neeTotal: z.ZodNumber;
        sequestroLiquido: z.ZodString;
    }, z.core.$strip>;
    gridHeatmap: z.ZodArray<z.ZodArray<z.ZodNumber>>;
    insights: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        tone: z.ZodEnum<{
            warn: "warn";
            info: "info";
            good: "good";
        }>;
        text: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const waterPointSchema: z.ZodObject<{
    mes: z.ZodString;
    precipitacao: z.ZodNumber;
    agua: z.ZodNumber;
    limiar: z.ZodNumber;
}, z.core.$strip>;
declare const waterAnomalySchema: z.ZodObject<{
    level: z.ZodEnum<{
        alto: "alto";
        medio: "medio";
        baixo: "baixo";
    }>;
    period: z.ZodString;
    title: z.ZodString;
    detail: z.ZodString;
}, z.core.$strip>;
declare const waterAnalysisResponseSchema: z.ZodObject<{
    safra: z.ZodString;
    fieldId: z.ZodString;
    fieldName: z.ZodString;
    propertyName: z.ZodString;
    series: z.ZodArray<z.ZodObject<{
        mes: z.ZodString;
        precipitacao: z.ZodNumber;
        agua: z.ZodNumber;
        limiar: z.ZodNumber;
    }, z.core.$strip>>;
    kpis: z.ZodObject<{
        chuvaAcumulada: z.ZodNumber;
        umidadeMedia: z.ZodNumber;
        diasAbaixoLimiar: z.ZodNumber;
        statusHidrico: z.ZodString;
    }, z.core.$strip>;
    anomalias: z.ZodArray<z.ZodObject<{
        level: z.ZodEnum<{
            alto: "alto";
            medio: "medio";
            baixo: "baixo";
        }>;
        period: z.ZodString;
        title: z.ZodString;
        detail: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const monitoringEventResponseSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        readonly Ready: "READY";
        readonly Processing: "PROCESSING";
        readonly Sent: "SENT";
        readonly Season: "SEASON";
    }>;
    title: z.ZodString;
    detail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date: z.ZodDate;
    propertyId: z.ZodString;
    fieldId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fieldName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const propertyMonitoringHistorySchema: z.ZodObject<{
    propertyId: z.ZodString;
    propertyName: z.ZodString;
    balancoPorSafra: z.ZodArray<z.ZodObject<{
        safra: z.ZodString;
        balanco: z.ZodNumber;
    }, z.core.$strip>>;
    events: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            readonly Ready: "READY";
            readonly Processing: "PROCESSING";
            readonly Sent: "SENT";
            readonly Season: "SEASON";
        }>;
        title: z.ZodString;
        detail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date: z.ZodDate;
        propertyId: z.ZodString;
        fieldId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        fieldName: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const talhaoResultsResponseSchema: z.ZodObject<{
    fieldId: z.ZodString;
    propertyId: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    area: z.ZodNullable<z.ZodNumber>;
    soilType: z.ZodNullable<z.ZodString>;
    kpis: z.ZodObject<{
        balancoCarbono: z.ZodString;
        estoqueSolo: z.ZodString;
        eficienciaHidrica: z.ZodString;
    }, z.core.$strip>;
    carbonSeries: z.ZodArray<z.ZodObject<{
        mes: z.ZodString;
        estoque: z.ZodNumber;
        emissao: z.ZodNumber;
    }, z.core.$strip>>;
    waterSeries: z.ZodArray<z.ZodObject<{
        mes: z.ZodString;
        ndvi: z.ZodNumber;
        chuva: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const mapTalhaoItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    area: z.ZodNullable<z.ZodNumber>;
    status: z.ZodString;
    soilType: z.ZodNullable<z.ZodString>;
    coordinates: z.ZodNullable<z.ZodAny>;
    propertyId: z.ZodString;
    propertyName: z.ZodString;
    location: z.ZodString;
    carbonBalance: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const mapExplorerResponseSchema: z.ZodObject<{
    talhoes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        code: z.ZodString;
        area: z.ZodNullable<z.ZodNumber>;
        status: z.ZodString;
        soilType: z.ZodNullable<z.ZodString>;
        coordinates: z.ZodNullable<z.ZodAny>;
        propertyId: z.ZodString;
        propertyName: z.ZodString;
        location: z.ZodString;
        carbonBalance: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    availableLayers: z.ZodArray<z.ZodString>;
}, z.core.$strip>;

type CarbonFluxPointDTO = z.infer<typeof carbonFluxPointSchema>;
type CarbonInsightDTO = z.infer<typeof carbonInsightSchema>;
type CarbonAnalysisResponseDTO = z.infer<typeof carbonAnalysisResponseSchema>;
type WaterPointDTO = z.infer<typeof waterPointSchema>;
type WaterAnomalyDTO = z.infer<typeof waterAnomalySchema>;
type WaterAnalysisResponseDTO = z.infer<typeof waterAnalysisResponseSchema>;
type MonitoringEventResponseDTO = z.infer<typeof monitoringEventResponseSchema>;
type PropertyMonitoringHistoryDTO = z.infer<typeof propertyMonitoringHistorySchema>;
type TalhaoResultsResponseDTO = z.infer<typeof talhaoResultsResponseSchema>;
type MapTalhaoItemDTO = z.infer<typeof mapTalhaoItemSchema>;
type MapExplorerResponseDTO = z.infer<typeof mapExplorerResponseSchema>;

declare const DocumentType: {
    readonly Pdf: "pdf";
    readonly Doc: "doc";
    readonly Spreadsheet: "spreadsheet";
    readonly Image: "image";
    readonly Design: "design";
};
type EnumDocumentType = (typeof DocumentType)[keyof typeof DocumentType];

declare const createDocumentSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<{
        readonly Pdf: "pdf";
        readonly Doc: "doc";
        readonly Spreadsheet: "spreadsheet";
        readonly Image: "image";
        readonly Design: "design";
    }>>;
    size: z.ZodString;
    folder: z.ZodDefault<z.ZodString>;
    fileUrl: z.ZodOptional<z.ZodString>;
    propertyId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const documentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<{
        readonly Pdf: "pdf";
        readonly Doc: "doc";
        readonly Spreadsheet: "spreadsheet";
        readonly Image: "image";
        readonly Design: "design";
    }>;
    size: z.ZodString;
    folder: z.ZodString;
    fileUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    propertyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userId: z.ZodString;
    userName: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const documentFolderSchema: z.ZodObject<{
    name: z.ZodString;
    files: z.ZodNumber;
    theme: z.ZodString;
}, z.core.$strip>;

type CreateDocumentDTO = z.infer<typeof createDocumentSchema>;
type DocumentResponseDTO = z.infer<typeof documentResponseSchema>;
type DocumentFolderDTO = z.infer<typeof documentFolderSchema>;

declare const citationSchema: z.ZodObject<{
    label: z.ZodString;
    category: z.ZodString;
}, z.core.$strip>;
declare const chatMessageSchema: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodEnum<{
        user: "user";
        assistant: "assistant";
    }>;
    text: z.ZodString;
    citations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        category: z.ZodString;
    }, z.core.$strip>>>;
    createdAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
}, z.core.$strip>;
declare const assistantChatRequestSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
declare const assistantChatResponseSchema: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodLiteral<"assistant">;
    text: z.ZodString;
    citations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        category: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const assistantHistoryResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    role: z.ZodEnum<{
        user: "user";
        assistant: "assistant";
    }>;
    text: z.ZodString;
    citations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        category: z.ZodString;
    }, z.core.$strip>>>;
    createdAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
}, z.core.$strip>>;
declare const assistantClearResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
}, z.core.$strip>;
declare const suggestedPromptSchema: z.ZodObject<{
    label: z.ZodString;
    query: z.ZodString;
    group: z.ZodEnum<{
        Carbono: "Carbono";
        Hídrico: "Hídrico";
        Talhões: "Talhões";
        Manejo: "Manejo";
    }>;
}, z.core.$strip>;
declare const assistantContextResponseSchema: z.ZodObject<{
    producerName: z.ZodString;
    organization: z.ZodString;
    totalProperties: z.ZodNumber;
    activeSeason: z.ZodString;
    totalCarbonBalance: z.ZodString;
    readyFieldsCount: z.ZodNumber;
    suggestedPrompts: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        query: z.ZodString;
        group: z.ZodEnum<{
            Carbono: "Carbono";
            Hídrico: "Hídrico";
            Talhões: "Talhões";
            Manejo: "Manejo";
        }>;
    }, z.core.$strip>>;
}, z.core.$strip>;

type CitationDTO = z.infer<typeof citationSchema>;
type ChatMessageDTO = z.infer<typeof chatMessageSchema>;
type AssistantChatRequestDTO = z.infer<typeof assistantChatRequestSchema>;
type AssistantChatResponseDTO = z.infer<typeof assistantChatResponseSchema>;
type AssistantHistoryResponseDTO = z.infer<typeof assistantHistoryResponseSchema>;
type AssistantClearResponseDTO = z.infer<typeof assistantClearResponseSchema>;
type SuggestedPromptDTO = z.infer<typeof suggestedPromptSchema>;
type AssistantContextResponseDTO = z.infer<typeof assistantContextResponseSchema>;

declare const gisCoordinateSchema: z.ZodObject<{
    lat: z.ZodNumber;
    lng: z.ZodNumber;
}, z.core.$strip>;
declare const gisFeatureSummarySchema: z.ZodObject<{
    index: z.ZodNumber;
    name: z.ZodString;
    code: z.ZodOptional<z.ZodString>;
    areaHa: z.ZodNumber;
    perimeterMeters: z.ZodNumber;
    coordinates: z.ZodArray<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, z.core.$strip>>;
    properties: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, z.core.$strip>;
declare const shapefileImportResponseSchema: z.ZodObject<{
    totalFeatures: z.ZodNumber;
    boundingBox: z.ZodArray<z.ZodNumber>;
    features: z.ZodArray<z.ZodObject<{
        index: z.ZodNumber;
        name: z.ZodString;
        code: z.ZodOptional<z.ZodString>;
        areaHa: z.ZodNumber;
        perimeterMeters: z.ZodNumber;
        coordinates: z.ZodArray<z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, z.core.$strip>>;
        properties: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const confirmShapefileImportSchema: z.ZodObject<{
    propertyId: z.ZodString;
    fields: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        code: z.ZodString;
        soilType: z.ZodOptional<z.ZodString>;
        coordinates: z.ZodArray<z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, z.core.$strip>>;
        area: z.ZodOptional<z.ZodNumber>;
        perimeter: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;

type GisCoordinateDTO = z.infer<typeof gisCoordinateSchema>;
type GisFeatureSummaryDTO = z.infer<typeof gisFeatureSummarySchema>;
type ShapefileImportResponseDTO = z.infer<typeof shapefileImportResponseSchema>;
type ConfirmShapefileImportDTO = z.infer<typeof confirmShapefileImportSchema>;

declare const adminMetricsResponseSchema: z.ZodObject<{
    totalUsers: z.ZodNumber;
    totalProperties: z.ZodNumber;
    totalFields: z.ZodNumber;
    totalMonitoredAreaHa: z.ZodNumber;
    totalCropCycles: z.ZodNumber;
    usersByRole: z.ZodRecord<z.ZodEnum<typeof UserRole>, z.ZodNumber>;
    propertiesByStatus: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, z.core.$strip>;
declare const adminUserFilterSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<typeof UserRole>>;
    isActive: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
}, z.core.$strip>;

type AdminMetricsResponseDTO = z.infer<typeof adminMetricsResponseSchema>;
type AdminUserFilterDTO = z.infer<typeof adminUserFilterSchema>;

/**
 * Converte string "HH:mm" em minutos totais desde a meia-noite.
 */
declare function timeStringToMinutes(timeString: string): number | null;
/**
 * Converte minutos totais para decimal (ex: 90min -> 1.5).
 */
declare function minutesToDecimalHours(minutes: number): number;
/**
 * Formata minutos para exibição legível "Xh Ym".
 */
declare function formatMinutesToReadable(minutes: number): string;

export { type AdminMetricsResponseDTO, type AdminUserFilterDTO, ApplicationCategory, ApplicationUnit, type AssistantChatRequestDTO, type AssistantChatResponseDTO, type AssistantClearResponseDTO, type AssistantContextResponseDTO, type AssistantHistoryResponseDTO, AuthEnums, type CarLookupQueryDTO, type CarLookupResponseDTO, type CarbonAnalysisResponseDTO, type CarbonFluxPointDTO, type CarbonInsightDTO, type ChatMessageDTO, type CitationDTO, type ConfirmShapefileImportDTO, type CreateCropCycleDTO, type CreateDocumentDTO, type CreateFieldDTO, type CreateFieldInputDTO, type CreatePropertyDTO, type CreateUserDTO, type CropCycleResponseDTO, type CycleInputItemDTO, CycleType, type DocumentFolderDTO, type DocumentResponseDTO, DocumentType, type EnumApplicationCategory, type EnumApplicationUnit, type EnumCycleType, type EnumDocumentType, type EnumFieldStatus, type EnumLoginStatus, type EnumMonitoringEventType, type EnumPropertyStatus, type FieldIdDTO, type FieldInputResponseDTO, type FieldQueryDTO, type FieldResponseDTO, FieldStatus, type GisCoordinateDTO, type GisFeatureSummaryDTO, type LoginAuthDTO, type MapExplorerResponseDTO, type MapTalhaoItemDTO, type MonitoringEventResponseDTO, MonitoringEventType, type PaginatedFieldsDTO, type PaginatedPropertiesDTO, type PaginatedResultDTO, type PaginatedUsersDTO, type PaginationMetaDTO, type PaginationQueryDTO, type ProblemDetailsDTO, type PropertyCoordinateDTO, type PropertyIdDTO, type PropertyMonitoringHistoryDTO, type PropertyQueryDTO, type PropertyResponseDTO, PropertyStatus, type SaveSeasonCyclesDTO, type ShapefileImportResponseDTO, type SuggestedPromptDTO, type TalhaoResultsResponseDTO, type TokenPayloadDTO, type UpdateFieldDTO, type UpdatePropertyDTO, type UpdateUserDTO, type UpdateUserRoleDTO, type UserIdDTO, type UserResponseDTO, UserRole, type WaterAnalysisResponseDTO, type WaterAnomalyDTO, type WaterPointDTO, adminMetricsResponseSchema, adminUserFilterSchema, assistantChatRequestSchema, assistantChatResponseSchema, assistantClearResponseSchema, assistantContextResponseSchema, assistantHistoryResponseSchema, carLookupQuerySchema, carLookupResponseSchema, carbonAnalysisResponseSchema, carbonFluxPointSchema, carbonInsightSchema, chatMessageSchema, citationSchema, confirmShapefileImportSchema, coordinateSchema, createCropCycleSchema, createDocumentSchema, createFieldInputSchema, createFieldSchema, createPaginatedResponseSchema, createPropertySchema, createUserSchema, cropCycleResponseSchema, cycleInputItemSchema, documentFolderSchema, documentResponseSchema, fieldIdSchema, fieldInputResponseSchema, fieldQuerySchema, fieldResponseSchema, formatMinutesToReadable, gisCoordinateSchema, gisFeatureSummarySchema, loginSchema, mapExplorerResponseSchema, mapTalhaoItemSchema, minutesToDecimalHours, monitoringEventResponseSchema, paginationMetaSchema, paginationSchema, propertyCoordinateSchema, propertyIdSchema, propertyMonitoringHistorySchema, propertyQuerySchema, propertyResponseSchema, refreshTokenSchema, registry, rfc7807ErrorSchema, saveSeasonCyclesSchema, shapefileImportResponseSchema, suggestedPromptSchema, talhaoResultsResponseSchema, timeStringToMinutes, updateFieldSchema, updatePropertySchema, updateUserRoleSchema, updateUserSchema, userIdSchema, userResponseSchema, waterAnalysisResponseSchema, waterAnomalySchema, waterPointSchema };
