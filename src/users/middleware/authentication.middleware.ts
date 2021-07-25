import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from '../users.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      try {
        const jwt = await this.jwtService.decodeAuthToken(
          req.headers.authorization,
        );

        if (!jwt.userId) {
          throw new UnauthorizedException('Invalid authorization token');
        }

        const user = await this.usersService.getUserById(jwt.userId);

        if (!user) {
          throw new UnauthorizedException('User not found.');
        }

        req['user'] = user;
      } catch (err) {
        throw new UnauthorizedException('Invalid ticket format');
      }
    } else {
      throw new UnauthorizedException('Authorization ticket missing.');
    }
    next();
  }
}
