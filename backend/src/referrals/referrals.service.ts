import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
import { TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ReferralsService {
  private readonly logger = new Logger(ReferralsService.name);
  
  // Example commission rate: 0.5% of valid bet volume goes to the upline
  private readonly COMMISSION_RATE = 0.005; 

  constructor(
    private readonly prisma: PrismaService,
    private readonly walletService: WalletService
  ) {}

  /**
   * Processes affiliate commission for a game bet
   * @param bettorId The user ID of the person placing the bet
   * @param betAmount The amount of the bet
   */
  async processBetCommission(bettorId: string, betAmount: number) {
    try {
      if (betAmount <= 0) return;

      // 1. Find if the user was referred by someone
      const referral = await this.prisma.referral.findUnique({
        where: { user_id: bettorId }
      });

      if (!referral) {
        return; // No upline agent, no commission to pay
      }

      const agentId = referral.referred_user_id;
      const commissionAmount = Number((betAmount * this.COMMISSION_RATE).toFixed(4));

      if (commissionAmount <= 0) return;

      // 2. Give commission to the agent's wallet
      const agentWallet = await this.prisma.wallet.findUnique({
        where: { user_id: agentId }
      });

      if (agentWallet) {
        await this.walletService.processTransaction({
          walletId: agentWallet.id,
          amount: commissionAmount,
          type: TransactionType.BONUS,
          description: `Agent Commission (0.5%) from downline bet`,
        });

        // 3. Update the total commission earned in the referral record
        await this.prisma.referral.update({
          where: { id: referral.id },
          data: {
            commission: {
              increment: commissionAmount
            }
          }
        });

        this.logger.log(`Paid ${commissionAmount} commission to agent ${agentId} for downline ${bettorId} bet`);
      }
    } catch (error) {
      this.logger.error(`Failed to process bet commission: ${error.message}`, error.stack);
    }
  }

  /**
   * Get referral stats for an agent
   */
  async getAgentStats(agentId: string) {
    const referrals = await this.prisma.referral.findMany({
      where: { referred_user_id: agentId },
      include: {
        user: {
          select: { username: true, email: true, created_at: true }
        }
      }
    });

    const totalCommission = referrals.reduce((sum, ref) => sum + Number(ref.commission), 0);

    return {
      total_referrals: referrals.length,
      total_commission_earned: totalCommission,
      referrals: referrals.map(r => ({
        user: r.user.username || r.user.email,
        joined_at: r.user.created_at,
        commission_generated: Number(r.commission)
      }))
    };
  }
}
