import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class UserExistPipe implements PipeTransform {
  constructor(protected usersService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const user = await this.usersService.getUserByEmail(value.email);
    if (user) {
      throw new ConflictException('This email address is already taken.');
    }
    return value;
  }
}
