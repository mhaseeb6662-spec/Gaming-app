import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue('payments') private paymentsQueue: Queue,
    @InjectQueue('notifications') private notificationsQueue: Queue,
  ) {}

  async addPaymentVerificationJob(paymentId: string) {
    await this.paymentsQueue.add('verify-payment', { paymentId }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
    });
  }

  async addNotificationJob(userId: string, title: string, message: string) {
    await this.notificationsQueue.add('send-notification', { userId, title, message }, {
      attempts: 5,
    });
  }
}
