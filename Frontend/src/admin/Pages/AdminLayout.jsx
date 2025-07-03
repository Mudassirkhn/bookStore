import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout'; // optional

export default function AdminLayout() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    setAdminName(name || "Admin");
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('adminName'); // ✅ clear admin name
    navigate('/admin/login');
  };

  return (
    <div className="admin-container" style={{ display: 'flex' }}>
      <aside style={{ width: '200px', background: '#333', color: '#fff', minHeight: '100vh' }}>
        <h2 style={{ padding: '1rem' }}>Admin Panel</h2>
        <p style={{ padding: '0 1rem', fontSize: '0.9rem', color: '#ccc' }}>
          Welcome, <strong>{adminName}</strong>
        </p>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
          <Link to="/admin/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
          <Link to="/admin/books" style={{ color: '#fff' }}>Manage Books</Link>
          <Link to="/admin/users" style={{ color: '#fff' }}>Manage Users</Link>
          <Link to="/admin/orders" style={{ color: '#fff' }}>Orders</Link>
          <button
            onClick={logout}
            style={{ color: '#fff', background: 'none', border: 'none', textAlign: 'left', padding: 0 }}
          >
            Logout
          </button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
