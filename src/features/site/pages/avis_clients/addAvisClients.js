import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Pour générer des IDs uniques
import { useState } from "react";
import CustomTextField from "@components/CustomTextField";
import Button from "@components/Button";
import { db } from "@lib/firebase";
import styles from './addAvisClient.module.css';
import CustomTextarea from "@components/CustomTextarea";
export function AddAvisClient() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !message)
            return;
        setLoading(true);
        try {
            const avisId = uuidv4(); // Génère un ID unique
            await setDoc(doc(db, "avis_clients", avisId), {
                name,
                message,
                date: serverTimestamp(), // Utilise le timestamp du serveur
            });
            setName("");
            setMessage("");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
        catch (error) {
            console.error("Erreur lors de l'ajout de l'avis:", error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: styles.avisform, children: [_jsx("h2", { className: "mt-5 mb-5", children: "Laissez votre avis" }), _jsx(CustomTextField, { label: "Votre pr\u00E9nom", value: name, onChange: (e) => setName(e.target.value), required: true }), _jsx(CustomTextarea, { label: "Votre message", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "\u00C9crivez votre t\u00E9moignage ici...", error: message.length < 10 ? "Le message est trop court." : undefined }), _jsx(Button, { label: loading ? "Envoi en cours..." : "Je poste mon avis", type: "submit", disabled: loading, redirectTo: "/avisClients" }), success && _jsx("p", { className: "success-message", children: "Merci pour votre avis !" })] }));
}
