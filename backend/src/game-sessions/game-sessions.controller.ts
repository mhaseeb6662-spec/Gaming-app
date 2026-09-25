import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { GameSessionsService } from './game-sessions.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Game Sessions')
@Controller('api/v1/games')
export class GameSessionsController {
  constructor(private readonly service: GameSessionsService) {}

  @Post(':id/launch')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Launch a game session and get provider URL' })
  async launchGame(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.launchGame(user.userId, id);
  }
}
