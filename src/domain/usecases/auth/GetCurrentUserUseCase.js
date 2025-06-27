export class GetCurrentUserUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute() {
        return await this.authRepository.getCurrentUser();
    }
}
