import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { username: string; email: string; password: string; role: UserRole }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  allUsers: User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

// --- Mappers ---
const mapUser = (dbRecord: any): User => ({
  id: dbRecord.id,
  username: dbRecord.username,
  email: dbRecord.email,
  role: dbRecord.role,
  createdAt: dbRecord.created_at,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('ff_session');
    return stored ? JSON.parse(stored) : null;
  });

  const { data: allUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      return data?.map(mapUser) || [];
    }
  });

  const login = async (username: string, password: string) => {
    try {
      const found = allUsers.find(u => u.username === username);
      if (!found) return { success: false, error: 'Invalid username' };

      // Note: In an actual production app, Supabase Auth would handle login, not the public table.
      // But adhering to the requested architecture where 'users' is a public table:

      const passwords: Record<string, string> = JSON.parse(localStorage.getItem('ff_passwords') || '{}');
      if (passwords[username] && passwords[username] !== password) {
        return { success: false, error: 'Invalid username or password' };
      }

      setUser(found);
      localStorage.setItem('ff_session', JSON.stringify(found));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const signup = async (data: { username: string; email: string; password: string; role: UserRole }) => {
    try {
      if (allUsers.find(u => u.username === data.username)) {
        return { success: false, error: 'Username already taken' };
      }
      if (allUsers.find(u => u.email === data.email)) {
        return { success: false, error: 'Email already registered' };
      }

      const dbPayload = {
        id: 'u' + Date.now() + Math.floor(Math.random() * 1000),
        username: data.username,
        email: data.email,
        role: data.role,
      };

      const { error } = await supabase.from('users').insert([dbPayload]);
      if (error) throw error;

      const newUser = mapUser({ ...dbPayload, created_at: new Date().toISOString() });

      const passwords = JSON.parse(localStorage.getItem('ff_passwords') || '{}');
      passwords[data.username] = data.password;
      localStorage.setItem('ff_passwords', JSON.stringify(passwords));

      setUser(newUser);
      localStorage.setItem('ff_session', JSON.stringify(newUser));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ff_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, allUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
