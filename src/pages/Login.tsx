import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.success) navigate('/');
    else setError(result.error || 'Login failed');
  };

  if (forgotMode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <div className="flex items-center gap-2 justify-center mb-6">
              <Truck className="text-accent" size={28} />
              <span className="text-2xl font-bold text-foreground">Fleet<span className="text-accent">Flow</span></span>
            </div>
            <h2 className="text-lg font-semibold text-foreground text-center mb-4">Reset Password</h2>
            {resetSent ? (
              <div className="text-center">
                <p className="text-sm text-success mb-4">Password reset link has been sent to your email.</p>
                <Button onClick={() => { setForgotMode(false); setResetSent(false); }} className="w-full bg-primary text-primary-foreground hover:opacity-90">
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setResetSent(true); }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <Input type="email" placeholder="Enter your email" required />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">Send Reset Link</Button>
                <button type="button" onClick={() => setForgotMode(false)} className="w-full mt-3 text-sm text-accent hover:underline">
                  Back to Login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <div className="flex items-center gap-2 justify-center mb-6">
            <Truck className="text-accent" size={28} />
            <span className="text-2xl font-bold text-foreground">Fleet<span className="text-accent">Flow</span></span>
          </div>
          <h2 className="text-lg font-semibold text-foreground text-center mb-6">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Username</label>
              <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">Sign In</Button>
          </form>
          <div className="mt-4 flex items-center justify-between text-sm">
            <button onClick={() => setForgotMode(true)} className="text-accent hover:underline">Forgot password?</button>
            <Link to="/signup" className="text-accent hover:underline">Create account</Link>
          </div>
          {/* <div className="mt-6 p-3 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground text-center">Demo: Login as <strong>admin</strong> (any password) for full access</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
