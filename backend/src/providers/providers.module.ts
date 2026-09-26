import { Module } from '@nestjs/common';
import { GameProviderService } from './game-provider.service';
import { SlotegratorService } from './slotegrator.service';

@Module({
  providers: [GameProviderService, SlotegratorService],
  exports: [GameProviderService, SlotegratorService],
})
export class ProvidersModule {}
