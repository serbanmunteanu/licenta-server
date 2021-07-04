import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../models/category.model';

@Injectable()
export class CreateCategoryPipe implements PipeTransform {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const category = await this.categoryModel.findOne({
      where: { name: value.name },
    });
    if (category) {
      throw new ConflictException('Category already exists.');
    }
    return value;
  }
}
