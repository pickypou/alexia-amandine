import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// CreatedListPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatedRepositoryImpl } from "@data/created/CreatedRepositoryImpl";
import { GetAllUseCase } from "@usecases/createdUseCase/getAllUseCase";
import CustomCard from "@components/CustomCard";
import styles from "./createdListPage.module.css";
const CreatedListPage = ({ isCustomPage = false }) => {
    const { collection = "", category = "" } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const repo = new CreatedRepositoryImpl();
            const useCase = new GetAllUseCase(repo);
            const allItems = await useCase.execute();
            const filteredItems = allItems.filter(item => {
                // Vérification obligatoire de la catégorie
                const categoryMatch = item.category.toLowerCase() === category.toLowerCase();
                if (isCustomPage) {
                    // Page personnalisable : seulement les custom=true
                    return categoryMatch && item.custom === true;
                }
                else {
                    // Page normale : tous les produits de la collection + catégorie
                    const collectionMatch = collection
                        ? item.collection.toLowerCase() === collection.toLowerCase()
                        : true;
                    return categoryMatch && collectionMatch;
                }
            });
            setItems(filteredItems);
            setLoading(false);
        };
        fetchData();
    }, [collection, category, isCustomPage]);
    if (loading)
        return _jsx("p", { children: "Chargement..." });
    return (_jsxs("div", { children: [_jsx("h1", { style: { textTransform: "capitalize" }, children: isCustomPage ? `Personnalisables  ${category}` : `${collection}  ${category}` }), items.length === 0 ? (_jsx("p", { children: "Aucun \u00E9l\u00E9ment trouv\u00E9 pour cette cat\u00E9gorie." })) : (_jsx("div", { className: styles.cardContainer, children: items.map((item) => (_jsx(CustomCard, { name: item.name, description: item.description, price: item.price, imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : undefined }, item.id))) }))] }));
};
export default CreatedListPage;
