import type { AvisClients } from "@entities/avisClients";
import type { AvisClientsRepository } from "@repositories/AvisClientsRepository";


export class AddAvisClientsUseCase {
    constructor(private repository : AvisClientsRepository) {}

    async execute(avis: AvisClients): Promise<AvisClients | null> {
        if(!avis.name || !avis.message) {
            throw new Error("Nom et message sont obligatoires");
        }
        return this.repository.addAvisClients(avis);
    }
}