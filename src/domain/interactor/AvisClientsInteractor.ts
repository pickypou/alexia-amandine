import type { AvisClient } from "@entities/avisClient";
import type { AvisClientsRepository } from "@repositories/AvisClientsRepository";
import { AddAvisClientsUseCase } from "@usecases/avis_clients/addAvisClientsUseCase";
import { DeleteAvisClientsUseCase } from "@usecases/avis_clients/DeleteAvisClientsUseCase";
import { GetAllAvisClientsUseCase } from "@usecases/avis_clients/GetAllAvisClientsUseCase";
import { GetAvisClientsByIdUseCase } from "@usecases/avis_clients/GetAvisClientsByIdUseCase";


export class AvisClientsInteractor {
  private addAvisClientUseCase: AddAvisClientsUseCase;
  private getAllAvisClientsUseCase: GetAllAvisClientsUseCase;
  private getAvisClientByIdUseCase: GetAvisClientsByIdUseCase;
  private deleteAvisClientUseCase: DeleteAvisClientsUseCase;

  constructor(private repository: AvisClientsRepository) {
    this.addAvisClientUseCase = new AddAvisClientsUseCase(repository);
    this.getAllAvisClientsUseCase = new GetAllAvisClientsUseCase(repository);
    this.getAvisClientByIdUseCase = new GetAvisClientsByIdUseCase(repository);
    this.deleteAvisClientUseCase = new DeleteAvisClientsUseCase(repository);
  }

  // Ajout d’un avis client
  async addAvisClient(avis: AvisClient): Promise<AvisClient | null> {
    return this.addAvisClientUseCase.execute(avis);
  }

  // Récupérer tous les avis clients
  async getAllAvisClients(): Promise<AvisClient[]> {
    return this.getAllAvisClientsUseCase.execute();
  }

  // Récupérer un avis client par ID
  async getAvisClientById(id: string): Promise<AvisClient | null> {
    return this.getAvisClientByIdUseCase.execute(id);
  }

  // Supprimer un avis client
  async deleteAvisClient(id: string): Promise<boolean> {
    return this.deleteAvisClientUseCase.execute(id);
  }
}
