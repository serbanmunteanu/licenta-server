import { Module } from '@nestjs/common';
import ConversationsController from './conversations.controller';
import { ConversationService } from './conversations.service';

@Module({
  controllers: [ConversationsController],
  exports: [ConversationService],
  imports: [],
  providers: [ConversationService],
})
export class ConversationsModule {}
