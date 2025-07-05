import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { db } from "@lib/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from './deleteAvis.module.css';
import CustomCard from "@components/CustomCard";
import AppBarAdmin from "@components/AppBbarAdmin";
export default function DeleteAvisClients() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchItems = async () => {
            const snapshot = await getDocs(collection(db, "avis_clients"));
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
        if (!window.confirm("Voulez vous vraiments supprimer cet élément ?"))
            return;
        await deleteDoc(doc(db, 'avis_clients', id));
        setItems((prev) => prev.filter((item) => item.id !== id));
    };
    if (loading)
        return _jsx("p", { children: "Chargement..." });
    return (_jsxs(_Fragment, { children: [_jsx(AppBarAdmin, {}), _jsxs("div", { children: [_jsx("h1", { children: "Supprimer un avis clients" }), items.length === 0 ? (_jsx("p", { children: "Aucun avis \u00E0 supprimer" })) : (_jsx("div", { className: styles.cardContainer, children: items.map((item) => (_jsx(CustomCard, { name: item.name, message: item.message, onDelete: () => handleDelete(item.id) }, item.id))) }))] })] }));
}
