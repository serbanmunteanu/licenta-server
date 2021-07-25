import { Exclude } from 'class-transformer';
import { Post } from '../../posts/models/post.entity';
import { Category } from '../models/category.entity';
import { GetCategoryPostInfoDto } from './get-category-post-info.dto';

export class GetCategoryDto {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
  isActive: boolean;
  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;
  posts?: GetCategoryPostInfoDto[];

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
    if (data.posts.length) {
      const posts = data.posts.map((post) => {
        return new GetCategoryPostInfoDto({
          title: post.title,
          userName: post.user?.name,
          createdAt: post.createdAt,
          userId: post.userId,
          tags: post.tags.length ? post.tags.map((tag) => tag.name) : [],
          lastComment: post.comments.length ? post.comments.pop() : {},
          commentsNumber: post.comments.length,
          votes: 0,
          views: 0,
        });
      });
      this.posts = posts;
    }
  }
}
