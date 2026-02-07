import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';

export const ContentTypeSchema = z.enum([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
]);

export const FileUploadSchema = z.object({
  s3Key: z.string().nonempty(),
  contentType: ContentTypeSchema,
});

export const FileUploadResponseSchema = z.object({
  downloadUrl: z.url(),
  uploadUrl: z.url(),
});

export type FileUploadResponse = z.infer<typeof FileUploadResponseSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;

export class S3Storage {
  constructor(private readonly s3Client: S3Client = new S3Client()) {}

  public async getFileUploadUrl(
    bucket: string,
    upload: FileUpload,
  ): Promise<FileUploadResponse> {
    const { s3Key, contentType } = upload;

    const uploadUrl = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: bucket,
        Key: s3Key,
        ContentType: contentType,
      }),
      { expiresIn: 3600 },
    );

    return FileUploadResponseSchema.parse({
      downloadUrl: `https://${bucket}.s3.amazonaws.com/${s3Key}`,
      uploadUrl,
    });
  }
}
