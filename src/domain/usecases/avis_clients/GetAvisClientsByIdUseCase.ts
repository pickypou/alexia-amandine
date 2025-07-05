import type { AvisClient } from "@entities/avisClient";
import type { AvisClientsRepository } from "@repositories/AvisClientsRepository";

export class GetAvisClientsByIdUseCase {
    constructor(private repository: AvisClientsRepository) {};

    async execute(id: string): Promise<AvisClient | null> {
        if (!id) throw new Error("L'id est requis");
        return this.repository.avisClientsGetById(id);
    }
}