import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dtos/create-comment.dto';
import { CommentsService } from 'src/comments/models/comments.service';
import { User as UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostDto } from './dtos/get-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  async createPost(
    @UserDecorator() user: User,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    return await this.postsService.createPost(createPostDto, user);
  }

  @Get('/:postId')
  public async getPost(@Param('postId') postId: number): Promise<GetPostDto> {
    return await this.postsService.getPost(postId);
  }

  // @Post(':postId/comments')
  // async addComment(
  //   @UserDecorator('id') userId: number,
  //   @Param() params,
  //   @Body() comment: CreateCommentDto,
  // ): Promise<PostResponseDto> {
  //   await this.commentsService.addComment(params.postId, userId, comment.text);

  //   return await this.postsService.getPost(params.postId);
  // }
}
