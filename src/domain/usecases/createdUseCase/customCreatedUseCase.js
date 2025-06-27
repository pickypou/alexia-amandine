export class CustomUseCase {
    constructor(createdRepository) {
        this.createdRepository = createdRepository;
    }
    async execute(name) {
        return await this.createdRepository.custom(name);
    }
}
