import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AdminWalletService } from './admin-wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role, TransactionType } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Admin - Wallet')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('api/v1/admin/wallet')
export class AdminWalletController {
  constructor(private readonly service: AdminWalletService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get user wallet details and transactions' })
  async getWalletDetails(@Param('userId') userId: string) {
    return this.service.getWalletDetails(userId);
  }

  @Post(':userId/adjust')
  @ApiOperation({ summary: 'Manually adjust user wallet balance securely' })
  @ApiBody({ schema: { type: 'object', properties: { amount: { type: 'number' }, type: { type: 'string', enum: ['ADJUSTMENT', 'BONUS', 'REFUND'] }, reason: { type: 'string' } } } })
  async adjustBalance(
    @CurrentUser() admin: any,
    @Param('userId') userId: string,
    @Body() data: { amount: number; type: TransactionType; reason: string }
  ) {
    return this.service.adjustBalance(admin.userId, userId, data);
  }
}
