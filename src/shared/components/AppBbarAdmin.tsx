import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import "@styles/appBar.css";

export default function AppBarAdmin() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer((prev) => !prev);
  const closeDrawer = () => setShowDrawer(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <>
      <header className="header">
        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link to="/admin/account" className="link">Accueil</Link>
          <Link to="/admin/addCreated" className="link">Ajouter une création</Link>
          <Link to="/admin/deleteCreated" className="link">Supprimer une création</Link>
          <Link to="/admin/deleteAvis" className="link">Supprimer un avis client</Link>
          <button
            className="iconbutton"
            onClick={handleLogout}
            aria-label="Déconnexion"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-surface)",
              fontSize: "1.5rem",
              marginLeft: "1rem",
            }}
            title="Se déconnecter"
          >
            🔒
          </button>
        </nav>

        {/* Mobile Nav */}
        <div className="mobile-nav">
          <button className="hamburger" onClick={toggleDrawer}>☰</button>
        </div>
      </header>

      {/* Overlay */}
      {showDrawer && <div className="overlay" onClick={closeDrawer}></div>}

      {/* Drawer */}
      <div className={`mobile-drawer ${showDrawer ? "open" : ""}`}>
        <div className="drawer-content">
          <Link to="/admin/account" className="link" onClick={closeDrawer}>Accueil</Link>
          <Link to="/admin/addCreated" className="link" onClick={closeDrawer}>Ajouter une création</Link>
          <Link to="/admin/deleteCreated" className="link" onClick={closeDrawer}>Supprimer une création</Link>
          <Link to="/admin/deleteAvis" className="link" onClick={closeDrawer}>Supprimer un avis client</Link>
          <button
            className="iconbutton"
            onClick={() => {
              closeDrawer();
              handleLogout();
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-surface)",
              fontSize: "1.5rem",
              marginTop: "1rem",
            }}
          >
            🔒 Déconnexion
          </button>
        </div>
      </div>
    </>
  );
}
