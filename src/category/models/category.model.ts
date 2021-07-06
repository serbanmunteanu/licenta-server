import {
  AllowNull,
  Column,
  Default,
  DefaultScope,
  HasMany,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/posts/models/post.model';
import { CategoryAttributes } from './category.attributes';

@Table
@DefaultScope(() => ({
  attributes: [
    'id',
    'name',
    'shortDescription',
    'image',
    'isActive',
    'createdAt',
    'updatedAt',
  ],
}))
export class Category extends Model<CategoryAttributes> {
  @AllowNull(false)
  @Length({ max: 56 })
  @Column
  name: string;

  @AllowNull(false)
  @Length({ max: 256 })
  @Column
  shortDescription: string;

  @AllowNull(false)
  @Length({ max: 56 })
  @Column
  image: string;

  @Default(false)
  @Column
  isActive?: boolean;

  @HasMany(() => Post)
  posts: Post[];
}
