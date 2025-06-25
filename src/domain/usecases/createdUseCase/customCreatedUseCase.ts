import type { CreatedRepository } from "@repositories/CreatedRepository";


export class CustomUseCase {
  constructor(private readonly createdRepository: CreatedRepository) {}

  async execute(name: string): Promise<boolean> {
    return await this.createdRepository.custom(name);
  }
}

