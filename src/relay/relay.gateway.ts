import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ConversationService } from 'src/conversations/conversations.service';
import Message from './interfaces/message.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'relay',
})
export class RelayGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(protected conversationService: ConversationService) {}

  afterInit(server: any) {
    server.emit('receive-message', { merge: 'da' });
  }

  @SubscribeMessage('send-message')
  async handleMessage(
    @MessageBody('message') message: Message,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const conversation = await this.conversationService.getConversation(
      message.conversationId,
    );
    this.server.emit('receive-message', { message });
  }
}
