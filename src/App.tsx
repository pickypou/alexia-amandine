import AppBar from "./shared/components/AppBar";
import Footer from "./shared/components/Footer";
import { Outlet } from "react-router-dom"; 



export default function App() {
  return (
    <div className="app-container">
      <AppBar />
      <main className="main-content">
        <Outlet /> {/* Ici s'affichera <Home /> ou toute autre page enfant */}
      </main>
      <Footer />
    </div>
  );
}