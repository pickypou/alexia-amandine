import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { AuthInteractor } from '@interactor/AuthInteractor';
import { AuthRepositoryImpl } from '@data/auth/AuthRepositoryImpl';
import CustomTextField from '@components/CustomTextField';
import Button from '@components/Button';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
const authRepository = new AuthRepositoryImpl();
const authInteractor = new AuthInteractor(authRepository);
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await authInteractor.login(email, password);
            console.log('Utilisateur connecté:', user);
            navigate('/admin/account'); // Redirige vers la page du compte après connexion
        }
        catch (err) {
            console.error(err);
            setError('Erreur de connexion, veuillez vérifier vos identifiants.');
        }
    };
    return (_jsx("div", { className: styles.container, children: _jsxs("div", { children: [_jsx("h2", { children: "Connexion" }), _jsxs("form", { onSubmit: handleLogin, children: [_jsx(CustomTextField, { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx(CustomTextField, { label: "Mot de passe", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx(Button, { type: "submit", label: "Se connecter" }), _jsx(Button, { type: "default", label: "Retour", redirectTo: "/admin" }), error && _jsx("p", { className: styles.error, children: error })] })] }) }));
};
export default Login;
