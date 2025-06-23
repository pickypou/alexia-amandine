import type { CoutureRepository } from "@repositories/CoutureRepository";


export class CustomCoutureUseCase {
  constructor(private readonly coutureRepository: CoutureRepository) {}

  async execute(name: string): Promise<boolean> {
    return await this.coutureRepository.customCouture(name);
  }
}

