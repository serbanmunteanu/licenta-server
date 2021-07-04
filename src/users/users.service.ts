import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthenticateUserResponseDto } from './dtos/authenticate-user-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from './models/user.model';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<AuthenticateUserResponseDto> {
    const password = await argon2.hash(registerUserDto.password);
    const user = new User({ ...registerUserDto, password });
    const createdUser = await user.save();

    return this.generateAuthenticationResponse(createdUser);
  }

  async authenticateUser(authUser: User): Promise<AuthenticateUserResponseDto> {
    return this.generateAuthenticationResponse(authUser);
  }

  private generateAuthenticationResponse(
    user: User,
  ): AuthenticateUserResponseDto {
    return new AuthenticateUserResponseDto({
      ...user.get(),
      token: this.jwtService.generateAuthToken(user.id),
    });
  }
}
