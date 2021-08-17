import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm/repository/Repository';
import { ConversationEntity } from './models/conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    protected conversationRepository: Repository<ConversationEntity>,
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
}
