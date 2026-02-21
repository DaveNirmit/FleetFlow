import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_ACCESS, NAV_ITEMS } from '@/types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return <Navigate to="/login" />;

  // RBAC check
  const allowed = ROLE_ACCESS[user.role];
  const currentNav = NAV_ITEMS.find(n => n.path === location.pathname);
  if (currentNav && !allowed.includes(currentNav.key)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'}`}>
        <Header onMenuToggle={() => setCollapsed(!collapsed)} />
        <main className="p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
