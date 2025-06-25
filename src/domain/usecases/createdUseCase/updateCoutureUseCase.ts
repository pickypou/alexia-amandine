import type { Created } from "@entities/created";
import type { CreatedRepository } from "@repositories/CreatedRepository";


export class updateUseCase {
  constructor(private readonly createdRepository: CreatedRepository) {}

  async execute(id: string, created: Created): Promise<Created | null> {
    return await this.createdRepository.update(id, created);
  }
}
