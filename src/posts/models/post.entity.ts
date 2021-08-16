import { Category } from 'src/category/models/category.entity';
import { User } from 'src/users/models/user.entity';
import { Comment } from 'src/comments/models/comment.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from 'src/tags/models/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 56 })
  title: string;

  @Column('varchar', { length: 500 })
  text: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  userId: number;

  @Column()
  categoryId: number;

  @Column({ default: 0 })
  votes: number;

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];
}
