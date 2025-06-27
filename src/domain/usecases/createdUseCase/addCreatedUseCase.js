// addCoutureUseCase.ts
export class AddUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(created) {
        return await this.repository.add(created);
    }
}
