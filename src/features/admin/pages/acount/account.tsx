import type { User } from "@entities/User";
import { GetCurrentUserUseCase } from "@usecases/auth/GetCurrentUserUseCase";
import { useEffect, useState } from "react";
import { AuthRepositoryImpl } from '@data/auth/AuthRepositoryImpl';

const Account: React.FC = () => {
  const [user, setUser ] = useState< User | null>(null);

  useEffect(() => {
    const authRepository = new AuthRepositoryImpl();
    const fetchUser = async () => {
    const useCase = new GetCurrentUserUseCase(authRepository);
      const currentUser = await useCase.execute();
        setUser(currentUser);
    };
    fetchUser();
    }, []); 
    return(
    <div style={{ padding: '2rem' }}>
      <h1>Bonjour {user?.userName ?? ''} 👋</h1>
      <p>Bienvenue dans votre espace personnel.</p>
      <p>Sur cette page, vous pouvez ajouter ou supprimer vos créations.</p>
    </div>
  );
}

export default Account;