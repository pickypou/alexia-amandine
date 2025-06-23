import type { Couture } from "@entities/Couture";
import type { CoutureRepository } from "@repositories/CoutureRepository";

// addCoutureUseCase.ts
export class AddCoutureUseCase {
  constructor(private readonly repository: CoutureRepository) {}

  async execute(couture: Couture): Promise<Couture | boolean> {
    return await this.repository.addCouture(couture);
  }
}
