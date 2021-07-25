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
  user: User;

  @Expose()
  category: Category;

  @Expose()
  comments: Comment[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(data: Partial<Post>) {
    Object.assign(this, data);
  }
}
