// src/layouts/PublicLayout.tsx
import AppBar from '@components/AppBar';
import Footer from '@components/Footer';
import HomePage from '@pages/home/pages/home';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <AppBar />
      <main style={{ minHeight: '80vh' }}>
        <HomePage /> 
        <Outlet /> {/* Injecte la page courante ici */}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
