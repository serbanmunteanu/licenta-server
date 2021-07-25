import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CategoryService } from '../category.service';

@Injectable()
export class CreateCategoryPipe implements PipeTransform {
  constructor(protected categoryService: CategoryService) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const category = await this.categoryService.getCategoryByName(value.name);
    if (category) {
      throw new ConflictException('Category already exists.');
    }
    return value;
  }
}
