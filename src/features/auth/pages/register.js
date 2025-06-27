import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@lib/firebase";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@components/CustomTextField";
import Button from "@components/Button";
import styles from "./register.module.css";
export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Ajout dans Firestore avec champ admin: true
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                userName: userName,
                admin: true,
                createdAt: new Date().toISOString(),
            });
            navigate("/admin/account");
        }
        catch (err) {
            if (err instanceof Error) {
                alert("Erreur : " + err.message);
            }
            else {
                alert("Une erreur inconnue est survenue.");
            }
        }
    };
    return (_jsx("div", { className: styles.container, children: _jsxs("div", { children: [_jsx("h2", { children: "Je cr\u00E9e mon compte" }), _jsxs("form", { onSubmit: handleRegister, children: [_jsx(CustomTextField, { label: "Mon pr\u00E9nom", type: "text", value: userName, onChange: e => setUserName(e.target.value), required: true }), _jsx(CustomTextField, { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx(CustomTextField, { label: "Mot de passe", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsxs("div", { className: "button-container", children: [_jsx(Button, { type: "submit", label: "soumettre " }), _jsx(Button, { type: "submit", label: "Acueil", redirectTo: "/" })] })] })] }) }));
}
