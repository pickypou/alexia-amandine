export class GetAllAvisClientsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return this.repository.getAllAvisClients();
    }
}
