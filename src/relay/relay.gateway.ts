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

  @SubscribeMessage('join-room')
  async joinRoom(
    @MessageBody('conversationId') conversationId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(conversationId, (error) => {
      console.log(error);
    });
  }

  @SubscribeMessage('send-message')
  async handleMessage(@MessageBody('message') message: Message): Promise<void> {
    const conversationMessage = await this.conversationService.insertMessage(
      message,
    );
    console.log(conversationMessage);
    this.server.to(message.conversationId).emit('receive-message', { message });
  }
}
