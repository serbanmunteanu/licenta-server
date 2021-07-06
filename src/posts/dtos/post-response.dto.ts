import { Expose } from 'class-transformer';
import { Category } from 'src/category/models/category.model';
import { User } from 'src/users/models/user.model';

export class PostResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  text: string;

  @Expose()
  active: boolean;

  @Expose()
  user: User;

  @Expose()
  category: Category;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
