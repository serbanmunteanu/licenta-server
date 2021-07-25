import { Post } from 'src/posts/models/post.entity';
import { User } from 'src/users/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  thumbsUp: number;

  @Column()
  thumbsDown: number;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
