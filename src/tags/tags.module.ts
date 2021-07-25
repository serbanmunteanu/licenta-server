import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './models/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  exports: [],
  controllers: [],
  providers: [],
})
export class TagsModule {}
