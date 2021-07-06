import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/posts/models/post.model';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Post])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule {}
