import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// CreatedListPage.tsx
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CreatedRepositoryImpl } from "@data/created/CreatedRepositoryImpl";
import { GetAllUseCase } from "@usecases/createdUseCase/getAllUseCase";
import CustomCard from "@components/CustomCard";
import styles from "./createdListPage.module.css";
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const CreatedListPage = ({ isCustomPage = false }) => {
    const location = useLocation();
    console.log("location.pathname:", location.pathname);
    const pathParts = location.pathname.split("/").filter(Boolean);
    console.log("pathParts:", pathParts);
    const collection = pathParts.length > 0 ? pathParts[0] : "";
    const rawCategory = pathParts.length > 1 ? pathParts[1].toLowerCase() : "";
    const category = rawCategory; // utilisé pour le filtre Firestore
    const displayCategory = capitalizeFirstLetter(rawCategory); // utilisé pour l'affichage
    console.log("Extracted collection:", collection);
    console.log("Extracted category:", category);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const repo = new CreatedRepositoryImpl();
            const useCase = new GetAllUseCase(repo);
            let itemsToDisplay = [];
            if (isCustomPage) {
                // 🔁 Appelle la méthode spéciale pour les personnalisables
                itemsToDisplay = await repo.getCustomProducts(category);
                console.log("category passed to getCustomProducts:", category);
            }
            else {
                const filters = {};
                if (collection)
                    filters.collection = collection;
                if (category)
                    filters.category = category;
                itemsToDisplay = await useCase.execute(filters);
            }
            setItems(itemsToDisplay);
            setLoading(false);
        };
        fetchData();
    }, [collection, category, isCustomPage]);
    if (loading)
        return _jsx("p", { children: "Chargement..." });
    return (_jsxs("div", { children: [_jsx("h1", { style: { textTransform: "capitalize" }, children: isCustomPage
                    ? `Personnalisable - ${displayCategory}`
                    : `${collection} - ${displayCategory}` }), items.length === 0 ? (_jsx("p", { children: "Aucun \u00E9l\u00E9ment trouv\u00E9 pour cette cat\u00E9gorie." })) : (_jsx("div", { className: styles.cardContainer, children: items.map((item) => (_jsx(CustomCard, { name: item.name, description: item.description, price: item.price, imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : undefined }, item.id))) }))] }));
};
export default CreatedListPage;
