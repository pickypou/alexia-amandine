import { Link } from 'react-router-dom';
import'../../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer footer-row">
      <Link to="/admin">
  <img src="images/logo.jpg" className="img-footer" />
</Link>
      © {new Date().getFullYear()} Féerique & pétillante tout drois réservé
     <a href='https://ludovicspysschaert.fr/'>Création Ludovic SPYSSCHAERT</a>
    </footer>
  );
}