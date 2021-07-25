import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthUserDto } from './dtos/auth-user.dto';
import { AuthenticateUserResponseDto } from './dtos/authenticate-user-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from './models/user.entity';
import { UserAuthenticationPipe } from './pipes/user-authentication.pipe';
import { UserExistPipe } from './pipes/user-exist.pipe';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  async registerUser(
    @Body(UserExistPipe) registerUserDto: RegisterUserDto,
  ): Promise<AuthenticateUserResponseDto> {
    return await this.usersService.registerUser(registerUserDto);
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async authenticateUser(
    @Body(UserAuthenticationPipe) authUserDto: AuthUserDto,
  ): Promise<AuthenticateUserResponseDto> {
    return await this.usersService.authenticateUser(authUserDto as User);
  }
}
