import type { AvisClient } from "@entities/avisClient";


export interface AvisClientsRepository {
    getAllAvisClients(): Promise<AvisClient[]>;
    addAvisClients(avisClients: AvisClient): Promise<AvisClient | null>;
    avisClientsGetById(id: string): Promise<AvisClient | null>;
    delete(id: string): Promise<boolean>;
}