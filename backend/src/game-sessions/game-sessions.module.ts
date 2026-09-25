import { Module } from '@nestjs/common';
import { GameSessionsService } from './game-sessions.service';
import { ProvidersModule } from '../providers/providers.module';
import { GamesModule } from '../games/games.module';
import { GamesService } from '../games/games.service';
import { GameSessionsController } from './game-sessions.controller';

@Module({
  imports: [ProvidersModule],
  controllers: [GameSessionsController],
  providers: [GameSessionsService, GamesService],
})
export class GameSessionsModule {}
