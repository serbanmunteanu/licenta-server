import { Exclude, Expose } from 'class-transformer';
import { User } from '../models/user.entity';

export class AuthenticateUserResponseDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Exclude()
  password: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  token: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(data: Partial<User> & { token: string }) {
    Object.assign(this, data);
  }
}
