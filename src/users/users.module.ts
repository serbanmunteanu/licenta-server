import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from 'src/jwt/jwt.module';
import { User } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), JwtModule],
  exports: [],
  providers: [UsersService, Logger],
  controllers: [UsersController],
})
export class UsersModule {}
