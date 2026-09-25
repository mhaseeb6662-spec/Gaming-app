import { Module } from '@nestjs/common';
import { AdminWalletService } from './admin-wallet.service';
import { AdminWalletController } from './admin-wallet.controller';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [WalletModule],
  providers: [AdminWalletService],
  controllers: [AdminWalletController],
})
export class AdminWalletModule {}
