import { Injectable, NotImplementedException } from '@nestjs/common';
import { IGameProvider } from './game-provider.interface';

@Injectable()
export class GameProviderService {
  private providers = new Map<string, IGameProvider>();

  registerProvider(name: string, provider: IGameProvider) {
    this.providers.set(name, provider);
  }

  getProvider(name: string): IGameProvider {
    const provider = this.providers.get(name);
    if (!provider) {
      throw new NotImplementedException(`Provider ${name} is not implemented yet`);
    }
    return provider;
  }

  async launchGame(providerName: string, userId: string, gameId: string, providerGameId: string) {
    // For now, return a mock URL since real providers are not integrated yet
    return `https://mock-provider.com/launch?user=${userId}&game=${providerGameId}`;
  }
}
