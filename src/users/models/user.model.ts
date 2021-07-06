import {
  AllowNull,
  Column,
  Default,
  DefaultScope,
  HasMany,
  Length,
  Model,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Post } from 'src/posts/models/post.model';
import { UserAttributes } from './user.attributes';

export const USER_SCOPE_AUTH = 'auth';

@Table
@DefaultScope(() => ({
  attributes: [
    'id',
    'name',
    'email',
    'phone',
    'canReply',
    'isActive',
    'createdAt',
    'updatedAt',
  ],
}))
@Scopes(() => ({
  [USER_SCOPE_AUTH]: {
    attributes: [
      'id',
      'name',
      'email',
      'password',
      'phone',
      'canReply',
      'isActive',
      'createdAt',
      'updatedAt',
    ],
  },
}))
export class User extends Model<UserAttributes> {
  @AllowNull(false)
  @Length({ max: 56 })
  @Column
  name: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull
  @Column
  phone?: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Default(true)
  @Column
  canReply?: boolean;

  @Default(true)
  @Column
  isActive?: boolean;
}
