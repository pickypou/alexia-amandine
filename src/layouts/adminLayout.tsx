// src/layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <header style={{ background: '#222', color: '#fff', padding: '1rem' }}>
        <h1>Admin Panel</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
