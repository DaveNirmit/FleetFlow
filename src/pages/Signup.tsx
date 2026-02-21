import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { validatePassword, getPasswordStrength, validateEmail, ROLES } from '@/lib/validation';
import { UserRole } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Truck, Check, X } from 'lucide-react';

const Signup = () => {
  const { signup, allUsers } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', role: 'Fleet Manager' as UserRole });
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));
  const touch = (key: string) => setTouched(prev => ({ ...prev, [key]: true }));

  const usernameError = touched.username && form.username.length < 3 ? 'Min 3 characters' :
    touched.username && allUsers.find(u => u.username === form.username) ? 'Username taken' : '';
  const emailError = touched.email && !validateEmail(form.email) ? 'Invalid email' :
    touched.email && allUsers.find(u => u.email === form.email) ? 'Email already registered' : '';
  const pwChecks = validatePassword(form.password);
  const pwStrength = getPasswordStrength(form.password);
  const confirmError = touched.confirmPassword && form.password !== form.confirmPassword ? 'Passwords do not match' : '';

  const valid = form.username.length >= 3 && validateEmail(form.email) && pwChecks.every(c => c.pass) && form.password === form.confirmPassword && !usernameError && !emailError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!valid) return;
    const result = await signup({ username: form.username, email: form.email, password: form.password, role: form.role });
    if (result.success) navigate('/');
    else setError(result.error || 'Signup failed');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <div className="flex items-center gap-2 justify-center mb-6">
            <Truck className="text-accent" size={28} />
            <span className="text-2xl font-bold text-foreground">Fleet<span className="text-accent">Flow</span></span>
          </div>
          <h2 className="text-lg font-semibold text-foreground text-center mb-6">Create your account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Username</label>
              <Input value={form.username} onChange={e => set('username', e.target.value)} onBlur={() => touch('username')} placeholder="Choose a username" required />
              {usernameError && <p className="text-xs text-destructive mt-1">{usernameError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} onBlur={() => touch('email')} placeholder="Enter email" required />
              {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <Input type="password" value={form.password} onChange={e => set('password', e.target.value)} onBlur={() => touch('password')} placeholder="Create password" required />
              {form.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full ${pwStrength.color} transition-all`} style={{ width: `${pwStrength.percent}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{pwStrength.label}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-0.5">
                    {pwChecks.map(c => (
                      <div key={c.label} className="flex items-center gap-1.5 text-xs">
                        {c.pass ? <Check size={12} className="text-success" /> : <X size={12} className="text-muted-foreground" />}
                        <span className={c.pass ? 'text-success' : 'text-muted-foreground'}>{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
              <Input type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} onBlur={() => touch('confirmPassword')} placeholder="Confirm password" required />
              {confirmError && <p className="text-xs text-destructive mt-1">{confirmError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Role</label>
              <select
                value={form.role}
                onChange={e => set('role', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={!valid} className="w-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50">
              Create Account
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
