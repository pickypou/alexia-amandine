import type { CreatedRepository } from "@repositories/CreatedRepository";


export class DeleteUseCase {
  constructor(private readonly createdRepository: CreatedRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.createdRepository.delete(id);
  }
}
