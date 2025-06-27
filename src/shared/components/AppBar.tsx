// src/components/AppBar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "@styles/appBar.css";

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
        ["/couture/trousse", "Trousses/pochettes"],
        ["/couture/accessoires", "Accessoires"],
        ["/couture/divers", "Divers"]
      ]
    },
    {
      name: "papier",
      links: [
        ["/papier/emballage", "Emballage"],
        ["/papier/decoration", "Décoration"],
        ["/papier/accessoires", "Accessoires"],
        ["/papier/divers", "Divers"],
        ["/papier/fetes", "Fêtes/événements"]
      ]
    },
    {
      name: "crochet",
      links: [
        ["/crochet/sacs", "Sacs"],
        ["/crochet/peluches", "Peluches"],
        ["/crochet/poupees", "Poupées"],
        ["/crochet/Compositions-florales", "Compositions florales"],
        ["/crochet/couvertures", "Couvertures C2C"]
      ]
    },
    {
      name: "personnalisable",
      links: [
        ["/personnalisable/sac", "Sacs"],
        ["/personnalisable/trousses", "Trousses"],
        ["/personnalisable/textiles", "Textiles"],
        ["/personnalisable/Adhesif", "Adhésifs"],
        ["/personnalisable/tasses", "Tasses/Gobelets"],
        ["/personnalisable/fetes", "Fêtes/événements"],
        ["/personnalisable/accessoires", "Accessoires"]
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
        </div>

        {/* Version mobile */}
        <div className="mobile-nav">
          <button className="hamburger" onClick={toggleDrawer}>☰</button>
          <Link to="/" className="link">Alexia</Link>
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
        </div>
      </div>
    </>
  );

  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}