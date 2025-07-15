import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";
import CustomCard from "@components/CustomCard";
import styles from "./deleteCreated.module.css";
import AppBarAdmin from "@components/AppBbarAdmin";
import { getStorage, ref, deleteObject } from "firebase/storage";
export default function DeleteCreated() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchItems = async () => {
            const snapshot = await getDocs(collection(db, "created"));
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(list);
            setLoading(false);
        };
        fetchItems();
    }, []);
    const handleDelete = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?"))
            return;
        // Trouver l'élément à supprimer pour récupérer l'URL de l'image
        const itemToDelete = items.find(item => item.id === id);
        if (!itemToDelete)
            return;
        try {
            // Supprimer l'image de Firebase Storage
            if (typeof itemToDelete.imageUrl === "string" && itemToDelete.imageUrl) {
                const storage = getStorage();
                // Extraire le chemin relatif à partir de l’URL Firebase Storage
                const decodedUrl = decodeURIComponent(itemToDelete.imageUrl);
                const pathMatch = decodedUrl.match(/\/o\/(.+)\?alt=/);
                const filePath = pathMatch?.[1];
                if (filePath) {
                    const imageRef = ref(storage, filePath);
                    await deleteObject(imageRef);
                    console.log("Image supprimée du storage :", filePath);
                }
            }
            // Supprimer le document Firestore
            await deleteDoc(doc(db, "created", id));
            setItems((prev) => prev.filter((item) => item.id !== id));
        }
        catch (error) {
            console.error("Erreur lors de la suppression :", error);
            alert("Erreur lors de la suppression de l'élément.");
        }
    };
    if (loading)
        return _jsx("p", { children: "Chargement..." });
    return (_jsxs(_Fragment, { children: [_jsx(AppBarAdmin, {}), _jsxs("div", { children: [_jsx("h1", { children: "Supprimer une cr\u00E9ation" }), items.length === 0 ? (_jsx("p", { children: "Aucun \u00E9l\u00E9ment \u00E0 supprimer" })) : (_jsx("div", { className: styles.cardContainer, children: items.map((item) => (_jsx(CustomCard, { name: item.name, description: item.description, imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : undefined, price: item.price, onDelete: () => handleDelete(item.id) }, item.id))) }))] })] }));
}
