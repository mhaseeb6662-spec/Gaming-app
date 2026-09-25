import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class AdminWalletService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
    private auditLogs: AuditLogsService
  ) {}

  async getWalletDetails(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { user_id: userId },
      include: {
        transactions: { take: 20, orderBy: { created_at: 'desc' } }
      }
    });
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  async adjustBalance(adminId: string, userId: string, data: { amount: number, type: TransactionType, reason: string }) {
    if (!['ADJUSTMENT', 'BONUS', 'REFUND'].includes(data.type)) {
      throw new BadRequestException('Invalid transaction type for manual adjustment');
    }

    const wallet = await this.prisma.wallet.findUnique({ where: { user_id: userId } });
    if (!wallet) throw new NotFoundException('Wallet not found');

    const balanceBefore = wallet.balance.toNumber();
    
    // Secure transaction via core WalletService
    const transaction = await this.walletService.processTransaction({
      walletId: wallet.id,
      amount: data.amount,
      type: data.type,
      description: data.reason
    });

    await this.auditLogs.logAction({
      admin_id: adminId,
      user_id: userId,
      action: 'WALLET_ADJUSTMENT',
      entity: 'WALLET',
      entity_id: wallet.id,
      old_value: { balance: balanceBefore },
      new_value: { balance: balanceBefore + data.amount, transaction_id: transaction.id, reason: data.reason },
    });

    return transaction;
  }
}
