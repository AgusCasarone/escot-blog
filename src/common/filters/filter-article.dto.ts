import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { SortOption } from '../enums/sort-option.enum';

export class FilterArticleDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  author?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  sort?: SortOption;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  currentPage?: number;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  limit?: number;
}
