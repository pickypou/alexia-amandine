import { LoginUserUseCase } from '@usecases/auth/LoginUserUseCase';
import { GetCurrentUserUseCase } from '@usecases/auth/GetCurrentUserUseCase';
import { RegisterUserUseCase } from '@usecases/auth/RegisterUserUseCase';
export class AuthInteractor {
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.registerUserUseCase = new RegisterUserUseCase(authRepository);
        this.loginUserUseCase = new LoginUserUseCase(authRepository);
        this.getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);
    }
    register(email, password, userName) {
        return this.registerUserUseCase.execute(email, password, userName);
    }
    login(email, password) {
        return this.loginUserUseCase.execute(email, password);
    }
    getCurrentUser() {
        return this.getCurrentUserUseCase.execute();
    }
}
