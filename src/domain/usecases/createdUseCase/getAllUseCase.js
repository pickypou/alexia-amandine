export class GetAllUseCase {
    constructor(createdRepository) {
        this.createdRepository = createdRepository;
    }
    async execute() {
        return await this.createdRepository.getAll();
    }
}
