import type { AvisClients } from "@entities/avisClients";
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
  async addAvisClient(avis: AvisClients): Promise<AvisClients | null> {
    return this.addAvisClientUseCase.execute(avis);
  }

  // Récupérer tous les avis clients
  async getAllAvisClients(): Promise<AvisClients[]> {
    return this.getAllAvisClientsUseCase.execute();
  }

  // Récupérer un avis client par ID
  async getAvisClientById(id: string): Promise<AvisClients | null> {
    return this.getAvisClientByIdUseCase.execute(id);
  }

  // Supprimer un avis client
  async deleteAvisClient(id: string): Promise<boolean> {
    return this.deleteAvisClientUseCase.execute(id);
  }
}
