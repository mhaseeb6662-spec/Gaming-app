import { Module } from '@nestjs/common';
import { AdminFinancialsService } from './admin-financials.service';
import { AdminFinancialsController } from './admin-financials.controller';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [WalletModule],
  providers: [AdminFinancialsService],
  controllers: [AdminFinancialsController],
})
export class AdminFinancialsModule {}
