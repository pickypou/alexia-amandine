import { Link } from "react-router-dom";
import '@styles/appBar.css';

export default function AppBar() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="link">Accueil</Link>
       

        <div className="dropdown">
          <span className="link">Couture</span>
          <div className="dropdown-content">
            <Link to="/couture/sac" className="link">Sacs</Link>
            <Link to="/couture/trousse" className="link">Trousses/pochettes</Link>
            <Link to="/couture/accessoires" className="link">Accessoires</Link>
            <Link to="/couture/divers" className="link">Divers</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
