import { Category } from 'src/category/models/category.model';
import { User } from 'src/users/models/user.model';

export class PostAttributes {
  id?: string;
  title: string;
  text: string;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
}
