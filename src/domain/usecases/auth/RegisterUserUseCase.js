export class RegisterUserUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(email, password, userName) {
        return await this.authRepository.register(email, password, userName);
    }
}
