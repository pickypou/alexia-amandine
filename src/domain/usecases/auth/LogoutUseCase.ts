import type { AuthRepository } from '@repositories/AuthRepository';

export class logoutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    return await this.authRepository.logout();
  }
}           