export class DeleteUseCase {
    constructor(createdRepository) {
        this.createdRepository = createdRepository;
    }
    async execute(id) {
        return await this.createdRepository.delete(id);
    }
}
