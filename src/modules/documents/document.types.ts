import { z } from 'zod';
import {
  createDocumentSchema,
  documentResponseSchema,
  documentFolderSchema,
} from './document.schemas';

export type CreateDocumentDTO = z.infer<typeof createDocumentSchema>;
export type DocumentResponseDTO = z.infer<typeof documentResponseSchema>;
export type DocumentFolderDTO = z.infer<typeof documentFolderSchema>;
