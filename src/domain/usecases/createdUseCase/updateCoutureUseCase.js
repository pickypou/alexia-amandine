export class updateUseCase {
    constructor(createdRepository) {
        this.createdRepository = createdRepository;
    }
    async execute(id, created) {
        return await this.createdRepository.update(id, created);
    }
}
