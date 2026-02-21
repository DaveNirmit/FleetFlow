"use client";

import React from 'react';
import { Truck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const RegisterPage = () => {
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
                        <Link href="/login" className="text-sm font-bold text-odoo-teal hover:text-odoo-teal-dark transition-colors mt-1 inline-block">
                            Log in here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
