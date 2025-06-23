import type { AuthRepository } from "@repositories/AuthRepository";
import type { User } from "@entities/User";

export class RegisterUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string, userName: string): Promise<User> {
    return await this.authRepository.register(email, password, userName);
  }
}
