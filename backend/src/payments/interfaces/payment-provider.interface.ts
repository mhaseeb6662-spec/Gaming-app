export interface IPaymentProvider {
  initiateDeposit(amount: number, reference: string, userDetails: any): Promise<any>;
  verifyWebhookSignature(payload: any, signature: string): boolean;
  processPayout(amount: number, accountDetails: any): Promise<any>;
}
