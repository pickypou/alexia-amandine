// src/layouts/AdminLayout.tsx
import AppBarAdmin from '@components/AppBbarAdmin';
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
     <AppBarAdmin />
      <main>
        <Outlet />
      </main>
     <Footer />
    </div>
  );
};

export default AdminLayout;
