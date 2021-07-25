import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../models/user.entity';
import * as argon2 from 'argon2';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { UsersService } from '../users.service';

@Injectable()
export class UserAuthenticationPipe
  implements PipeTransform<AuthUserDto, Promise<User>>
{
  constructor(protected usersService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<User> {
    const user = await this.usersService.getUserByEmail(value.email);

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
