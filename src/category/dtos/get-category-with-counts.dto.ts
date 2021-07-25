import { Exclude } from 'class-transformer';
import { Post } from 'src/posts/models/post.entity';
import { Category } from '../models/category.entity';

export class GetCategoryWithCounts {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
  isActive: boolean;
  @Exclude()
  posts: Post[];
  postsNumber: number;
  commentsNumber: number;
  lastPost: Partial<Post> & { userName?: string };

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
    this.postsNumber = data.posts.length;
    this.commentsNumber = data.posts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.comments.length,
      0,
    );

    this.lastPost = {};
    if (data.posts?.length) {
      const lastPost = data.posts.pop();
      this.lastPost = {
        userId: lastPost.user.id,
        userName: lastPost.user.name,
        text: lastPost.text,
        updatedAt: lastPost.updatedAt,
      };
    }
  }
}
