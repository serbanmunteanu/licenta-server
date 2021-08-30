import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm/repository/Repository';
import { ConversationMessageEntity } from './models/conversation-message.entity';
import { ConversationEntity } from './models/conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    protected conversationRepository: Repository<ConversationEntity>,
    @InjectRepository(ConversationMessageEntity)
    protected conversationMessageRepository: Repository<ConversationMessageEntity>,
    protected usersService: UsersService,
  ) {}

  public async getConversations(
    user: User,
    limit: number,
    offset: number,
  ): Promise<ConversationEntity[]> {
    return await this.conversationRepository.find({
      relations: ['firstUser', 'secondUser'],
      where: [
        {
          firstUser: user.id,
        },
        {
          secondUser: user.id,
        },
      ],
      order: {
        updatedAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });
  }

  public async getConversation(
    conversationId: number,
  ): Promise<ConversationEntity> {
    return await this.conversationRepository.findOne({
      relations: ['firstUser', 'secondUser'],
      where: { id: conversationId },
    });
  }

  public async createConversation(
    user: User,
    content: any,
  ): Promise<ConversationEntity> {
    const conversation = this.conversationRepository.create();
    const receiver = await this.usersService.getUserById(content.id);
    conversation.firstUser = user;
    conversation.secondUser = receiver;
    return await this.conversationRepository.save(conversation);
  }

  public async getConversationMessages(
    conversationId: number,
  ): Promise<ConversationMessageEntity[]> {
    return await this.conversationMessageRepository.find({
      relations: ['user', 'conversation'],
      where: { conversation: conversationId },
      order: {
        id: 'ASC',
      },
    });
  }

  public async insertMessage(
    conversationId: number,
    content: any,
  ): Promise<ConversationMessageEntity> {
    const conversationMessage = this.conversationMessageRepository.create();
    conversationMessage.conversation = await this.getConversation(
      conversationId,
    );
    conversationMessage.user = await this.usersService.getUserById(content.id);
    conversationMessage.content = content.data;
    return await this.conversationMessageRepository.save(conversationMessage);
  }
}
