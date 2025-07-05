import type { AvisClient } from "@entities/avisClient";
import type { AvisClientsRepository } from "@repositories/AvisClientsRepository";


export class GetAllAvisClientsUseCase {
    constructor(private repository: AvisClientsRepository) {}

    async execute(): Promise<AvisClient[]> {
        return this.repository.getAllAvisClients();
    }
}