import { Logger, Module } from '@nestjs/common';
import { RelayGateway } from './relay.gateway';

@Module({
  imports: [],
  providers: [RelayGateway, Logger],
})
export class RelayModule {}
