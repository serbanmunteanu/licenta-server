import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(user: any): Promise<any> {
    return { a: 'as' };
  }
}
