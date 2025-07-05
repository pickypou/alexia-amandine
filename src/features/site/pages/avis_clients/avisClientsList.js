import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "@components/Button";
import { db } from "@lib/firebase";
import styles from './avisClientsList.module.css';
import { Carousel } from "react-bootstrap";
export function AvisClientsList() {
    const [avisClients, setAvisClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAvis = async () => {
            try {
                const q = query(collection(db, "avis_clients"), orderBy("date", "desc"));
                const querySnapshot = await getDocs(q);
                const avisList = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    avisList.push({
                        id: doc.id,
                        name: data.name,
                        message: data.message || data.commentaire,
                        date: data.date?.toDate() || new Date()
                    });
                });
                setAvisClients(avisList);
            }
            catch (err) {
                console.error("Erreur de récupération des avis:", err);
                setError("Impossible de charger les avis");
            }
            finally {
                setLoading(false);
            }
        };
        fetchAvis();
    }, []);
    if (loading)
        return _jsx("div", { className: "text-center py-8", children: "Chargement des avis..." });
    if (error)
        return _jsx("div", { className: "text-center py-8 text-red-500", children: error });
    return (_jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8", children: [_jsx("h1", { className: "mb-5 mt-5", children: "T\u00E9moignages clients" }), avisClients.length === 0 ? (_jsx("div", { className: "text-center py-8", children: "Aucun avis pour le moment." })) : (_jsx(Carousel, { indicators: false, interval: 6000, className: "mb-5", prevIcon: _jsx("span", { className: styles.customchevron, children: "\u2039" }), nextIcon: _jsx("span", { className: styles.customchevron, children: "\u203A" }), children: avisClients.map(({ id, name, message, date }) => (_jsx(Carousel.Item, { children: _jsxs("div", { className: "p-4 bg-with shadow rounded mx-auto mt-5 mb-5", style: { maxWidth: "600px" }, children: [_jsx("small", { className: "text-muted text-center", children: date.toLocaleDateString("fr-FR") }), _jsx("h5", { className: "mb-1 text-center", children: name }), _jsxs("p", { className: "mt-4 fst-italic", children: ["\"", message, "\""] })] }) }, id))) })), _jsx("div", { className: styles.button, children: _jsx(Button, { label: "Je laisse un avis", redirectTo: "/addavisClient" }) })] }));
}
