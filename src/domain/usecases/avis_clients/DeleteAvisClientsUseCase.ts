import type { AvisClientsRepository } from "@repositories/AvisClientsRepository";


export class DeleteAvisClientsUseCase {
    constructor(private repository: AvisClientsRepository) {}

        async execute(id: string): Promise<boolean> {
            if (!id) throw new Error("L'id est requis");
            return this.repository.delete(id);
        }
    
}