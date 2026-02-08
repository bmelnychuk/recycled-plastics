import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';
import { ContentTypeSchema } from '../../application/service/FileUploadService';

export const FileUploadSchema = z.object({
  s3Key: z.string().nonempty(),
  contentType: ContentTypeSchema,
});

const FileUploadResponseSchema = z.object({
  downloadUrl: z.url(),
  uploadUrl: z.url(),
});

type FileUploadResponse = z.infer<typeof FileUploadResponseSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;

export class S3Storage {
  private readonly s3Client: S3Client;

  constructor(config: S3ClientConfig = {}) {
    this.s3Client = new S3Client(config);
  }

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
