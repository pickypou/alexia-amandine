import type { CoutureRepository } from "@repositories/CoutureRepository";


export class DeleteCoutureUseCase {
  constructor(private readonly coutureRepository: CoutureRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.coutureRepository.deleteCouture(id);
  }
}
