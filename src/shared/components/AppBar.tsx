import { Link } from "react-router-dom";
import'@styles/appBar.css';


export default function AppBar() {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="link">Accueil</Link>
        <Link to="/about" className="link">À propos</Link>
      </nav>
    </header>
  );
}