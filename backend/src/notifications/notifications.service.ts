import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private gateway: NotificationsGateway
  ) {}

  async notifyUser(userId: string, title: string, message: string, eventType: string = 'notification.new') {
    // 1. Save to database for history
    const notification = await this.prisma.notification.create({
      data: { user_id: userId, title, message, type: eventType }
    });

    // 2. Emit real-time via Socket.IO
    this.gateway.sendToUser(userId, eventType, notification);

    return notification;
  }

  async walletUpdated(userId: string, newBalance: number) {
    this.gateway.sendToUser(userId, 'wallet.updated', { balance: newBalance });
  }
}
