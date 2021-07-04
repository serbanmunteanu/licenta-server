import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryModel.create(createCategoryDto);
    return new CategoryResponseDto({
      ...category.get(),
    });
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryModel.findOne({ where: { id } });
  }
}
