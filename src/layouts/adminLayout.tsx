// src/layouts/AdminLayout.tsx
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
    
      <main>
        <Outlet />
      </main>
     <Footer />
    </div>
  );
};

export default AdminLayout;
