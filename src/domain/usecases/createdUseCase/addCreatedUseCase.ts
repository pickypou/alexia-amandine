import type { Created } from "@entities/created";
import type { CreatedRepository } from "@repositories/CreatedRepository";

// addCoutureUseCase.ts
export class AddUseCase {
  constructor(private readonly repository: CreatedRepository) {}

  async execute(created: Created): Promise<Created | boolean> {
    return await this.repository.add(created);
  }
}
