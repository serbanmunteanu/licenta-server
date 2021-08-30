import { Logger, Module } from '@nestjs/common';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { RelayGateway } from './relay.gateway';

@Module({
  imports: [ConversationsModule],
  providers: [RelayGateway, Logger],
})
export class RelayModule {}
