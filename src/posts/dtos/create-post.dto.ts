import { IsString, Length } from 'class-validator';
import { Category } from 'src/category/models/category.model';

export class CreatePostDto {
  @IsString()
  @Length(5, 56)
  title: string;

  @IsString()
  @Length(5, 256)
  text: string;

  @IsString()
  active: boolean;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
