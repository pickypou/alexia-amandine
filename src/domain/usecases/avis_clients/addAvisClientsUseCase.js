export class AddAvisClientsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(avis) {
        if (!avis.name || !avis.message) {
            throw new Error("Nom et message sont obligatoires");
        }
        return this.repository.addAvisClients(avis);
    }
}
