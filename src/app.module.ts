import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configAggregator from 'src/config/config-aggregator';
import { RelayModule } from './relay/relay.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/commets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configAggregator],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...configAggregator().db.mysql,
    }),
    RelayModule,
    UsersModule,
    CategoryModule,
    PostsModule,
    // CommentsModule,
    ConversationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
