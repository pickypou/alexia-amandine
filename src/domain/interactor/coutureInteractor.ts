import type { Couture } from "@entities/Couture";
import type { AddCoutureUseCase } from "@usecases/couture/addCoutureUseCase";
import type { CustomCoutureUseCase } from "@usecases/couture/customCoutureUseCase";
import type { DeleteCoutureUseCase } from "@usecases/couture/deleteCoutureUseCase";
import type { GetAllCoutureUseCase } from "@usecases/couture/getAllCoutureUseCase";
import type { GetCoutureByIdUseCase } from "@usecases/couture/getCoutureByIdUseCase";
import type { updateCoutureUseCase } from "@usecases/couture/updateCoutureUseCase";


export class CoutureInteractor {
  constructor(
    private readonly getAllCoutureUseCase: GetAllCoutureUseCase, 
    private readonly getCoutureByIdUseCase: GetCoutureByIdUseCase, 
    private readonly updateCoutureUseCase: updateCoutureUseCase, 
    private readonly deleteCoutureUseCase: DeleteCoutureUseCase, 
    private readonly customCoutureUseCase: CustomCoutureUseCase,
    private readonly addCoutureUseCase: AddCoutureUseCase
  ) {}

  async getAllCoutures(): Promise<Couture[]> { // Replace 'Couture[]' with actual type if needed
    return await this.getAllCoutureUseCase.execute(); // Assuming this method returns all coutures
  } 
async getCoutureById(id: string): Promise<Couture | null> { // Replace 'Couture | null' with actual type if needed
    if (!id) {
      throw new Error("Couture ID is required");
    }
    if (typeof id !== "string") {
      throw new Error("Couture ID must be a string");
    }
    return await this.getCoutureByIdUseCase.execute(id); // Assuming this method exists in the use case
  }

  async addCouture(couture: Couture): Promise<Couture | boolean> { 
    if (!couture || !couture.name || !couture.description) {
      throw new Error("Couture name and description are required");
    }
    if (typeof couture.name !== "string" || typeof couture.description !== "string") {
      throw new Error("Couture name and description must be strings");
    }
    if (couture.price < 0) {
      throw new Error("Couture price must be a positive number");
    }
    if (couture.customizable === undefined) {
      throw new Error("Couture customizable field is required");
    }
    if (couture.imageUrl && !(typeof couture.imageUrl === "string" || couture.imageUrl instanceof File)) {
      throw new Error("Couture imageUrl must be a string or a File object");
    }
   return await this.addCoutureUseCase.execute(couture);
  }
  

  async updateCouture(id: string, couture: Couture): Promise<Couture | null> { // Replace 'any' with actual type
    return await this.updateCoutureUseCase.execute(id, couture);
  }

  async deleteCouture(id: string): Promise<boolean> {
    return await this.deleteCoutureUseCase.execute(id);
  }

  async customCouture(name: string): Promise<boolean> {
    return await this.customCoutureUseCase.execute(name);
  }
}
