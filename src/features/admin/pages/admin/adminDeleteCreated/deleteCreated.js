import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";
import CustomCard from "@components/CustomCard";
import styles from "./deleteCreated.module.css";
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
        await deleteDoc(doc(db, "created", id));
        setItems((prev) => prev.filter((item) => item.id !== id));
    };
    if (loading)
        return _jsx("p", { children: "Chargement..." });
    return (_jsxs("div", { children: [_jsx("h1", { children: "Supprimer une cr\u00E9ation" }), items.length === 0 ? (_jsx("p", { children: "Aucun \u00E9l\u00E9ment \u00E0 supprimer" })) : (_jsx("div", { className: styles.cardContainer, children: items.map((item) => (_jsx(CustomCard, { name: item.name, description: item.description, imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : undefined, price: item.price, onDelete: () => handleDelete(item.id) }, item.id))) }))] }));
}
