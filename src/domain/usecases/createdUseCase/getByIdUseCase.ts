import type { Created } from "@entities/created";
import type { CreatedRepository } from "@repositories/CreatedRepository";

export class GetByIdUseCase {
  constructor(private readonly createdRepository: CreatedRepository) {}

  async execute(id: string): Promise<Created | null> {
    return await this.createdRepository.getById(id);
  }
}

