export class GetByIdUseCase {
    constructor(createdRepository) {
        this.createdRepository = createdRepository;
    }
    async execute(id) {
        return await this.createdRepository.getById(id);
    }
}
