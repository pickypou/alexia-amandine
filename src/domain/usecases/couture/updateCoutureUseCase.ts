import type { Couture } from "@entities/Couture";
import type { CoutureRepository } from "@repositories/CoutureRepository";


export class updateCoutureUseCase {
  constructor(private readonly coutureRepository: CoutureRepository) {}

  async execute(id: string, couture: Couture): Promise<Couture | null> {
    return await this.coutureRepository.updateCouture(id, couture);
  }
}
