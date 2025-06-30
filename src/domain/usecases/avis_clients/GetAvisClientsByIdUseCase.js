export class GetAvisClientsByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    async execute(id) {
        if (!id)
            throw new Error("L'id est requis");
        return this.repository.avisClientsGetById(id);
    }
}
