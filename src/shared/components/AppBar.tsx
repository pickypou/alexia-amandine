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
            <Link to="/couture/sac" className="link-dropdown">Sacs</Link>
            <Link to="/couture/trousse" className="link-dropdown">Trousses/pochettes</Link>
            <Link to="/couture/accessoires" className="link-dropdown">Accessoires</Link>
            <Link to="/couture/divers" className="link-dropdown">Divers</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
