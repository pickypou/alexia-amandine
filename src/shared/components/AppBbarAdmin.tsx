// src/shared/components/AppBarAdmin.tsx
import { Link } from 'react-router-dom';

export default function AppBarAdmin() {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <nav className="space-x-4">
          <Link to="/admin" className="hover:underline">Dashboard</Link>
          <Link to="/admin/register" className="hover:underline"></Link>
          <Link to="/login" className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"></Link>
        </nav>
      </div>
    </header>
  );
}
      