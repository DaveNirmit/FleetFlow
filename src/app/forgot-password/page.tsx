"use client";

import React from 'react';
import { Truck, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ForgotPasswordPage = () => {
    return (
        <div className="min-h-screen bg-odoo-bg flex items-center justify-center p-6 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px:24px]">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-12 flex flex-col">

                <div className="flex items-center gap-2 mb-12 justify-center">
                    <div className="h-8 w-8 bg-odoo-purple rounded flex items-center justify-center shadow-lg shadow-odoo-purple/20">
                        <Truck className="text-white h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-odoo-purple tracking-tight">FleetFlow</span>
                </div>

                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 leading-none">Reset Password</h2>
                    <p className="text-slate-500 text-sm font-medium mt-3 uppercase tracking-widest">We'll send you a reset link</p>
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
                        Send Reset Link
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-8 text-center border-t border-slate-100 pt-8">
                        <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-odoo-teal hover:text-odoo-teal-dark transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
