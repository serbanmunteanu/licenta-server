import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  generateAuthToken(userId: string): string {
    return jwt.sign({ userId }, this.configService.get('auth.jwt.secret'), {
      expiresIn: this.configService.get('auth.jwt.expiration'),
    });
  }

  decodeAuthToken(token: string): Record<string, number> {
    return jwt.verify(
      token,
      this.configService.get('auth.jwt.secret'),
    ) as Record<string, number>;
  }
}
