import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/category/models/category.model';
import { User } from 'src/users/models/user.model';
import { Post } from './models/post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([Post, Category, User])],
  exports: [],
  controllers: [PostsController],
})
export class PostsModule {}
