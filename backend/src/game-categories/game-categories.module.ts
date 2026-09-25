import { Module } from '@nestjs/common';
import { GameCategoriesController } from './game-categories.controller';
import { GameCategoriesService } from './game-categories.service';

@Module({
  controllers: [GameCategoriesController],
  providers: [GameCategoriesService],
})
export class GameCategoriesModule {}
