export class LoginUserUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(email, password) {
        return await this.authRepository.login(email, password);
    }
}
