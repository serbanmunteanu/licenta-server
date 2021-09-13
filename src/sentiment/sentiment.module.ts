import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SentimentService } from './sentiment.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sentiment = require('sentiment');

@Module({
  providers: [
    {
      provide: SentimentService,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const sentimentService = new SentimentService(new Sentiment());
        await sentimentService.registerLanguage(
          configService.get('sentiment.languages.selected'),
        );
        return sentimentService;
      },
    },
  ],
  imports: [],
  exports: [SentimentService],
  controllers: [],
})
export class SentimentModule {}
