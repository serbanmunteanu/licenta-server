import { Post } from 'src/posts/models/post.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../comments/models/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone?: string;

  @Column()
  password: string;

  @Column({ default: true })
  canReply?: boolean;

  @Column({ default: true })
  isActive?: boolean;

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];
}
