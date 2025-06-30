import type { User } from "@entities/User";
import { GetCurrentUserUseCase } from "@usecases/auth/GetCurrentUserUseCase";
import { useEffect, useState } from "react";
import { AuthRepositoryImpl } from '@data/auth/AuthRepositoryImpl';
import { useNavigate } from "react-router-dom";
import AppBarAdmin from "@components/AppBbarAdmin";
import '@styles/appBar.css'

const Account: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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
    return <div style={{ padding: '2rem' }}>Chargement...</div>;
  }

  return (
    <>
    <AppBarAdmin />
    <div style={{ padding: '2rem' }}>
      <h1>Bonjour {user?.userName ?? ''} 👋</h1>
      <p>Bienvenue dans votre espace personnel.</p>
      <p>Sur cette page, vous pouvez ajouter ou supprimer vos créations.</p>
    </div>
</>

  );
};

export default Account;
