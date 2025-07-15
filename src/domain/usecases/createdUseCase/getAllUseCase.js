export class GetAllUseCase {
    constructor(createdRepository) {
        this.createdRepository = createdRepository;
    }
    async execute(filters) {
        const allItems = await this.createdRepository.getAll(filters);
        if (!filters)
            return allItems;
        return allItems.filter(item => {
            // On vérifie strictement que la collection correspond si définie
            const collectionMatch = filters.collection
                ? item.collection.toLowerCase() === filters.collection.toLowerCase()
                : true;
            // La catégorie doit correspondre aussi si définie
            const categoryMatch = filters.category
                ? item.category.toLowerCase() === filters.category.toLowerCase()
                : true;
            // Optionnellement le flag personnalisable
            const customizableMatch = filters.customizable !== undefined
                ? item.custom === filters.customizable
                : true;
            // Le produit doit correspondre aux 2 (collection ET catégorie)
            return collectionMatch && categoryMatch && customizableMatch;
        });
    }
}
