import type { Couture } from "@entities/Couture";
import type { CoutureRepository } from "@repositories/CoutureRepository";

export class GetCoutureByIdUseCase {
  constructor(private readonly coutureRepository: CoutureRepository) {}

  async execute(id: string): Promise<Couture | null> {
    return await this.coutureRepository.getCoutureById(id);
  }
}

