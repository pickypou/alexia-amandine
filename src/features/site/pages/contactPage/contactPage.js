import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Row, Col, Card, Container } from "react-bootstrap";
import Button from "@components/Button";
import CustomTextField from "@components/CustomTextField";
import CustomTextarea from "@components/CustomTextarea";
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom, email, message }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || "Erreur lors de l'envoi");
            }
            setStatus("success");
            setNom("");
            setEmail("");
            setMessage("");
            setTimeout(() => setStatus("idle"), 5000);
        }
        catch (err) {
            console.error("Erreur:", err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: "mt-2", children: "Contactez-nous" }), _jsx(Container, { className: `${styles.contactPage} py-4`, children: _jsxs(Row, { children: [_jsxs(Col, { md: 4, className: "mb-4", children: [_jsx(Card, { className: styles.card, children: _jsxs(Card.Body, { className: styles.cardBody, children: [_jsx(Card.Title, { className: styles.title, children: "La petite f\u00E9e crochette " }), _jsxs(Card.Text, { children: [_jsx("p", { children: "Sur les r\u00E9seaux" }), _jsxs("div", { className: styles.iconRow, children: [_jsx("a", { href: "https://www.instagram.com/lapetitefeecrochette2?igsh=MWhhbTFldGI2ZDdjaQ==", target: "_blank", rel: "noreferrer", children: _jsx("img", { src: "images/logo-insta.png", alt: "Logo insta", className: styles.img }) }), _jsx("a", { href: "https://www.facebook.com/share/g/199FJie5Rj/", target: "_blank", rel: "noreferrer", children: _jsx("img", { src: "images/facebook.png", alt: "logo facebook", className: styles.img }) }), _jsx("a", { href: "https://lapetitefeecrochettebyamandine.sumupstore.com/?fbclid=IwY2xjawLTORZleHRuA2FlbQIxMQABHmxw7hBllQNGC6-NxLZ6JKwAY6p1BiMildfb98-psUR0PDBxGLvh4358-oE0_aem_CS0iharyn-0tBVMvisTTUg", target: "_blank", rel: "noreferrer", children: _jsx("img", { src: "images/sumup.png", alt: "Logo sumup", className: styles.img }) })] })] })] }) }), _jsx(Card, { className: styles.card, children: _jsxs(Card.Body, { className: styles.cardBody, children: [_jsx(Card.Title, { className: styles.title, children: "Les petites cr\u00E9as d'Alexia" }), _jsxs(Card.Text, { children: [_jsx("p", { children: "Sur les r\u00E9seaux" }), _jsxs("div", { className: styles.iconRow, children: [_jsx("a", { href: "https://www.instagram.com/lespetitescreasdalexia?igsh=OWVhNjVqZzh1YTFk", target: "_blank", rel: "noreferrer", children: _jsx("img", { src: "images/logo-insta.png", alt: "Logo insta", className: styles.img }) }), _jsx("br", {}), _jsx("a", { href: "https://www.facebook.com/share/14FBg5SgbzH/", target: "_blank", rel: "noreferrer", children: _jsx("img", { src: "images/facebook.png", alt: "logo facebook", className: styles.img }) }), _jsx("br", {}), _jsx("a", { href: "https://lespetitescreasdalexia.sumupstore.com/?fbclid=IwY2xjawLTORZleHRuA2FlbQIxMQABHmxw7hBllQNGC6-NxLZ6JKwAY6p1BiMildfb98-psUR0PDBxGLvh4358-oE0_aem_CS0iharyn-0tBVMvisTTUg", target: "_blank", rel: "noreferrer", children: _jsx("img", { src: "images/sumup.png", alt: "logo sumup", className: styles.img }) })] })] })] }) })] }), _jsx(Col, { md: 8, children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CustomTextField, { label: "Nom (obligatoire)", type: "text", value: nom, onChange: (e) => setNom(e.target.value), required: true, id: "nom", name: "nom", className: "mb-3" }), _jsx(CustomTextField, { label: "Email (obligatoire)", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, id: "email", name: "email", className: "mb-3" }), _jsx(CustomTextarea, { label: "Message (obligatoire)", value: message, onChange: (e) => setMessage(e.target.value), name: "message" }), _jsx("div", { className: "d-flex justify-content-center", children: _jsx(Button, { type: "submit", disabled: status === "sending", label: status === "sending" ? "Envoi en cours..." : "Envoyer" }) }), status === "success" && _jsx("p", { className: "text-success mt-3", children: "Message envoy\u00E9 \u2705" }), status === "error" && _jsx("p", { className: "text-danger mt-3", children: "Erreur lors de l\u2019envoi \u274C" })] }) })] }) })] }));
}
