import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ConversationService } from 'src/conversations/conversations.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'relay',
})
export class RelayGateway {
  @WebSocketServer()
  server: Server;

  constructor(protected conversationService: ConversationService) {}

  @SubscribeMessage('send-message')
  async handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const conversation = await this.conversationService.getConversation(
      message.conversationId,
    );

    client.broadcast
      .to(conversation.secondUser.id)
      .emit('receive-message', { message });
  }
}
