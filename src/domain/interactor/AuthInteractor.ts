import type { AuthRepository } from '@repositories/AuthRepository';
import { LoginUserUseCase } from '@usecases/auth/LoginUserUseCase';
import { GetCurrentUserUseCase } from '@usecases/auth/GetCurrentUserUseCase';
import { RegisterUserUseCase } from '@usecases/auth/RegisterUserUseCase';

export class AuthInteractor {
  private registerUserUseCase: RegisterUserUseCase;
  private loginUserUseCase: LoginUserUseCase;
  private getCurrentUserUseCase: GetCurrentUserUseCase;

  constructor(private authRepository: AuthRepository) {
    this.registerUserUseCase = new RegisterUserUseCase(authRepository);
    this.loginUserUseCase = new LoginUserUseCase(authRepository);
    this.getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);
  }
  register(email: string, password: string, userName: string) {
    return this.registerUserUseCase.execute(email, password, userName);
  }

  login(email: string, password: string) {
    return this.loginUserUseCase.execute(email, password);
  }

  getCurrentUser() {
    return this.getCurrentUserUseCase.execute();
  }
}
