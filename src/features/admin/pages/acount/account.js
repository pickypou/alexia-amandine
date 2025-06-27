import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { GetCurrentUserUseCase } from "@usecases/auth/GetCurrentUserUseCase";
import { useEffect, useState } from "react";
import { AuthRepositoryImpl } from '@data/auth/AuthRepositoryImpl';
const Account = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const authRepository = new AuthRepositoryImpl();
        const fetchUser = async () => {
            const useCase = new GetCurrentUserUseCase(authRepository);
            const currentUser = await useCase.execute();
            setUser(currentUser);
        };
        fetchUser();
    }, []);
    return (_jsxs("div", { style: { padding: '2rem' }, children: [_jsxs("h1", { children: ["Bonjour ", user?.userName ?? '', " \uD83D\uDC4B"] }), _jsx("p", { children: "Bienvenue dans votre espace personnel." }), _jsx("p", { children: "Sur cette page, vous pouvez ajouter ou supprimer vos cr\u00E9ations." })] }));
};
export default Account;
