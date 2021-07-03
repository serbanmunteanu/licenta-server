import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway()
export class RelayGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly logger: Logger = new Logger('Relay', true)) {}

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(client.id);
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    this.logger.log(data);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  afterInit(server: any) {
    this.logger.log('Init');
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.logger.log(data);
    return data;
  }
}
