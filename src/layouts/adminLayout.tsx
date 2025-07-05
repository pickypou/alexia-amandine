// src/layouts/AdminLayout.tsx
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="app-container">
    
      <main className="main-content">
        <Outlet />
      </main>
     <Footer />
    </div>
  );
};

export default AdminLayout;
