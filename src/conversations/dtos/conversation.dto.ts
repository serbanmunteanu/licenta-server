import { ConversationEntity } from '../models/conversation.entity';

export class ConversationDto {
  id: number;
  secondUserName: string;
  updatedAt: Date;

  constructor(data: Partial<ConversationEntity>) {
    Object.assign(this, {
      conversationId: data.id,
      secondUserName: data.secondUser.name,
      updatedAt: data.updatedAt,
    });
  }
}
