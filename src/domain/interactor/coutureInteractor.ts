import type { Created } from "@entities/created";
import type { AddUseCase } from "@usecases/createdUseCase/addCreatedUseCase";
import type { CustomUseCase } from "@usecases/createdUseCase/customCreatedUseCase";
import type { DeleteUseCase } from "@usecases/createdUseCase/deleteCreatedUseCase";
import type { GetAllUseCase } from "@usecases/createdUseCase/getAllUseCase";
import type { GetByIdUseCase } from "@usecases/createdUseCase/getByIdUseCase";
import type { updateUseCase } from "@usecases/createdUseCase/updateCoutureUseCase";


export class CoutureInteractor {
  constructor(
    private readonly getAllUseCase: GetAllUseCase, 
    private readonly getByIdUseCase: GetByIdUseCase, 
    private readonly updateUseCase: updateUseCase, 
    private readonly deleteUseCase: DeleteUseCase, 
    private readonly customUseCase: CustomUseCase,
    private readonly addUseCase: AddUseCase
  ) {}

  async getAll(): Promise<Created[]> { // Replace 'Couture[]' with actual type if needed
    return await this.getAllUseCase.execute(); // Assuming this method returns all coutures
  } 
async getById(id: string): Promise<Created | null> { // Replace 'Couture | null' with actual type if needed
    if (!id) {
      throw new Error("Created ID is required");
    }
    if (typeof id !== "string") {
      throw new Error("Created ID must be a string");
    }
    return await this.getByIdUseCase.execute(id); // Assuming this method exists in the use case
  }

  async add(created: Created): Promise<Created | boolean> { 
    if (!created || !created.name || !created.description) {
      throw new Error("Created name and description are required");
    }
    if (typeof created.name !== "string" || typeof created.description !== "string") {
      throw new Error("Created name and description must be strings");
    }
    if (created.price < 0) {
      throw new Error("Created price must be a positive number");
    }
    if (created.customizable === undefined) {
      throw new Error("Created customizable field is required");
    }
    if (created.imageUrl && !(typeof created.imageUrl === "string" || created.imageUrl instanceof File)) {
      throw new Error("Created imageUrl must be a string or a File object");
    }
   return await this.addUseCase.execute(created);
  }
  

  async update(id: string, created: Created): Promise<Created | null> { // Replace 'any' with actual type
    return await this.updateUseCase.execute(id, created);
  }

  async delete(id: string): Promise<boolean> {
    return await this.deleteUseCase.execute(id);
  }

  async custom(name: string): Promise<boolean> {
    return await this.customUseCase.execute(name);
  }
}
