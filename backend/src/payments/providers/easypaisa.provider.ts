import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../interfaces/payment-provider.interface';

@Injectable()
export class EasypaisaProvider implements IPaymentProvider {
  async initiateDeposit(amount: number, reference: string, userDetails: any) {
    return { success: true, redirect_url: `https://mock.easypaisa.com/pay?ref=${reference}&amount=${amount}` };
  }

  verifyWebhookSignature(payload: any, signature: string): boolean {
    return signature === 'mock-valid-signature'; // Mock logic
  }

  async processPayout(amount: number, accountDetails: any) {
    return { success: true, transaction_id: 'EP' + Date.now() };
  }
}
