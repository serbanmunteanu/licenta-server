import { Exclude } from 'class-transformer';
import { GetCommentDto } from 'src/comments/dtos/get-comment.dto';
import { User } from 'src/users/models/user.entity';
import { Post } from '../models/post.entity';

export class GetPostDto {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  votes: number;
  userId: string;
  userName: string;
  @Exclude()
  user: User;
  comments: GetCommentDto[];
  tags: string[];

  constructor(data: Partial<Post> & { userName: string }) {
    Object.assign(this, data);
    this.userName = data.user.name;
    if (data.comments.length) {
      this.comments = data.comments.map((comment) => {
        return new GetCommentDto({
          id: comment.id,
          text: comment.text,
          thumbsDown: comment.thumbsDown,
          thumbsUp: comment.thumbsUp,
          userId: comment.user.id,
          userName: comment.user.name,
          createdAt: comment.createdAt,
        });
      });
    }
    if (data.tags.length) {
      this.tags = data.tags.map((tag) => tag.name);
    }
  }
}
