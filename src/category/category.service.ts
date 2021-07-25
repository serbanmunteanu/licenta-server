import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './models/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository,
  ) {}

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    let category = await this.categoryRepository.create(createCategoryDto);
    category = await this.categoryRepository.save(category);
    return new CategoryResponseDto({ ...category });
  }

  public async getCategoryById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  public async getCategoryByName(name: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { name } });
  }

  public async getCategories(): Promise<any> {
    return await this.categoryRepository.find({
      relations: ['posts'],
    });
  }
}
