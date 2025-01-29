/* eslint-disable prettier/prettier */
import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {

    private readonly s3Client = new S3Client();

    constructor(
        private readonly configService: ConfigService
    ){}

}
