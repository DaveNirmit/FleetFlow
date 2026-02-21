"use client";

import React from 'react';
import { Truck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl shadow-blue-100/50 border border-white overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Login Section */}
                <div className="flex-1 p-12 flex flex-col">
                    <div className="flex items-center gap-2 mb-12">
                        <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                            <Truck className="text-white h-5 w-5" />
                        </div>
                        <span className="text-xl font-black text-slate-800 tracking-tight">FleetFlow</span>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 leading-none">Login</h2>
                        <p className="text-slate-400 text-sm font-medium mt-3 uppercase tracking-widest">Access your operational hub</p>
                    </div>

                    <form className="space-y-6 flex-1">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">User name</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <Link href="#" className="block text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors text-center py-2">
                            Forgot your password?
                        </Link>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95 group">
                            Login
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                {/* Register Section (Side Column as per Image) */}
                <div className="flex-1 bg-slate-50/50 p-12 flex flex-col border-l border-slate-100">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 leading-none">Register</h2>
                        <p className="text-slate-400 text-sm font-medium mt-3 uppercase tracking-widest">Create a new account</p>
                    </div>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last name</label>
                                <input type="text" placeholder="Last name" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl outline-none text-sm font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First name</label>
                                <input type="text" placeholder="First name" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl outline-none text-sm font-medium" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                            <input type="email" placeholder="email@company.com" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl outline-none text-sm font-medium" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <input type="password" placeholder="Create a password" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl outline-none text-sm font-medium" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                            <input type="password" placeholder="Verify password" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl outline-none text-sm font-medium" />
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 mt-4">
                            Register
                        </button>

                        <Link href="#" className="block text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors text-center py-2">
                            Already have an account? Login
                        </Link>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
