import type { Couture } from "@entities/Couture";
import type { CoutureRepository } from "@repositories/CoutureRepository";


export class GetAllCoutureUseCase {
  constructor(private readonly coutureRepository: CoutureRepository) {}

  async execute(): Promise<Couture[]> {
    return await this.coutureRepository.getAllCoutures();
  }
}
