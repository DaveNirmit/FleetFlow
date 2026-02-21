"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, BarChart3, Clock, Mail, Lock, ArrowLeft } from 'lucide-react';

type PageView = 'landing' | 'login' | 'register' | 'forgot-password';

const OnePageApp = () => {
    const [view, setView] = useState<PageView>('landing');

    const renderLanding = () => (
        <main className="max-w-6xl mx-auto px-6 py-24 text-center animate-in fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-odoo-purple/5 text-odoo-purple text-xs font-bold mb-8 uppercase tracking-wider border border-odoo-purple/10">
                <ShieldCheck className="h-4 w-4" />
                Enterprise Fleet Intelligence
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-8">
                The Central Nervous System <br />
                <span className="text-odoo-purple">for Your Logistics.</span>
            </h1>

            <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-12 font-medium">
                Replace manual logs with a rule-based digital hub. Optimize lifecycle, monitor safety, and audit financial performance in one premium dashboard.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
                <Link href="/dashboard" className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                    Dashboard Preview
                </Link>
                <button className="bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-black transition-all flex items-center justify-center shadow-lg shadow-slate-200">
                    Developer
                </button>
            </div>


        </main>
    );

    const renderAuth = () => (
        <div className="flex-1 flex items-center justify-center py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-10 flex flex-col relative transition-all duration-300">

                <button
                    onClick={() => setView('landing')}
                    className="absolute top-6 left-6 text-slate-400 hover:text-odoo-purple transition-colors p-2"
                    title="Back to Home"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Login View */}
                {view === 'login' && (
                    <div className="flex flex-col">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 leading-none">Login</h2>
                            <p className="text-slate-500 text-sm font-medium mt-3 uppercase tracking-widest">Access your operational hub</p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">User name</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input type="text" placeholder="Enter your email" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 transition-all text-sm font-medium" />
                                </div>
                            </div>

                            <button type="button" onClick={() => setView('forgot-password')} className="block w-full text-xs font-bold text-odoo-purple hover:text-odoo-purple-light transition-colors text-center py-1">
                                Forgot your password?
                            </button>

                            <Link href="/dashboard" className="w-full bg-odoo-purple hover:bg-odoo-purple-light text-white font-bold py-4 rounded-lg shadow-lg shadow-odoo-purple/10 flex items-center justify-center gap-2 transition-all active:scale-95 group">
                                Login
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="mt-8 text-center border-t border-slate-100 pt-8">
                                <p className="text-xs text-slate-500 font-medium">New to FleetFlow?</p>
                                <button type="button" onClick={() => setView('register')} className="text-sm font-bold text-odoo-teal hover:text-odoo-teal-dark transition-colors mt-1 inline-block">
                                    Create an account here
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Register View */}
                {view === 'register' && (
                    <div className="flex flex-col">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 leading-none">Register</h2>
                            <p className="text-slate-500 text-sm font-medium mt-3 uppercase tracking-widest">Create a new account</p>
                        </div>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">First name</label>
                                    <input type="text" placeholder="First name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 text-sm font-medium" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Last name</label>
                                    <input type="text" placeholder="Last name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 text-sm font-medium" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                                <input type="email" placeholder="email@company.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 text-sm font-medium" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                                <input type="password" placeholder="Create a password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 text-sm font-medium" />
                            </div>
                            <button className="w-full bg-odoo-purple hover:bg-odoo-purple-light text-white font-bold py-4 rounded-lg shadow-lg mt-4 transition-all active:scale-95">Register</button>
                            <div className="mt-6 text-center border-t border-slate-100 pt-6">
                                <p className="text-xs text-slate-500 font-medium">Already have an account?</p>
                                <button type="button" onClick={() => setView('login')} className="text-sm font-bold text-odoo-teal hover:text-odoo-teal-dark transition-colors mt-1 inline-block">Log in here</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Forgot View */}
                {view === 'forgot-password' && (
                    <div className="flex flex-col">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 leading-none">Reset</h2>
                            <p className="text-slate-500 text-sm font-medium mt-3 uppercase tracking-widest">Send reset link</p>
                        </div>
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input type="email" placeholder="Enter your email" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-odoo-purple/10 focus:bg-white focus:border-odoo-purple/30 text-sm font-medium" />
                                </div>
                            </div>
                            <button className="w-full bg-odoo-purple hover:bg-odoo-purple-light text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 group transition-all active:scale-95">
                                Send Link <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="mt-8 text-center border-t border-slate-100 pt-8">
                                <button type="button" onClick={() => setView('login')} className="text-sm font-bold text-odoo-teal transition-colors">Back to Login</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-odoo-bg flex flex-col">
            {/* Header / Nav */}
            <nav className="p-6 flex justify-between items-center bg-white border-b border-slate-200 sticky top-0 z-50">
                <div
                    onClick={() => setView('landing')}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="h-8 w-8 bg-odoo-purple rounded flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <Truck className="text-white h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-odoo-purple tracking-tight">FleetFlow</span>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setView('landing')}
                        className={`text-sm font-bold transition-colors ${view === 'landing' ? 'text-odoo-purple' : 'text-slate-500 hover:text-odoo-purple'}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setView('login')}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${view !== 'landing' ? 'bg-odoo-purple text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Dynamic Content */}
            {view === 'landing' ? renderLanding() : renderAuth()}

            <footer className="py-12 border-t border-slate-200 text-center bg-white mt-auto">
                <p className="text-slate-400 text-sm font-medium">© 2024 FleetFlow • Precision Logistics Management</p>
            </footer>
        </div>
    );
};

export default OnePageApp;
