export class logoutUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute() {
        return await this.authRepository.logout();
    }
}
