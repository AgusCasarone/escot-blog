/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateArticleDto {

    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly content: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsUrl()
    readonly image: string;
}
