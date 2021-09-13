import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import Sentiment from 'sentiment';
import { join } from 'path';

@Injectable()
export class SentimentService {
  constructor(protected sentiment: Sentiment) {}

  protected async getLanguageLables(
    languageCode: string,
  ): Promise<Record<string, number>> {
    return JSON.parse(
      await fs.readFile(
        join(__dirname, `./languages/${languageCode}/labels.json`),
        'utf-8',
      ),
    );
  }

  protected async getLanguageNegators(
    languageCode: string,
  ): Promise<Record<string, number>> {
    return JSON.parse(
      await fs.readFile(
        join(__dirname, `./languages/${languageCode}/negators.json`),
        'utf-8',
      ),
    );
  }

  public async registerLanguage(languageCode: string): Promise<void> {
    const negators = await this.getLanguageNegators(languageCode);
    const language: Sentiment.LanguageModule = {
      labels: await this.getLanguageLables(languageCode),
      scoringStrategy: {
        apply: (tokens: any, cursor: number, tokenScore: any) => {
          if (cursor > 0) {
            const prevToken = tokens[cursor - 1];
            if (negators[prevToken]) {
              tokenScore = -tokenScore;
            }
            return tokenScore;
          }
        },
      },
    };
    this.sentiment.registerLanguage(languageCode, language);
  }

  public analyze(
    message: string,
    languageCode: string,
  ): Sentiment.AnalysisResult {
    return this.sentiment.analyze(message, { language: languageCode });
  }
}
