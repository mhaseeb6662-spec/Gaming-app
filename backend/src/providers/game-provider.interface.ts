export interface IGameProvider {
  /**
   * Generates a launch URL or session token for a specific game
   */
  launchGame(userId: string, gameId: string, providerGameId: string): Promise<string>;

  /**
   * Verify an incoming callback/webhook from the provider
   */
  verifyCallback(payload: any, signature: string): boolean;
}
