import { Expose } from 'class-transformer';
import { Category } from '../models/category.entity';

export class CategoryResponseDto {
  @Expose()
  name: string;

  @Expose()
  shortDescription: string;

  @Expose()
  isActive: boolean;

  @Expose()
  image: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
