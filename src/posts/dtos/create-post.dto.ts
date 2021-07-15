import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';
import { Category } from 'src/category/models/category.model';

export class CreatePostDto {
  @IsString()
  @Length(5, 56)
  title: string;

  @IsString()
  @Length(5, 256)
  text: string;

  @IsBoolean()
  active: boolean;

  @IsNumber()
  userId: number;

  @IsNumber()
  categoryId: number;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
