import { IsOptional, IsString } from 'class-validator';

export class CatQueryDto {
  @IsOptional()
  @IsString()
  page?: string;
}
