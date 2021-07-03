import {
  AllowNull,
  Column,
  Default,
  DefaultScope,
  Length,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserAttributes } from './user.attributes';

@Table
@DefaultScope(() => ({
  attributes: [
    'id',
    'name',
    'email',
    'phone',
    'canReply',
    'createdAt',
    'updatedAt',
  ],
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
