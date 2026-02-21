"use client";

import React, { useState } from 'react';
import { Truck, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type AuthView = 'login' | 'register' | 'forgot-password';

const AuthPage = () => {
    const [view, setView] = useState<AuthView>('login');

    return (
        <div className="min-h-screen bg-odoo-bg flex items-center justify-center p-6 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px:24px]">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-12 flex flex-col transition-all duration-300">

                {/* Brand Header */}
                <div className="flex items-center gap-2 mb-12 justify-center">
                    <div className="h-8 w-8 bg-odoo-purple rounded flex items-center justify-center shadow-lg shadow-odoo-purple/20">
                        <Truck className="text-white h-5 w-5" />
                    </div>
                    <Link href="/" className="text-xl font-bold text-odoo-purple tracking-tight">FleetFlow</Link>
                </div>

                {/* Login View */}
                {view === 'login' && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 leading-none">Login</h2>
                            <p className="text-slate-500 text-sm font-medium mt-3 uppercase tracking-widest">Access your operational hub</p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">User name</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setView('forgot-password')}
                                className="block w-full text-xs font-bold text-odoo-purple hover:text-odoo-purple-light transition-colors text-center py-2"
                            >
                                Forgot your password?
                            </button>

                            <button className="w-full bg-odoo-purple hover:bg-odoo-purple-light text-white font-bold py-4 rounded-lg shadow-lg shadow-odoo-purple/10 flex items-center justify-center gap-2 transition-all active:scale-95 group">
                                Login
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 text-center border-t border-slate-100 pt-8">
                                <p className="text-xs text-slate-500 font-medium">New to FleetFlow?</p>
                                <button
                                    type="button"
                                    onClick={() => setView('register')}
                                    className="text-sm font-bold text-odoo-teal hover:text-odoo-teal-dark transition-colors mt-1 inline-block"
                                >
                                    Create an account here
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Register View */}
                {view === 'register' && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 leading-none">Register</h2>
                            <p className="text-slate-500 text-sm font-medium mt-3 uppercase tracking-widest">Create a new account</p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Last name</label>
                                    <input type="text" placeholder="Last name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">First name</label>
                                    <input type="text" placeholder="First name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                                <input type="email" placeholder="email@company.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                                <input type="password" placeholder="Create a password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium" />
                            </div>

                            <button className="w-full bg-odoo-purple hover:bg-odoo-purple-light text-white font-bold py-4 rounded-lg shadow-lg shadow-odoo-purple/10 transition-all active:scale-95 mt-4">
                                Register
                            </button>

                            <div className="mt-8 text-center border-t border-slate-100 pt-8">
                                <p className="text-xs text-slate-500 font-medium">Already have an account?</p>
                                <button
                                    type="button"
                                    onClick={() => setView('login')}
                                    className="text-sm font-bold text-odoo-teal hover:text-odoo-teal-dark transition-colors mt-1 inline-block"
                                >
                                    Log in here
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Forgot Password View */}
                {view === 'forgot-password' && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 leading-none">Reset</h2>
                            <p className="text-slate-500 text-sm font-medium mt-3 uppercase tracking-widest">Send reset link</p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter your registered email"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <button className="w-full bg-odoo-purple hover:bg-odoo-purple-light text-white font-bold py-4 rounded-lg shadow-lg shadow-odoo-purple/10 flex items-center justify-center gap-2 transition-all active:scale-95 group">
                                Send Link
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 text-center border-t border-slate-100 pt-8">
                                <button
                                    type="button"
                                    onClick={() => setView('login')}
                                    className="flex items-center justify-center gap-2 text-sm font-bold text-odoo-teal hover:text-odoo-teal-dark transition-colors w-full"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AuthPage;
