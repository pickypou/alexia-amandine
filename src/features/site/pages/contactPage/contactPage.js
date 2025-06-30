import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./contactPage.module.css";
export default function ContactPage() {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("idle");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const response = await fetch("https://sendmail-cgrahh5xja-uc.a.run.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nom, email, message }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || "Erreur lors de l'envoi");
            }
            setStatus("success");
            // Réinitialisation du formulaire
            setNom("");
            setEmail("");
            setMessage("");
            // Réinitialiser le statut après 5 secondes
            setTimeout(() => setStatus("idle"), 5000);
        }
        catch (err) {
            console.error("Erreur:", err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: styles.form, children: [_jsx("h2", { children: "Contactez-nous" }), _jsx("label", { htmlFor: "nom", children: "Nom" }), _jsx("input", { type: "text", id: "nom", value: nom, onChange: (e) => setNom(e.target.value), required: true }), _jsx("label", { htmlFor: "email", children: "Email (facultatif)" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("label", { htmlFor: "message", children: "Message" }), _jsx("textarea", { id: "message", value: message, onChange: (e) => setMessage(e.target.value), required: true }), _jsx("button", { type: "submit", disabled: status === "sending", children: status === "sending" ? "Envoi en cours..." : "Envoyer" }), status === "success" && _jsx("p", { className: styles.success, children: "Message envoy\u00E9 \u2705" }), status === "error" && _jsx("p", { className: styles.error, children: "Erreur lors de l\u2019envoi \u274C" })] }));
}
