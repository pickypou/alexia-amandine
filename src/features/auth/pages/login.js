import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'mt-5 mb-5', children: "Connexion" }), _jsx("div", { className: styles.container, children: _jsx("div", { children: _jsxs("form", { onSubmit: handleLogin, children: [_jsx(CustomTextField, { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx(CustomTextField, { label: "Mot de passe", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsxs("div", { className: "button-container", children: [_jsx(Button, { type: "submit", label: "Se connecter" }), _jsx(Button, { type: "default", label: "Retour sur le site", redirectTo: "/" })] }), error && _jsx("p", { className: styles.error, children: error })] }) }) })] }));
};
export default Login;
