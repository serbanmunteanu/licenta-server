import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateCategoryPipe } from './pipes/create-category.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body(CreateCategoryPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  public async getCategories(): Promise<any> {
    return await this.categoryService.getCategories();
  }
}
