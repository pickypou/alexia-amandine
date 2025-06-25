import { Link } from "react-router-dom";
import '@styles/appBar.css';

export default function AppBar() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="link">Accueil</Link>

        {/* === Couture === */}
        <div className="dropdown">
          <span className="link">Couture</span>
          <div className="dropdown-content">
            <Link to="/couture/sac" className="link-dropdown">Sacs</Link>
            <Link to="/couture/trousse" className="link-dropdown">Trousses</Link>
            <Link to="/couture/accessoires" className="link-dropdown">Accessoires</Link>
            <Link to="/couture/divers" className="link-dropdown">Divers</Link>
          </div>
        </div>

        {/* === Papier === */}
        <div className="dropdown">
          <span className="link">Papier</span>
          <div className="dropdown-content">
            <Link to="/papier/carte" className="link-dropdown">Cartes</Link>
            <Link to="/papier/accessoires" className="link-dropdown">Accessoires</Link>
            <Link to="/papier/divers" className="link-dropdown">Divers</Link>
          </div>
        </div>

        {/* === Crochet === */}
        <div className="dropdown">
          <span className="link">Crochet</span>
          <div className="dropdown-content">
            <Link to="/crochet/sac" className="link-dropdown">Sacs</Link>
            <Link to="/crochet/peluches" className="link-dropdown">Peluches</Link>
            <Link to="/crochet/accessoires" className="link-dropdown">Accessoires</Link>
          </div>
        </div>

        {/* === Personnalisable === */}
        <div className="dropdown">
          <span className="link">Personnalisable</span>
          <div className="dropdown-content">
            <Link to="/personnalisable/sac" className="link-dropdown">Sacs</Link>
            <Link to="/personnalisable/peluches" className="link-dropdown">Peluches</Link>
            <Link to="/personnalisable/accessoires" className="link-dropdown">Accessoires</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
