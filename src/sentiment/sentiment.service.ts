import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises as fs } from 'fs';
import Sentiment from 'sentiment';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SentimentService {
  protected selectedLanguage: string;

  constructor(protected sentiment: Sentiment, protected config: ConfigService) {
    this.selectedLanguage = this.config.get('sentiment.languages.selected');
  }

  public analyze(
    message: string,
    languageCode: string,
  ): Sentiment.AnalysisResult {
    return this.sentiment.analyze(message, { language: languageCode });
  }

  public async init(): Promise<void> {
    const supportedLanguages: string[] = this.config.get(
      'sentiment.languages.supported',
    );
    for (const supportedLanguage of supportedLanguages) {
      await this.registerLanguage(supportedLanguage);
    }
  }

  public getSelectedLanguage(): string {
    return this.selectedLanguage;
  }

  protected async getLanguageLables(
    languageCode: string,
  ): Promise<Record<string, number>> {
    try {
      return JSON.parse(
        await fs.readFile(
          join(__dirname, `./languages/${languageCode}/labels.json`),
          'utf-8',
        ),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async getLanguageNegators(
    languageCode: string,
  ): Promise<Record<string, number>> {
    try {
      return JSON.parse(
        await fs.readFile(
          join(__dirname, `./languages/${languageCode}/negators.json`),
          'utf-8',
        ),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async registerLanguage(languageCode: string): Promise<void> {
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
}
