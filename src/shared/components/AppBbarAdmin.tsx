// src/shared/components/AppBarAdmin.tsx
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '@styles/appBar.css';

export default function AppBarAdmin() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // redirige vers /home après déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <header className="header">     
      <nav>
        <Link to="/admin/account" className="link">Accueil</Link>
            <Link to="/admin/addCreated" className="link">Ajouter une création</Link>
            <Link to="/admin/deleteCreated" className="link">supprimer une création</Link>
        {/* Bouton déconnexion */}
        <button 
          onClick={handleLogout} 
          aria-label="Déconnexion"
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: 'var(--color-primary)', 
            fontSize: '1.5rem', 
            marginLeft: '1rem' 
          }}
          title="Se déconnecter"
        >
          🔒
        </button>
      </nav>
    </header>
  );
}
