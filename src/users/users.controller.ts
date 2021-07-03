import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserResponseDto } from './dtos/authenticate-user-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthenticateUserResponseDto> {
    return await this.usersService.registerUser(registerUserDto);
  }
}
