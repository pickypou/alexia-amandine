import React, { useState } from 'react';
import { AuthInteractor } from '@interactor/AuthInteractor';
import { AuthRepositoryImpl } from '@data/auth/AuthRepositoryImpl';
import CustomTextField from '@components/CustomTextField';
import Button from '@components/Button';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

const authRepository = new AuthRepositoryImpl();
const authInteractor = new AuthInteractor(authRepository);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await authInteractor.login(email, password);
      console.log('Utilisateur connecté:', user);
      navigate('/admin/account'); // Redirige vers la page du compte après connexion
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion, veuillez vérifier vos identifiants.');
    }
  };

  return (
    <>
      <h1 className='mt-5 mb-5'>Connexion</h1>
    <div className={styles.container}>
      <div>
      
        <form onSubmit={handleLogin}>
          <CustomTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <CustomTextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className ="button-container">
          <Button type="submit" label="Se connecter" />
          <Button type="default" label="Retour sur le site" redirectTo="/" />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
