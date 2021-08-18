import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { ConversationService } from './conversations.service';
import { User as UserDecorator } from '../common/decorators/user.decorator';
import { ConversationDto } from './dtos/conversation.dto';
import { ConversationMessageEntity } from './models/conversation-message.entity';
import { ConversationMessageDto } from './dtos/conversation-message.dto';

@Controller('/conversations')
export default class ConversationsController {
  constructor(protected conversationService: ConversationService) {}

  @Get()
  public async getConversations(
    @UserDecorator() user: User,
  ): Promise<ConversationDto[]> {
    const conversations = await this.conversationService.getConversations(
      user,
      100,
      0,
    );
    return conversations.map(
      (conversation) => new ConversationDto(conversation),
    );
  }

  @Post()
  public async createConversation(
    @UserDecorator() user: User,
    @Body() content: any,
  ): Promise<any> {
    return await this.conversationService.createConversation(user, content);
  }

  @Get(':conversationId/messages')
  public async getConversationMessages(
    @Param('conversationId', ParseIntPipe) conversationId,
  ): Promise<ConversationMessageDto[]> {
    const conversationMessages =
      await this.conversationService.getConversationMessages(conversationId);

    return conversationMessages.map(
      (conversationMessage) => new ConversationMessageDto(conversationMessage),
    );
  }

  @Post(':conversationId')
  public async insertMessage(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Body() any,
  ): Promise<ConversationMessageEntity> {
    return await this.conversationService.insertMessage(conversationId, any);
  }
}
