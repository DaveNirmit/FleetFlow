"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Truck, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token') || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!token) {
            setErrors({ token: 'Invalid or missing reset token.' });
            return;
        }
        if (password.length < 6) {
            setErrors({ password: 'Password must be at least 6 characters' });
            return;
        }
        if (password !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrors(data.errors || { general: 'Something went wrong.' });
            } else {
                setSuccess(true);
                setTimeout(() => router.push('/'), 3000);
            }
        } catch {
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-odoo-bg flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 p-10">
                {/* Brand */}
                <div className="flex items-center gap-2 mb-10 justify-center">
                    <div className="h-8 w-8 bg-odoo-purple rounded flex items-center justify-center shadow-lg shadow-odoo-purple/20">
                        <Truck className="text-white h-5 w-5" />
                    </div>
                    <Link href="/" className="text-xl font-bold text-odoo-purple tracking-tight">FleetFlow</Link>
                </div>

                {success ? (
                    <div className="text-center animate-in fade-in zoom-in duration-500">
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="h-16 w-16 text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Password Reset!</h2>
                        <p className="text-slate-500 text-sm font-medium mb-6">
                            Your password has been updated successfully. Redirecting you to login...
                        </p>
                        <Link href="/" className="text-sm font-bold text-odoo-teal">Go to Login →</Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-slate-900">New Password</h2>
                            <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-widest">Set your new password</p>
                        </div>

                        {!token && (
                            <div className="mb-6 p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg border border-rose-100">
                                ✕ Invalid or expired reset link. Please request a new one.
                            </div>
                        )}
                        {errors.general && (
                            <div className="mb-6 p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg border border-rose-100">
                                ✕ {errors.general}
                            </div>
                        )}
                        {errors.token && (
                            <div className="mb-6 p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg border border-rose-100">
                                ✕ {errors.token}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                                    {errors.password && <span className="text-[10px] text-rose-500 font-bold uppercase">{errors.password}</span>}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 6 characters"
                                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-lg outline-none text-sm font-medium ${errors.password ? 'border-rose-300' : 'border-slate-200 focus:border-odoo-purple/30'}`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
                                    {errors.confirmPassword && <span className="text-[10px] text-rose-500 font-bold uppercase">{errors.confirmPassword}</span>}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Repeat your password"
                                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-lg outline-none text-sm font-medium ${errors.confirmPassword ? 'border-rose-300' : 'border-slate-200 focus:border-odoo-purple/30'}`}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !token}
                                className="w-full bg-odoo-purple hover:bg-odoo-purple-light text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 group mt-4"
                            >
                                {loading ? 'Updating...' : 'Reset Password'}
                                {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                            </button>

                            <div className="text-center pt-4">
                                <Link href="/" className="text-sm font-bold text-odoo-teal hover:text-odoo-teal-dark transition-colors">
                                    ← Back to Login
                                </Link>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-odoo-bg flex items-center justify-center"><p className="text-slate-500 font-medium">Loading...</p></div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
