import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthenticationMiddleware } from 'src/users/middleware/authentication.middleware';
import { UsersModule } from 'src/users/users.module';
import ConversationsController from './conversations.controller';
import { ConversationService } from './conversations.service';
import { ConversationMessageEntity } from './models/conversation-message.entity';
import { ConversationEntity } from './models/conversation.entity';

@Module({
  controllers: [ConversationsController],
  exports: [ConversationService],
  imports: [
    TypeOrmModule.forFeature([ConversationMessageEntity, ConversationEntity]),
    JwtModule,
    UsersModule,
  ],
  providers: [ConversationService],
})
export class ConversationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'conversations', method: RequestMethod.GET },
        { path: 'conversations', method: RequestMethod.POST },
      );
  }
}
