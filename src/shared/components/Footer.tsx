import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '@styles/footer.css'


export default function Footer() {
  const [open, setOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        buttonRef.current &&
        !menuContainerRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <footer className="footer" >
      <div className="footer-content">
        <Link to="/admin">
          <img src="images/logo.jpg" className="img-footer" alt="Logo" />
        </Link>
        
        <span>© {new Date().getFullYear()} Féerique & pétillante tout droits réservés</span>
        
        <a href='https://ludovicspysschaert.fr/'>Création Ludovic SPYSSCHAERT</a>

        <div 
          className="menu-container" 
          ref={menuContainerRef}
        >
        <button
  ref={buttonRef}
  className="menu-button"
  onClick={toggleMenu}
  aria-expanded={open}
  aria-label="Informations légales"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fill="black"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
         10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
    />
  </svg>
</button>


          <div className={`dropdown-menu ${open ? 'open' : ''}`}>
            <ul>
              <li><a href="/mentions-legales.html" target="_blank">Mentions légales</a></li>
              <li><a href="/confidentialite.html"target="_blank">Confidentialité</a></li>
              <li><a href="/cookies.html"target="_blank">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}