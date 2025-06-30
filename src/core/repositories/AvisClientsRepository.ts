import type { AvisClients } from "@entities/avisClients";


export interface AvisClientsRepository {
    getAllAvisClients(): Promise<AvisClients[]>;
    addAvisClients(avisClients: AvisClients): Promise<AvisClients | null>;
    avisClientsGetById(id: string): Promise<AvisClients | null>;
    delete(id: string): Promise<boolean>;
}