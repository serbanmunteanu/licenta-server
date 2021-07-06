import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';
import { User } from 'src/users/models/user.model';
import { PostAttributes } from './post.attributes';

@Table
@DefaultScope(() => ({
  attributes: ['id', 'title', 'text', 'active', 'createdAt', 'updatedAt'],
  include: [{ model: User }, { model: Category }],
}))
export class Post extends Model<PostAttributes> {
  @AllowNull(false)
  @Length({ max: 56 })
  @Column
  title: string;

  @AllowNull(false)
  @Length({ max: 256 })
  @Column
  text: string;

  @Default(true)
  @Column
  active: boolean;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Category)
  categoryId: Category;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => User)
  userId: User;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Category)
  category: Category;
}
