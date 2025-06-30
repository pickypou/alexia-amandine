export class DeleteAvisClientsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        if (!id)
            throw new Error("L'id est requis");
        return this.repository.delete(id);
    }
}
