import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostDto } from './dtos/get-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';
import { Post } from './models/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) protected postRepository) {}

  public async createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<PostResponseDto> {
    const date = new Date();
    const newPost = await this.postRepository.create({
      text: createPostDto.text,
      title: createPostDto.title,
      categoryId: createPostDto.categoryId,
      userId: user.id,
      createdAt: date,
      updatedAt: date,
    });
    const post = await this.postRepository.save(newPost);
    return new PostResponseDto({ ...post });
  }

  public async getPost(postId: number): Promise<GetPostDto> {
    const post = await this.postRepository.findOne({
      relations: ['tags', 'comments', 'user', 'comments.user'],
      where: { id: postId },
    });
    return new GetPostDto({ ...post });
  }
}
