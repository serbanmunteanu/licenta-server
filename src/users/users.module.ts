import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/jwt/jwt.module';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  exports: [UsersService],
  providers: [UsersService, Logger],
  controllers: [UsersController],
})
export class UsersModule {}
