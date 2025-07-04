import { IsEmpty, IsString, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @IsEmpty()
  @IsString()
  readonly title: string;

  @IsEmpty()
  @IsString()
  readonly content: string;

  @IsEmpty()
  @IsString()
  readonly author: string;

  @IsEmpty()
  @IsUrl()
  readonly image: string;
}
