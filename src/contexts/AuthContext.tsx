import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { seedUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (data: { username: string; email: string; password: string; role: UserRole }) => { success: boolean; error?: string };
  logout: () => void;
  allUsers: User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem('ff_users');
    return stored ? JSON.parse(stored) : seedUsers;
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('ff_session');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((username: string, password: string) => {
    const found = allUsers.find(u => u.username === username);
    if (!found) return { success: false, error: 'Invalid username or password' };
    // Mock: any password works for seed users, check stored passwords for new users
    const passwords: Record<string, string> = JSON.parse(localStorage.getItem('ff_passwords') || '{}');
    if (passwords[username] && passwords[username] !== password) {
      return { success: false, error: 'Invalid username or password' };
    }
    setUser(found);
    localStorage.setItem('ff_session', JSON.stringify(found));
    return { success: true };
  }, [allUsers]);

  const signup = useCallback((data: { username: string; email: string; password: string; role: UserRole }) => {
    if (allUsers.find(u => u.username === data.username)) {
      return { success: false, error: 'Username already taken' };
    }
    if (allUsers.find(u => u.email === data.email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser: User = {
      id: 'u' + Date.now(),
      username: data.username,
      email: data.email,
      role: data.role,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...allUsers, newUser];
    setAllUsers(updated);
    localStorage.setItem('ff_users', JSON.stringify(updated));
    const passwords = JSON.parse(localStorage.getItem('ff_passwords') || '{}');
    passwords[data.username] = data.password;
    localStorage.setItem('ff_passwords', JSON.stringify(passwords));
    setUser(newUser);
    localStorage.setItem('ff_session', JSON.stringify(newUser));
    return { success: true };
  }, [allUsers]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ff_session');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, allUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
