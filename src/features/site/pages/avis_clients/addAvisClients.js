import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import CustomTextField from "@components/CustomTextField";
import Button from "@components/Button";
import { db } from "@lib/firebase";
import styles from './addAvisClient.module.css';
import CustomTextarea from "@components/CustomTextarea";
import { useNavigate } from "react-router-dom";
export function AddAvisClient() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = "Le prénom est requis.";
        }
        if (!message.trim()) {
            newErrors.message = "Le message est requis.";
        }
        else if (message.length < 10) {
            newErrors.message = "Le message est trop court (10 caractères minimum).";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        try {
            const avisId = uuidv4();
            console.log("→ Envoi du message en cours…");
            await setDoc(doc(db, "avis_clients", avisId), {
                name,
                message,
                date: serverTimestamp(),
            });
            console.log("✅ Message bien envoyé !");
            setName("");
            setMessage("");
            setSuccess(true);
            setSubmitted(false);
            setTimeout(() => setSuccess(false), 3000);
            // ✅ Redirection après succès seulement
            navigate("/avisClients");
        }
        catch (error) {
            console.error("Erreur lors de l'ajout de l'avis:", error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { onSubmit: handleSubmit, className: styles.avisform, children: [_jsx("h2", { className: "mt-3 mb-3", children: "Laissez votre avis" }), _jsx(CustomTextField, { label: "Votre pr\u00E9nom", value: name, onChange: (e) => setName(e.target.value), required: true, error: submitted ? errors.name : undefined }), _jsx(CustomTextarea, { label: "Votre message", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "\u00C9crivez votre t\u00E9moignage ici...", error: submitted ? errors.message : undefined }), _jsx("div", { className: styles.buttonContainer, children: _jsx(Button, { label: loading ? "Envoi en cours..." : "Je poste mon avis", type: "submit", disabled: loading }) }), success && (_jsx("p", { className: "success-message", children: "Merci pour votre avis !" }))] }) }));
}
