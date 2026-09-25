import { Module } from '@nestjs/common';
import { GameProviderService } from './game-provider.service';

@Module({
  providers: [GameProviderService],
  exports: [GameProviderService],
})
export class ProvidersModule {}
