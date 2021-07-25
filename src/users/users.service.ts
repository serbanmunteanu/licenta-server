import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthenticateUserResponseDto } from './dtos/authenticate-user-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from './models/user.entity';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) protected userRepository,
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<AuthenticateUserResponseDto> {
    const password = await argon2.hash(registerUserDto.password);
    const user = await this.userRepository.create({
      ...registerUserDto,
      password,
    });
    const createdUser = await this.userRepository.save(user);
    return this.generateAuthenticationResponse(createdUser);
  }

  public async authenticateUser(
    authUser: User,
  ): Promise<AuthenticateUserResponseDto> {
    return this.generateAuthenticationResponse(authUser);
  }

  public async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  private generateAuthenticationResponse(
    user: User,
  ): AuthenticateUserResponseDto {
    return new AuthenticateUserResponseDto({
      ...user,
      token: this.jwtService.generateAuthToken(user.id),
    });
  }
}
