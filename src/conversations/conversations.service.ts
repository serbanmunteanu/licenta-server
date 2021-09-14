import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Message from 'src/relay/interfaces/message.interface';
import { SentimentService } from 'src/sentiment/sentiment.service';
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
    protected sentimentService: SentimentService,
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
    message: Message,
  ): Promise<ConversationMessageEntity> {
    const conversationMessage = this.conversationMessageRepository.create();
    const analyzedMessage = this.sentimentService.analyze(
      message.content,
      this.sentimentService.getSelectedLanguage(),
    );
    conversationMessage.conversation = await this.getConversation(
      message.conversationId,
    );
    conversationMessage.user = await this.usersService.getUserById(
      message.userId,
    );
    conversationMessage.content = message.content;
    conversationMessage.sentimentScore = analyzedMessage.score || 0;
    const conversation = await this.conversationRepository.findOne({
      id: message.conversationId,
    });
    conversationMessage.createdAt = new Date();
    conversation.updatedAt = new Date();
    await this.conversationRepository.save(conversation);
    return await this.conversationMessageRepository.save(conversationMessage);
  }
}
