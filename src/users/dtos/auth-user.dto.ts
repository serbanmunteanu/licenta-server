import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { User } from '../models/user.entity';

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 32)
  @IsNotEmpty()
  password: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
