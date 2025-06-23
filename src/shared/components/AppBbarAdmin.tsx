// src/shared/components/AppBarAdmin.tsx
import { Link } from 'react-router-dom';
import '@styles/appBar.css';

export default function AppBarAdmin() {
  return (
    <header className="header">     
        <nav>
          <Link to="/admin/account" className="link">Accueil</Link>
          <div className="dropdown">
          <span className="link">Couture</span>
          <div className="dropdown-content">
            <Link to="/admin/addcouture" className="link">ajouter</Link>
           
          </div>
        </div>

        </nav>
     
    </header>
  );
}
      