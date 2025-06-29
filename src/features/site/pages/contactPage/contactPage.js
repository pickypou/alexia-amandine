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
            const response = await fetch("https://us-central1-alexia-d2307.cloudfunctions.net/sendMail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom, email, message }),
            });
            if (response.ok) {
                setStatus("success");
                setNom("");
                setEmail("");
                setMessage("");
            }
            else {
                throw new Error("Erreur lors de l’envoi");
            }
        }
        catch (err) {
            console.error("Erreur lors de l'envoi du message :", err);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: styles.form, children: [_jsx("h2", { children: "Contactez-nous" }), _jsx("label", { htmlFor: "nom", children: "Nom" }), _jsx("input", { type: "text", id: "nom", value: nom, onChange: (e) => setNom(e.target.value), required: true }), _jsx("label", { htmlFor: "email", children: "Email (facultatif)" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("label", { htmlFor: "message", children: "Message" }), _jsx("textarea", { id: "message", value: message, onChange: (e) => setMessage(e.target.value), required: true }), _jsx("button", { type: "submit", disabled: status === "sending", children: status === "sending" ? "Envoi en cours..." : "Envoyer" }), status === "success" && _jsx("p", { className: styles.success, children: "Message envoy\u00E9 \u2705" }), status === "error" && _jsx("p", { className: styles.error, children: "Erreur lors de l\u2019envoi \u274C" })] }));
}
