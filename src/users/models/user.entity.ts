import { Post } from 'src/posts/models/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comments/models/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: null })
  phone?: string;

  @Column()
  password: string;

  @Column({ default: true })
  canReply?: boolean;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ default: false })
  isAdmin?: boolean;

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];
}
