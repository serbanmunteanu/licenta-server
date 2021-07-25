import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { GetCategoryWithCounts } from './dtos/get-category-with-counts.dto';
import { Category } from './models/category.entity';
import { GetCategoryDto } from './dtos/get-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository,
  ) {}

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const date = new Date();
    let category = await this.categoryRepository.create({
      ...createCategoryDto,
      createdAt: date,
      updatedAt: date,
    });
    category = await this.categoryRepository.save(category);
    return new CategoryResponseDto({ ...category });
  }

  public async getCategoryById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  public async getCategoryByName(name: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { name } });
  }

  public async getCategories(): Promise<GetCategoryWithCounts[]> {
    const categories = await this.categoryRepository.find({
      relations: ['posts', 'posts.comments', 'posts.user'],
    });
    return categories.map(
      (category) => new GetCategoryWithCounts({ ...category }),
    );
  }

  public async getCategory(categoryId: number): Promise<GetCategoryDto> {
    const category = await this.categoryRepository.findOne({
      relations: [
        'posts',
        'posts.comments',
        'posts.tags',
        'posts.user',
        'posts.comments.user',
      ],
      where: { id: categoryId },
    });
    return new GetCategoryDto({ ...category });
  }
}
