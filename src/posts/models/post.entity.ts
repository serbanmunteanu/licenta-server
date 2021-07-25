import { Category } from 'src/category/models/category.entity';
import { User } from 'src/users/models/user.entity';
import { Comment } from 'src/comments/models/comment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  userId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
