import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class SlotegratorService {
  private readonly logger = new Logger(SlotegratorService.name);
  private readonly merchantId = process.env.SLOTEGRATOR_MERCHANT_ID;
  private readonly merchantKey = process.env.SLOTEGRATOR_MERCHANT_KEY;
  private readonly apiUrl = process.env.SLOTEGRATOR_API_URL;

  private generateSignature(params: Record<string, string>): { signature: string; nonce: string; timestamp: string } {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomBytes(16).toString('hex');
    
    // Default headers required by Slotegrator for signing
    const requestParams = {
      ...params,
      'X-Merchant-Id': this.merchantId,
      'X-Timestamp': timestamp,
      'X-Nonce': nonce,
    };

    // Sort alphabetically by key
    const sortedKeys = Object.keys(requestParams).sort();
    
    // Create query string for signature (without URL encoding)
    const signString = sortedKeys.map(key => `${key}=${requestParams[key]}`).join('&');
    
    // Generate HMAC-SHA1
    const signature = crypto
      .createHmac('sha1', this.merchantKey)
      .update(signString)
      .digest('hex');

    return { signature, nonce, timestamp };
  }

  async getGames() {
    try {
      const { signature, nonce, timestamp } = this.generateSignature({});
      const response = await axios.get(`${this.apiUrl}/games`, {
        headers: {
          'X-Merchant-Id': this.merchantId,
          'X-Timestamp': timestamp,
          'X-Nonce': nonce,
          'X-Sign': signature,
        },
      });
      return response.data;
    } catch (error) {
      this.logger.error('Failed to get games from Slotegrator', error?.response?.data || error);
      throw error;
    }
  }

  async initGame(gameUuid: string, playerId: string, playerName: string, currency: string = 'PKR', returnUrl: string = 'https://8111c.com') {
    try {
      const params = {
        game_uuid: gameUuid,
        player_id: playerId,
        player_name: playerName,
        currency: currency,
        session_id: crypto.randomBytes(16).toString('hex'), // Unique session
        return_url: returnUrl,
      };

      const { signature, nonce, timestamp } = this.generateSignature(params);

      const response = await axios.post(`${this.apiUrl}/games/init`, params, {
        headers: {
          'X-Merchant-Id': this.merchantId,
          'X-Timestamp': timestamp,
          'X-Nonce': nonce,
          'X-Sign': signature,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data; // Usually returns { url: 'https://...' }
    } catch (error) {
      this.logger.error('Failed to init game', error?.response?.data || error);
      throw error;
    }
  }

  // Validate incoming webhook signature from Slotegrator
  validateWebhook(headers: any, body: any): boolean {
    const signature = headers['x-sign'];
    if (!signature) return false;

    // Slotegrator sends all parameters in body. Combine them with headers for validation.
    const paramsToSign = {
      ...body,
      'X-Merchant-Id': headers['x-merchant-id'],
      'X-Timestamp': headers['x-timestamp'],
      'X-Nonce': headers['x-nonce'],
    };

    const sortedKeys = Object.keys(paramsToSign).sort();
    const signString = sortedKeys.map(key => `${key}=${paramsToSign[key]}`).join('&');
    
    const expectedSignature = crypto
      .createHmac('sha1', this.merchantKey)
      .update(signString)
      .digest('hex');

    return signature === expectedSignature;
  }
}
