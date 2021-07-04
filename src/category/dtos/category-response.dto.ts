import { Expose } from 'class-transformer';
import { Category } from '../models/category.model';

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
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
