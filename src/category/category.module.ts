import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule {}
