import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, USER_SCOPE_AUTH } from '../models/user.model';

@Injectable()
export class UserExistPipe implements PipeTransform {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const user = await this.userModel
      .scope(USER_SCOPE_AUTH)
      .findOne({ where: { email: value.email } });
    if (user) {
      throw new ConflictException('This email address is already taken.');
    }
    return value;
  }
}
