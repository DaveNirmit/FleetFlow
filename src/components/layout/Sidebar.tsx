import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NAV_ITEMS, ROLE_ACCESS } from '@/types';
import {
  LayoutDashboard, Truck, Navigation, Wrench, ShieldCheck, BarChart3,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={20} />,
  vehicles: <Truck size={20} />,
  trips: <Navigation size={20} />,
  maintenance: <Wrench size={20} />,
  performance: <ShieldCheck size={20} />,
  analytics: <BarChart3 size={20} />,
};

export const Sidebar = ({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;
  const allowed = ROLE_ACCESS[user.role];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar flex flex-col z-30 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-lg font-bold text-sidebar-primary-foreground tracking-tight">
            Fleet<span className="text-sidebar-primary">Flow</span>
          </span>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.filter(item => allowed.includes(item.key)).map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.key}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              {iconMap[item.key]}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
