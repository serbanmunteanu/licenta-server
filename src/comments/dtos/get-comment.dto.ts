export class GetCommentDto {
  id: number;
  text: string;
  thumbsUp: number;
  thumbsDown: number;
  userId: string;
  userName: string;
  createdAt: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
