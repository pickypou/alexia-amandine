
import type { AuthRepository } from '@repositories/AuthRepository';
import type { User } from '@entities/User';

export class LoginUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}   
  async execute(email: string, password: string): Promise<User> {
    return await this.authRepository.login(email, password);
  }
}    