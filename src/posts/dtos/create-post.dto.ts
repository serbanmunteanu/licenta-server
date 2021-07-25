import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';
import { Post } from '../models/post.entity';

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
  categoryId: number;

  constructor(data: Partial<Post>) {
    Object.assign(this, data);
  }
}
