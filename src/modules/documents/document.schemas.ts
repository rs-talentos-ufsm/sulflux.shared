import { z, registry } from '../../lib/registry';
import { DocumentType } from './document.enums';

export const createDocumentSchema = registry.register(
  'CreateDocumentRequest',
  z.object({
    name: z.string().min(2).max(200).trim(),
    type: z.nativeEnum(DocumentType).default(DocumentType.Pdf),
    size: z.string().min(1).max(50),
    folder: z.string().min(1).max(100).default('Geral'),
    fileUrl: z.string().url().optional(),
    propertyId: z.string().uuid().optional(),
  }),
);

export const documentResponseSchema = registry.register(
  'DocumentResponse',
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
    updatedAt: z.date(),
  }),
);

export const documentFolderSchema = z.object({
  name: z.string(),
  files: z.number(),
  theme: z.string(),
});
