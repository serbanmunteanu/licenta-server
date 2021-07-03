export class UserAttributes {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  isActive?: boolean;
  canReply?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
