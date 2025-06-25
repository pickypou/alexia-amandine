import type { Created } from "@entities/created";
import type { CreatedRepository } from "@repositories/CreatedRepository";


export class GetAllUseCase {
  constructor(private readonly createdRepository: CreatedRepository) {}

  async execute(): Promise<Created[]> {
    return await this.createdRepository.getAll();
  }
}
