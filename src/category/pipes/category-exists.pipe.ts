import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { CategoryService } from '../category.service';

@Injectable()
export class CategoryExistsPipe implements PipeTransform {
  constructor(protected categoryService: CategoryService) {}

  async transform(value: any): Promise<any> {
    const category = await this.categoryService.getCategoryById(value);
    if (!category) {
      throw new NotFoundException('Category does not exists');
    }
    return value;
  }
}
