import { ConversationMessageEntity } from '../models/conversation-message.entity';

export class ConversationMessageDto {
  id: number;
  content: string;
  userName: string;
  userId: string;
  createdAt: Date;

  constructor(data: Partial<ConversationMessageEntity>) {
    Object.assign(this, {
      content: data.content,
      userId: data.user.id,
      createdAt: data.createdAt,
    });
  }
}
