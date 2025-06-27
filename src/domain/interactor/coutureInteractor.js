export class CoutureInteractor {
    constructor(getAllUseCase, getByIdUseCase, updateUseCase, deleteUseCase, customUseCase, addUseCase) {
        this.getAllUseCase = getAllUseCase;
        this.getByIdUseCase = getByIdUseCase;
        this.updateUseCase = updateUseCase;
        this.deleteUseCase = deleteUseCase;
        this.customUseCase = customUseCase;
        this.addUseCase = addUseCase;
    }
    async getAll() {
        return await this.getAllUseCase.execute(); // Assuming this method returns all coutures
    }
    async getById(id) {
        if (!id) {
            throw new Error("Created ID is required");
        }
        if (typeof id !== "string") {
            throw new Error("Created ID must be a string");
        }
        return await this.getByIdUseCase.execute(id); // Assuming this method exists in the use case
    }
    async add(created) {
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
    async update(id, created) {
        return await this.updateUseCase.execute(id, created);
    }
    async delete(id) {
        return await this.deleteUseCase.execute(id);
    }
    async custom(name) {
        return await this.customUseCase.execute(name);
    }
}
