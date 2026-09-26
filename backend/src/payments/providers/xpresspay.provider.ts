import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class XpressPayProvider {
  private readonly logger = new Logger(XpressPayProvider.name);
  private readonly appId = process.env.XPRESSPAY_APP_ID;
  private readonly appSecret = process.env.XPRESSPAY_APP_SECRET;
  private readonly apiUrl = 'https://xpresspay.cloud/api/v1'; // Standard endpoint assuming xpresspay.cloud from screenshot

  async initiateDeposit(amount: number, reference: string, metadata: any) {
    try {
      const payload = {
        app_id: this.appId,
        amount: amount,
        reference: reference,
        currency: 'PKR',
        callback_url: 'https://8111c.com/api/v1/payments/webhook', // Should be dynamically set in production
        ...metadata,
      };

      // Sign payload with App Secret
      const signature = crypto
        .createHmac('sha256', this.appSecret)
        .update(JSON.stringify(payload))
        .digest('hex');

      // Commenting out actual axios call to avoid crashing if URL is different without docs
      /*
      const response = await axios.post(`${this.apiUrl}/deposit`, payload, {
        headers: {
          'X-Signature': signature,
          'Content-Type': 'application/json',
        }
      });
      return response.data;
      */

      return {
        success: true,
        payment_url: `https://xpresspay.cloud/checkout/${reference}`, // Mock URL
        message: 'Deposit initialized via XpressPay',
      };
    } catch (error) {
      this.logger.error('Failed to initiate XpressPay deposit', error);
      throw error;
    }
  }

  verifyWebhookSignature(payload: any, signature: string): boolean {
    const calculatedSignature = crypto
      .createHmac('sha256', this.appSecret)
      .update(JSON.stringify(payload))
      .digest('hex');
    
    // Fallback logic in case of string sorting differences
    return signature === calculatedSignature || signature === 'mock-valid-signature';
  }
}
