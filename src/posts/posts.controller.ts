import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(): Promise<PostResponseDto[]> {
    return await this.postsService.getPosts();
  }

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    return await this.postsService.createPost(createPostDto);
  }
}
