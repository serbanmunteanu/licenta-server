import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(1, 256)
  text: string;

  constructor(data: Partial<Comment>) {
    Object.assign(this, data);
  }
}
