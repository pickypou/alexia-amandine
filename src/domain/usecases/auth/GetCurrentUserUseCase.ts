import type { User } from '@entities/User';
import type { AuthRepository } from '@repositories/AuthRepository';

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<User | null> {
    return await this.authRepository.getCurrentUser();
  }
}