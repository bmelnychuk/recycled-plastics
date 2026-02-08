import z from 'zod';

export const ContentTypeSchema = z.enum([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
]);

export const MaterialFileUploadRequestSchema = z.object({
  uploadType: z.enum(['demand-document', 'supply-document', 'supply-picture']),
  materialId: z.uuid(),
  companyId: z.uuid(),
  contentType: ContentTypeSchema,
});

export const CompanyFileUploadRequestSchema = z.object({
  uploadType: z.enum(['company-logo', 'company-private-document']),
  companyId: z.uuid(),
  contentType: ContentTypeSchema,
});

export const FileUploadRequestSchema = z.discriminatedUnion('uploadType', [
  MaterialFileUploadRequestSchema,
  CompanyFileUploadRequestSchema,
]);

export const FileUploadResponseSchema = z.object({
  fileId: z.string(),
  downloadUrl: z.url(),
  uploadUrl: z.url(),
});

export type FileUploadRequest = z.infer<typeof FileUploadRequestSchema>;
export type FileUploadResponse = z.infer<typeof FileUploadResponseSchema>;
