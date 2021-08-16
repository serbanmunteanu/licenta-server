import { Comment } from '../../comments/models/comment.entity';

export class GetCategoryPostInfoDto {
  id: string;
  title: string;
  createdAt: string;
  userName: string;
  userId: string;
  tags: string[];
  commentsNumber: number;
  votes: number;
  views: number;
  lastComment: Partial<Comment> & { userName: string };

  constructor(data) {
    Object.assign(this, data);
    if (data.lastComment) {
      this.lastComment = {
        userId: data.lastComment.userId,
        userName: data.lastComment.user?.name,
        text: data.lastComment.text,
        createdAt: data.lastComment.createdAt,
      };
    }
  }
}
