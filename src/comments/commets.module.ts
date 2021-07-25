import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './models/comment.entity';
import { CommentsService } from './models/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
