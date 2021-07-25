import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from 'src/comments/commets.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthenticationMiddleware } from 'src/users/middleware/authentication.middleware';
import { UsersModule } from 'src/users/users.module';
import { Post } from './models/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommentsModule,
    JwtModule,
    UsersModule,
  ],
  exports: [],
  controllers: [PostsController],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'posts', method: RequestMethod.POST });
  }
}
