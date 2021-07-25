import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';
import { Post } from './models/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) protected postRepository) {}

  public async createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<PostResponseDto> {
    const newPost = await this.postRepository.create({
      text: createPostDto.text,
      title: createPostDto.title,
      categoryId: createPostDto.categoryId,
      userId: user.id,
    });
    const post = await this.postRepository.save(newPost);
    return new PostResponseDto({});
  }

  // async getPosts(): Promise<PostResponseDto[]> {
  //   const posts = await this.postModel.findAll();
  //   return posts.map(
  //     (post) =>
  //       new PostResponseDto({
  //         ...post.get({ plain: true }),
  //       }),
  //   );
  // }

  public async getPost(
    postId: number,
    relations: string[],
  ): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({
      relations,
      where: { id: postId },
    });
    return new PostResponseDto({
      ...post,
    });
  }
}
