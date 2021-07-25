import { Post } from 'src/posts/models/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortDescription: string;

  @Column()
  image: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
