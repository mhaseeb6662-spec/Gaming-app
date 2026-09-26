import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesCallbackController } from './games.callback.controller';
import { ProvidersModule } from '../providers/providers.module';
import { WalletModule } from '../wallet/wallet.module';
import { ReferralsModule } from '../referrals/referrals.module';

@Module({
  imports: [ProvidersModule, WalletModule, ReferralsModule],
  controllers: [GamesController, GamesCallbackController],
  providers: [GamesService],
})
export class GamesModule {}
