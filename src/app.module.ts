import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configAggregator from 'src/config/config-aggregator';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { RelayModule } from './relay/relay.module';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configAggregator],
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      ...configAggregator().db.mysql,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    } as SequelizeModuleOptions),
    RelayModule,
    UsersModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
