// src/components/AppBar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";


export default function AppBar() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const closeDrawer = () => {
    setShowDrawer(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const sections = [
    {
      name: "couture",
      links: [
        ["/couture/sac", "Sacs"],
        ["/couture/trousse-pochette", "Trousses & Pochettes"],
        ["/couture/accessoire", "Accessoires"],
        ["/couture/divers", "Divers"]
      ]
    },
    {
      name: "papier",
      links: [
        ["/papier/emballage", "Emballage"],
        ["/papier/decoration", "Décoration"],
        ["/papier/accessoire", "Accessoires"],
        ["/papier/divers", "Divers"],
        ["/papier/fete-evenement", "Fêtes & événements"]
      ]
    },
    {
      name: "crochet",
      links: [
        ["/crochet/sac-a-main", "Sacs"],
        ["/crochet/peluche", "Peluches"],
        ["/crochet/poupee", "Poupées"],
        ["/crochet/Composition-florale", "Compositions florales"],
        ["/crochet/couverture-c2c", "Couvertures C2C"],
        ["/crochet/accessoire", "Accessoires"]
      ]
    },
    {
      name: "personnalisable",
      links: [
        ["/personnalisable/sac", "Sacs"],
        ["/personnalisable/trousse", "Trousses"],
        ["/personnalisable/textile", "Textiles"],
        ["/personnalisable/adhesif", "Adhésifs"],
        ["/personnalisable/tasse-gobelet", "Tasses & Gobelets"],
        ["/personnalisable/fete-evenement", "Fêtes & événements"],
        ["/personnalisable/accessoire", "Accessoires"]
      ]
    }
  ];

  return (
    <>
      {/* Header principal */}
      <header className="header">
        {/* Version desktop */}
        <div className="desktop-nav">
          <Link to="/" className="link">Accueil</Link>
          {sections.map(section => (
            <div className="dropdown" key={section.name}>
              <span className="link" onClick={() => toggleDropdown(section.name)}>
                {capitalize(section.name)}
              </span>
              <div className={`dropdown-content ${openDropdown === section.name ? 'visible' : ''}`}>
                {section.links.map(([to, label]) => (
                  <Link key={to} to={to} className="link-dropdown">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          {/* Ces liens doivent être en dehors de la boucle map */}
          <Link to="/contact" className="link">Contact</Link>
          <Link to="/avisClients" className="link">Avis-clients</Link>
        </div>

        {/* Version mobile */}
        <div className="mobile-nav">
          <button className="hamburger" onClick={toggleDrawer}>☰</button>
          
        </div>
      </header>

      {/* Overlay semi-transparent */}
      {showDrawer && <div className="overlay" onClick={closeDrawer}></div>}

      {/* Drawer mobile */}
      <div className={`mobile-drawer ${showDrawer ? 'open' : ''}`}>
        <div className="drawer-content">
          <Link to="/" className="link" onClick={closeDrawer}>Accueil</Link>
          {sections.map(section => (
            <div key={section.name} className="drawer-section">
              <span 
                className="link" 
                onClick={() => toggleDropdown(section.name)}
                style={{cursor: 'pointer'}}
              >
                {capitalize(section.name)}
              </span>
              <div className={`dropdown-content ${openDropdown === section.name ? 'visible' : ''}`}>
                {section.links.map(([to, label]) => (
                  <Link 
                    key={to} 
                    to={to} 
                    className="link-dropdown" 
                    onClick={closeDrawer}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link to="/contact" className="link" onClick={closeDrawer}>Contact</Link>
          <Link to="/avisClients" className="link" onClick={closeDrawer}>Avis-clients</Link>
        </div>
      </div>
    </>
  );

  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}