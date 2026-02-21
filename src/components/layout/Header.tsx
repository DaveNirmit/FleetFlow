import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';

export const Header = ({ onMenuToggle }: { onMenuToggle: () => void }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      <button onClick={onMenuToggle} className="p-2 rounded-lg hover:bg-secondary transition-colors text-foreground">
        <Menu size={20} />
      </button>

      <h1 className="text-lg font-bold text-foreground tracking-tight">
        Fleet<span className="text-accent">Flow</span>
      </h1>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          {user?.username.charAt(0).toUpperCase()}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-lg border border-border py-2 animate-fade-in">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground">{user?.username}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
