import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    const bucket = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    const region = this.configService.getOrThrow('AWS_S3_REGION');

    const sanitizedFileName = this.sanitizeFileName(fileName);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: sanitizedFileName,
        Body: file,
      }),
    );

    return `https://${bucket}.s3.${region}.amazonaws.com/${sanitizedFileName}`;
  }

  private sanitizeFileName(fileName: string): string {
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, '-')
      .replace(/\..+/, '');

    const sanitizedFileName = fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\s+/g, '_');

    const lastDotIndex = sanitizedFileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return `${sanitizedFileName}_${timestamp}`;
    }

    const name = sanitizedFileName.substring(0, lastDotIndex);
    const extension = sanitizedFileName.substring(lastDotIndex + 1);
    return `${name}_${timestamp}.${extension}`;
  }
}
