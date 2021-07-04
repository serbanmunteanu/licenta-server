import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Category } from '../models/category.model';

export class CreateCategoryDto {
  @IsString()
  @Length(5, 56)
  name: string;

  @IsString()
  @Length(5, 256)
  shortDescription: string;

  @IsString()
  image: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
