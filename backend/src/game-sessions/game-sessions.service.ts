import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GameProviderService } from '../providers/game-provider.service';
import { GamesService } from '../games/games.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameSessionsService {
  constructor(
    private prisma: PrismaService,
    private providerService: GameProviderService,
    private gamesService: GamesService,
  ) {}

  async launchGame(userId: string, gameId: string) {
    const game = await this.gamesService.findOne(gameId);
    if (!game) throw new NotFoundException('Game not found');

    const sessionToken = uuidv4();

    // In a real scenario, this gets the URL from the provider API
    const launchUrl = await this.providerService.launchGame(
      game.provider,
      userId,
      game.id,
      game.provider_game_id
    );

    const session = await this.prisma.gameSession.create({
      data: {
        user_id: userId,
        game_id: game.id,
        session_token: sessionToken,
        provider: game.provider,
        status: 'ACTIVE',
      },
    });

    return {
      launch_url: launchUrl,
      session_token: session.session_token,
    };
  }
}
