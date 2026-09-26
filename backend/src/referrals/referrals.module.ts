import { Module } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { PrismaModule } from '../prisma/prisma.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [PrismaModule, WalletModule],
  providers: [ReferralsService],
  exports: [ReferralsService],
})
export class ReferralsModule {}
