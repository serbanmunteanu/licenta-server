import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { GetCategoryWithCounts } from './dtos/get-category-with-counts.dto';
import { GetCategoryDto } from './dtos/get-category.dto';
import { CategoryExistsPipe } from './pipes/category-exists.pipe';
import { CreateCategoryPipe } from './pipes/create-category.pipe';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('categories')
  async createCategory(
    @Body(CreateCategoryPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get('categories')
  public async getCategories(): Promise<GetCategoryWithCounts[]> {
    return await this.categoryService.getCategories();
  }

  @Get('category/:categoryId/posts')
  public async getCategory(
    @Param('categoryId', ParseIntPipe, CategoryExistsPipe) categoryId: number,
  ): Promise<GetCategoryDto> {
    return await this.categoryService.getCategory(categoryId);
  }
}
