import type { AvisClients } from "@entities/avisClients";
import type { AvisClientsRepository } from "@repositories/AvisClientsRepository";


export class GetAllAvisClientsUseCase {
    constructor(private repository: AvisClientsRepository) {}

    async execute(): Promise<AvisClients[]> {
        return this.repository.getAllAvisClients();
    }
}