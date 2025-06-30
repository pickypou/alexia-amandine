import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { GetCurrentUserUseCase } from "@usecases/auth/GetCurrentUserUseCase";
import { useEffect, useState } from "react";
import { AuthRepositoryImpl } from '@data/auth/AuthRepositoryImpl';
import { useNavigate } from "react-router-dom";
import AppBarAdmin from "@components/AppBbarAdmin";
import '@styles/appBar.css';
const Account = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const authRepository = new AuthRepositoryImpl();
        const fetchUser = async () => {
            const useCase = new GetCurrentUserUseCase(authRepository);
            const currentUser = await useCase.execute();
            if (!currentUser) {
                navigate("/login");
                return;
            }
            if (!currentUser.admin) {
                navigate("/");
                return;
            }
            setUser(currentUser);
            setLoading(false);
        };
        fetchUser();
    }, [navigate]);
    if (loading) {
        return _jsx("div", { style: { padding: '2rem' }, children: "Chargement..." });
    }
    return (_jsxs(_Fragment, { children: [_jsx(AppBarAdmin, {}), _jsxs("div", { style: { padding: '2rem' }, children: [_jsxs("h1", { children: ["Bonjour ", user?.userName ?? '', " \uD83D\uDC4B"] }), _jsx("p", { children: "Bienvenue dans votre espace personnel." }), _jsx("p", { children: "Sur cette page, vous pouvez ajouter ou supprimer vos cr\u00E9ations." })] })] }));
};
export default Account;
