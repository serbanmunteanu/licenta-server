import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, USER_SCOPE_AUTH } from '../models/user.model';
import * as argon2 from 'argon2';
import { AuthUserDto } from '../dtos/auth-user.dto';

@Injectable()
export class UserAuthenticationPipe
  implements PipeTransform<AuthUserDto, Promise<User>>
{
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<User> {
    const user = await this.userModel
      .scope(USER_SCOPE_AUTH)
      .findOne({ where: { email: value.email } });

    if (!user) {
      throw new UnauthorizedException('Account does not exist.');
    }
    if (!user.isActive) {
      throw new ForbiddenException('Account disabled');
    }
    if (!(await argon2.verify(user.password, value.password))) {
      throw new UnauthorizedException('Bad credentials');
    }
    return user;
  }
}
