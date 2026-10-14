export const DocumentType = {
  Pdf: 'pdf',
  Doc: 'doc',
  Spreadsheet: 'spreadsheet',
  Image: 'image',
  Design: 'design',
} as const;

export type EnumDocumentType = (typeof DocumentType)[keyof typeof DocumentType];
