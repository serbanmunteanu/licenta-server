import { Exclude, Expose } from 'class-transformer';
import { Category } from 'src/category/models/category.entity';
import { User } from 'src/users/models/user.entity';
import { Post } from '../models/post.entity';
import { Comment } from '../../comments/models/comment.entity';

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
  userName: string;

  @Expose()
  categoryName: string;

  @Exclude()
  user: User;

  @Exclude()
  category: Category;

  @Expose()
  categoryId: number;

  @Expose()
  userId: string;

  @Expose()
  comments: Comment[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(data: Partial<Post>) {
    Object.assign(this, data);
    if (data.user) {
      this.userName = data.user.name;
    }
    if (data.category) {
      this.categoryName = data.category.name;
    }
  }
}
