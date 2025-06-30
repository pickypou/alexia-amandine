import { AddAvisClientsUseCase } from "@usecases/avis_clients/addAvisClientsUseCase";
import { DeleteAvisClientsUseCase } from "@usecases/avis_clients/DeleteAvisClientsUseCase";
import { GetAllAvisClientsUseCase } from "@usecases/avis_clients/GetAllAvisClientsUseCase";
import { GetAvisClientsByIdUseCase } from "@usecases/avis_clients/GetAvisClientsByIdUseCase";
export class AvisClientsInteractor {
    constructor(repository) {
        this.repository = repository;
        this.addAvisClientUseCase = new AddAvisClientsUseCase(repository);
        this.getAllAvisClientsUseCase = new GetAllAvisClientsUseCase(repository);
        this.getAvisClientByIdUseCase = new GetAvisClientsByIdUseCase(repository);
        this.deleteAvisClientUseCase = new DeleteAvisClientsUseCase(repository);
    }
    // Ajout d’un avis client
    async addAvisClient(avis) {
        return this.addAvisClientUseCase.execute(avis);
    }
    // Récupérer tous les avis clients
    async getAllAvisClients() {
        return this.getAllAvisClientsUseCase.execute();
    }
    // Récupérer un avis client par ID
    async getAvisClientById(id) {
        return this.getAvisClientByIdUseCase.execute(id);
    }
    // Supprimer un avis client
    async deleteAvisClient(id) {
        return this.deleteAvisClientUseCase.execute(id);
    }
}
