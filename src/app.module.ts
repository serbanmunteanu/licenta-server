import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configAggregator from 'src/config/config-aggregator';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { RelayModule } from './relay/relay.module';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { CategoryModule } from './category/category.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/models/post.model';
import { Category } from './category/models/category.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configAggregator],
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      ...configAggregator().db.mysql,
      models: [User, Post, Category],
      autoLoadModels: true,
      synchronize: true,
    } as SequelizeModuleOptions),
    RelayModule,
    UsersModule,
    CategoryModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
