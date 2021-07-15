import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private readonly postModel: typeof Post) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostResponseDto> {
    const post = await this.postModel.create(createPostDto);
    return new PostResponseDto({
      ...post.get({ plain: true }),
    });
  }

  async getPosts(): Promise<PostResponseDto[]> {
    const posts = await this.postModel.findAll();
    return posts.map(
      (post) =>
        new PostResponseDto({
          ...post.get({ plain: true }),
        }),
    );
  }
}
